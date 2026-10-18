# FutBR 2026

Jogo de gestão de futebol inspirado nos managers clássicos. Interface em português. A carreira funciona sem rede; a Arena é um modo PvP experimental entre dois navegadores, sem cadastro nesta primeira etapa.

## Jogar / desenvolver

Requer Python 3. No diretório do projeto:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra a porta 8000 no seu navegador. Também é possível abrir `index.html` diretamente, mas um servidor estático mantém uma origem consistente para o armazenamento local. Para hospedar, publique os arquivos JavaScript/CSS da raiz e as pastas `assets/`, `data/`, `arena/` e `experimentos/`, além de `index.html`. A Arena exige HTTPS (ou localhost durante o desenvolvimento).

- **Carreiras:** cinco espaços, continuar, excluir, exportar e importar arquivos JSON de outros jogadores. A importação utiliza primeiro um espaço livre; quando todos estiverem ocupados, solicita qual substituir.
- **Novo jogo:** escolha clube, liga, modo livre ou escalada. “Aprender jogando” ativa dicas contextuais que podem ser fechadas ou reativadas pelo botão Dicas.
- **Editor do jogo:** edite nomes e siglas de clubes, região, estádio, capacidade, força, orçamento, teto salarial e jogadores (nome, posição, idade e força). Também edite nomes de ligas e copas. Guarde cinco pacotes nomeados e exporte ou importe configurações JSON.
- **Guardar alterações** atualiza o rascunho do editor. **Salvar** em Meus pacotes guarda uma cópia no navegador. **Aplicar ao jogo** define a base das próximas carreiras. Carreiras já criadas mantêm seus próprios dados.

O editor preserva a estrutura e a quantidade de participantes das ligas, os formatos, as regras de classificação e os calendários de competição do motor original. Não cria novos formatos de torneio. Posições sem atletas suficientes recebem jogadores gerados. Alterações manuais nos arquivos JSON são validadas antes da importação.

Os dados ficam no armazenamento local da origem do site e do navegador. Limpar os dados do site remove carreiras e pacotes. Exporte arquivos para backup e compartilhamento; não há sincronização na nuvem.

## Validação

O jogo não precisa de Node. Os testes de navegador precisam de Node, Chromium e das dependências de desenvolvimento:

```sh
npm ci
# Neste ambiente Debian, prepare o retransmissor local para os testes PvP:
npm run setup:pvp-tests
# Em outro terminal, mantenha o servidor da porta 8000 em execução.
npm test
```

Os testes usam `/usr/bin/chromium`; configure `CHROMIUM_PATH` para outro executável. Cobrem criação/retomada, navegação limpa, HUD, editor, pacotes, persistência, importação/exportação real, rejeição de arquivos inválidos, simulação completa de partida e campo compacto.

## Arquivos

- `index.html`: motor original enviado pelo usuário e ponto de entrada.
- `modern.js`: navegação, carreiras, editor, pacotes, dicas e correções de serialização.
- `modern.css`: interface responsiva e ajustes de legibilidade.
- `assets/logo.svg`: versão vetorial do símbolo fornecido como referência.

Projeto independente, sem vínculo com Brasfoot ou entidades esportivas. Nomes, valores e atributos presentes na base podem exigir atualização e não são dados oficiais.

A camada `redesign.css` centraliza a interface e organiza as telas responsivas. `match-analysis.js` calcula a densidade das posições reais da bola, normaliza a intensidade por partida e permite alternar entre mapa de calor e visualização ao vivo. O mapa representa movimentação da bola, não rastreamento individual dos jogadores.

## Campo ao vivo e estaduais

O botão **Ao vivo** mostra posse, ataque, ataque perigoso, escanteio, lateral, falta, tiro de meta, finalização e gol. A direção muda no segundo tempo. O campo identifica clube e atleta; sem fotos licenciadas, os avatares usam iniciais. As estatísticas de posse, finalizações, escanteios, laterais e faltas vêm da simulação e ficam no save. Renderizar ou pausar a tela não gera lances nem novas amostras de calor.

A base estadual passou a ter 27 campeonatos e 269 clubes, editáveis em **Editor do jogo → Estaduais**. Consulte os campeonatos em **Torneios → Outras ligas → Campeonatos estaduais**. Foi removido o antigo corte de 12 equipes; campeonatos com número ímpar usam folgas. Carreiras em andamento preservam suas competições e adotam a base estadual na próxima temporada. Uma carreira nacional só participa da primeira divisão estadual se seu clube constar nos participantes daquela edição.

