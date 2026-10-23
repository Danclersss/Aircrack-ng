# Administração e proteção das contas

A página `/arena/admin.html` lista contas com e-mails mascarados e permite premiar relatos de bugs com moedas, pacotes, cartas e o pacote especial preservado. Não exibe senhas, hashes ou códigos de recuperação. Toda entrega exige revisão do destinatário e uma referência única, registrada em auditoria; repetir a mesma referência não duplica a recompensa.

## Ativação no Render

Em Environment, configure três segredos independentes:

- `ACCOUNT_DATA_KEY`: exatamente 32 bytes aleatórios codificados em base64. Gere com um gerenciador de segredos ou `openssl rand -base64 32`.
- `ADMIN_ACCESS_TOKEN`: segredo aleatório de pelo menos 32 caracteres, guardado no gerenciador de senhas.
- `ADMIN_TOTP_SECRET`: segredo base32 de pelo menos 32 caracteres, cadastrado no aplicativo autenticador como TOTP SHA1, seis dígitos, período de 30 segundos.

Não envie esses valores no chat nem os coloque no Git. Guarde uma cópia de recuperação da chave e backups do banco em local separado. Reinicie o serviço após configurar. A primeira inicialização cifra os perfis existentes; teste login e recuperação depois da migração. Faça backup antes de ativar e evite instâncias concorrentes durante essa migração.

Perfis, e-mails e auditoria das recompensas usam AES-256-GCM com nonce aleatório e autenticação vinculada ao ID da conta. Busca por e-mail usa índice HMAC. Senhas continuam protegidas por scrypt, e o transporte deve usar HTTPS. A ausência da chave mantém compatibilidade com o banco anterior, mas **não ativa criptografia adicional nem administração**. Uma chave incorreta impede abrir os dados: não a substitua ou apague para resolver um erro de implantação.

A sessão administrativa dura dez minutos, usa cookie HttpOnly/SameSite, exige segundo fator, limita tentativas e protege alterações por origem e CSRF. A criptografia não impede que alguém com controle do servidor e das chaves leia dados; não existe garantia de segurança absoluta. IDs e metadados operacionais necessários ao banco continuam visíveis.

## Recompensas

Use o ID da conta, confira clube e e-mail mascarado e descreva o bug. Pacotes comuns são entregues como tickets, cartas já possuídas viram repetidas e o pacote dourado é entregue como ticket e contém somente três cartas 95+ de pessoas diferentes, sem cosméticos. Não há checkout, Pix, estoque comercial ou compra com dinheiro real.

## Como premiar seus amigos por feedbacks

1. O amigo entra na conta da Arena e escolhe **Preparar relato de bug**, no final da página.
2. Ele descreve o problema e copia o relato. O texto inclui o ID da própria conta. Ele envia esse texto e, se possível, um vídeo ou imagem pelo canal em que vocês já conversam. O jogo não publica relatos ou dados de outras contas.
3. Você abre `/arena/admin.html`, entra com o segredo e o código do autenticador e pesquisa o ID informado.
4. Selecione a conta, informe moedas e/ou quantidade de pacotes. Use uma referência única, por exemplo `feedback-amigo-20261019-01`, e uma mensagem de agradecimento.
5. Revise o clube e o ID e confirme. O jogador vê um aviso ao atualizar sua sessão. Os pacotes comuns ficam em **Jornada → Seus pacotes conquistados → Abrir recompensa**; o dourado aparece na **Loja → Pacotes dourados conquistados**.

Nenhum prêmio é automático por enviar um relato: você decide após conferir. Entregas repetidas com a mesma referência não duplicam o prêmio.

## Painel de moedas e pacotes limitados

Acesse **Configurações → Administração do jogo**, ou abra `/arena/admin.html`. Se faltar configuração, a página mostra o guia de ativação. A administração só funciona após configurar os três segredos no serviço; publicar o código não cria uma senha administrativa automaticamente.

Para o envio solicitado:

1. Entre com seu token administrativo e o código do autenticador.
2. Busque o ID **0000004** e confira o clube retornado.
3. Clique em **Preparar recompensa**. Informe **1.000.000** em FutCoins e **25** em Pacotes limitados dourados. Deixe Pacotes do clube em **0** se quiser apenas os limitados.
4. Informe uma referência única, por exemplo `presente-0000004-20261023`, e uma mensagem para o jogador.
5. Revise e confirme uma única vez. A entrega aparece no histórico, e o saldo atualizado aparece na busca da conta. Repetir a mesma referência com os mesmos valores não duplica a entrega.

Cada entrega permite até 1.000.000 de moedas, 100 pacotes comuns, 100 limitados e dez cartas específicas. O histórico mostra as últimas 100 entregas e pode ser filtrado pelo ID da busca. Pacotes limitados são tickets dourados de três cartas 95+, sem uniformes ou escudos dourados. Nenhum item é creditado apenas por abrir o painel.

## Gerar os segredos no seu computador

Na pasta do projeto, com Node.js instalado, execute:

```sh
node server/create-admin-config.cjs
```

O comando cria `.env.admin.local`, ignorado pelo Git, sem mostrar os segredos no terminal e sem sobrescrever um arquivo existente. Abra esse arquivo somente no seu computador. Copie `ADMIN_ACCESS_TOKEN` e `ADMIN_TOTP_SECRET` para **Render → seu serviço → Environment**. No Google Authenticator, Microsoft Authenticator ou equivalente, adicione uma chave manual, escolha código baseado em tempo e informe o valor de `ADMIN_TOTP_SECRET`.

Se `ACCOUNT_DATA_KEY` já estiver no Render, **mantenha exatamente o valor atual**. Somente numa primeira configuração, em que essa variável ainda não exista, gere o arquivo com `node server/create-admin-config.cjs --new-data-key` e configure também essa chave. O arquivo não ativa nada sozinho no servidor; após copiar as variáveis, salve e faça o redeploy. Guarde os segredos com segurança e não envie o arquivo pelo chat.
