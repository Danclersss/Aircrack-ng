# FutBR 2026

Jogo de gestão de futebol inspirado nos managers clássicos. Interface em português. A carreira funciona sem rede; a Arena tem contas, partidas online, coleção de cartas e progressão do clube.

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

Números de camisa usam um fundo de contraste e traços maiores também no protótipo 3D. Os dois modos aprovados (jogadores e zonas) agora estão integrados à partida oficial, com opção de mapa de calor padrão. A frequência de cartões foi reduzida, mantendo um aumento moderado em clássicos. O teste de equilíbrio executa 600 partidas com semente fixa para conferir médias e raridade de vermelhos.

## Datas unificadas e análise de campo

O agendador usa uma única agenda do clube para a liga, estadual e copas. Não permite dois compromissos no mesmo dia e reserva no mínimo dois dias entre datas. As datas também conduzem a fila de partidas: os estaduais se intercalam com a liga, e fases posteriores à última rodada nacional continuam disponíveis. Datas planejadas ficam salvas em `seasonCalendar`; resultados e elencos dos saves anteriores são preservados. A rodada da liga mantém seu número enquanto se disputa uma copa entre rodadas.

As janelas de referência de 2026 são parâmetros em `season-calendar.js`, não uma tabela oficial importada ou auditada. Para a Série A, a base começa em 28 de janeiro e termina em 2 de dezembro, com intervalo de 1º de junho a 21 de julho. Estaduais usam janeiro–março; a copa nacional e os continentais recebem janelas próprias. As datas finais são adaptadas aos formatos do motor e aos conflitos; torneios e elencos editados podem estender essas janelas. Anos posteriores reutilizam essa estrutura de referência. Tentativas de consulta à CBF retornaram HTTP 503; páginas da Wikipédia retornaram 403; a busca do ge abriu por HTTPS, mas não entregou os resultados no HTML e o navegador encontrou erro de certificado. Não foi possível conferir uma lista oficial de jogos nesta execução, e nenhuma verificação TLS foi desativada.

O teste `calendar-chronology.cjs` disputa uma temporada completa com vitórias do usuário, verificando a ordem das partidas, intervalos, unicidade das datas e conclusão das copas. O teste estadual passa a conferir sua intercalação com as rodadas nacionais.

Todos os campos usam o verde `#609b35`. O calor 3D foi removido a pedido do usuário. Permanece o mapa padrão, com cores e transições mais suaves. O mapa não representa rastreamento individual de jogadores. Os modos com atletas e zonas agora estão disponíveis na partida oficial. O laboratório mostra jogador e lance no rodapé; a zona começa na linha de fundo, e o painel segue uma linha horizontal com velocidade limitada, contido na projeção real do campo e com proteção visual da bola, inclusive em 4×. As informações de posse e lance estão maiores e próximas ao gramado.

## Arena, contas e partidas ranqueadas

A página inicial mostra a última carreira à esquerda e a Arena à direita; a lista de espaços fica em “Minhas carreiras”. O campo oficial usa o renderizador aprovado de jogadores e zonas em perspectiva, com dados da partida ativa. A versão padrão do calor continua disponível.

A Arena tem criação de clube, escolha de uniforme, sorteio inicial por posição, campo vertical com camisas maiores, abertura de pacotes carta a carta, cosméticos e missões. A arte é original FutBR. A coleção atual tem 85 cartas; forças e números são parâmetros de jogo. Na versão local, mantém amistosos por convite WebRTC; o intervalo volta automaticamente após um minuto se ambos continuarem conectados. Amistosos não rendem moedas ou pontos confiáveis.

O servidor `server/server.cjs` acrescenta cadastro/login/recuperação, inventário e saldo persistentes, sorteios no servidor, ranking Elo, matchmaking por pontuação, táticas, substituições, estatísticas, calor e zonas. A simulação ranqueada é controlada pelo servidor. Pausas e intervalo têm limite de um minuto. Compras, missões e resultados são validados no servidor e transacionados; não há dinheiro real. O jogador recebe um código de recuperação ao cadastrar; não há envio/verificação de e-mail. Carreiras podem ser salvas/carregadas na conta e depois sincronizadas automaticamente, com detecção de conflitos entre dispositivos.

**GitHub Pages não executa esse servidor.** Ali permanecem carreira, campos e Arena local; contas/loja/ranking não estão ativados. A configuração `render.yaml` prepara Render Free + Supabase Free + Turnstile Free. As chaves dos provedores ficam nas variáveis privadas do servidor. Não existe serviço pago contratado. Consulte [o guia de publicação e segurança](server/DEPLOY.md) para ativação, requisitos, limites dos planos e proteções implementadas.

