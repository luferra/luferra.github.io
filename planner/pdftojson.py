#!/usr/bin/env python3
"""
pdf_to_json.py
Converte la tabella di allenamento MS3ining (PDF) in JSON
compatibile con Triathlon Planner.

Uso:
    pip install pdfplumber
    python pdf_to_json.py percorso/allenamento.pdf

Output:
    data/settimane.json (aggiornato in merge con eventuali dati esistenti)
"""

import json
import re
import sys
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("Installa pdfplumber: pip install pdfplumber")
    sys.exit(1)


# ── Costanti ──────────────────────────────────────────────────────────────────

GIORNI = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]
OUTPUT_PATH = Path("data/settimane.json")

# Varianti di intestazione colonna → nome giorno canonico
HEADER_VARIANTS = {
    "lun":       "Lunedì",
    "lune":      "Lunedì",
    "lunedì":    "Lunedì",
    "mar":       "Martedì",
    "mart":      "Martedì",
    "martedì":   "Martedì",
    "mer":       "Mercoledì",
    "merc":      "Mercoledì",
    "mercoledì": "Mercoledì",
    "gio":       "Giovedì",
    "giov":      "Giovedì",
    "giovedì":   "Giovedì",
    "ven":       "Venerdì",
    "vene":      "Venerdì",
    "venerdì":   "Venerdì",
    "sab":       "Sabato",
    "sabo":      "Sabato",
    "sabato":    "Sabato",
    "dom":       "Domenica",
    "dome":      "Domenica",
    "domenica":  "Domenica",
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def normalize_header(cell: str) -> str | None:
    """
    Prende il testo grezzo di una cella di intestazione
    e restituisce il nome canonico del giorno (es. 'Lunedì'),
    oppure None se non è un giorno.
    """
    if not cell:
        return None
    key = cell.strip().lower()
    # Prova corrispondenza esatta prima
    if key in HEADER_VARIANTS:
        return HEADER_VARIANTS[key]
    # Prova le prime 3 lettere (gestisce troncamenti nel PDF)
    return HEADER_VARIANTS.get(key[:3])


def clean_cell(text: str) -> str:
    """
    Pulisce il testo estratto da una cella:
    - normalizza spazi multipli e a capo
    - rimuove trattini isolati (separatori di tabella)
    """
    if not text:
        return ""
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"^[-–—]+$", "", text).strip()
    return text


def is_week_range(text: str) -> bool:
    """
    Restituisce True se la stringa sembra un range di settimana.
    Esempi validi: '23-29 MAR', '30 MAR - 5 APR', '6-12 APR'
    """
    pattern = r"\d{1,2}[\s\-–]+\d{0,2}\s*[A-Z]{3}"
    return bool(re.search(pattern, text or "", re.IGNORECASE))


# ── Core ──────────────────────────────────────────────────────────────────────

def extract_weeks_from_pdf(pdf_path: str) -> list[dict]:
    """
    Apre il PDF, trova la tabella principale con i giorni della settimana
    e restituisce una lista di dict nel formato:
        { "range": "23-29 MAR", "days": { "Lunedì": "...", ... } }
    """
    weeks = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            tables = page.extract_tables()
            print(f"  Pagina {page_num}: trovate {len(tables)} tabelle")

            for table_idx, table in enumerate(tables):
                if not table or len(table) < 2:
                    continue

                # ── 1. Individua la riga di intestazione ──────────────────
                # È la riga che contiene almeno 5 nomi di giorni
                header_row_idx = None
                col_map = {}  # { indice_colonna: "Lunedì" | "Martedì" | ... }

                for row_idx, row in enumerate(table):
                    mapped = {}
                    for col_idx, cell in enumerate(row):
                        day = normalize_header(cell or "")
                        if day:
                            mapped[col_idx] = day
                    if len(mapped) >= 5:
                        header_row_idx = row_idx
                        col_map = mapped
                        break

                if header_row_idx is None:
                    # Questa tabella non è quella dell'allenamento, skip
                    continue

                print(f"  → Tabella {table_idx}: intestazione alla riga {header_row_idx}, "
                      f"colonne trovate: {list(col_map.values())}")

                # ── 2. Leggi le righe dati ────────────────────────────────
                # La colonna 0 è sempre "Settimana" (range di date)
                week_col = 0

                for row in table[header_row_idx + 1:]:
                    if not row:
                        continue

                    range_text = clean_cell(
                        row[week_col] if len(row) > week_col else ""
                    )

                    # Salta righe che non iniziano con un range di date valido
                    # (es. note a piè di tabella, righe vuote, ecc.)
                    if not is_week_range(range_text):
                        print(f"    ↳ Riga ignorata (non è una settimana): '{range_text[:40]}'")
                        continue

                    # Costruisce il dict dei giorni per questa settimana
                    days_data = {}
                    for col_idx, day_name in col_map.items():
                        if col_idx < len(row):
                            cell_text = clean_cell(row[col_idx] or "")
                            days_data[day_name] = cell_text if cell_text else "—"

                    if days_data:
                        week_obj = {
                            "range": range_text,
                            "days": {
                                g: days_data.get(g, "—")
                                for g in GIORNI
                                if g in days_data
                            }
                        }
                        weeks.append(week_obj)
                        print(f"    ✓ Settimana aggiunta: {range_text}")

    return weeks


def merge_weeks(existing: list[dict], new_weeks: list[dict]) -> list[dict]:
    """
    Unisce le settimane esistenti con quelle nuove.
    Se una settimana con lo stesso 'range' esiste già, viene sovrascritta
    con i nuovi dati (utile per correzioni).
    Le settimane non toccate rimangono invariate.
    """
    # Usa il range come chiave univoca
    merged = {w["range"]: w for w in existing}
    for w in new_weeks:
        if w["range"] in merged:
            print(f"  ↻ Aggiornata settimana esistente: {w['range']}")
        else:
            print(f"  + Nuova settimana: {w['range']}")
        merged[w["range"]] = w

    return list(merged.values())


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print("Uso: python pdf_to_json.py <file.pdf> [<file2.pdf> ...]")
        print("Esempio: python pdf_to_json.py aprile.pdf maggio.pdf")
        sys.exit(1)

    pdf_files = sys.argv[1:]

    # ── Carica JSON esistente (se presente) ───────────────────────────────
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    existing = []

    if OUTPUT_PATH.exists():
        with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
            try:
                existing = json.load(f)
                print(f"✓ JSON esistente caricato: {len(existing)} settimane\n")
            except json.JSONDecodeError:
                print("⚠ JSON esistente corrotto, verrà sovrascritto\n")

    # ── Elabora ogni PDF passato come argomento ────────────────────────────
    all_new = []
    for pdf_path in pdf_files:
        print(f"→ Elaboro: {pdf_path}")
        if not Path(pdf_path).exists():
            print(f"  ✗ File non trovato: {pdf_path}")
            continue
        try:
            weeks = extract_weeks_from_pdf(pdf_path)
            print(f"  Estratte {len(weeks)} settimane da {pdf_path}\n")
            all_new.extend(weeks)
        except Exception as e:
            print(f"  ✗ Errore durante l'elaborazione: {e}\n")

    if not all_new:
        print("✗ Nessuna settimana estratta. Controlla i PDF.")
        sys.exit(1)

    # ── Merge e salvataggio ────────────────────────────────────────────────
    print("─── Merge ───────────────────────────────────")
    merged = merge_weeks(existing, all_new)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Salvato: {OUTPUT_PATH}")
    print(f"  Settimane totali nel file: {len(merged)}")


if __name__ == "__main__":
    main()
