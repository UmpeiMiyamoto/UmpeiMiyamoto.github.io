from __future__ import annotations
from pathlib import Path
import csv
from datetime import datetime

REPO_ROOT = Path(__file__).resolve().parent
ALBUM_DIR = REPO_ROOT / "album"
IMAGES_DIR = ALBUM_DIR / "images"
CAPTIONS_CSV = ALBUM_DIR / "captions.csv"
OUT_HTML = ALBUM_DIR / "index.html"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

def load_captions(csv_path: Path) -> dict[str, dict[str, str]]:
    """
    captions.csv: filename,title,note
    returns: { "200307a.jpg": {"title": "...", "note": "..."} , ... }
    """
    captions: dict[str, dict[str, str]] = {}
    if not csv_path.exists():
        return captions

    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            fn = (row.get("filename") or "").strip()
            if not fn:
                continue
            captions[fn] = {
                "title": (row.get("title") or "").strip(),
                "note": (row.get("note") or "").strip(),
            }
    return captions

def list_images(images_dir: Path) -> list[Path]:
    files = [p for p in images_dir.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    # ファイル名順（例：200307a, 200307b... が自然順になる）
    files.sort(key=lambda p: p.name.lower())
    return files

def figure_block(filename: str, title: str, note: str) -> str:
    # キャプションが未登録ならプレースホルダ（後で captions.csv を埋める）
    title_html = title if title else "（キャプション未入力）"
    note_html = note if note else ""
    note_span = f'\n        <span class="cap-note">{escape_html(note_html)}</span>' if note_html else ""
    return f"""\
    <figure>
      <a class="thumb" href="images/{escape_attr(filename)}">
        <img src="images/{escape_attr(filename)}" alt="{escape_attr(Path(filename).stem)}" loading="lazy">
      </a>
      <figcaption>
        <span class="cap-title">{escape_html(title_html)}</span>{note_span}
      </figcaption>
    </figure>
"""

def escape_html(s: str) -> str:
    return (s.replace("&", "&amp;")
             .replace("<", "&lt;")
             .replace(">", "&gt;")
             .replace('"', "&quot;"))

def escape_attr(s: str) -> str:
    # 属性用（最低限）
    return escape_html(s).replace("'", "&#39;")

def build_html(figures: str, generated_iso: str) -> str:
    # lastModified は「閲覧者のブラウザで見たファイル更新日時」なので、
    # 生成時刻も明示しておくのが実務上わかりやすいです。
    return f"""<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>アルバム</title>
  <style>
    :root {{ --gap: 10px; --max: 1100px; }}

    body {{
      margin: 0;
      font-family: system-ui, -apple-system, "Hiragino Sans", "Noto Sans JP", sans-serif;
      background: #fff;
      color: #111;
    }}

    header {{
      max-width: var(--max);
      margin: 24px auto 8px;
      padding: 0 16px;
    }}
    h1 {{ font-size: 1.2rem; margin: 0; font-weight: 600; }}
    p  {{ margin: 8px 0 0; font-size: 0.95rem; color: #444; }}

    .grid {{
      max-width: var(--max);
      margin: 0 auto 32px;
      padding: 0 16px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--gap);
    }}
    @media (max-width: 900px) {{ .grid {{ grid-template-columns: repeat(2, 1fr); }} }}
    @media (max-width: 520px) {{ .grid {{ grid-template-columns: 1fr; }} }}

    figure {{
      margin: 0;
      border-radius: 12px;
      overflow: hidden;
      background: #f4f4f4;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }}

    a.thumb {{
      display: block;
      text-decoration: none;
      color: inherit;
    }}

    img {{
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
      transform: scale(1);
      transition: transform .12s ease-in-out;
    }}
    a.thumb:hover img {{ transform: scale(1.02); }}

    figcaption {{
      padding: 8px 10px 10px;
      font-size: 0.92rem;
      line-height: 1.35;
      background: #fff;
      border-top: 1px solid rgba(0,0,0,.06);
    }}

    .cap-title {{ font-weight: 600; display: block; }}
    .cap-note  {{ color: #444; font-size: 0.9em; display: block; margin-top: 2px; }}

    footer {{
      max-width: var(--max);
      margin: 0 auto 40px;
      padding: 0 16px;
      color: #444;
      font-size: 0.92rem;
    }}
  </style>
</head>

<body>
  <header>
    <h1>アルバム</h1>
    <p>サムネイルをクリックすると画像ファイルを表示します。</p>
  </header>

  <main class="grid">
{figures.rstrip()}
  </main>

  <footer>
    <hr>
    生成日時：{generated_iso}<br>
    最終更新（ブラウザ計算）：<span id="last-updated"></span>
  </footer>

  <script>
    const lastModified = new Date(document.lastModified);
    const y = lastModified.getFullYear();
    const m = String(lastModified.getMonth() + 1).padStart(2, '0');
    const d = String(lastModified.getDate()).padStart(2, '0');
    document.getElementById("last-updated").textContent = `${{y}}年${{m}}月${{d}}日`;
  </script>
</body>
</html>
"""

def main() -> None:
    if not IMAGES_DIR.exists():
        raise SystemExit(f"images ディレクトリが見つかりません: {IMAGES_DIR}")

    captions = load_captions(CAPTIONS_CSV)
    images = list_images(IMAGES_DIR)

    blocks = []
    for p in images:
        cap = captions.get(p.name, {})
        blocks.append(figure_block(p.name, cap.get("title", ""), cap.get("note", "")))

    generated_iso = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    html = build_html("".join(blocks), generated_iso)

    OUT_HTML.write_text(html, encoding="utf-8")
    print(f"[OK] generated: {OUT_HTML}  ({len(images)} images)")

if __name__ == "__main__":
    main()