**A composição oficial de 2026 está pendente de conferência.** A base é um rascunho editável e não deve ser apresentada como lista oficial dos 27 campeonatos. As fontes externas consultadas para essa conferência foram bloqueadas pela política de rede. Veja [data/README.md](data/README.md).

A hospedagem precisa incluir também `data/state-clubs.js`, `state-competitions.js`, `live-tracker.js` e `live-tracker.css`.

## Escalação durante a partida

Ao pausar ou chegar ao intervalo, a análise ao vivo dá lugar à prancheta compacta com a formação dos dois clubes. Selecione um titular no campo, escolha o reserva e clique em **Confirmar substituição**. A seleção sozinha não altera o time. O botão no cabeçalho retoma a partida ou inicia o segundo tempo. No celular, a formação adversária pode ser expandida pelo nome do clube.

Os limites de cinco substituições e três paradas no segundo tempo continuam valendo. Trocas no intervalo não consomem uma parada; uma seleção inválida também não consome parada. O campo ao vivo e os campos de escalação usam o mesmo desenho vetorial, com linhas proporcionais. A hospedagem deve incluir `match-tactics.js` e `match-tactics.css`.

## Identidade visual por clube

Cada clube das ligas e da base estadual possui uma paleta padrão. A carreira usa suas cores nos botões, navegação, destaques, cabeçalho e cartões da escalação. O tema muda ao assumir outro clube e ao carregar outra carreira, incluindo saves antigos. Os gramados mantêm sua cor natural. Cores claras recebem texto e detalhes com contraste ajustado.

Em **Novo jogo**, selecionar o clube mostra uma prévia do tema. Em **Editor do jogo → Clubes e jogadores** ou **Estaduais**, os seletores **Principal** e **Secundária** permitem ajustar a identidade e criar cores para clubes personalizados. Guarde as alterações e aplique o pacote às próximas carreiras; as cores também acompanham os arquivos exportados. Para um clube novo sem paleta cadastrada, o tema inicial usa as cores padrão do jogo até ser personalizado.

`club-themes.js` contém o catálogo de paletas, a seleção do tema e o cálculo de contraste. `club-themes.css` aplica as cores sem mudar o desenho dos campos. Inclua esses dois arquivos na hospedagem estática.

## Camisas, logo e teste 3D

Os cartões da escalação e da prancheta agora usam camisas vetoriais sem escudos, patrocinadores ou marcas. A prancheta foi ampliada. Os modelos básicos seguem as cores e padrões cadastrados (camisa lisa, listras, faixa diagonal etc.), e podem ser ajustados no editor. Eles **não são um catálogo auditado de todos os uniformes oficiais de 2026**.

O número dentro da camisa é a numeração do jogador, e a força continua em um indicador separado. Números ausentes recebem numeração fictícia única de 1 a 99 no clube, com origem registrada como `fictional`. Números existentes e os cadastrados no editor são preservados. A numeração acompanha o save e é ajustada em caso de conflito após transferências. O editor permite preencher números de 1 a 99, sem duplicidade por clube, e guardá-los nos pacotes. A logo usa uma imagem própria na navegação e `assets/favicon.svg` na aba do navegador.

**Elencos e numeração oficiais ainda pendentes:** o alvo solicitado é o elenco após a primeira janela de transferências de 2026, por país. As fontes necessárias estão bloqueadas (403); a base encontrada de junho de 2026 não atende à referência e não foi aplicada. A alteração completa para jogadores reais e números oficiais de todos os clubes não está concluída. Veja `data/roster-status.json`.

O campo 3D está exclusivamente em **`experimentos/campo-3d.html`**. Permite comparar dois modos da mesma jogada: 22 jogadores e bola em movimento, ou zonas de ataque e bola sem jogadores. Inclui pausa, velocidade, seleção de lances, trajetória e controles de câmera. Além da demonstração, pode acompanhar uma carreira aberta em outra aba do mesmo navegador: lê o save local a cada segundo, sem alterá-lo. Bola e eventos acompanham o registro da partida; as posições individuais são uma animação tática estimada, pois o motor não registra o deslocamento dos 22 atletas. O campo principal continua em 2D. A página experimental não é carregada pelo jogo.

Novos arquivos de hospedagem: `jersey-art.js`, `jersey-lineups.js`, `jersey-lineups.css`, `assets/favicon.svg` e, para a demonstração, `experimentos/campo-3d.html`, `experimentos/campo-3d.css` e `experimentos/campo-3d.js`.

