from __future__ import annotations
from pathlib import Path
import csv

REPO_ROOT = Path(__file__).resolve().parent
ALBUM_DIR = REPO_ROOT / "album"
IMAGES_DIR = ALBUM_DIR / "images"
CAPTIONS_CSV = ALBUM_DIR / "captions.csv"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

def list_images(images_dir: Path) -> list[str]:
    files = [p.name for p in images_dir.iterdir()
             if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    files.sort(key=str.lower)
    return files

def read_existing(csv_path: Path) -> dict[str, dict[str, str]]:
    """
    captions.csv: filename,title,note
    returns: {filename: {"title":..., "note":...}, ...}
    """
    data: dict[str, dict[str, str]] = {}
    if not csv_path.exists():
        return data

    # Excel で扱いやすい UTF-8 BOM を許容して読む
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            fn = (row.get("filename") or "").strip()
            if not fn:
                continue
            data[fn] = {
                "title": (row.get("title") or "").strip(),
                "note": (row.get("note") or "").strip(),
            }
    return data

def write_csv(csv_path: Path, rows: list[dict[str, str]]) -> None:
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    # Excel 互換のため UTF-8 with BOM で出力
    with csv_path.open("w", encoding="utf-8-sig", newline="") as f:
        fieldnames = ["filename", "title", "note"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

def main() -> None:
    if not IMAGES_DIR.exists():
        raise SystemExit(f"images ディレクトリが見つかりません: {IMAGES_DIR}")

    images = list_images(IMAGES_DIR)
    existing = read_existing(CAPTIONS_CSV)

    # images に存在するものだけを CSV に残す（消した画像の行は自然に落ちる）
    rows: list[dict[str, str]] = []
    added = 0
    for fn in images:
        if fn in existing:
            title = existing[fn]["title"]
            note = existing[fn]["note"]
        else:
            title = ""
            note = ""
            added += 1
        rows.append({"filename": fn, "title": title, "note": note})

    write_csv(CAPTIONS_CSV, rows)

    print(f"[OK] {CAPTIONS_CSV}")
    print(f"  images: {len(images)}")
    print(f"  new rows added (blank captions): {added}")
    print("  Tip: captions.csv を Excel で編集 → generate_album.py を実行")

if __name__ == "__main__":
    main()
