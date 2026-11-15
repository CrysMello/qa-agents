# Apoio à identificação de cenários

Use como checklist para não esquecer cenários. O formato de saída continua sendo o do SKILL.md.

## Técnicas

| Técnica | Quando usar | Exemplo |
|---|---|---|
| Partição de equivalência | Campos com classes de valores válidos/inválidos | Tipo de imóvel: Casa, Apartamento, inválido |
| Valor-limite | Números, datas, tamanhos | Capital mínimo, mínimo − 0,01, máximo, máximo + 0,01 |
| Tabela de decisão | Regras combinadas | Cobertura × franquia × perfil do segurado |
| Transição de estados | Status com fluxo | Sinistro: Aberto → Em análise → Indenizado / Negado |
| Negativos | Entradas inválidas, permissões, falhas | Campo obrigatório vazio, perfil sem acesso, integração fora |

## Pontos que costumam ser esquecidos (qualquer domínio)

- Datas: virada de dia, mês e ano, fuso horário, feriados.
- Valores monetários: arredondamento, zero, negativo, muitas casas decimais.
- Duplicidade: clicar duas vezes, enviar o mesmo formulário duas vezes.
- Concorrência: duas pessoas alterando o mesmo registro.
- Sessão expirada no meio do fluxo.
- Dados pessoais (LGPD): mascaramento em telas, logs e e-mails.

Para pontos específicos do negócio (ex.: seguros), veja os checklists em `skills/analise-requisitos/referencias/dominios/`.
