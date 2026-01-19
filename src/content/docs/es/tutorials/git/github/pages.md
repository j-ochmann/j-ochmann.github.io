---
layout: default
title: Páginas de GitHub
content_hash: 9f2fa426eb61090916fd65fa993d492f
translation_status: translated
source_hash: 9f2fa426eb61090916fd65fa993d492f
translated_from: en
---
# Páginas web de GitHub
1. Crea un repositorio
    - nombre del repositorio: nombre de usuario.github.io
    - debe configurarse como público
    - marque Agregar un archivo README
2. Cargar contenido del sitio web
    - index.html (página principal del sitio web)
    - confirmar cambios para guardarlos.
3. Activar las páginas de GitHub
    - Pestaña de configuración en el menú superior del repositorio
    - "Páginas" en el panel izquierdo en la sección "Código y automatización"
    - en "Creación e implementación", en Fuente, seleccione Implementar desde una rama
    - en la lista desplegable bajo Rama, seleccione la rama principal (o maestra) y la carpeta / (raíz)
    - haga clic en el botón Guardar.
4. Publicar el sitio web
    - Después de guardar, aparecerá una barra en la parte superior de la sección "Páginas" con información sobre la implementación en curso.
    - Al cabo de unos minutos (normalmente hasta 10), aparecerá una confirmación,
      que el sitio web está en línea, junto con su dirección: nombre de usuario.github.io.
## Limitaciones importantes:
GitHub Pages solo admite sitios web estáticos (HTML, CSS, JavaScript, marcos como React o Angular).
No admite lenguajes del lado del servidor como PHP, Python (Django/Flask) o bases de datos.

## Puedes crear páginas de GitHub usando Markdown (.md).
   GitHub tiene un generador Jekyll integrado,
   que convierte automáticamente estos archivos en páginas web.

## Estas son las principales formas de hacerlo:
1. Método rápido mediante selección de tema (el más fácil)
Este método no requiere ninguna codificación, solo necesita un archivo .md:
Cree un archivo README.md o index.md en el repositorio.
Vaya a Configuración -> Páginas.
En la sección "Creación e implementación", haga clic en el botón Elegir un tema (si no se muestra, asegúrese de tener Implementar desde una rama configurada como fuente).
Seleccione un tema y confirme. GitHub crea automáticamente un archivo _config.yml, que vincula Markdown a la plantilla seleccionada.
2. Estructura personalizada con Jekyll
Si desea tener más control sobre el sitio web, puede organizar los archivos Markdown usted mismo:
index.md: Se convierte en la página principal (index.html).
kontakt.md: se convierte automáticamente a uzivatel.github.io/kontakt.html.
Portada: Puede agregar metadatos al principio de cada archivo .md (por ejemplo, título de página o plantilla):
rebaja
---
diseño: publicación
título: Mi primera página
---
Aquí escribes texto clásico de Markdown...

Ventajas y limitaciones en 2025:
Automatización: cada vez que edita un archivo .md y guarda los cambios (confirmar), el sitio web se actualiza automáticamente en unos momentos.
Apariencia: sin un tema seleccionado, el sitio web se verá como texto sin formato. Por lo tanto, se recomienda seleccionar siempre un tema en la configuración de Páginas.
Herramientas avanzadas: para la documentación, también puede utilizar generadores especializados como mdBook, que también funcionan exclusivamente con Markdown y son compatibles con GitHub.
# Páginas de GitHub
[j-ochmann.github.io](https://j-ochmann.github.io/)
- utiliza acciones Jekyll y GitHub.
- **docs/index.md** se convierte de Markdown a HTML y se incluye en el tema Jekyll predeterminado.

## Cómo cambiar el tema (forma más rápida)
En la raíz del repositorio (o en /docs) cree o modifique el archivo:
**📄 _config.yml**
```yaml
título: Jindřich Ochmann
descripción: Desarrollo, lenguajes, proyectos
tema: jekyll-tema-hacker
```
Confirmar → presionar → hecho.

Algunos temas utilizables: `jekyll-theme-minimal/hacker/cayman/midnight/slate/dinky`

👉 [Completo lista](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?versionId=free-pr o-team%40latest&productId=pages&restPage=empezando-con-github-pages%2Cconfigurando-una-fuente-de-publicación-para-su-sitio-de-páginas-github#temas-compatibles)

## Cómo INFLUIR EN EL CONTENIDO (estructura)

Estructura recomendada:
```texto
documentos/
├── _config.yml
├── índice.md
├── acerca de.md
├── proyectos.md
├── activos/
│ └──img/
└── _diseños/
```
`índice.md`
```md
---
diseño: predeterminado
título: Introducción
---

# Hola 👋
Mi nombre es **Jindřich Ochmann**

- programación
- idiomas
- experimentos
```
>⚠️ Ese bloque YAML (---) es importante

## Navegación (menú superior)

En `_config.yml`:
```yaml
título: Jindřich Ochmann
tema: jekyll-tema-cayman

navegación:
  - título: Inicio
    URL: /
  - título: Proyectos
    URL: /proyectos
  - título: Acerca de mí
    URL: /acerca de
```
Y archivos correspondientes:
```texto
proyectos.md
acerca de.md
```
## CSS personalizado (aquí es donde comienza el "control")
1. Cree el archivo: `docs/assets/css/style.scss`
2. Contenido:
```scss
---
---

@import "{{ sitio.tema }}";

cuerpo {
  familia de fuentes: system-ui, sans-serif;
}

h1 {
  color: #ff6600;
}
```
Páginas de GitHub:
- reconoce SCSS
- lo traduce
- sobrescribe el estilo de tema predeterminado

## Si quieres control TOTAL
- no utilice "tema remoto"
1. crear diseño:
```html
docs/_layouts/default.html

<!DOCTYPE html>
<html lang="es">
<cabeza>
  <meta juego de caracteres="UTF-8">
  <título>{{ página.título }} | {{ sitio.título }}</título>
  <enlace rel="hoja de estilo" href="/assets/css/style.css">
</cabeza>
<cuerpo>

<encabezado>
  <h1>{{ sitio.título }}</h1>
</encabezado>

<principal>
  {{ contenido }}
</principal>

</cuerpo>
</html>
```
2. En _config.yml eliminar tema:

Sin magia Jekyll, solo un sitio web estático limpio.

Markdown → HTML → Tu diseño