A página de atletas da Série A 2026 indicada pelo usuário na CBF retornou erro de certificado TLS neste ambiente. Nenhum dado foi importado dessa consulta; a conferência histórica dos elencos após a primeira janela continua pendente, conforme `data/roster-status.json`.

## Faltas e cartões

O motor registra faltas e cartões por partida, inclusive nos jogos simultâneos. A frequência base é de aproximadamente 23 faltas por jogo; rivalidades cadastradas elevam a expectativa para 27, e pressão alta aumenta a intensidade. São parâmetros de equilíbrio do jogo, não estatísticas oficiais. Entradas temerárias recebem amarelo, entradas violentas recebem vermelho direto e o segundo amarelo expulsa. Faltas comuns podem terminar sem cartão. Jogadores já advertidos têm menor risco de nova advertência em faltas comuns. Expulsos deixam de atuar, enfraquecem os setores da equipe e não podem ser substituídos. A súmula e as estatísticas mostram as punições e são preservadas no save. Suspensões entre partidas e cartões das copas simuladas em bloco ainda não são implementados.

O protótipo 3D agora separa quem passa, quem recebe e a trajetória da bola, com conduções, inversões, cruzamentos, defesas e finalizações. No modo por zonas, uma ficha mostra o lance, a equipe e o jogador envolvido. As sequências de demonstração são ilustrativas; o modo conectado continua interpretando os eventos do save, sem rastreamento individual real.

## Agenda, torneios e bilheteria

A agenda diferencia competições por cores, adversários pelas duas cores do clube e mando por ícones de casa/avião. Mostra ida e volta quando cadastradas no motor. Clique no dia para ver os detalhes. Adversários e mandos de sorteios futuros aparecem como a definir; não são inventados. O calendário continua sendo uma simulação, não a tabela oficial de datas.

Torneios têm agrupamento por país e busca com filtros de importância, país/região e relação com o clube. Agenda, notícias, mercado e finanças receberam ajustes de espaço e leitura. Em Clube, os preços regulares e de mata-mata podem ser salvos por competição. O motor utiliza esses preços na bilheteria; clássicos e decisões aumentam demanda e tolerância ao preço, limitados à capacidade. Planos antigos sem essa configuração usam o preço geral da carreira.

A Série D **ainda é parcial**: 96 clubes em 16 grupos de seis, dez jogos em ida e volta na fase de grupos; o mata-mata não está integrado e os quatro acessos simulados saem da classificação geral. Isso não reproduz integralmente o regulamento real. A limitação também aparece na tela do torneio.

Números de camisa usam um fundo de contraste e traços maiores também no protótipo 3D. Os dois modos 3D continuam separados, aguardando aprovação do usuário antes da integração. A frequência de cartões foi reduzida, mantendo um aumento moderado em clássicos. O teste de equilíbrio executa 600 partidas com semente fixa para conferir médias e raridade de vermelhos.

## Datas unificadas e análise de campo

O agendador usa uma única agenda do clube para a liga, estadual e copas. Não permite dois compromissos no mesmo dia e reserva no mínimo dois dias entre datas. As datas também conduzem a fila de partidas: os estaduais se intercalam com a liga, e fases posteriores à última rodada nacional continuam disponíveis. Datas planejadas ficam salvas em `seasonCalendar`; resultados e elencos dos saves anteriores são preservados. A rodada da liga mantém seu número enquanto se disputa uma copa entre rodadas.

As janelas de referência de 2026 são parâmetros em `season-calendar.js`, não uma tabela oficial importada ou auditada. Para a Série A, a base começa em 28 de janeiro e termina em 2 de dezembro, com intervalo de 1º de junho a 21 de julho. Estaduais usam janeiro–março; a copa nacional e os continentais recebem janelas próprias. As datas finais são adaptadas aos formatos do motor e aos conflitos; torneios e elencos editados podem estender essas janelas. Anos posteriores reutilizam essa estrutura de referência. Tentativas de consulta à CBF retornaram HTTP 503; páginas da Wikipédia retornaram 403; a busca do ge abriu por HTTPS, mas não entregou os resultados no HTML e o navegador encontrou erro de certificado. Não foi possível conferir uma lista oficial de jogos nesta execução, e nenhuma verificação TLS foi desativada.

O teste `calendar-chronology.cjs` disputa uma temporada completa com vitórias do usuário, verificando a ordem das partidas, intervalos, unicidade das datas e conclusão das copas. O teste estadual passa a conferir sua intercalação com as rodadas nacionais.

