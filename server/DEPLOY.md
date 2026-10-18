# Publicar a Arena sem contratar plano pago

A carreira e os campos continuam funcionando no GitHub Pages. Contas, loja e ranqueadas exigem o servidor deste diretório. A opção preparada usa **Render Free + Supabase Free + Cloudflare Turnstile Free**. Não contrate banco ou disco do Render. Os limites e a disponibilidade dos planos são definidos pelos provedores; não é uma garantia de gratuidade ilimitada.

## Ativação

1. Crie um projeto gratuito no [Supabase](https://supabase.com/dashboard). Em **Connect**, copie a conexão **Session pooler** (porta 5432). Use a senha do banco; mantenha-a somente nas variáveis privadas do Render. Não use chave pública do Supabase como senha.
2. No [Render](https://dashboard.render.com/), conecte este repositório e crie um **Blueprint** a partir de `render.yaml`. Ele seleciona explicitamente `plan: free`. Se o provedor exigir um plano pago, interrompa a criação. Alternativa manual: Web Service, Node 24, build `npm ci --omit=dev`, start `node server/server.cjs`, instância Free.
3. Defina `DATABASE_URL` com a conexão do primeiro passo e `PUBLIC_ORIGIN` com a URL HTTPS exata atribuída pelo Render (sem barra final).
4. No [Cloudflare Turnstile](https://dash.cloudflare.com/), crie um widget gratuito para o hostname do Render. Copie **Site key** para `TURNSTILE_SITE_KEY` e **Secret key** para `TURNSTILE_SECRET` no Render. O segredo não vai no navegador nem no repositório.
5. Publique. Abra a URL do Render: ela serve **o jogo inteiro** na mesma origem, incluindo `/arena/`. Não use o login do GitHub Pages, pois aquele endereço não tem servidor. Contas, compras e ranqueadas ficam habilitadas automaticamente quando `/api/config` e o banco estão disponíveis.
6. Crie uma conta de teste, guarde o código de recuperação, crie o time e use outro navegador/dispositivo para confirmar que o mesmo clube reaparece. Confira fila com duas contas, intervalo, resgate de missão e reinício do serviço. Faça backup regular pelo Supabase.

Nenhuma conta desses serviços foi criada automaticamente; não há credenciais de produção disponíveis nesta sessão. Portanto, a Arena online não está ativada no endereço público do Pages. A configuração Postgres ainda precisa ser validada contra seu projeto Supabase real. A implementação local foi validada com SQLite e navegadores.

## O que esperar dos planos gratuitos

O servidor pode hibernar: o primeiro acesso demora mais. Projetos de banco gratuitos também podem ser pausados por inatividade. Regras/limites podem mudar. Uma única instância mantém as partidas e a fila na memória; reiniciar durante um jogo cancela essa partida sem conceder resultado ou moedas. Contas, elencos, inventário, moedas e resultados concluídos persistem no Postgres. Não escale este servidor para várias instâncias sem implementar coordenação compartilhada de partidas.

A Arena ranqueada usa HTTPS e simulação no servidor com consultas periódicas, dispensando TURN pago. Amistosos antigos por convite continuam WebRTC e podem falhar em redes restritas.

## Desenvolvimento

`npm ci`, `npm run start:online` e abrir o serviço local para testes. Node 24 usa SQLite em `.data/`, ignorado pelo Git. `npm run test:online` inicia uma instância temporária e verifica autenticação, CSRF, compras simultâneas, sorteio, matchmaking, intervalo automático, recompensas, recuperação e conflitos de sincronização. `node tests/online-ui.cjs` usa o servidor de desenvolvimento na porta 8080.

Para usar Postgres no desenvolvimento, exporte `DATABASE_URL` e reinicie. Em produção, `NODE_ENV=production` exige HTTPS, Postgres e Turnstile: o serviço recusa iniciar sem esses requisitos. O servidor não lê `.env` automaticamente; injete variáveis no provedor ou use `node --env-file=.env server/server.cjs` localmente.

## Segurança e limites

- HTTPS na borda, HSTS, cookies de sessão HttpOnly/Secure/SameSite, sessão com token aleatório cujo hash fica no banco e prazo de sete dias. Tokens CSRF e origem exata em mutações.
- Senhas não são guardadas nem criptografadas reversivelmente: scrypt com salt individual. O código de recuperação tem 256 bits, é mostrado uma vez, armazenado como hash e renovado ao usar. Recuperar invalida todas as sessões antigas. Não há envio de e-mail nem verificação de propriedade do e-mail nesta etapa; guarde o código de recuperação.
- Sorteios, saldo, compras, missões, escalação e resultados validados no servidor. Cada clube recebe 18 jogadores iniciais (11 titulares e sete reservas) e 400 moedas. Resultado e moedas concedidos em transação uma única vez. Amistosos P2P não concedem moedas/pontos.
- SQL parametrizado. Schema `futbr` separado da API pública do Supabase, RLS habilitado e acesso PUBLIC revogado. A conexão privada usa o dono das tabelas; não distribua sua URL ao cliente. TLS do Postgres com certificado validado.
- Turnstile em cadastro/login/recuperação, limites por IP/conta, tamanho de corpo, limite de conexões, timeouts e bloqueio de arquivos internos. Não aceite cabeçalhos de IP fornecidos por qualquer cliente; `TRUST_PROXY=1` apenas após garantir que a borda remove cabeçalhos falsificados. A proteção volumétrica depende da borda do provedor e de suas quotas; nenhum site é imune a ataques ou indisponibilidade.
- O jogo antigo usa scripts/estilos inline, então a CSP ainda permite `unsafe-inline`. Não há MFA, fiscalização de criação de múltiplas contas, moderação ou sistema antifraude completo. Antes de dinheiro real: remover essa exceção, revisar dependências e realizar revisão de segurança independente, políticas legais e pagamentos com provedor adequado. Não há checkout nesta versão.
- E-mails são identificadores privados; apenas nome do clube, pontuação e partidas entram no ranking público. Não registre senhas, cookies, códigos de recuperação ou URLs de banco em logs. Proteja as contas dos provedores com MFA. Use exportações/backups para dados que queira preservar.
- As cartas e envelopes usam arte original FutBR; não usam a marca ou arte de pacotes Panini. Chances por carta exibidas: comum 70%, rara 25%, destaque 5%. Repetidas devolvem 20 moedas. Não há revenda ou valor em dinheiro.
