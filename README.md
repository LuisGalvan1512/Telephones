# Telephones - Immersive Audio Experience

Una experiencia web inmersiva y atmosférica basada en la canción "Telephones", que combina visuales dinámicos, efectos climáticos aleatorios y sincronización de letras en tiempo real. Inspirada en estéticas Backrooms y creepypastas de internet.

https://telephones.vercel.app/

## Características Principales

### Efectos Visuales Dinámicos
- **Fondo degradado animado**: Transición suave entre #797CFF (azul claro) y #99E5FD (azul cielo)
- **Sistema de tormenta aleatoria**: 3% de probabilidad por frame que transforma:
  - Fondo a tonos morados/azules oscuros (#1a0a30 a #0d0530)
  - Nubes blancas se vuelven oscuras/moradas
  - Duración: 300-800ms de forma aleatoria
- **Ambiente nublado permanente**: 3 capas de niebla con desenfoque de 60px, 80px y 100px

### Elementos Flotantes
- **20+ nubes animadas**:
  - Blancas por defecto con opacidad variable (0.05-0.25)
  - Tamaño aleatorio (100-350px)
  - Movimiento orgánico con función senoidal
  - Se oscurecen durante tormentas
- **4 cubos voladores**:
  - Imagen PNG personalizada (PaoPao.png)
  - Vuelan horizontalmente de izquierda a derecha
  - Rotación continua 360°
  - Desenfoque de 3px para integrarse con el fondo
  - Opacidad notable (0.15-0.4)

### Sincronización de Audio
- **Whisper AI**: Transcripción automática con timestamps por palabra
- **Web Audio API**: Análisis de frecuencias en tiempo real
- **Letras gigantes**: Hasta 800px en desktop, 100px mínimo (clamp responsive)
- **3 niveles de letras**:
  - Palabra actual: text-8xl md:text-[600px] con sombras brillantes
  - Siguiente palabra: 60% opacidad, tamaño medio
  - Siguiente siguiente: 30% opacidad, tamaño menor

### Estética Backrooms
- **Patrón de rejilla**: Líneas cada 50px con opacidad 0.08
- **Transiciones suaves**: Todas las animaciones usan easeInOut
- **Efecto de niebla**: Radial gradients con múltiples capas

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.2.0 | UI y lógica de estado con hooks |
| TypeScript | 5.0.0 | Tipado estático y seguridad de código |
| Vite | 5.0.0 | Build tool y servidor de desarrollo con HMR |
| Tailwind CSS | 4.2.4 | Framework de utilidades CSS responsive |
| Framer Motion | 11.0.0 | Animaciones fluidas y transiciones |
| Whisper (Python) | 20250625 | Transcripción de audio con timestamps |
| Web Audio API | Native | Análisis de frecuencias de audio |

## Estructura del Proyecto

```
Telephones/
├── public/
│   ├── Telephones.mp3          # Archivo de audio de la canción
│   └── icono/
│       └── PaoPao.png         # Imagen del cubo flotante
├── src/
│   ├── main.tsx                # Punto de entrada React
│   ├── App.tsx                 # Componente principal (350+ líneas)
│   │   ├── Gestión de audio y Web Audio API
│   │   ├── Sistema de tormenta aleatoria
│   │   ├── Renderizado de nubes y cubos
│   │   └── Interfaz de letras sincronizadas
│   ├── lyricsData.ts          # Letras con timestamps de Whisper
│   └── index.css               # Estilos globales y Tailwind
├── index.html                   # Entrada HTML
├── package.json                 # Dependencias y scripts
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración de Vite
├── tailwind.config.js           # Configuración de Tailwind
└── postcss.config.js           # Configuración de PostCSS
```

## Instalación y Uso

### Prerrequisitos
- Node.js (compatible con Vite 5)
- Python 3.14+ (para Whisper)

### Instalación de dependencias
```bash
cd C:\Users\Luis Galvan\Documents\Expe\Telephones
npm install
```

### Ejecución en desarrollo
```bash
npm run dev
```
Abre http://localhost:5173 en tu navegador.

### Construcción para producción
```bash
npm run build
```
Genera la carpeta dist/ con archivos optimizados.

### Previsualización de producción
```bash
npm run preview
```

## Cómo Funciona

### 1. Sincronización de Letras con Whisper
Se utilizó **OpenAI Whisper** para transcribir Telephones.mp3 con timestamps precisos por palabra:
```bash
whisper Telephones.mp3 --model base --word_timestamps True --output_format json
```
Los timestamps se guardaron en src/lyricsData.ts para sincronización perfecta.

### 2. Sistema de Tormenta Aleatoria
En App.tsx, cada 100ms se evalúa si ocurre una tormenta:
```typescript
if (Math.random() < 0.03 && !isFlash) {
  setIsFlash(true)
  setTimeout(() => setIsFlash(false), 300 + Math.random() * 500)
}
```
Esto cambia el fondo y las nubes simultáneamente.

### 3. Renderizado de Elementos Visuales
- **Nubes**: 20 elementos motion.div con posiciones y velocidades aleatorias
- **Cubos**: 4 elementos con imagen PNG que vuelan horizontalmente
- **Niebla**: 3 capas de gradientes radiales con desenfoque masivo

### 4. Web Audio API
Se analizan las frecuencias bajas (0-15 bins) para futuras mejoras reactivas al audio.

## Personalización

### Cambiar colores de fondo
Edita en App.tsx:
```typescript
// Fondo normal
background: 'linear-gradient(135deg, #797CFF 0%, #99E5FD 100%)'

// Fondo tormenta
background: 'linear-gradient(135deg, #1a0a30 0%, #0d0530 50%, #1a0a30 100%)'
```

### Modificar frecuencia de tormentas
Cambia el valor 0.03 (3% probabilidad por frame):
```typescript
if (Math.random() < 0.05 && !isFlash) { // 5% probabilidad
```

### Agregar más nubes o cubos
Modifica los Array.from en el useEffect inicial:
```typescript
const initialClouds: Cloud[] = Array.from({ length: 30 }, (_, i) => ({ ... })) // 30 nubes
const initialCubes: FloatingCube[] = Array.from({ length: 6 }, (_, i) => ({ ... })) // 6 cubos
```

## Detalles Técnicos

- **TypeScript estricto**: Todas las interfaces definidas (Cloud, FloatingCube, LyricItem)
- **Optimización**: requestAnimationFrame para actualizaciones suaves
- **Limpieza de memoria**: useEffect cleanup para event listeners y animaciones
- **Responsive**: Breakpoints md: de Tailwind para desktop
- **Z-Index jerárquico**:
  - 0: Fondos
  - 3: Patrón Backrooms
  - 4: Nubes y cubos
  - 4.5-4.7: Niebla
  - 10: Letras

## Licencia

Este proyecto es de uso personal/educativo. La canción "Telephones" pertenece a sus respectivos autores.
