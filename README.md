# Portfolio Personal

Portfolio web personal con blog y formulario de contacto.

## Estructura del Proyecto

```
myweb/
├── index.html           # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css     # Main stylesheet
│   ├── js/
│   │   ├── main.js      # Core functionality
│   │   ├── form.js      # Contact form handling
│   │   ├── projects.js  # Projects rendering
│   │   └── blog.js      # Blog posts rendering
│   └── img/             # Images directory
├── api/
│   └── contact.js       # Contact form handler (backend example)
├── data/
│   ├── projects.json    # Project data
│   └── posts.json       # Blog post data
├── package.json         # Project dependencies
├── server.js            # Simple development server
└── README.md            # Documentation
```

## Características

- Diseño responsive con Tailwind CSS
- Modo oscuro/claro
- Formulario de contacto con validación
- Filtrado de proyectos por categoría
- Blog con entradas formateadas

## Desarrollo Local

Para ejecutar el proyecto localmente:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en http://localhost:3000

## Añadir Contenido

### Proyectos

Para añadir nuevos proyectos, edita el archivo `data/projects.json` siguiendo la estructura:

```json
{
  "titulo": "Nombre del proyecto",
  "desc": "Descripción breve",
  "icono": "🚀",
  "tags": ["categoria1", "categoria2"],
  "demo": "https://link-demo.com",
  "repo": "https://github.com/username/repo"
}
```

### Entradas de Blog

Para añadir nuevos artículos, edita el archivo `data/posts.json` siguiendo la estructura:

```json
{
  "titulo": "Título del artículo",
  "resumen": "Descripción breve",
  "fecha": "YYYY-MM-DD",
  "slug": "url-amigable",
  "contenido": "Contenido completo...",
  "etiquetas": ["tag1", "tag2"]
}
```

## Integración de Backend

Para implementar un backend:

1. Instala las dependencias necesarias:
   ```bash
   npm install express nodemailer cors
   ```

2. Crea un archivo `server.js` con Express para manejar las rutas API.

3. Implementa los controladores en la carpeta `api/`.

## Despliegue

Este sitio puede desplegarse en plataformas como:

- Netlify
- Vercel
- GitHub Pages
- Cualquier hosting con soporte para Node.js (para funcionalidades de backend)

## Licencia

MIT