Desenvolvimento online: `npm run start:online` (Node 24). `npm run test:online` inicia servidores temporários para testar autenticação, CSRF, compras concorrentes, partidas, recompensas, recuperação, conflitos de sincronização e os fluxos visuais em Chromium. SQLite local foi exercitado; conexão real ao Supabase precisa de credenciais e ainda não foi validada. Uma única instância controla fila/partidas na memória; reinício cancela jogos em andamento sem recompensa. Dados das contas e resultados concluídos persistem no banco externo.

### Testes PvP

`arena/engine.js` separa as regras da interface e do transporte. `tests/arena-engine.cjs` verifica escalações, posições, seis formações, exclusividade de versões, especialistas, relógio, intervalo e equilíbrio em 200 partidas. `tests/arena-pvp.cjs` usa dois contextos reais de Chromium e um canal WebRTC real; verifica convite/resposta, confirmação conjunta, sincronização, táticas, pausa, intervalo, fim de jogo, segundo convite, desconexão e isolamento dos dados da carreira.

O Chromium gerenciado deste ambiente bloqueia UDP direto. `tests/setup-turn.py` prepara coturn e três bibliotecas em `/tmp/futbr-coturn` para os testes: valida a assinatura do índice Debian com o chaveiro instalado, verifica SHA256 dos pacotes e mantém TLS habilitado nos downloads. Não altera políticas do navegador nem instala arquivos no sistema. O teste inicia automaticamente seu próprio TURN/TCP em uma porta aleatória de **127.0.0.1**, com credenciais de fixture e permissão de loopback exclusivamente de teste; encerra o processo ao terminar. Esse retransmissor não é acessível ao público e não deve ser usado em produção. O cache é conferido por hash em novas execuções do auxiliar. Em outro sistema, use coturn instalado e `FUTBR_TEST_TURN_BINARY`; sem retransmissor, o teste tenta conexão direta e só pode passar quando a rede/política permitir. Execute `npm run test:pvp` com o servidor estático da porta 8000 ativo.

A janela de transferências aparece como status apenas em Mercado. A agenda mantém as datas de abertura/fechamento. Os textos mais promocionais da página inicial, calendário, clube e notícias foram substituídos por descrições diretas.

## Notícias e identidade visual

A página de notícias usa uma manchete principal, navegação por editoria e blocos por campeonato. Os registros vêm da carreira; ilustrações originais de estádio e uniformes não são fotografias reais. Filtros e abertura de matérias funcionam também no celular. Os campeonatos receberam emblemas próprios com cores mais vivas, sem pretensão de serem marcas oficiais. A marca FutBR foi centralizada geometricamente no SVG e no cabeçalho móvel.

## Campo estável, agenda e chaveamento

O iframe do campo permanece fora da região de interface recriada a cada atualização: a sessão e a visualização selecionada são preservadas durante a partida. O campo incorporado só fica visível após receber os dados reais, evitando a aparição de uma demonstração ou do modo errado durante o carregamento.

A agenda usa dias livres brancos e dias de jogo coloridos por competição, com emblema do campeonato, mini escudo do adversário e indicação de mando. Os mini escudos também acompanham os nomes nas tabelas, partidas, escalações e carreiras. São interpretações gráficas originais das cores e formatos dos clubes, com versões específicas para os principais times; não são arquivos oficiais dos escudos. Clubes menores ou personalizados usam uma composição pelas cores e sigla cadastradas.

O mata-mata mostra fases em colunas, ida/volta, agregado, decisão por pênaltis, classificados e campeão. Conexões só ligam confrontos já conhecidos, pois o motor pode sortear novamente na fase seguinte. Novas partidas guardam dados estruturados do chaveamento; históricos antigos recuperam os resultados disponíveis sem alterar placares ou progresso. A visualização tem rolagem própria para torneios grandes e navegação por fase.

### Arena: clube, cartas e divisões

O login pode ser aberto na página inicial e na Arena. Na versão online, cadastre-se, guarde o código de recuperação, crie o clube e abra o elenco inicial com 18 cartas. A carreira local continua independente; salvar/carregar carreiras na conta é uma ação explícita para evitar sobrescrever um save de outro aparelho.

A coleção contém 85 cartas, entre jogadores do elenco inicial, estrelas atuais, ídolos aposentados e edições de auge. Atributos e forças são estimativas do jogo. Versões diferentes da mesma pessoa podem coexistir na coleção, mas apenas uma pode ocupar os onze. A escalação automática respeita posição, formação e essa restrição; seis formações, pressão, construção e postura alteram o plano de jogo. Capitão e cobradores de pênaltis, faltas, escanteios e laterais usam atributos próprios; a interface sugere os melhores especialistas. O álbum permite buscar cartas e filtrar categorias.

