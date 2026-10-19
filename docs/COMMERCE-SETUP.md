# Loja, Pix manual e anúncios opcionais

## Estado ao publicar

A interface está pronta, mas vendas e anúncios ficam **desativados por padrão**. Nenhuma receita é simulada. Não há integração bancária automática com Linkspix: o único link fornecido contém `preview=true`, e não foi possível validar seu conteúdo nesta execução. O jogo não usa a prévia como cobrança real.

Pacote Fundadores: **25 unidades no total**, R$2,99 por unidade, uma compra por clube/conta, quatro uniformes permanentes (`halves`, `chest`, `hoops`, `chevron`). Conteúdo fixo, sem sorteio, jogadores ou atributos. Os mesmos estilos podem ser obtidos com moedas do jogo; a compra é uma forma opcional de apoio. Não promete exclusividade dos estilos.

## Ativar o Pix com conferência manual

1. No Linkspix, obtenha e teste uma página **real de cobrança**, de R$2,99, com o destinatário correto, QR Code e chave Pix. A URL de prévia não é suficiente; não presuma que remover `preview=true` a transforma em cobrança válida.
2. No serviço do Render, em Environment, configure:
   - `COMMERCE_MANUAL_PIX=1`
   - `COMMERCE_PIX_CHECKOUT_URL`: URL HTTPS real do Linkspix, sem `preview=true`.
   - `COMMERCE_ADMIN_TOKEN`: segredo aleatório de pelo menos 32 caracteres, diferente da senha da conta. Gere em um gerenciador de senhas. Não coloque no Git, em URL, em mensagens ou no código do frontend.
3. Defina e divulgue suporte, prazo de conferência e política de cancelamento/reembolso antes de ativar. O jogo não promete entrega instantânea. Confira também termos, privacidade, direitos comerciais e obrigações tributárias.
4. Faça o deploy e um teste controlado de ponta a ponta. Não ative a campanha de vendas antes de conseguir conferir e atender pedidos.

O jogador reserva uma unidade por 30 minutos, abre a página externa para usar o QR Code/chave do provedor e informa o E2E do comprovante. **Não há QR Code Pix inventado a partir da URL**: QR de página e QR de pagamento são coisas diferentes. A informação enviada pelo jogador é apenas uma solicitação de análise.

Acesse `/arena/payments.html`, no mesmo domínio do jogo. Informe o segredo administrativo (fica só em memória). A tela lista pedidos; abra o banco separadamente, confira valor, destinatário e a vinculação correta à conta/pedido, copie o E2E da transação recebida e confirme. O sistema entrega os quatro cosméticos atomicamente e impede reutilizar a mesma transação em outro pedido. Repetir a confirmação do mesmo pedido não duplica a entrega.

Um link Pix fixo **não carrega o ID do pedido** até o banco. A conciliação de pagador/conta precisa ser feita por você. Nunca aprove somente pelo nome do jogador ou por imagem de comprovante.

Reservas expiradas deixam de ocupar estoque. O link externo pode continuar aceitando pagamentos: o jogo avisa para não pagar após o prazo, mas não controla o banco. Um pagamento tardio só pode ser liberado se houver unidade livre; caso contrário, faça o reembolso pelo banco. Cancelar pedido no painel **não reembolsa dinheiro**. Pedidos pagos não têm cancelamento automático nesta versão; reembolsos e eventual revogação de benefício exigem atendimento manual.

O estoque fica persistido no banco. Transações bloqueiam a linha de inventário para evitar ultrapassar 25 vendas. Não altere a capacidade no banco durante a campanha. Mantenha backups.

## Tornar a entrega automática depois

Será necessário contratar/configurar um provedor com API/webhook autenticado e cobrança individual por pedido (valor, moeda, ID externo, status confirmado). A integração precisará verificar o pagamento pelo servidor do provedor, tratar repetição, conciliar o ID da conta e implementar reembolsos. **Esta versão não possui esse adaptador para Linkspix.** “Já paguei”, redirecionamento de navegador e comprovante enviado pelo jogador nunca são provas bancárias suficientes.

## Anúncios opcionais com recompensa

A loja oferece um ponto de entrada voluntário. Regra prevista: 35 moedas por conclusão verificada, até três por dia (Brasília). Sem anúncio automático, interrupção de partida ou recompensa por tempo decorrido no navegador.

**Nenhuma rede está conectada.** É necessário escolher um provedor que aceite o projeto, suas condições comerciais e privacidade/idade do público, e implementar um adaptador de conclusão verificada no servidor. Anúncios comuns de banner não são anúncios com recompensa. Um evento JavaScript do navegador sozinho não deve liberar moedas.

O backend fornece um contrato para um adaptador próprio confiável, **não uma integração nativa com uma rede de anúncios**:

- `POST /api/commerce/ad/start`: sessão autenticada e CSRF do jogador; cria uma sessão de até 15 minutos. Retorna a URL HTTPS configurada com parâmetro `reward_session`.
- O adaptador externo mostra o anúncio somente após a escolha do jogador. Deve receber e validar a confirmação oficial da rede antes de chamar o FutBR.
- `POST /api/commerce/ad/callback`, corpo JSON `{ "session": "UUID", "transaction": "ID-unico-da-rede" }`.
- Headers `X-Reward-Timestamp`: Unix em milissegundos; `X-Reward-Signature`: HMAC-SHA256 hexadecimal de `timestamp.session.transaction`, usando `REWARDED_AD_SECRET`.
- A assinatura precisa vir **do servidor do adaptador**, nunca de JS público. Tolerância de cinco minutos; confirmação não aceita antes de 15 segundos. Tempo mínimo é só proteção adicional, não prova de visualização.
- Crédito transacional, idempotente, com identificador de rede único e teto diário. O jogador atualiza o saldo ao voltar.

Somente depois de implementar/testar o adaptador, configurar no Render: `REWARDED_AD_PROVIDER` (nome público), `REWARDED_AD_LAUNCH_URL` (página HTTPS do adaptador), `REWARDED_AD_SECRET` (segredo aleatório de pelo menos 32 caracteres, compartilhado apenas entre os dois servidores). Não aponte para uma página arbitrária nem invente callbacks: isso não gera receita.

## Verificação

`npm run test:commerce` valida ativação segura, reservas concorrentes, teto de 25, confirmação manual administrativa, isolamento entre contas, referências únicas, entrega sem duplicação, persistência e recompensa assinada com limite diário. Os testes usam banco temporário e adaptador de anúncio de teste, sem cobranças ou anúncios reais.
