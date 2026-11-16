# Changelog

Todas as mudanças relevantes deste plugin. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento semântico.

## [0.7.1] - 2026-11-16
### Alterado
- Projeto publicado sob a licença MIT.

## [0.7.0] - 2026-11-16
### Alterado
- Agentes renomeados para `qa-analyst` (QA Analyst) e `qa-explorer` (QA Explorer).
- Diretório de artefatos das jornadas renomeado de `qa-jornadas/` para `qa-explorer/`.
- Arquivos e documentação atualizados para refletir os novos nomes.

## [0.6.0] - 2026-11-14
### Alterado
- Plugin renomeado para `qa-agents`.
- Agentes e regras das skills sem amarração a um segmento; checklist de seguros movido para `analise-requisitos/referencias/dominios/seguros.md`, com instruções para adicionar outros domínios.
- `geracao-testes/referencias/tecnicas.md` substitui `tecnicas-e-seguros.md`.
- README reescrito para o GitHub.

## [0.5.0] - 2026-11-14
### Alterado
- Plugin renomeado para `qa-seguros`; nome da empresa removido de agentes, skills, scripts e documentação.
- Servidor MCP renomeado para `qa-mcp` (input do token: `qaMcpToken`).

## [0.4.0] - 2026-11-14
### Adicionado
- Agente `qa-jornada` com regras de segurança (só homologação, limite permitido, login manual, sem atualizar linha de base sem confirmação).
- Skills `mapear-jornada`, `varredura-exploratoria` e `regressao-jornada`.
- Servidor `playwright` (Playwright MCP) no `mcp.json`, restrito por `--allowed-origins`.
- Modelos `playwright.config.ts` (trava de homologação) e `jornada.spec.ts` (API, valores em R$, estrutura e tela).
- Script `resumir_resultado.py` para resumir o resultado JSON do Playwright.

## [0.3.1] - 2026-11-13
### Alterado
- `geracao-testes`: coluna "Quando" passa a trazer os passos detalhados e numerados (tela, campo, valor, botão). Template e exemplos atualizados.

## [0.3.0] - 2026-11-13
### Alterado
- `geracao-testes`: saída em tabela no padrão do time (História/ Requisito | ID | TESTE | Descrição | Precondição | Resultado esperado | Dado | Quando | Então). Exemplos e template atualizados.
- `revisao-cobertura`: usa a coluna História/ Requisito para rastreabilidade.
### Removido
- Prioridade e tabela consolidada da geração de testes (não fazem parte do padrão do time).

## [0.2.0] - 2026-11-13
### Alterado
- `geracao-testes` substituída pelo prompt oficial "Gerador de Casos de Teste" (formato Descrição/Pré-requisito/Dado/Quando/Então/Prioridade). Exemplos e template refeitos nesse formato.
- `analise-requisitos` substituída pelo prompt oficial "Assistente de Refinamento e Análise de Requisitos".
- `estimador-esforco-qa` alinhada ao texto "Estimador de Esforço de QA" (pontos Fibonacci, 3 fatores). Script reescrito.
- Agente `qa-senior` passa a seguir o formato de cada skill.
### Removido
- Template Gherkin `.feature` da geração de testes.

## [0.1.0] - 2026-11-13
### Adicionado
- Agente `qa-senior` (orquestrador).
- Skills: `analise-requisitos`, `geracao-testes`, `estimador-esforco-qa`, `revisao-cobertura`.
- Script determinístico `calcular_estimativa.py` (PERT).
- Configuração do MCP `qa-mcp` (placeholder).
- Golden set inicial em `evals/`.