A loja oferece três pacotes com probabilidades por carta visíveis antes da compra e sorteio no servidor. A abertura rompe o lacre e revela cartas individualmente, com opção de pular. Repetidas agora ficam guardadas: cinco cópias extras podem ser trocadas por um pacote do clube, preservando a primeira cópia. Compras usam apenas moedas do jogo. Contas antigas mantêm clubes, coleção e saldo; a migração ocorre sem reiniciar progresso.

Amistosos online usam salas com código de oito caracteres. Quem recebe o convite entra na mesma partida, com início automático após até 15 segundos de preparação e intervalo de até um minuto. Amistosos ficam no histórico e não concedem recompensas de ranqueada. A conexão direta WebRTC continua disponível como alternativa local avançada.

Novas contas começam na divisão J, seguindo I, H, G, F, E, D, C, B e A. Vitória rende 35 pontos, empate 12 e derrota retira 15, sem saldo negativo; promoções dão uma recompensa única. O matchmaking usa desempenho Elo para buscar adversários próximos. Missões diárias, semanais e marcos concedem moedas uma vez por período, com renovação pelo horário de Brasília. A classificação mostra apenas contas com partidas ranqueadas concluídas.

`npm run test:online` verifica TLS, contas, migração, economia, trocas, missões, amistosos por código, ranking, mapas estáveis e fluxos da interface em dois navegadores. A simulação de 200 partidas e formações está em `node tests/arena-engine.cjs`. Os testes usam bancos temporários, sem acessar contas de produção.

### Campo compartilhado e amistoso rápido

A Arena usa o mesmo iframe persistente da carreira nos modos jogadores e zonas. Somente os dados mudam; o documento e as camisas permanecem montados. O renderizador integrado usa um único relógio de animação e uma superfície Canvas 2D para pintar o campo em perspectiva, as camisas e a bola juntos, evitando interseções e repinturas de camadas 3D. Antes da saída de bola, as duas equipes ficam no próprio campo. As cores são comparadas antes da exibição; se houver conflito, o visitante usa sua cor secundária ou um uniforme reserva de alto contraste. Isso não altera o uniforme salvo do clube.

Na pausa e no intervalo, toque no titular e depois no reserva para substituir. A lista mostra apenas posições compatíveis e impede duas versões do mesmo atleta. O painel conserva a seleção durante as atualizações. As seis formações podem ser alteradas na preparação e nas pausas: antes do início não gastam substituições; durante a partida, entradas necessárias contam no limite de cinco.

O amistoso rápido procura primeiro outro jogador. Buscas sem adversário após 20 segundos iniciam um treino claramente identificado contra bot; também vale como alternativa quando a fila ranqueada está vazia. Esse treino não concede pontos, moedas ou progresso em missões ranqueadas. Ele entra no histórico com o modo `bot`, separado dos jogos contra pessoas. O bot não possui uma conta, não aparece no ranking e confirma automaticamente o intervalo. Os testes usam prazos reduzidos apenas no ambiente local.

A abertura de pacote usa Web Animations no desktop e no celular, com alternativa imediata para movimento reduzido. `tests/match-experience.cjs` verifica animação em execução, centralização das cartas, busca e treino sem recompensas, posição antes do início, uniforme alternativo, mudança de formação, substituição em dois toques e permanência dos mesmos jogadores/documento entre atualizações.

### Estabilidade visual e ritmo independente

O vídeo de regressão mostrou oscilação mesmo aos 90 minutos, com a partida encerrada. Nos campos integrados, gramado, camisas, bola e sobreposições agora são pintados em uma única superfície Canvas 2D, mantendo a projeção do campo. As camisas vetoriais são rasterizadas uma vez por uniforme/número. Cenas paradas já estabilizadas não são repintadas; alterações de câmera, tamanho, uniforme e modo invalidam essa composição. O laboratório independente mantém seus controles e sua comparação original.

O relógio online e o amistoso local avançam por padrão um minuto simulado a cada 450 ms, metade do intervalo anterior: aproximadamente 40,5 segundos de bola rolando por partida completa, além de preparação, pausas e intervalo. A duração máxima do intervalo continua em um minuto. O resumo por zonas tem ritmo independente: exibe um lance por cerca de dois segundos, interpola o movimento em 1,4 s e agrupa atualizações intermediárias, sem formar uma fila atrasada de lances. Pausa, intervalo e fim de jogo são reconhecidos imediatamente.

Na Arena, os três mapas usam o mesmo iframe e a mesma área no desktop e no celular. O calor permanece no formato plano padrão e não usa mais um campo separado que expandia a página. O botão ativo recebe a mesma cor verde e `aria-pressed=true` nos três modos.

`tests/field-playback.cjs` reproduz o placar final do vídeo, confirma camisas visíveis, compara pixels em quadros consecutivos, verifica as três dimensões e os botões ativos, e submete o resumo por zonas a atualizações mais rápidas que a apresentação. Os testes não acessam contas ou partidas de produção.


## Jornada do clube

