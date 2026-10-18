# Participantes estaduais

`state-clubs.js` contém uma **base de trabalho**, organizada em 27 campeonatos de primeira divisão. A participação por edição está **pendente de conferência com as federações**. A edição sugerida é 2026, mas o arquivo não deve ser descrito como uma relação oficial ou comprovadamente completa dos participantes de 2026.

Durante esta implementação, as consultas às federações paulista, carioca e mineira e à Wikipédia foram bloqueadas pelo proxy de rede (403). As bases públicas OpenFootball e FootballCSV consultadas cobrem as séries nacionais, não resolvendo a conferência estadual. Elas não foram utilizadas como comprovação de participação estadual.

As referências de nomes já existentes no jogo são reutilizadas, preservando seus IDs. Os novos clubes recebem IDs próprios. Força, capacidade dos estádios, finanças e elencos gerados são valores de simulação, não informações oficiais.

A primeira fase do motor é um turno completo seguido de semifinais e final. Este é o formato simplificado do jogo, não a reprodução dos regulamentos diferentes das 27 federações. O calendário inclui folgas quando o número de participantes é ímpar.

O editor permite ajustar participantes, nomes e elencos de cada estadual, com as mesmas funções de salvar/importar/exportar pacotes. Não altera retroativamente as competições das carreiras que já começaram.
