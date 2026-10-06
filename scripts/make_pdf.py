#!/usr/bin/env python3
"""
Genera el portafolio en PDF (español e inglés) a partir de assets/js/projects.js
y de las imágenes creadas por prepare_images.py.

Uso:
    pip install reportlab
    python scripts/make_pdf.py

Resultado:
    assets/docs/Portafolio-William-Acuna-ES.pdf
    assets/docs/Portfolio-William-Acuna-EN.pdf
"""
import io
import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image
    from reportlab.lib.colors import HexColor
    from reportlab.lib.pagesizes import letter, landscape
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.utils import ImageReader
    from reportlab.pdfgen import canvas
    from reportlab.platypus import Paragraph
except ImportError:
    sys.exit("Faltan dependencias. Ejecuta:  pip install reportlab pillow")

# ---------------------------------------------------------------- Configuración
SITE = "https://williacu81.github.io"
NAME = "William Acuña Rojas"
EMAIL = "williacu@gmail.com"
LINKEDIN = "linkedin.com/in/williacu"
COUNTRIES = 4
YEARS = "10+"

# Proyectos con página propia en el PDF, en este orden (slugs de projects.js).
# Vacío = los primeros 10 de projects.js que tengan mockup de escritorio.
FEATURED = []
MAX_FEATURED = 10

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img" / "projects"
OUT = ROOT / "assets" / "docs"

INK = HexColor("#142033")
MUTED = HexColor("#586579")
LINE = HexColor("#D6DCE6")
ACCENT = HexColor("#2448E8")
SOFT = HexColor("#F3F5F9")

INDUSTRIES = {
    "cultura":     {"es": "Cultura y eventos", "en": "Culture & events"},
    "salud":       {"es": "Salud",             "en": "Healthcare"},
    "finanzas":    {"es": "Finanzas",          "en": "Finance"},
    "ecommerce":   {"es": "E-commerce",        "en": "E-commerce"},
    "apps":        {"es": "Apps móviles",      "en": "Mobile apps"},
    "servicios":   {"es": "Servicios B2B",     "en": "B2B services"},
    "gastronomia": {"es": "Gastronomía",       "en": "Food & dining"},
    "educacion":   {"es": "Educación",         "en": "Education"},
    "marca":       {"es": "Marca personal",    "en": "Personal brand"},
}

T = {
    "es": {
        "file": "Portafolio-William-Acuna-ES.pdf",
        "role": "Desarrollador web y especialista en SEO",
        "statement": "Diseño y desarrollo sitios web desde cero.",
        "lead": "Cada proyecto de este portafolio lo diseñé y lo construí yo, de la primera maqueta a la publicación.",
        "sites": "sitios construidos", "ind": "industrias", "countries": "países", "years": "años de experiencia",
        "industry": "Industria", "myrole": "Mi rol", "stack": "Tecnología",
        "roleValue": "Diseño y desarrollo completo, desde cero",
        "visit": "Visitar el sitio", "interactive": "Ver la ficha interactiva",
        "noUrl": "Sin dominio público por ahora",
        "more": "Más proyectos",
        "moreLead": "Otros sitios que diseñé y desarrollé desde cero. Todos se pueden explorar en",
        "contact": "Contacto",
        "page": "Página",
    },
    "en": {
        "file": "Portfolio-William-Acuna-EN.pdf",
        "role": "Web developer and SEO specialist",
        "statement": "I design and build websites from scratch.",
        "lead": "I designed and built every project in this portfolio myself, from the first wireframe to launch.",
        "sites": "websites built", "ind": "industries", "countries": "countries", "years": "years of experience",
        "industry": "Industry", "myrole": "My role", "stack": "Stack",
        "roleValue": "Full design and development, from scratch",
        "visit": "Visit the site", "interactive": "Open the interactive case",
        "noUrl": "No public domain yet",
        "more": "More projects",
        "moreLead": "Other sites I designed and built from scratch. Explore all of them at",
        "contact": "Contact",
        "page": "Page",
    },
}

PAGE_W, PAGE_H = landscape(letter)  # 792 x 612 pt
M = 48  # margen


# ---------------------------------------------------------------- Datos
def load_projects():
    js = (ROOT / "assets" / "js" / "projects.js").read_text(encoding="utf-8")
    js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
    body = js[js.index("["): js.rindex("]") + 1]
    body = re.sub(r'^(\s*)([A-Za-z_]\w*)\s*:', r'\1"\2":', body, flags=re.M)
    body = re.sub(r",(\s*[\]}])", r"\1", body)  # comas finales
    return json.loads(body)


def domain(p):
    u = p.get("url") or ""
    return re.sub(r"^https?://(www\.)?", "", u).rstrip("/")


def img_path(p, kind):
    f = IMG / p["slug"] / f"{kind}.webp"
    return f if f.exists() else None


def reader(path, max_px, bg_color="#FFFFFF"):
    """Aplana la transparencia sobre el color de fondo y la convierte a JPEG liviano."""
    im = Image.open(path)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, bg_color)
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    im.thumbnail((max_px, max_px), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=86, optimize=True)
    buf.seek(0)
    return ImageReader(buf), im.size


