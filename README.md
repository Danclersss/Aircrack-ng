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
