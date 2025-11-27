# 🔐 Cybersecurity Portfolio - njuante.sec

Portafolio profesional de ciberseguridad con integración de TryHackMe API, sistema de blog para writeups CTF y diseño cyberpunk moderno. Construido con Astro y Tailwind CSS.

## 🎯 Características

- **Tema Cybersecurity**: Diseño profesional con paleta de colores cyber (verde matrix, azul neón, negro)
- **Integración TryHackMe**: Muestra tu progreso, badges y estadísticas en tiempo real
- **Blog de Writeups**: Sistema optimizado para publicar writeups de CTF con sintaxis destacada
- **Diseño Responsivo**: Funciona perfectamente en todos los dispositivos
- **Animaciones Cyber**: Efectos de escaneo, glow text, y elementos animados
- **SEO Optimizado**: Meta tags y HTML semántico
- **Performance**: Generación estática para velocidad óptima

## 🚀 Stack Tecnológico

- **Framework**: Astro 5
- **Estilos**: Tailwind CSS 4 (tema personalizado cybersecurity)
- **Tipografía**: JetBrains Mono, Fira Code (monospace)
- **Content**: Markdown/MDX para writeups
- **API**: Integración con TryHackMe

## 📁 Estructura del Proyecto

```
/
├── public/                    # Assets estáticos
├── src/
│   ├── components/
│   │   ├── Navigation.astro   # Navegación cyber theme
│   │   ├── Footer.astro       # Footer profesional
│   │   └── TryHackMeStats.astro # Componente de stats
│   ├── content/
│   │   └── blog/              # Writeups en Markdown
│   ├── layouts/
│   │   └── Layout.astro       # Layout principal
│   ├── pages/
│   │   ├── index.astro        # Página principal (perfil)
│   │   ├── blog.astro         # Lista de writeups
│   │   └── contact.astro      # Contacto
│   └── styles/
│       └── global.css         # Estilos cyber theme
├── astro.config.mjs
└── package.json
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/njuante/njuante.github.io.git
cd njuante.github.io
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar TryHackMe

Edita `src/components/TryHackMeStats.astro` y cambia el usuario:

```javascript
const username = 'tu-usuario-tryhackme'; // Línea 3
```

### 4. Actualizar información personal

**Navegación** (`src/components/Navigation.astro`):
```astro
<span class="terminal-text">tu-nombre.sec</span>
```

**Footer** (`src/components/Footer.astro`):
```astro
- Actualiza links de redes sociales (GitHub, LinkedIn, TryHackMe, Twitter)
- Cambia el email de contacto
```

**Página principal** (`src/pages/index.astro`):
- Actualiza tu nombre, bio y estadísticas
- Personaliza las skills y herramientas
- Modifica las certificaciones y learning path

### 5. Iniciar desarrollo

```bash
npm run dev
```

Visita `http://localhost:4321`

## 📝 Crear Writeups

### 1. Crear archivo Markdown

Crea un nuevo archivo en `src/content/blog/` siguiendo este formato:

```markdown
---
title: "TryHackMe - NombreRoom Writeup"
description: "Breve descripción del desafío y técnicas utilizadas"
pubDate: "2024-11-27"
author: "Tu Nombre"
tags: ["TryHackMe", "Web", "Linux", "Privilege Escalation"]
---

# TryHackMe - NombreRoom Writeup

## 🎯 Información

- **Plataforma**: TryHackMe
- **Dificultad**: Fácil/Media/Difícil
- **Skills**: Enumeration, Exploitation, etc.

## 🔍 Reconocimiento

\`\`\`bash
nmap -sC -sV <IP>
\`\`\`

## 💥 Explotación

...tu contenido...

## 🚀 Escalada de Privilegios

...tu contenido...
```

### 2. Tags recomendados

- **Plataformas**: TryHackMe, HackTheBox, VulnHub, PicoCTF
- **Categorías**: Web, Network, Forensics, Crypto, Steganography, Reverse Engineering
- **Técnicas**: SQL Injection, XSS, SSRF, LFI, RCE, Buffer Overflow
- **Sistemas**: Linux, Windows, Active Directory
- **Herramientas**: Nmap, Burp Suite, Metasploit, John, Hydra

## 🎨 Personalización de Estilos

### Colores Cyber Theme

Los colores principales están definidos en `src/styles/global.css`:

```css
:root {
  --cyber-bg: #0a0e17;              /* Fondo principal */
  --cyber-primary: #00ff41;          /* Verde matrix */
  --cyber-secondary: #00d9ff;        /* Azul cyber */
  --cyber-accent: #ff006e;           /* Rosa/rojo */
  --cyber-warning: #fbbf24;          /* Amarillo */
  --cyber-terminal: #0dff00;         /* Verde terminal */
}
```

### Clases CSS útiles

- `.cyber-card` - Tarjeta con efecto hover
- `.cyber-btn` - Botón estilo cybersecurity
- `.glow-text` - Texto con efecto glow
- `.terminal-text` - Fuente monospace estilo terminal
- `.cyber-grid` - Fondo con grid animado
- `.scan-line` - Efecto de línea de escaneo

## 📧 Formulario de Contacto

El formulario usa Formspree. Para configurarlo:

1. Ve a [formspree.io](https://formspree.io) y crea una cuenta
2. Crea un nuevo formulario y obtén tu ID
3. Actualiza `src/pages/contact.astro`:

```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

## 🚢 Deployment en GitHub Pages

### 1. Configurar GitHub Pages

En tu repositorio de GitHub:
- Settings → Pages
- Source: GitHub Actions

### 2. El proyecto ya incluye el workflow

El archivo `.github/workflows/deploy.yml` ya está configurado.

### 3. Push y deploy automático

```bash
git add .
git commit -m "Update portfolio"
git push origin master
```

Tu sitio estará disponible en: `https://tu-usuario.github.io`

### 4. Dominio personalizado (opcional)

Si tienes un dominio:
1. Crea un archivo `CNAME` en la raíz con tu dominio
2. Configura DNS records en tu proveedor:
   - Tipo A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - O CNAME: tu-usuario.github.io

## 📦 Build para Producción

```bash
# Build
npm run build

# Preview
npm run preview
```

## 🔧 Comandos Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Preview del build
npm run astro     # CLI de Astro
```

## 🎓 Recursos de Aprendizaje

- [TryHackMe](https://tryhackme.com) - Plataforma de aprendizaje
- [HackTheBox](https://hackthebox.eu) - Laboratorios de pentesting
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Vulnerabilidades web
- [GTFOBins](https://gtfobins.github.io/) - Escalada de privilegios Linux
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) - Payloads y técnicas

## 📄 Licencia

MIT License - Siéntete libre de usar este template para tu portafolio.

## 🤝 Contribuciones

¡Contribuciones, issues y sugerencias son bienvenidas!

## 💬 Contacto

Para preguntas o soporte:
- Email: juanteofi@gmail.com
- GitHub: [@njuante](https://github.com/njuante)

---

⚡ Hecho con pasión por la ciberseguridad | Astro + Tailwind CSS