Na Arena, abra **Jornada** para disputar a Copa do Bairro contra cinco clubes virtuais. Uma vitória desbloqueia a próxima etapa; empates e derrotas permitem tentar novamente. A primeira vitória de cada etapa rende moedas e XP. A terceira e a quinta também rendem um Pacote do clube, aberto pela própria Jornada. Repetir etapas não concede novos prêmios e a Copa não altera o ranking nem as missões ranqueadas.

O nível do clube é cosmético: a Copa e partidas entre jogadores dão XP, sem aumentar atributos das cartas. Treinos automáticos de espera não dão XP. A aba reúne troféus e os últimos vinte resultados (exibindo os oito mais recentes). Os prêmios são validados no servidor e gravados junto com o resultado; o resgate de pacote consome um bilhete uma única vez.

Esses recursos exigem o servidor online (`npm run start:online`, Node 24+) e uma conta. A versão estática continua atendendo a carreira local.

Validação específica: `npm run test:journey`. Inclui bloqueio de etapas, prêmios únicos, resgates concorrentes e navegação em computador/celular. A suíte `npm run test:online` também executa esses testes.


## Identidade visual e música

A tela inicial reúne um estádio ilustrado, a última carreira e a entrada da Arena. Os escudos dos clubes são interpretações vetoriais das cores e formas de suas identidades, sem depender de imagens externas; não são artes oficiais.

Em **Arena → Meu time → Editar clube, uniforme e escudo**, combine três formatos, quatro padrões, três emblemas e uma paleta fixa. O escudo não aceita imagens, URLs, SVGs, texto ou coordenadas livres. As escolhas são validadas pelo mesmo módulo no navegador e no servidor e acompanham o time na conta, nas cartas e nas partidas. Times antigos recebem um escudo padrão.

O controle **Música**, no canto inferior direito, permite desligar a trilha e ajustar o volume entre 0 e 65%. A playlist tem dez instrumentais originais com passagem automática e controles de faixa. Ela começa em 28% após a primeira interação, respeitando as regras de reprodução do navegador, e pausa ao ocultar a aba. As preferências ficam neste navegador. A música é sintetizada localmente com Web Audio, sem arquivos externos ou faixas de terceiros.

`npm run test:identity` verifica criação e persistência de escudos, rejeição de entradas livres, cobertura dos escudos dos clubes, layouts responsivos e preferências da música.


## Ligas sul-americanas e europeias

O catálogo possui 71 ligas jogáveis: as dez associações sul-americanas e 53 associações europeias, além das divisões inferiores já existentes. O arquivo `data/world-leagues.js` concentra os países, clubes, cores, modelos de camisa e cotas de acesso. A composição é uma base de referência editável, sem atualização oficial em tempo real; clubes sem elenco cadastrado recebem jogadores gerados.

As novas carreiras têm copa nacional e classificação para Libertadores/Sul-Americana ou Champions/Europa League. A primeira temporada usa a força dos clubes; as seguintes usam a classificação final salva de cada liga. As eliminatórias em jogo único reduzem os classificados a 32, com folgas para os melhores cabeças de chave, antes dos oito grupos e do mata-mata. Campeões continentais entram na competição principal; o campeão da copa nacional ocupa uma vaga da associação quando necessário. O formato de oito grupos, as cotas e os coeficientes são adaptações do jogo, não uma reprodução das listas oficiais de acesso ou da fase de liga atual da UEFA.

Liechtenstein tem copa, mas não possui liga nacional própria; não foi criada uma liga fictícia. A Rússia não integra o acesso continental desta base. Países de outras confederações americanas não foram incluídos na Libertadores/Sul-Americana.

Carreiras em andamento preservam as copas e os resultados atuais. As novas ligas são acrescentadas ao mundo ao carregar; o novo acesso continental entra na próxima temporada. Pacotes antigos do editor recebem as novas ligas sem perder os clubes personalizados. A agenda mantém dias sem jogo brancos, diferencia abertura/fechamento da janela e permite rolagem horizontal no celular para preservar o tamanho dos textos.

Validação: `npm run test:world` cobre início de carreira nas 63 associações, eliminatórias humanas e automáticas, grupos, mata-mata, unicidade de clubes, migrações e qualificação entre temporadas.

### Contas, recompensas e anúncios opcionais

A Arena não possui mais checkout ou venda de pacotes com dinheiro real. O pacote especial permanece reservado. A integração de anúncios rewarded exige configuração de inventário de um provedor aprovado: [instruções de anúncios](docs/ADS-SETUP.md). A [administração restrita](docs/ADMIN-SETUP.md) permite listar contas com dados mascarados e entregar prêmios por bugs, com segundo fator e perfis cifrados quando a chave do servidor estiver configurada. Veja também [hospedagem com repositório privado](docs/MONETIZATION.md).
