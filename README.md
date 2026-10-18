# FutBR 2026

Jogo de gestão de futebol inspirado nos managers clássicos. Interface em português, sem cadastro, servidor de aplicação ou dependências de rede durante o jogo.

## Jogar / desenvolver

Requer Python 3. No diretório do projeto:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra a porta 8000 no seu navegador. Também é possível abrir `index.html` diretamente, mas um servidor estático mantém uma origem consistente para o armazenamento local. Para hospedar, publique todos os arquivos de interface: `index.html`, `modern.js`, `modern.css`, `redesign.css`, `match-analysis.js` e `assets/`.

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
