#!/usr/bin/env python3
"""Sugestão determinística de pontos Fibonacci para esforço de QA (qa-agents).

Entrada: complexidade funcional, técnica e automação reaproveitável (baixa/media/alta).
Saída: JSON com pontos sugeridos e, opcionalmente, faixa em horas (1 ponto ~ 2h).
Usa somente a biblioteca padrão.

Exemplos:
  python calcular_estimativa.py --funcional media --tecnica baixa --automacao baixa
  python calcular_estimativa.py --funcional alta --tecnica media --automacao alta --horas
  python calcular_estimativa.py --funcional baixa --tecnica baixa --automacao baixa --ajuste -1
"""
import argparse
import json
import sys
import unicodedata

ESCALA = [1, 2, 3, 5, 8, 13]
NIVEIS = {"baixa": 1, "media": 2, "alta": 3}
BASE_POR_SOMA = {2: 2, 3: 3, 4: 5, 5: 8, 6: 13}
HORAS_POR_PONTO = 2


def normalizar(valor):
    sem_acento = unicodedata.normalize("NFKD", valor).encode("ascii", "ignore").decode()
    return sem_acento.strip().lower()


def nivel(nome, valor):
    v = normalizar(valor)
    if v not in NIVEIS:
        raise ValueError(f"{nome} deve ser baixa, media ou alta (recebido: {valor!r})")
    return v


def calcular(funcional, tecnica, automacao, ajuste=0, horas=False):
    soma = NIVEIS[funcional] + NIVEIS[tecnica]
    base = BASE_POR_SOMA[soma]
    idx = ESCALA.index(base)
    regras = [f"funcional {funcional} + tecnica {tecnica} = {soma} -> {base} pontos"]

    if automacao == "alta":
        idx -= 1
        regras.append("automacao reaproveitavel alta: -1 degrau")
    if ajuste:
        idx += ajuste
        regras.append(f"ajuste manual: {ajuste:+d} degrau (justificar)")

    idx = max(0, min(idx, len(ESCALA) - 1))
    pontos = ESCALA[idx]

    resultado = {
        "fatores": {
            "complexidade_funcional": funcional,
            "complexidade_tecnica": tecnica,
            "automacao_reaproveitavel": automacao,
        },
        "pontos_sugeridos": pontos,
        "escala": "Fibonacci (1, 2, 3, 5, 8, 13)",
        "regras_aplicadas": regras,
    }
    if horas:
        proximo = ESCALA[min(idx + 1, len(ESCALA) - 1)]
        resultado["faixa_horas"] = f"{pontos * HORAS_POR_PONTO}-{proximo * HORAS_POR_PONTO}h"
        resultado["premissa_horas"] = "1 ponto ~ 2h de teste"
    if pontos == 13:
        resultado["alerta"] = "escopo provavelmente deveria ser quebrado; estimativa altamente incerta"
    return resultado


def main():
    parser = argparse.ArgumentParser(description="Sugere pontos Fibonacci de esforço de QA.")
    parser.add_argument("--funcional", required=True, help="baixa | media | alta")
    parser.add_argument("--tecnica", required=True, help="baixa | media | alta")
    parser.add_argument("--automacao", default="baixa", help="automacao reaproveitavel: baixa | media | alta")
    parser.add_argument("--ajuste", type=int, default=0, choices=[-1, 0, 1], help="ajuste manual de um degrau")
    parser.add_argument("--horas", action="store_true", help="inclui faixa em horas")
    args = parser.parse_args()

    try:
        f = nivel("funcional", args.funcional)
        t = nivel("tecnica", args.tecnica)
        a = nivel("automacao", args.automacao)
    except ValueError as e:
        print(json.dumps({"erro": str(e)}, ensure_ascii=False))
        sys.exit(2)

    print(json.dumps(calcular(f, t, a, args.ajuste, args.horas), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
