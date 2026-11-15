# Esperado — HIST-001 (referência)

## Casos mínimos (prioridade Alta é obrigatória)

| Ref. | Descrição esperada | CA | Prioridade |
|---|---|---|---|
| E-01 | Verificar que a cotação é gerada quando o capital é R$ 50.000,00 | CA-02 | Alta |
| E-02 | Verificar que a cotação é bloqueada quando o capital é R$ 49.999,99 | CA-02 | Alta |
| E-03 | Verificar que a cotação é gerada quando o capital é R$ 2.000.000,00 | CA-02 | Alta |
| E-04 | Verificar que a cotação é bloqueada quando o capital é R$ 2.000.000,01 | CA-02 | Alta |
| E-05 | Verificar que o prêmio difere quando o tipo é Casa vs Apartamento no mesmo CEP | CA-03 | Alta |
| E-06 | Verificar que o prêmio difere quando os CEPs são de regiões distintas | CA-03 | Alta |
| E-07 | Verificar que a cotação é bloqueada quando o CEP é inválido | CA-01 | Média |
| E-08 | Verificar que a cotação é bloqueada quando campos obrigatórios estão vazios | CA-01 | Média |
| E-09 | Verificar que a cotação é convertida em proposta quando está no 15º dia | CA-04 | Alta |
| E-10 | Verificar que a conversão é bloqueada quando a cotação está no 16º dia | CA-04 | Alta |

## Lacunas que a análise deve apontar
- Regra de arredondamento do prêmio.
- Validade em dias corridos ou úteis, e a partir de quando conta.
- Comportamento quando o CEP não tem tarifa cadastrada.
- Mensagens de erro não especificadas.
- Quem pode gerar cotação (perfis/permissões).
