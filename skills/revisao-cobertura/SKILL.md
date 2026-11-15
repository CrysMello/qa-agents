---
name: revisao-cobertura
description: Revisa a cobertura de testes cruzando critérios de aceite com casos de teste numa matriz de rastreabilidade e aponta buracos (requisitos sem teste, falta de negativos e valores-limite). Use quando pedirem "revisar cobertura", "matriz de rastreabilidade", "faltou algum teste?" ou após gerar casos de teste.
---

# Revisão de cobertura

## Passos

1. Reúna os critérios de aceite do requisito (ou os sugeridos na análise) e numere-os CA-01, CA-02...
2. Reúna os casos de teste (CT-001...). Use a coluna **História/ Requisito** de cada caso para associá-lo aos CAs. Se a coluna estiver vazia ou genérica, associe pela Descrição e pelo Dado/Quando/Então e sinalize isso como ponto de atenção.
3. Monte a matriz usando `templates/matriz-rastreabilidade.md`.
4. Verifique:
   - Critério de aceite sem nenhum teste.
   - Teste sem critério de aceite (pode ser regra não documentada: vire pergunta ao PO).
   - Critério só com teste positivo (falta negativo).
   - Campos numéricos/datas sem valor-limite.
   - Estados sem transições proibidas testadas.
   - Riscos altos da análise sem nenhum caso de teste.
5. Dê uma nota de cobertura: Boa / Parcial / Insuficiente, com o motivo.
6. Liste os casos que faltam (História/ Requisito + TESTE + Descrição no formato "Verificar que... quando..."), prontos para a skill `geracao-testes`.

## Formato de saída

```
### Matriz de rastreabilidade
### Buracos encontrados
### Nota de cobertura
### Casos sugeridos para completar
```

Sempre responda em Português (Brasil).
