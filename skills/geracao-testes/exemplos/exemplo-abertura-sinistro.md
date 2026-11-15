# Exemplo — Abertura de sinistro auto pelo app

**Requisito (resumo):** O segurado abre um sinistro pelo app informando apólice, data/hora da ocorrência e tipo (Colisão, Roubo, Vidros). Só é permitido para apólice vigente na data da ocorrência. Roubo exige número do B.O.

| História/ Requisito | ID | TESTE | Descrição | Precondição | Resultado esperado | Dado | Quando | Então |
|---|---|---|---|---|---|---|---|---|
| HIST-002 / CA-01 | CT-001 | Colisão com apólice vigente | Verificar que o sinistro de colisão é registrado quando a apólice está vigente na data da ocorrência | Segurado de teste com apólice "AP-TESTE-0001" vigente de 01/01/2026 a 31/12/2026 | Sinistro registrado com status "Aberto" e protocolo | que o segurado está autenticado no app | 1. Tocar em "Sinistros > Abrir sinistro"<br>2. Selecionar a apólice "AP-TESTE-0001"<br>3. Selecionar tipo "Colisão"<br>4. Informar data "10/06/2026" e hora "14:00"<br>5. Tocar em "Confirmar" | o sinistro é registrado com status "Aberto" E o número de protocolo é exibido na tela |
| HIST-002 / CA-02 | CT-002 | Ocorrência antes da vigência | Verificar que o sinistro é bloqueado quando a data da ocorrência é anterior ao início da vigência | Segurado de teste com apólice "AP-TESTE-0001" vigente de 01/01/2026 a 31/12/2026 | Sinistro não registrado e mensagem de apólice não vigente | que o segurado está autenticado no app | 1. Tocar em "Sinistros > Abrir sinistro"<br>2. Selecionar a apólice "AP-TESTE-0001"<br>3. Selecionar tipo "Colisão"<br>4. Informar data "31/12/2025" e hora "14:00"<br>5. Tocar em "Confirmar" | o sinistro não é registrado E a mensagem "Apólice não vigente na data da ocorrência" é exibida |
| HIST-002 / CA-03 | CT-003 | Roubo sem B.O. | Verificar que o sinistro de roubo é bloqueado quando o número do B.O. não é informado | Segurado de teste com apólice vigente | Sinistro não registrado e campo do B.O. sinalizado | que o segurado está autenticado no app | 1. Tocar em "Sinistros > Abrir sinistro"<br>2. Selecionar a apólice vigente de teste<br>3. Selecionar tipo "Roubo"<br>4. Informar data "10/06/2026" e hora "22:00"<br>5. Deixar o campo "Número do B.O." vazio<br>6. Tocar em "Confirmar" | o sinistro não é registrado E a mensagem "Informe o número do boletim de ocorrência" é exibida abaixo do campo "Número do B.O." |

**Resumo**
- Total de casos: 3 (exemplo parcial; o conjunto completo inclui o último dia de vigência e o dia seguinte ao fim)
- Premissas assumidas: texto exato das mensagens; nomes dos menus do app.
- Pontos para validação com negócio/produto: a vigência considera a data ou a data e hora da ocorrência?
