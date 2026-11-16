---
name: varredura-exploratoria
description: Faz varredura exploratória em uma jornada web de homologação com o navegador (Playwright MCP), usando o mapa da jornada e heurísticas de teste para encontrar bugs, e entrega relatório com passos, severidade e evidências. Use quando pedirem "varredura", "procurar bugs", "teste exploratório", "caçar bugs" ou "verificar a jornada".
---

# Varredura exploratória

## Entrada

- Jornada (precisa de `qa-explorer/<jornada>/mapa.yaml`; se não existir, rode antes `mapear-jornada`).
- Escopo opcional: etapas específicas (ex.: "só pagamento") e tempo/ações máximas.

## Passos

1. Leia o mapa: etapas, `limite_permitido`, `pontos_criticos`, `lacunas` e massa padrão.
2. Monte um plano curto (até 10 linhas): o que vai atacar em cada etapa, começando pelos pontos críticos. Mostre o plano e siga.
3. Explore com o Playwright MCP aplicando `referencias/heuristicas.md`. Durante toda a sessão, monitore console e rede (erros JS, respostas 4xx/5xx, chamadas lentas > 3 s).
4. Ao suspeitar de bug:
   - Reproduza **uma segunda vez** a partir do início da etapa.
   - Reproduziu → **bug**, com print e evidência técnica.
   - Não reproduziu → **suspeita (intermitente)**, com o que foi observado.
5. Use as `lacunas` do mapa como oportunidade: o que der para observar agora, registre.
6. Gere o relatório em `qa-explorer/<jornada>/varreduras/AAAA-MM-DD-relatorio.md` seguindo `templates/relatorio-varredura.md`. Prints em `qa-explorer/<jornada>/evidencias/varredura-AAAA-MM-DD/`.
7. Sugira quais bugs viram caso de teste de regressão.

## Severidade

| Severidade | Critério |
|---|---|
| Crítica | Bloqueia a jornada ou causa erro financeiro (preço, desconto, frete, parcela, prêmio errados) |
| Alta | Regra de negócio errada, perda de dados, erro sem contorno |
| Média | Erro com contorno, validação ausente, mensagem errada |
| Baixa | Cosmético, texto, alinhamento |

## Limites

- No máximo ~120 ações no navegador por varredura; respeite o escopo pedido.
- Nunca passe do `limite_permitido` nem conclua operações reais.
- Não faça testes de carga, segurança ofensiva (injeção, força bruta) ou qualquer ação que possa afetar outros usuários do ambiente.
- Não invente bugs: sem evidência, não é bug.
