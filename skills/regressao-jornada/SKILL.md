---
name: regressao-jornada
description: Grava a linha de base de uma jornada web antes de uma melhoria e, depois, roda a mesma jornada com Playwright Test e compara (telas, estrutura, respostas de API, erros), separando mudanças esperadas de regressões. Use quando pedirem "linha de base", "baseline", "regressão da jornada", "comparar antes e depois", "quebrou alguma coisa?" ou "validar a melhoria".
---

# Regressão de jornada

A IA gera e interpreta; o **Playwright Test executa**, para que antes e depois rodem exatamente o mesmo percurso com a mesma massa.

## Preparação (primeira vez no workspace)

1. Crie `qa-explorer/` se não existir e, dentro dela:
   - copie `templates/playwright.config.ts`;
   - copie `templates/env.example` como `.env.example` e peça ao usuário para criar o `.env` com usuário, senha e URL de homologação (nunca preencha a senha você mesmo);
   - garanta que `.env`, `.resultados/` e `.mcp-saida/` estão no `.gitignore` do projeto.
2. Instale (peça confirmação antes de rodar):
   ```bash
   cd qa-explorer
   npm init -y
   npm install -D @playwright/test
   npx playwright install chromium
   ```

## Modo 1 — Gravar linha de base (antes da melhoria)

1. Leia `qa-explorer/<jornada>/mapa.yaml`. Sem mapa, rode antes `mapear-jornada`.
2. Gere `qa-explorer/<jornada>/jornada.spec.ts` a partir de `templates/jornada.spec.ts`:
   - um `test.step` por etapa do mapa, até o `limite_permitido`;
   - localizadores por papel e rótulo (`getByRole`, `getByLabel`), nunca por CSS frágil;
   - massa vinda de `massa_padrao`;
   - **mascarar** nos prints tudo o que está em `dados_dinamicos`;
   - capturar a resposta das APIs relevantes (ex.: cálculo) com `page.route` + `route.fetch()` (como no modelo), guardando só campos estáveis; não use `waitForResponse` + `json()` quando a página navega logo depois da chamada, porque o corpo se perde;
   - comparar explicitamente os **valores financeiros visíveis** (textos com R$) com `toMatchSnapshot`, porque a comparação de estrutura (`toMatchAriaSnapshot`) generaliza números e não pega troca de valor;
   - chamar `neutralizarDinamicos` antes das comparações de estrutura e de tela;
   - bloquear rotas de operações reais (contratar, finalizar compra, emitir, pagar) como rede de segurança.
3. Rode e grave (peça confirmação):
   ```bash
   cd qa-explorer
   npx playwright test <jornada> --update-snapshots
   ```
4. **Teste de estabilidade:** rode de novo sem `--update-snapshots`. Se falhar sem nada ter mudado, é ruído: ajuste máscaras, esperas ou tolerância e grave de novo. Só considere a linha de base pronta quando duas rodadas seguidas passarem.
5. Atualize `linha_de_base` no `mapa.yaml` (data e versão do sistema, se informada).

## Modo 2 — Comparar (depois da melhoria)

1. Pergunte qual é a **mudança esperada** (o que a melhoria deveria alterar). Isso é obrigatório para classificar as diferenças.
2. Rode:
   ```bash
   cd qa-explorer
   npx playwright test <jornada>
   ```
3. Resuma o resultado com o script (caminho relativo a esta skill):
   ```bash
   python scripts/resumir_resultado.py qa-explorer/.resultados/resultado.json
   ```
4. Para cada diferença, abra as imagens de diferença (`-diff.png`, `-actual.png`) e o trecho de erro, e classifique:
   - **Esperada:** corresponde à mudança informada.
   - **Regressão:** não corresponde à mudança e altera comportamento, valor ou fluxo.
   - **Ruído:** rode só o teste que falhou mais uma vez; se passar, é instabilidade (corrija o script).
5. Gere o relatório em `qa-explorer/<jornada>/regressoes/AAAA-MM-DD-relatorio.md` seguindo `templates/relatorio-regressao.md`.
6. Se tudo o que mudou for esperado, **pergunte** se pode atualizar a linha de base. Só com confirmação: rode com `--update-snapshots` e atualize o `mapa.yaml`.

## Regras

- Nunca atualize a linha de base sem confirmação explícita.
- Diferença em valor financeiro (preço, desconto, frete, parcela, prêmio) que não foi informada como esperada é sempre **regressão crítica** até prova em contrário.
- Cada regressão reportada precisa de evidência: imagem de diferença, valor antes/depois ou erro.
- Credenciais só por `.env`/variáveis de ambiente.