def draw_fit(c, path, x, y, w, h, align="center", max_px=1600, bg_color="#FFFFFF"):
    """Dibuja la imagen ajustada dentro de la caja (x, y desde abajo). Devuelve el rectángulo usado."""
    ir, (iw, ih) = reader(path, max_px, bg_color)
    s = min(w / iw, h / ih)
    dw, dh = iw * s, ih * s
    dx = x + (w - dw) / 2 if align == "center" else (x if align == "left" else x + w - dw)
    dy = y + (h - dh) / 2
    c.drawImage(ir, dx, dy, dw, dh)
    return dx, dy, dw, dh


# ---------------------------------------------------------------- Estilos de texto
def style(size, leading=None, color=INK, font="Helvetica", space=0):
    return ParagraphStyle("s", fontName=font, fontSize=size, leading=leading or size * 1.25,
                          textColor=color, spaceAfter=space)


def para(c, text, st, x, y_top, w):
    """Dibuja un párrafo con su borde superior en y_top. Devuelve la altura usada."""
    p = Paragraph(text, st)
    _, h = p.wrap(w, PAGE_H)
    p.drawOn(c, x, y_top - h)
    return h


def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---------------------------------------------------------------- Páginas
def footer(c, lang, n):
    c.setStrokeColor(LINE)
    c.setLineWidth(.6)
    c.line(M, 34, PAGE_W - M, 34)
    c.setFont("Helvetica", 8.5)
    c.setFillColor(MUTED)
    c.drawString(M, 20, f"{NAME}   |   {SITE.replace('https://', '')}")
    c.linkURL(SITE, (M, 16, M + 260, 30), relative=0)
    c.drawRightString(PAGE_W - M, 20, f"{T[lang]['page']} {n}")


def cover(c, lang, projects, featured):
    t = T[lang]
    # Columna derecha: tres mockups destacados escalonados
    band_x = PAGE_W * 0.56
    c.setFillColor(SOFT)
    c.rect(band_x, 0, PAGE_W - band_x, PAGE_H, stroke=0, fill=1)
    shots = [p for p in featured if img_path(p, "desktop")][:3]
    box_w = PAGE_W - band_x - 2 * 36
    box_h = (PAGE_H - 2 * 40) / 3
    for i, p in enumerate(shots):
        y = PAGE_H - 40 - (i + 1) * box_h
        off = [0, 26, 0][i]
        draw_fit(c, img_path(p, "desktop"), band_x + 36 + off - 13, y + 6, box_w, box_h - 12, bg_color="#F3F5F9")

    # Columna izquierda
    w = band_x - M - 40
    y = PAGE_H - M - 6
    c.setFillColor(ACCENT)
    c.rect(M, y - 4, 34, 4, stroke=0, fill=1)
    y -= 26
    y -= para(c, f"<b>{esc(NAME)}</b>", style(15, color=INK, font="Helvetica-Bold"), M, y, w)
    y -= 2
    y -= para(c, esc(t["role"]), style(11.5, color=MUTED), M, y, w)
    y -= 40
    y -= para(c, esc(t["statement"]), style(40, leading=43, font="Helvetica-Bold"), M, y, w)
    y -= 18
    y -= para(c, esc(t["lead"]), style(12.5, leading=18, color=MUTED), M, y, w * .9)

    # Cifras
    inds = len({p["industry"] for p in projects})
    facts = [(str(len(projects)), t["sites"]), (str(inds), t["ind"]),
             (str(COUNTRIES), t["countries"]), (YEARS, t["years"])]
    fy = 150
    fx = M
    for num, label in facts:
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 28)
        c.drawString(fx, fy, num)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(fx, fy - 15, label)
        fx += max(c.stringWidth(num, "Helvetica-Bold", 28), c.stringWidth(label, "Helvetica", 9)) + 26

    # Contacto
    c.setStrokeColor(LINE)
    c.setLineWidth(.6)
    c.line(M, 98, band_x - 40, 98)
    c.setFont("Helvetica", 10)
    c.setFillColor(INK)
    items = [(EMAIL, f"mailto:{EMAIL}"), (SITE.replace("https://", ""), SITE), (LINKEDIN, "https://www." + LINKEDIN)]
    cy = 78
    for text, url in items:
        c.drawString(M, cy, text)
        c.linkURL(url, (M, cy - 3, M + c.stringWidth(text, "Helvetica", 10), cy + 10), relative=0)
        cy -= 15


