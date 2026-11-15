# Critérios de complexidade por fator

## Complexidade Funcional
- **Baixa:** até 3 regras de negócio, fluxo linear.
- **Média:** 4–8 regras ou 1–2 fluxos alternativos.
- **Alta:** 9 ou mais regras, múltiplos fluxos, lógica condicional complexa.

## Complexidade Técnica
- **Baixa:** tecnologia conhecida, sem integração ou integração simples documentada.
- **Média:** 1–2 integrações ou tecnologia parcialmente nova para o time.
- **Alta:** múltiplas integrações, tecnologia nova ou massa de dados específica e difícil.

## Automação Reaproveitável
- **Baixa:** nenhuma automação existente.
- **Média:** automação parcial disponível.
- **Alta:** cobertura automatizada significativa que reduz esforço manual.

## Como o script sugere os pontos

Notas: Baixa = 1, Média = 2, Alta = 3.

| Funcional + Técnica | Pontos base |
|---:|---:|
| 2 | 2 |
| 3 | 3 |
| 4 | 5 |
| 5 | 8 |
| 6 | 13 |

- Automação reaproveitável **Alta** reduz um degrau na escala.
- Ajuste manual de no máximo ±1 degrau, sempre justificado (ex.: validação trivial de campo único = 1).
- Horas (quando solicitadas): 1 ponto ≈ 2h; faixa = pontos × 2h até o próximo degrau × 2h.

Calibre esta tabela com o histórico real do time (`evals/esperado/estimativas-reais.csv`).
