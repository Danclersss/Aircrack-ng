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

Use o ID da conta, confira clube e e-mail mascarado e descreva o bug. Pacotes comuns são entregues como tickets, cartas já possuídas viram repetidas e o pacote Fundadores mantém os cosméticos dourados e três cartas 95+ de pessoas diferentes. Não há checkout, Pix, estoque comercial ou compra com dinheiro real.

## Como premiar seus amigos por feedbacks

1. O amigo entra na conta da Arena e escolhe **Preparar relato de bug**, no final da página.
2. Ele descreve o problema e copia o relato. O texto inclui o ID da própria conta. Ele envia esse texto e, se possível, um vídeo ou imagem pelo canal em que vocês já conversam. O jogo não publica relatos ou dados de outras contas.
3. Você abre `/arena/admin.html`, entra com o segredo e o código do autenticador e pesquisa o ID informado.
4. Selecione a conta, informe moedas e/ou quantidade de pacotes. Use uma referência única, por exemplo `feedback-amigo-20261019-01`, e uma mensagem de agradecimento.
5. Revise o clube e o ID e confirme. O jogador vê um aviso ao atualizar sua sessão. Os pacotes ficam em **Jornada → Seus pacotes conquistados → Abrir recompensa**.

Nenhum prêmio é automático por enviar um relato: você decide após conferir. Entregas repetidas com a mesma referência não duplicam o prêmio.
