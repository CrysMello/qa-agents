# Exemplo — Cotação de seguro residencial

**Requisito (resumo):** O corretor informa CEP, tipo de imóvel e capital segurado (R$ 50.000,00 a R$ 2.000.000,00). O sistema calcula o prêmio e exibe a cotação válida por 15 dias.

| História/ Requisito | ID | TESTE | Descrição | Precondição | Resultado esperado | Dado | Quando | Então |
|---|---|---|---|---|---|---|---|---|
| HIST-001 / CA-02 | CT-001 | Capital no valor mínimo | Verificar que a cotação é gerada quando o capital segurado é o valor mínimo permitido | Corretor de teste cadastrado e com permissão de cotação residencial | Cotação gerada com prêmio e validade de 15 dias | que o corretor está autenticado no portal do corretor | 1. Acessar o menu "Nova cotação > Residencial"<br>2. Informar CEP "01001-000"<br>3. Selecionar tipo de imóvel "Casa"<br>4. Informar capital segurado "50.000,00"<br>5. Clicar em "Calcular" | a cotação é gerada com número sequencial E o prêmio é exibido com 2 casas decimais E a validade exibida é a data atual + 15 dias |
| HIST-001 / CA-02 | CT-002 | Capital abaixo do mínimo | Verificar que a cotação é bloqueada quando o capital segurado está abaixo do mínimo | Corretor de teste cadastrado e com permissão de cotação residencial | Cotação não gerada e mensagem de capital mínimo exibida | que o corretor está autenticado no portal do corretor | 1. Acessar o menu "Nova cotação > Residencial"<br>2. Informar CEP "01001-000"<br>3. Selecionar tipo de imóvel "Casa"<br>4. Informar capital segurado "49.999,99"<br>5. Clicar em "Calcular" | a cotação não é gerada E a mensagem "Capital segurado mínimo é R$ 50.000,00" é exibida abaixo do campo "Capital segurado" |
| HIST-001 / CA-04 | CT-003 | Cotação expirada | Verificar que a cotação não pode ser convertida em proposta quando passa de 15 dias | Cotação de teste gerada há 16 dias | Proposta não gerada e opção de recalcular disponível | que existe uma cotação com status "Expirada" | 1. Acessar o menu "Minhas cotações"<br>2. Pesquisar a cotação de teste pelo número<br>3. Abrir os detalhes da cotação<br>4. Clicar em "Gerar proposta" | a proposta não é gerada E a mensagem "Cotação expirada. Recalcule para continuar." é exibida E o botão "Recalcular" fica disponível |

**Resumo**
- Total de casos: 3
- Premissas assumidas: texto exato das mensagens de erro; nomes de menus; validade conta em dias corridos a partir da geração.
- Pontos para validação com negócio/produto: regra de arredondamento do prêmio.
