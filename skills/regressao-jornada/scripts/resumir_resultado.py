#!/usr/bin/env python3
"""Resume o relatório JSON do Playwright Test (qa-agents).

Lista, por teste, o status, os passos que falharam, as mensagens de erro
e os anexos (imagens de diferença, trace). Usa só a biblioteca padrão.

Uso:
  python resumir_resultado.py qa-jornadas/.resultados/resultado.json
  python resumir_resultado.py resultado.json --json
"""
import argparse
import json
import re
import sys

ANSI = re.compile(r"\x1b\[[0-9;]*m")


def limpar(texto, limite=600):
    texto = ANSI.sub("", texto or "").strip()
    return texto if len(texto) <= limite else texto[:limite] + " [...]"


def passos_com_erro(passos, prefixo=""):
    for p in passos or []:
        titulo = f"{prefixo}{p.get('title', '')}"
        if p.get("error"):
            yield {"passo": titulo, "erro": limpar(p["error"].get("message", ""))}
        yield from passos_com_erro(p.get("steps"), titulo + " > ")


def percorrer(suites, caminho=()):
    for s in suites or []:
        atual = caminho + ((s.get("title"),) if s.get("title") else ())
        for spec in s.get("specs", []):
            for t in spec.get("tests", []):
                resultados = t.get("results", [])
                ultimo = resultados[-1] if resultados else {}
                yield {
                    "teste": " > ".join(atual + (spec.get("title", ""),)),
                    "projeto": t.get("projectName", ""),
                    "status": ultimo.get("status", t.get("status", "desconhecido")),
                    "duracao_s": round(ultimo.get("duration", 0) / 1000, 1),
                    "erros": [limpar(e.get("message", "")) for e in ultimo.get("errors", [])],
                    "passos_com_erro": list(passos_com_erro(ultimo.get("steps"))),
                    "anexos": [
                        {"nome": a.get("name"), "arquivo": a.get("path")}
                        for a in ultimo.get("attachments", [])
                        if a.get("path")
                    ],
                }
        yield from percorrer(s.get("suites"), atual)


def main():
    ap = argparse.ArgumentParser(description="Resume o resultado JSON do Playwright Test.")
    ap.add_argument("arquivo")
    ap.add_argument("--json", action="store_true", help="saída em JSON")
    args = ap.parse_args()

    try:
        with open(args.arquivo, encoding="utf-8") as fp:
            dados = json.load(fp)
    except (OSError, json.JSONDecodeError) as e:
        print(f"Erro ao ler {args.arquivo}: {e}")
        sys.exit(2)

    testes = list(percorrer(dados.get("suites")))
    stats = dados.get("stats", {})
    resumo = {
        "total": len(testes),
        "passou": sum(t["status"] == "passed" for t in testes),
        "falhou": sum(t["status"] in ("failed", "timedOut", "interrupted") for t in testes),
        "duracao_s": round(stats.get("duration", 0) / 1000, 1),
        "testes": testes,
    }

    if args.json:
        print(json.dumps(resumo, ensure_ascii=False, indent=2))
        return

    print(f"Total: {resumo['total']} | Passou: {resumo['passou']} | Falhou: {resumo['falhou']} | {resumo['duracao_s']} s\n")
    for t in testes:
        icone = "OK " if t["status"] == "passed" else "FALHA"
        print(f"[{icone}] {t['teste']} ({t['status']}, {t['duracao_s']} s)")
        etapas = sorted({p["passo"] for p in t["passos_com_erro"]})
        if etapas:
            print("   Etapas com falha: " + "; ".join(etapas))
        # Com expect.soft, uma etapa pode ter várias diferenças: mostra todas.
        for i, e in enumerate(t["erros"], 1):
            print(f"   - Diferença {i}: {e}")
        for a in t["anexos"]:
            print(f"   - Anexo ({a['nome']}): {a['arquivo']}")
        print()


if __name__ == "__main__":
    main()
