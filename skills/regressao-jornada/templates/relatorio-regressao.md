# Regressão — <jornada>

- **Data:** AAAA-MM-DD
- **Ambiente:** homologação (<URL>)
- **Linha de base:** gravada em AAAA-MM-DD (versão <x>)
- **Mudança esperada informada:** <texto do usuário>

## Veredito

✅ Sem regressões / 🔴 Regressões encontradas / 🟡 Só mudanças esperadas (atualizar linha de base?)

## Etapas

| Etapa | Resultado | Observação |
|---|---|---|
| E1 - <nome> | ✅ Igual | |
| E2 - <nome> | 🟡 Esperada | <o que mudou> |
| E3 - <nome> | 🔴 Regressão | <o que quebrou> |

## Regressões

### REG-01 — <título>
- **Etapa:** E<n>
- **Severidade:** Crítica / Alta / Média / Baixa
- **Antes:** <valor/tela/estrutura da linha de base>
- **Depois:** <valor/tela/estrutura atual>
- **Evidências:** `<caminho do -diff.png / -actual.png>`, `<trecho do erro>`
- **Por que não é a mudança esperada:** ...

## Mudanças esperadas confirmadas
- ...

## Ruído (instabilidade)
- <teste que falhou e passou na repetição; ajuste sugerido no script>

## Próximos passos
- Corrigir regressões / atualizar linha de base (somente com confirmação).
