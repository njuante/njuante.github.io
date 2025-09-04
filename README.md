# Portfolio Personal

Portfolio web personal con blog y formulario de contacto.

## Estructura del Proyecto

```
myweb/
├── views/                        # EJS templates
│   ├── layout.ejs               # Main layout template
│   ├── index.ejs                # Home page
│   ├── blog.ejs                 # Blog listing
│   ├── post.ejs                 # Individual blog post
│   ├── projects.ejs             # Projects page
│   ├── contact.ejs              # Contact page
│   └── error.ejs                # Error page
├── assets/
│   ├── css/
│   │   └── main.css             # Main stylesheet
│   ├── js/
│   │   ├── main.js              # Core functionality
│   │   ├── form.js              # Contact form handling
│   │   ├── projects.js          # Projects rendering
│   │   ├── blog.js              # Blog posts rendering
│   │   └── router.js            # Client-side routing for GitHub Pages
│   └── img/                     # Images directory
├── api/
│   └── contact.js               # Contact form handler
├── data/
│   ├── projects.json            # Project data
│   └── posts.json               # Blog post data
├── server/                      # Server-side code organization
│   ├── config/                  # Configuration
│   ├── controllers/             # Route controllers
│   ├── models/                  # Data models
│   ├── routes/                  # Express routes
│   └── utils/                   # Utility functions
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
├── package.json                 # Project dependencies
├── server.js                    # Express server
├── build.js                     # Static site generator
├── CNAME                        # Custom domain for GitHub Pages
└── README.md                    # Documentation
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

### Servidor de desarrollo local
```bash
# Iniciar servidor Express para desarrollo
npm run dev
```

### Compilación estática para GitHub Pages
Este proyecto está configurado para ser desplegado en GitHub Pages como un sitio estático:

```bash
# Generar archivos estáticos
npm run build
```

La carpeta `build/` contendrá la versión estática del sitio que puede ser desplegada.

### Despliegue automatizado con GitHub Actions

El repositorio incluye un flujo de trabajo de GitHub Actions (`/.github/workflows/deploy.yml`) que:

1. Se activa automáticamente al hacer push a la rama main
2. Instala las dependencias
3. Ejecuta el script de compilación
4. Despliega el resultado en GitHub Pages

Los pasos para configurar el despliegue son:

1. Asegúrate de que tu repositorio esté en GitHub
2. En la configuración del repositorio, habilita GitHub Pages en la sección "Pages"
3. Selecciona como origen la opción "GitHub Actions"
4. Haz push de los cambios a la rama main

### Otras plataformas

Este sitio también puede desplegarse en otras plataformas como:

- Netlify
- Vercel
- Cualquier hosting con soporte para Node.js (versión dinámica)

## Licencia

MIT
