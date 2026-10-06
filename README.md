# Portafolio · William Acuña

Sitio estático (HTML, CSS y JavaScript, sin dependencias) listo para GitHub Pages.

## Estructura

```
index.html
assets/
  css/styles.css
  js/projects.js      <- los 36 proyectos: nombre, URL, industria, stack, descripción ES/EN
  js/main.js          <- textos ES/EN, habilidades, contacto (bloque CONFIG al inicio)
  img/projects/<slug>/desktop.webp | mobile.webp | full.webp
  docs/CV-William-Acuna-Rojas.pdf
scripts/prepare_images.py
```

## 1. Generar las imágenes (una vez, y cada vez que agregues un proyecto)

1. En Google Drive, clic derecho sobre la carpeta **Portafolio** > Descargar. Descomprime el ZIP.
2. Desde la carpeta del repositorio:

```bash
pip install pillow pypdfium2
python scripts/prepare_images.py "/ruta/a/Portafolio"
```

El script toma de cada carpeta el mockup de MacBook, el de iPhone y el PDF de página completa,
los convierte a WebP optimizado y te avisa si falta algún archivo o si una carpeta no tiene
proyecto en `projects.js`. Mientras una imagen no exista, el sitio muestra un marcador con el dominio.

## 2. Publicar en GitHub Pages con URL limpia

1. Crea (o usa) tu cuenta de GitHub. El nombre de usuario define la URL: `https://<usuario>.github.io`.
2. Crea un repositorio **público** llamado exactamente `<usuario>.github.io`.
3. Sube el contenido de esta carpeta:

```bash
git init
git add .
git commit -m "Portafolio"
git branch -M main
git remote add origin https://github.com/<usuario>/<usuario>.github.io.git
git push -u origin main
```

4. En el repositorio: Settings > Pages > Source: *Deploy from a branch* > `main` / `(root)`.
5. En uno o dos minutos queda en `https://<usuario>.github.io`.

Si prefieres un dominio propio (ej. `williamacuna.com`), crea un archivo `CNAME` con el dominio,
apunta los DNS a GitHub Pages y activa *Enforce HTTPS* en Settings > Pages.

## Agregar un proyecto nuevo

1. Crea su carpeta en Drive con los tres archivos (MacBook, iPhone, PDF).
2. Agrega su bloque en `assets/js/projects.js` (el `slug` es el nombre de la carpeta en minúsculas,
   sin tildes y con guiones).
3. Corre el script de imágenes, haz `git commit` y `git push`.

## Enlaces directos

Cada proyecto tiene su propio enlace para compartir: `https://<usuario>.github.io/#p/vole-candles`.
