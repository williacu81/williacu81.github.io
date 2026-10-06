#!/usr/bin/env python3
"""
Convierte el material de cada proyecto (carpeta "Portafolio" descargada de Google Drive)
en imágenes WebP optimizadas para el sitio.

Uso:
    pip install pillow pypdfium2
    python scripts/prepare_images.py "/ruta/a/Portafolio"

Por cada subcarpeta genera assets/img/projects/<slug>/:
    desktop.webp  <- archivo que contenga "macbook" en el nombre (mockup de escritorio)
    mobile.webp   <- archivo que contenga "iphone" en el nombre (mockup móvil)
    full.webp     <- primer PDF de la carpeta (captura de página completa, p. ej. FireShot)
"""
import re
import sys
import unicodedata
from pathlib import Path

try:
    from PIL import Image
    import pypdfium2 as pdfium
except ImportError:
    sys.exit("Faltan dependencias. Ejecuta:  pip install pillow pypdfium2")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "projects"
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp"}

DESKTOP_MAX_W = 1400   # ancho máximo del mockup de escritorio
MOBILE_MAX_H = 1100    # alto máximo del mockup móvil
FULL_W = 1280          # ancho de la captura completa
FULL_MAX_H = 12000     # se recorta si la página es más larga (límite práctico de WebP)


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def known_slugs() -> set:
    js = (ROOT / "assets" / "js" / "projects.js").read_text(encoding="utf-8")
    return set(re.findall(r'slug:\s*"([^"]+)"', js))


def save_image(src: Path, dest: Path, max_w=None, max_h=None, quality=82):
    im = Image.open(src)
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    w, h = im.size
    scale = 1.0
    if max_w and w > max_w:
        scale = min(scale, max_w / w)
    if max_h and h > max_h:
        scale = min(scale, max_h / h)
    if scale < 1:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im.save(dest, "WEBP", quality=quality, method=6)


def render_pdf(src: Path, dest: Path):
    doc = pdfium.PdfDocument(str(src))
    pages = []
    total = 0
    for page in doc:
        width_pt = page.get_width()
        img = page.render(scale=FULL_W / width_pt).to_pil().convert("RGB")
        pages.append(img)
        total += img.height
        if total >= FULL_MAX_H:
            break
    canvas = Image.new("RGB", (FULL_W, min(total, FULL_MAX_H)), "white")
    y = 0
    for img in pages:
        if img.width != FULL_W:
            img = img.resize((FULL_W, round(img.height * FULL_W / img.width)), Image.LANCZOS)
        canvas.paste(img, (0, y))
        y += img.height
        if y >= FULL_MAX_H:
            break
    canvas.save(dest, "WEBP", quality=74, method=6)


def kb(path: Path) -> str:
    return f"{path.stat().st_size / 1024:.0f} KB"


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src_root = Path(sys.argv[1]).expanduser()
    if not src_root.is_dir():
        sys.exit(f"No encuentro la carpeta: {src_root}")

    slugs = known_slugs()
    seen = set()
    for folder in sorted(p for p in src_root.iterdir() if p.is_dir()):
        slug = slugify(folder.name)
        seen.add(slug)
        files = [f for f in folder.iterdir() if f.is_file()]
        mac = [f for f in files if f.suffix.lower() in IMAGE_EXT and "macbook" in f.name.lower()]
        phone = [f for f in files if f.suffix.lower() in IMAGE_EXT and "iphone" in f.name.lower()]
        pdfs = [f for f in files if f.suffix.lower() == ".pdf"]

        dest = OUT / slug
        dest.mkdir(parents=True, exist_ok=True)
        done = []
        if mac:
            save_image(mac[0], dest / "desktop.webp", max_w=DESKTOP_MAX_W)
            done.append(f"desktop {kb(dest / 'desktop.webp')}")
        if phone:
            save_image(phone[0], dest / "mobile.webp", max_h=MOBILE_MAX_H)
            done.append(f"mobile {kb(dest / 'mobile.webp')}")
        if pdfs:
            render_pdf(pdfs[0], dest / "full.webp")
            done.append(f"full {kb(dest / 'full.webp')}")

        flag = "" if slug in slugs else "   <- este slug NO está en projects.js"
        missing = [n for n, ok in (("macbook", mac), ("iphone", phone), ("pdf", pdfs)) if not ok]
        miss = f"   (falta: {', '.join(missing)})" if missing else ""
        print(f"[{slug}] {', '.join(done) or 'sin archivos'}{miss}{flag}")

    for s in sorted(slugs - seen):
        print(f"[{s}] está en projects.js pero no hay carpeta con ese nombre")


if __name__ == "__main__":
    main()