Todos os campos usam o verde `#609b35`. O calor 3D foi removido a pedido do usuário. Permanece o mapa padrão, com cores e transições mais suaves. O mapa não representa rastreamento individual de jogadores. Os modos com atletas e zonas continuam experimentais. O laboratório mostra jogador e lance no rodapé; a zona começa na linha de fundo, e o painel segue uma linha horizontal com velocidade limitada, contido na projeção real do campo e com proteção visual da bola, inclusive em 4×. As informações de posse e lance estão maiores e próximas ao gramado.

## Arena PvP — primeira etapa

A tela inicial oferece **Arena**, separada da carreira, em `arena/index.html`. O primeiro modo é um amistoso privado entre duas pessoas. Cada uma começa com os mesmos 24 jogadores, escolhe onze em 4–3–3 e pode trocar titulares por reservas da mesma posição. O limite de força é 850. Nomes vêm da base do jogo; força e números de camisa dessa coleção são parâmetros fictícios, sem alegação de numeração oficial. Uniforme e nome do time são personalizáveis. O perfil usa `futbr_arena_profile_v1`, sem modificar saves de carreira.

Para jogar: um usuário cria o convite e envia o link; o outro abre/cola o convite, gera uma resposta e devolve o código. Quem criou cola a resposta. Com os dois conectados, ambos confirmam o time. O relógio avança aproximadamente um minuto de jogo a cada 0,9 segundo. Os jogadores se movimentam automaticamente; cada treinador define o estilo equilibrado, ofensivo ou defensivo. Placar, bola, jogador envolvido e eventos são compartilhados. Pausa e intervalo exigem confirmação dos dois para continuar. Falha ou perda de conexão interrompe a partida. O resultado do amistoso fica somente no navegador.

A conexão usa um canal WebRTC ordenado e confiável, com troca manual de sinalização e STUN público em `arena/config.js`. Não há serviço de salas ou TURN público provisionado. Algumas redes e NATs não conseguem conexão direta; nesses casos a interface informa a falha e sugere outra rede. A compatibilidade ampla depende de um serviço TURN com credenciais temporárias. Não coloque credenciais permanentes no frontend. Os convites expiram em uma hora. A hospedagem estática do GitHub Pages atende os arquivos, mas não atua como servidor de partidas.

O criador é a autoridade do relógio e da simulação. Mensagens e escalações são validadas; isso **não impede um host modificado de fraudar resultados**. Por isso, a versão é de amistosos sem ranking ou recompensas negociáveis. Antes de incluir loja, cartas compráveis, inventário confiável ou partidas ranqueadas, a próxima etapa precisa de backend com autenticação, simulação/validação de resultados e persistência no servidor. Nenhuma cobrança, loja ou recompensa paga foi implementada nesta etapa.

### Testes PvP

`arena/engine.js` separa as regras da interface e do transporte. `tests/arena-engine.cjs` verifica escalações, posições, orçamento, relógio, intervalo e equilíbrio em 200 partidas. `tests/arena-pvp.cjs` usa dois contextos reais de Chromium e um canal WebRTC real; verifica convite/resposta, confirmação conjunta, sincronização, táticas, pausa, intervalo, fim de jogo, segundo convite, desconexão e isolamento dos dados da carreira.

O Chromium gerenciado deste ambiente bloqueia UDP direto. `tests/setup-turn.py` prepara coturn e três bibliotecas em `/tmp/futbr-coturn` para os testes: valida a assinatura do índice Debian com o chaveiro instalado, verifica SHA256 dos pacotes e mantém TLS habilitado nos downloads. Não altera políticas do navegador nem instala arquivos no sistema. O teste inicia automaticamente seu próprio TURN/TCP em uma porta aleatória de **127.0.0.1**, com credenciais de fixture e permissão de loopback exclusivamente de teste; encerra o processo ao terminar. Esse retransmissor não é acessível ao público e não deve ser usado em produção. O cache é conferido por hash em novas execuções do auxiliar. Em outro sistema, use coturn instalado e `FUTBR_TEST_TURN_BINARY`; sem retransmissor, o teste tenta conexão direta e só pode passar quando a rede/política permitir. Execute `npm run test:pvp` com o servidor estático da porta 8000 ativo.

A janela de transferências aparece como status apenas em Mercado. A agenda mantém as datas de abertura/fechamento. Os textos mais promocionais da página inicial, calendário, clube e notícias foram substituídos por descrições diretas.
