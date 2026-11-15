# Heurísticas de varredura

## Campos
- Vazio, só espaços, espaço no início/fim.
- Mínimo, mínimo − 1, máximo, máximo + 1 (valores e tamanho do texto).
- Formato inválido: letras em campo numérico, data impossível (31/02), CEP/CPF com dígito errado.
- Caracteres especiais e acentos: `ç ã é ' " < > &`.
- Colar valor com máscara e sem máscara.
- Moeda: vírgula vs ponto, muitas casas decimais, valor negativo, zero.

## Navegação
- Voltar e avançar (botões da tela e do navegador): os dados se mantêm?
- Recarregar a página (F5) no meio da jornada.
- Duplo clique em botões de ação (gera duplicidade?).
- Abrir a mesma jornada em duas abas.
- Acessar a URL de uma etapa diretamente, pulando as anteriores.

## Regras e cálculos
- Mesma massa, mesmo resultado (calcule duas vezes).
- Alterar um dado e recalcular: o valor muda de forma coerente?
- Combinações de opções que mudam o valor (ex.: coberturas, franquia, parcelamento).
- Datas: hoje, virada de mês/ano, prazos e vigências no limite.
- Parcelamento: soma das parcelas = total?

## Estado e sessão
- Ficar parado alguns minutos e continuar (sessão expirada tratada?).
- Voltar depois de concluir uma etapa calculada.

## Técnico
- Erros no console do navegador.
- Respostas 4xx/5xx e chamadas repetidas desnecessárias.
- Chamadas lentas (> 3 s).
- Dados sensíveis expostos na URL, no console ou na resposta da API (LGPD).

## Interface e acessibilidade básica
- Campo sem rótulo, foco que se perde, navegação só por teclado (Tab/Enter).
- Mensagens de erro claras e próximas do campo.
- Textos cortados ou sobrepostos.
