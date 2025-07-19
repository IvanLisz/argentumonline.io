# Argentum Babylon

Argentum Online web client converted to use Vite and ES modules.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Development

The project has been migrated from RequireJS to ES modules. The main entry point is `js/main-vite.js` which is loaded by `index.html`.

### Key changes:
- RequireJS has been removed
- All modules now use ES6 import/export syntax
- Vite handles bundling and development server
- SCSS files are processed automatically

### Project Structure:
- `/js` - JavaScript source files
- `/css` - SCSS styles
- `/graficos` - Game graphics
- `/audio` - Sound files
- `/fonts` - Font files

## Browser Support

Modern browsers with ES module support are required.