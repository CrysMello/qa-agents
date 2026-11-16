---
name: mapear-jornada
description: Percorre uma jornada web em homologação com o navegador (Playwright MCP) e gera o mapa da jornada em YAML com etapas, campos, validações, ações, chamadas de API, valores de referência, dados dinâmicos, pontos críticos e lacunas. Use quando pedirem "mapear jornada", "documentar fluxo", "conhecer a jornada" ou antes de varredura e regressão.
---

# Mapear jornada

## Entrada

- Nome da jornada (kebab-case, ex.: `cotacao-residencial`), URL inicial de homologação e, se houver, a massa de teste.
- Se faltar a URL ou a massa, pergunte antes de abrir o navegador.

## Passos

1. Confirme que a URL é de homologação. Se não for, pare.
2. Abra a URL com o Playwright MCP. Se pedir login, peça ao usuário para entrar manualmente e aguarde.
3. Defina o `limite_permitido` (última tela antes de qualquer ação que conclua operação real) e confirme com o usuário.
4. Percorra o **caminho feliz** com a massa padrão até o limite. Em cada etapa registre:
   - URL, nome da etapa e print (`evidencias/<ID>-<nome>.png`).
   - Campos: nome, tipo, obrigatoriedade, máscara, opções e efeitos (ex.: preenche cidade).
   - Botões e para onde levam (incluindo Voltar: mantém os dados?).
   - Mensagens exibidas.
   - Chamadas de API disparadas (método, rota, status) e erros de console.
   - Valores calculados exibidos (ex.: preço, frete, desconto, prêmio) com a massa usada.
5. Descubra as validações de cada campo com testes rápidos: vazio, inválido, limite mínimo e máximo. Registre a mensagem exata. (Não é varredura completa: um teste por validação.)
6. Identifique **dados dinâmicos** (mudam a cada execução: número de pedido, cotação ou protocolo, datas, horários, tokens).
7. Liste **pontos críticos** (cálculos, regras financeiras, transições de estado, navegação que pode perder dados).
8. Separe o que foi **observado** na tela do que é **suposição**; liste as **lacunas** (o que não deu para ver ou testar).
9. Gere `qa-explorer/<jornada>/mapa.yaml` seguindo `templates/mapa-jornada.yaml` e o nível de detalhe de `exemplos/cotacao-residencial-mapa.yaml`.

## Limites

- No máximo ~60 ações no navegador por mapeamento. Se a jornada for maior, mapeie até onde der e liste o restante como lacuna.
- Nunca passe do `limite_permitido`.
- Não registre dados pessoais reais nem senhas no mapa.

## Resposta no chat

```
### Jornada mapeada: <nome> (homologação)
- Etapas encontradas, até onde foi mapeado
- Nº de campos, validações observadas e chamadas de API
- Valores de referência com a massa padrão
- Pontos críticos e lacunas para confirmar
- Arquivos gerados
- Próximo passo sugerido
```
