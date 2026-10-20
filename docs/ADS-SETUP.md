# Anúncios opcionais por recompensa

O jogo integra o formato rewarded web do Google Ad Manager. É necessária uma conta aprovada, inventário habilitado e uma unidade rewarded válida. O código sozinho não cria conta, aprovação, demanda publicitária ou receita.

No Render, defina `GOOGLE_REWARDED_AD_UNIT=/ID_DA_REDE/UNIDADE_REWARDED` e faça uma nova implantação. A configuração ativa o carregamento do SDK oficial e os domínios correspondentes na política CSP. O SDK só é carregado depois da escolha explícita do jogador. A recompensa atual é de 35 moedas, até três vezes por dia no horário de Brasília. Fechar cedo, ausência de anúncio ou falha do provedor não concede moedas.

O formato web usa o evento `rewardedSlotGranted` do SDK no navegador. O servidor valida sessão autenticada, proprietário, expiração, idempotência e limite diário, mas isso **não é uma confirmação criptográfica do provedor** e pode ser adulterado por um cliente especializado. Use recompensas pequenas e monitore abuso. Os testes automatizados simulam o contrato do SDK; não comprovam anúncios reais ou pagamento de receita.

Há também adaptador para um provedor com confirmação de servidor: `REWARDED_AD_LAUNCH_URL` HTTPS, `REWARDED_AD_SECRET` com pelo menos 32 caracteres e `REWARDED_AD_PROVIDER`. O provedor precisa aceitar a sessão enviada na URL e chamar POST `/api/ads/callback` com JSON `{session, transaction}`, cabeçalho `X-Reward-Timestamp` em milissegundos e `X-Reward-Signature` hexadecimal HMAC-SHA256 de `timestamp.session.transaction`. A tolerância é cinco minutos. Este adaptador só funciona com integração efetiva do provedor, não com uma URL de vídeo comum.

Sem unidade ou provedor configurado, o botão permanece indisponível e o jogo informa o motivo. Não há anúncios falsos ou temporizador fingindo visualização. Revise consentimento, privacidade e as regras do provedor para seu público antes de ativar publicidade.

## Passo a passo para começar sem pagar hospedagem

1. Continue com o serviço **Web Service / Free** no Render. O arquivo `render.yaml` já usa `plan: free`. Não é necessário GitHub Pages para jogar ou mostrar anúncios. Preserve o banco externo atual; o disco local do Render gratuito não é armazenamento permanente de contas.
2. Crie sua conta de editor na [Google Ad Manager](https://admanager.google.com/home/) com seus dados verdadeiros. O cadastro pode exigir uma conta AdSense ativa. A disponibilidade dos produtos e a aprovação dependem do Google; não há garantia de aprovação apenas por ter um site online.
3. Adicione o domínio do jogo e conclua a análise/verificação solicitada na conta. Se for exigido `ads.txt`, obtenha o texto exato fornecido pelo Google. No Render, crie a variável `ADS_TXT` com o texto completo fornecido pelo Google; o servidor passa a servi-lo em `/ads.txt` após a implantação. Confira esse endereço. Não invente um ID nem use os de outro editor.
4. Depois de habilitado para seu inventário, crie uma unidade de anúncio web que aceite o formato **rewarded**. A configuração pode aparecer em **Inventory / Ad units**. Copie o caminho completo da unidade, parecido com `/123456789/futbr_rewarded`. Um código `ca-pub-...` de AdSense não substitui esse caminho.
5. No Render, abra o serviço **futbr-arena → Environment → Add Environment Variable**. Nome: `GOOGLE_REWARDED_AD_UNIT`. Valor: o caminho completo real da unidade. Salve e implante novamente. Essa variável é um identificador público; não coloque senha da conta Google no Render.
6. Abra **Arena → Loja → Um anúncio, se você quiser**. O jogador escolhe assistir e confirma quando houver inventário. Faça validação com anúncios de teste conforme as ferramentas do Google; não assista nem clique repetidamente em anúncios reais para testar receita.
7. Confira que fechar antes não entrega moedas e concluir entrega uma única recompensa. Ausência de demanda, bloqueadores, dispositivo incompatível ou pendência de aprovação podem impedir exibição mesmo com a variável correta.

As moedas são virtuais, não transferíveis e sem conversão em dinheiro. Se o provedor pedir consentimento ou uma CMP certificada para o público atendido, configure esse requisito antes da ativação. O botão voluntário do jogo não substitui as exigências de privacidade do provedor.


## Criar a conta de editor desde o início

Para receber receita, use **AdSense/Ad Manager**. O produto **Google Ads** serve para pagar por campanhas de publicidade, e não é a conta necessária para este botão de recompensa.

1. Acesse [AdSense](https://adsense.google.com/start/) com sua conta Google, escolha começar e informe seus dados reais, país e o endereço `https://futbr-arena.onrender.com`. Conclua as etapas de cadastro, informações de pagamento e análise exigidas pelo Google. Não envie senhas ou documentos no chat.
2. Na verificação do site, se o Google oferecer **meta tag**, copie o identificador público `ca-pub-` seguido de 16 dígitos. No Render → Environment, configure `GOOGLE_ADSENSE_ACCOUNT` com esse valor e implante novamente. O servidor inclui a meta tag `google-adsense-account` no HTML. Volte ao painel Google para verificar. Se a opção indicada for `ads.txt`, configure `ADS_TXT` com o registro exato fornecido. Não use dados de exemplo.
3. Aguarde o resultado da análise e atenda às solicitações exibidas na sua conta. Cadastro e verificação não garantem aprovação ou exibição de anúncios.
4. Entre no [Google Ad Manager](https://admanager.google.com/home/) com a mesma conta. O fluxo pode exigir AdSense ativo. Configure a rede conforme as instruções apresentadas e habilite inventário web com recompensa quando disponível para sua conta.
5. Crie a unidade rewarded e configure `GOOGLE_REWARDED_AD_UNIT` no Render com o caminho `/numero-da-rede/nome-da-unidade`. Essa unidade é diferente do identificador `ca-pub-...`. Depois da implantação, valide com as ferramentas de teste do Google e confira o botão na Loja.

Não compre campanhas no Google Ads para tentar habilitar monetização. A hospedagem permanece no Render Free; análise, inventário e receita dependem da sua conta e do provedor.