def project_page(c, lang, p, idx, total, n):
    t = T[lang]
    # Numeración del proyecto dentro de la selección
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED)
    c.drawString(M, PAGE_H - M + 8, f"{idx:02d} / {total:02d}")

    # Mockup de escritorio
    left_w = PAGE_W * 0.58 - M
    top = PAGE_H - M - 10
    bottom = 52
    desk = img_path(p, "desktop")
    if desk:
        draw_fit(c, desk, M, bottom, left_w, top - bottom)
    else:
        c.setFillColor(SOFT)
        c.roundRect(M, bottom + 30, left_w, top - bottom - 60, 10, stroke=0, fill=1)

    # Columna de texto
    x = PAGE_W * 0.58 + 24
    w = PAGE_W - M - x
    y = PAGE_H - M - 4
    y -= para(c, esc(p["name"]), style(22, leading=25, font="Helvetica-Bold"), x, y, w)
    y -= 6
    d = domain(p)
    if d:
        y -= para(c, f'<link href="{esc(p["url"])}" color="#2448E8">{esc(d)}</link>',
                  style(11, color=ACCENT, font="Helvetica-Bold"), x, y, w)
    else:
        y -= para(c, esc(t["noUrl"]), style(10.5, color=MUTED), x, y, w)
    y -= 14
    y -= para(c, esc(p["desc"].get(lang) or p["desc"].get("es")), style(11, leading=16), x, y, w)
    y -= 18

    meta = [(t["industry"], INDUSTRIES[p["industry"]][lang]), (t["myrole"], t["roleValue"])]
    if p.get("stack"):
        meta.append((t["stack"], ", ".join(p["stack"])))
    for label, value in meta:
        y -= para(c, esc(label), style(8.5, color=MUTED), x, y, w)
        y -= 2
        y -= para(c, esc(value), style(10.5, leading=14), x, y, w)
        y -= 11

    # Enlaces
    links_y = 64
    c.setFont("Helvetica-Bold", 10)
    if p.get("url"):
        label = t["visit"]
        c.setFillColor(ACCENT)
        c.drawString(x, links_y + 16, label)
        c.linkURL(p["url"], (x, links_y + 12, x + c.stringWidth(label, "Helvetica-Bold", 10), links_y + 26), relative=0)
    c.setFillColor(INK)
    c.setFont("Helvetica", 9.5)
    label = t["interactive"]
    c.drawString(x, links_y, label)
    c.linkURL(f"{SITE}/#p/{p['slug']}", (x, links_y - 4, x + c.stringWidth(label, "Helvetica", 9.5), links_y + 10), relative=0)

    # Mockup móvil, abajo a la derecha si hay espacio
    phone = img_path(p, "mobile")
    space = y - (links_y + 40)
    if phone and space > 110:
        ph = min(space, 210)
        draw_fit(c, phone, PAGE_W - M - 110, links_y + 34, 110, ph, align="right", max_px=700)

    footer(c, lang, n)


def more_page(c, lang, rest, n):
    t = T[lang]
    y = PAGE_H - M - 4
    y -= para(c, esc(t["more"]), style(26, leading=30, font="Helvetica-Bold"), M, y, PAGE_W - 2 * M)
    y -= 6
    site = SITE.replace("https://", "")
    y -= para(c, f'{esc(t["moreLead"])} <link href="{SITE}" color="#2448E8"><b>{site}</b></link>',
              style(11, leading=15, color=MUTED), M, y, PAGE_W - 2 * M)
    y -= 22

    groups = {}
    for p in rest:
        groups.setdefault(p["industry"], []).append(p)
    order = [k for k in INDUSTRIES if k in groups]

    cols = 3
    gap = 28
    col_w = (PAGE_W - 2 * M - gap * (cols - 1)) / cols
    col_y = [y] * cols
    for key in order:
        # columna con más espacio libre
        ci = max(range(cols), key=lambda i: col_y[i])
        cx = M + ci * (col_w + gap)
        cy = col_y[ci]
        cy -= para(c, f"<b>{esc(INDUSTRIES[key][lang])}</b>", style(10.5, font="Helvetica-Bold"), cx, cy, col_w)
        cy -= 5
        for p in groups[key]:
            d = domain(p)
            line = esc(p["name"])
            if d:
                line += f'<br/><link href="{esc(p["url"])}" color="#586579">{esc(d)}</link>'
            cy -= para(c, line, style(9.5, leading=12.5), cx, cy, col_w)
            cy -= 6
        col_y[ci] = cy - 14

    footer(c, lang, n)


def build(lang, projects):
    by_slug = {p["slug"]: p for p in projects}
    if FEATURED:
        featured = [by_slug[s] for s in FEATURED if s in by_slug]
    else:
        featured = [p for p in projects if img_path(p, "desktop")][:MAX_FEATURED]
    rest = [p for p in projects if p not in featured]

    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / T[lang]["file"]
    c = canvas.Canvas(str(out), pagesize=(PAGE_W, PAGE_H))
    c.setTitle(f"{NAME} | {'Portafolio' if lang == 'es' else 'Portfolio'}")
    c.setAuthor(NAME)
    c.setSubject(T[lang]["role"])

    cover(c, lang, projects, featured)
    c.showPage()
    n = 2
    for i, p in enumerate(featured, 1):
        project_page(c, lang, p, i, len(featured), n)
        c.showPage()
        n += 1
    if rest:
        more_page(c, lang, rest, n)
        c.showPage()
    c.save()
    print(f"{out.relative_to(ROOT)}  ({n} páginas, {out.stat().st_size / 1024:.0f} KB)")


def main():
    projects = load_projects()
    for lang in ("es", "en"):
        build(lang, projects)


if __name__ == "__main__":
    main()
