# HIST-002 — Abertura de sinistro auto pelo app

**Como** segurado
**Quero** abrir um sinistro pelo app
**Para** iniciar o atendimento sem ligar para a central

## Critérios de aceite
- CA-01: O segurado seleciona a apólice e informa data/hora e tipo da ocorrência (Colisão, Roubo, Vidros).
- CA-02: Só é permitido abrir sinistro se a apólice estiver vigente na data da ocorrência.
- CA-03: Para Roubo, o número do boletim de ocorrência é obrigatório.
- CA-04: Ao concluir, o segurado recebe um número de protocolo e o sinistro fica com status "Aberto".
- CA-05: O app deve funcionar em iOS e Android e consultar o sistema de sinistros e o de apólices.
