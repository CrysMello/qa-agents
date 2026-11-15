# Evals — golden set do qa-agents

Use estes arquivos para checar se uma mudança nas skills melhorou ou piorou o agente. Todos os dados são fictícios.

## Como rodar

1. No chat, selecione o agente **qa-senior**.
2. Para cada história em `historias/`, peça: *"Analise, estime e gere os casos de teste para evals/historias/HIST-001.md"*.
3. Compare com `esperado/`:
   - **Casos de teste:** os casos de prioridade Alta do esperado aparecem? A tabela tem as 9 colunas do padrão e a coluna História/ Requisito está preenchida? O "Então" é verificável?
   - **Análise:** as lacunas listadas no esperado foram apontadas, com trecho citado?
   - **Estimativa:** preencha `pontos_estimados` em `esperado/estimativas-reais.csv` e compare com `pontos_reais`.
4. Registre o resultado no PR que alterou a skill.

## Critério sugerido

- Cobertura dos casos de prioridade Alta esperados: ≥ 90%.
- Estimativa: no máximo 1 degrau Fibonacci de diferença do real. Se errar mais com frequência, recalibre `referencias/fatores-complexidade.md` e o script.

Com o tempo, troque estas histórias por histórias reais anonimizadas e registre o esforço real.
