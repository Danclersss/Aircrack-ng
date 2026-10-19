# FutBR no Roblox — base da próxima versão

Este diretório contém dados portáveis, não um jogo Roblox concluído. O jogo web continua sendo a versão jogável. HTML, CSS e o motor JavaScript não executam no Roblox Studio.

## Usar os dados

1. Na raiz do repositório, rode `npm run export:roblox`.
2. No Studio, crie um ModuleScript `FutBRData` em ReplicatedStorage e cole o conteúdo de `src/ReplicatedStorage/FutBRData.luau`. Quem usa Rojo pode sincronizar `default.project.json`.
3. Leia com `local Data = require(game.ReplicatedStorage.FutBRData)`.

O catálogo preserva IDs de cartas e de pessoas, versões normal/auge/ídolo, atributos, probabilidades dos pacotes, divisões J–A, etapas da Copa e níveis do clube. Arrays Luau começam em 1; os índices de etapas da API web começam em 0. Cada jogador pode ter várias cartas, mas apenas uma versão da mesma pessoa pode entrar nos onze.

## Próxima implementação no Studio

A primeira versão deve preservar a gestão do clube: montar elenco, assistir à simulação, trocar táticas e fazer substituições. Controle direto de personagens seria outro modo, com física e controles próprios.

- Portar a simulação para Luau em ServerScriptService e validar escalações, trocas e resultados no servidor.
- Criar a interface em ScreenGui e representar o campo com peças ou ViewportFrame.
- Usar RemoteEvents com ações limitadas (`Ready`, `Tactic`, `Substitute`), validando tipo, frequência, posse das cartas e estado da partida. O cliente nunca informa resultado, prêmio ou saldo.
- Persistir por `Player.UserId` com DataStoreService/UpdateAsync e uma versão de esquema. Aplicar recompensas uma única vez por partida/etapa.
- Sortear cartas no servidor, guardar duplicatas e impedir duas edições da mesma pessoa na escalação.
- Criar fila por servidor inicialmente; matchmaking entre servidores exige MemoryStoreService e tratamento de desconexões.
- Testar no Studio com dois clientes, celular, reconexão e falhas de salvamento antes de publicar.

Contas do site e usuários Roblox são identidades distintas. Senhas, cookies, chaves Supabase e Turnstile não devem entrar no Roblox. Migração de inventário precisará de um fluxo separado de vínculo verificado. Nomes/imagens de jogadores reais também precisam de revisão de direitos e das regras da plataforma antes da publicação.

O exportador foi verificado em Node. Ainda não houve execução no Roblox Studio nem publicação de uma experiência Roblox.
