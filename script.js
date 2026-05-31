/* =============================================
   script.js — Portfolio x BRUCAP.O.O.
   Contiene: fondo de código de programación,
   navbar, rotador de código, barras de habilidades,
   animación MW2-style al scroll, typing effect,
   glitch esporádico y partículas flotantes.

   CAMBIOS RESPECTO A LA VERSIÓN ANTERIOR:
   - Eliminado el cursor personalizado (dot + ring)
     Se usa el cursor nativo del sistema operativo.
   - Fondo reemplazado: ya no usa caracteres chinos/japoneses;
     ahora cae código de programación real (JS, Python,
     HTML, CSS, bash, etc.) para que se entienda
     claramente que son fragmentos de código.
   - Animación de aparición estilo MW2 (Call of Duty
     Modern Warfare 2, 2009): flash blanco → color,
     con slide desde abajo, reemplaza el antiguo
     IntersectionObserver + clase "fade-in-up".
============================================= */


/* ——————————————————————————————————————————
   CANVAS DE CÓDIGO (reemplaza el matrix chino)
   ——————————————————————————————————————————
   Dibuja fragmentos de código de programación
   (JavaScript, Python, HTML, CSS, bash, etc.)
   cayendo en columnas verticales.
   Los tokens están en inglés y son reconocibles
   como código real para cualquier desarrollador.
—————————————————————————————————————————— */
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

/* Fragmentos de código de programación reconocibles.
   Se mezclan tokens de varios lenguajes para darle
   variedad visual y semántica al fondo. */
const CODE_TOKENS = [
  // JavaScript / TypeScript
  'const', 'let', 'var', 'function', 'return', 'async', 'await',
  'import', 'export', 'default', 'class', 'new', 'this', 'if',
  'else', 'for', 'while', 'try', 'catch', 'throw', 'null', 'true',
  'false', 'undefined', '=>', '===', '!==', '&&', '||', '...', '?.', '??',
  // Python
  'def', 'self', 'print()', 'range()', 'None', 'True', 'False',
  'import', 'from', 'as', 'with', 'lambda', 'yield', 'pass',
  'isinstance()', 'len()', 'str()', 'int()', 'list()',
  // HTML / CSS
  '<div>', '</div>', '<span>', '<a>', 'href=', 'class=', 'id=',
  ':root', 'var(--', 'flex', 'grid', 'px', 'rem', 'rgba(',
  // Operadores y símbolos de código
  '{', '}', '()', '=>', '->', '::', '[]', '//!', '/*', '*/',
  '0x', '0b', 'NaN', 'Infinity', '#!', '$_', '__',
  // Git / bash
  'git', 'push', 'pull', 'commit', 'merge', 'branch',
  'npm', 'pip', 'node', 'python3', 'ls -la', 'cd ..',
  // Valores y patrones comunes
  '404', '200', 'null', '{}', '[]', '""', "''",
  'callback', 'promise', 'resolve', 'reject', 'fetch()',
];

const FONT_SIZE = 13; /* tamaño en px de cada token */
let columns;          /* número de columnas del canvas */
let drops;            /* posición Y de cada columna */

/* Redimensiona el canvas al tamaño de la ventana
   y reinicia el array de posiciones */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / (FONT_SIZE * 6)); /* columnas más separadas para texto largo */
  drops   = new Array(columns).fill(0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/* Dibuja un frame del fondo de código cada 80ms.
   Usa un fondo semitransparente para crear la
   "estela" que deja cada columna al caer. */
function drawCodeBackground() {
  /* Fondo semitransparente para efecto de estela */
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = FONT_SIZE + 'px Share Tech Mono';

  drops.forEach((y, i) => {
    /* Selecciona un token aleatorio del array de código */
    const token = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
    const x     = i * (FONT_SIZE * 6); /* espaciado horizontal entre columnas */

    /* Primer carácter de la gota: destello blanco brillante */
    if (Math.random() > 0.97) {
      ctx.fillStyle = '#ffffff'; /* destello blanco ocasional */
    } else {
      ctx.fillStyle = '#e60012'; /* rojo principal del portfolio */
    }

    ctx.fillText(token, x, y * FONT_SIZE);

    /* Reinicia la columna aleatoriamente cuando llega al fondo */
    if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

/* Ejecuta un frame cada 80ms (~12fps, suficiente para el efecto visual) */
setInterval(drawCodeBackground, 80);


/* ——————————————————————————————————————————
   NAVBAR — Scroll y Hamburguesa
   ——————————————————————————————————————————
   Agrega sombra roja al navbar al hacer scroll,
   y alterna el menú mobile con el botón hamburguesa.
—————————————————————————————————————————— */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

/* Cambia el estilo del navbar al hacer scroll para
   que quede más prominente sobre el contenido */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'var(--red)';
    navbar.style.boxShadow         = '0 2px 20px rgba(230,0,18,0.2)';
  } else {
    navbar.style.borderBottomColor = 'var(--red-dim)';
    navbar.style.boxShadow         = 'none';
  }
});

/* Abre/cierra el menú mobile al hacer click en la hamburguesa */
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Cierra el menú mobile al hacer click en cualquier link */
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ——————————————————————————————————————————
   ROTADOR DE CÓDIGO (Hero)
   ——————————————————————————————————————————
   Alterna entre 4 bloques de código cada 5 segundos.
   Modifica el array CODE_BLOCKS para cambiar los textos.
   Los bloques muestran código comentado en español
   y código funcional en JS/Python para mantener
   la coherencia con el fondo de código del canvas.
—————————————————————————————————————————— */
const CODE_BLOCKS = [
  /* Bloque 1: inicialización del sistema (JS orientado a objetos) */
  `// SISTEMA x BRUCAP.O.O. — INICIALIZANDO
> Cargando módulos de interfaz...
> Compilando assets visuales... [OK]
> Conectando al servidor......  [OK]

class Portfolio {
  constructor(alias) {
    this.alias  = alias;
    this.status = 'ONLINE';
  }
  render() { return \`\${this.alias} listo.\`; }
}
const app = new Portfolio('BRUCA');
app.render(); // >> OPERACIONAL`,

  /* Bloque 2: análisis de habilidades (objeto JS con datos reales) */
  `/* ANÁLISIS DE NÚCLEO — HABILIDADES */
const skills = {
  HTML:       { level: 90, rank: 'ADVANCED'  },
  CSS:        { level: 85, rank: 'ADVANCED'  },
  JavaScript: { level: 70, rank: 'JUNIOR'    },
  Python:     { level: 60, rank: 'JUNIOR'    },
  Git:        { level: 75, rank: 'INTER.'    },
  CapCut:     { level: 80, rank: 'INTER.'    },
};

const best = Object.entries(skills)
  .sort((a,b) => b[1].level - a[1].level)
  .map(([k]) => k);
// >> best[0] === 'HTML' — CONFIRMADO <<`,

  /* Bloque 3: protocolo de contacto (async/await) */
  `/* PROTOCOLO_DE_CONTACTO — ABIERTO */
// Escaneando canales disponibles...

const channels = ['GitHub','YouTube','Steam','Gmail'];
channels.forEach(ch => console.log(\`[\${ch}] ACTIVO\`));

async function openComms(config) {
  const conn = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(config),
  });
  return conn.ok ? 'TRANSMITIDO' : 'ERROR';
}
// >> LISTO PARA RECIBIR TRANSMISIÓN <<`,

  /* Bloque 4: identidad Absolute Solver (Python + comentarios) */
  `# ABSOLUTE_SOLVER — INSTANCIA ACTIVA
# WARNING: Acceso no autorizado detectado.

def identify(entity: dict) -> str:
    alias  = entity.get('alias', 'UNKNOWN')
    role   = entity.get('role',  'None')
    threat = 'NULA' if entity['friendly'] else 'ALTA'
    return f"[{alias}] {role} — threat={threat}"

agent = {
    'alias': 'x BRUCAP.O.O.',
    'role': 'Frontend Dev',
    'friendly': True,
}
print(identify(agent))
# >> FIN_DE_TRANSMISIÓN`,
];

const codeDisplay = document.getElementById('code-display');
let codeIndex = 0;

/* Muestra el bloque de código con la animación de fade-in */
function showCode(index) {
  codeDisplay.style.animation = 'none';
  void codeDisplay.offsetWidth; /* fuerza reflow para reiniciar la animación */
  codeDisplay.textContent    = CODE_BLOCKS[index];
  codeDisplay.style.animation = 'code-fade-in 0.6s ease';
}

/* Inicializa con el primer bloque */
showCode(0);

/* Rota al siguiente bloque cada 5 segundos */
setInterval(() => {
  codeIndex = (codeIndex + 1) % CODE_BLOCKS.length;
  showCode(codeIndex);
}, 5000);


/* ——————————————————————————————————————————
   SONIDO DE GLITCH EN HOVER
   ——————————————————————————————————————————
   Genera un clic/glitch sintético con Web Audio API
   al pasar el mouse sobre botones, links y cards.
   El contexto de audio se inicializa al primer hover
   para cumplir con la política de autoplay del navegador.
—————————————————————————————————————————— */
let audioCtx = null;

/* Genera un buffer de ruido blanco corto (~40ms) filtrado */
function playGlitch() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const bufferSize = audioCtx.sampleRate * 0.04; /* 40ms */
    const buffer     = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data       = buffer.getChannelData(0);

    /* Rellena con ruido aleatorio de baja amplitud */
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    /* Filtro de paso alto para que suene a "clic electrónico" */
    const filter       = audioCtx.createBiquadFilter();
    filter.type        = 'highpass';
    filter.frequency.value = 1800;

    source.connect(filter);
    filter.connect(audioCtx.destination);
    source.start();
  } catch (e) {
    /* Silencioso si el navegador no soporta Web Audio */
  }
}

/* Asigna el sonido a todos los elementos interactivos */
document.querySelectorAll('a, button, .flip-card').forEach(el => {
  el.addEventListener('mouseenter', playGlitch);
});


/* ——————————————————————————————————————————
   ANIMACIÓN ESTILO MW2 (Call of Duty MW2 2009)
   ——————————————————————————————————————————
   Reemplaza el antiguo sistema "fade-in-up".
   Al entrar en el viewport, agrega la clase
   "mw2-active" a los elementos con "mw2-reveal".
   El CSS maneja el flash blanco, slide y transición.

   Los delays escalonados (mw2-delay-1, etc.) ya
   están en el HTML para que los títulos aparezcan
   en secuencia, como los intertítulos de briefing
   del MW2 original.
—————————————————————————————————————————— */

/* Opciones del observer: activa cuando el 12% del elemento
   es visible en el viewport */
const mw2Observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      /* Agrega la clase que dispara la animación MW2 */
      entry.target.classList.add('mw2-active');

      /* Si es una skill card, anima también la barra de progreso.
         Se espera un pequeño delay para que se vea el flash primero. */
      if (entry.target.classList.contains('skill-card')) {
        const fill    = entry.target.querySelector('.skill-fill');
        const percent = entry.target.dataset.percent;
        if (fill && percent) {
          setTimeout(() => {
            fill.style.width = percent + '%';
          }, 400); /* delay para que la barra empiece después del flash */
        }
      }

      /* Deja de observar una vez que ya fue animado */
      mw2Observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

/* Observa todos los elementos con la clase "mw2-reveal"
   (se asigna en el HTML directamente a cada elemento) */
document.querySelectorAll('.mw2-reveal').forEach(el => {
  mw2Observer.observe(el);
});


/* ——————————————————————————————————————————
   TYPING EFFECT (Rol en el Hero)
   ——————————————————————————————————————————
   Escribe y borra el texto del rol ciclicamente
   con velocidades distintas (más lento al escribir,
   más rápido al borrar).
—————————————————————————————————————————— */
const ROLES = [
  'Frontend Developer',
  'UI Enthusiast',
  'Web Designer',
  'x BRUCAP.O.O.',
];

const typingEl = document.getElementById('typing-role');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = ROLES[roleIndex];

  if (!isDeleting) {
    /* Escribe el siguiente carácter */
    typingEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      /* Terminó de escribir: pausa antes de borrar */
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    /* Borra el último carácter */
    typingEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      /* Terminó de borrar: pasa al siguiente rol */
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % ROLES.length;
    }
  }

  /* Velocidad: borrado más rápido que escritura */
  const speed = isDeleting ? 60 : 110;
  setTimeout(typeRole, speed);
}

/* Inicia el efecto de typing con un delay para que
   la animación MW2 del hero termine primero */
setTimeout(typeRole, 1000);


/* ——————————————————————————————————————————
   GLITCH ESPORÁDICO EN EL HERO-NAME
   ——————————————————————————————————————————
   Cada cierto tiempo aplica un pequeño glitch
   visual al "P.O.O." del título principal,
   desplazándolo y saturando el color brevemente.
—————————————————————————————————————————— */
const heroPoo = document.querySelector('.hero-poo');

function randomGlitch() {
  if (!heroPoo) return;

  /* Desplaza el elemento algunos píxeles y altera el color */
  heroPoo.style.transform = `translateX(${(Math.random() - 0.5) * 6}px)`;
  heroPoo.style.filter    = 'brightness(1.5) hue-rotate(10deg)';

  /* Restaura después de 100ms */
  setTimeout(() => {
    heroPoo.style.transform = '';
    heroPoo.style.filter    = '';
  }, 100);

  /* Próximo glitch en un intervalo aleatorio entre 2 y 7 segundos */
  setTimeout(randomGlitch, 2000 + Math.random() * 5000);
}
/* Inicia el glitch esporádico después de 3 segundos */
setTimeout(randomGlitch, 3000);


/* ——————————————————————————————————————————
   PARTÍCULAS FLOTANTES (decoración de fondo)
   ——————————————————————————————————————————
   Crea puntos rojos flotantes en el fondo
   para dar más profundidad y atmósfera al diseño.
   Se generan 25 partículas con posición, tamaño
   y velocidad aleatoria.
—————————————————————————————————————————— */
function createParticles() {
  const container = document.body;
  const count     = 25; /* cantidad de partículas */

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');

    /* Estilo inline de cada partícula */
    Object.assign(particle.style, {
      position:       'fixed',
      width:          Math.random() * 3 + 1 + 'px',
      height:         Math.random() * 3 + 1 + 'px',
      borderRadius:   '50%',
      background:     `rgba(230, 0, 18, ${Math.random() * 0.4 + 0.1})`,
      left:           Math.random() * 100 + 'vw',
      top:            Math.random() * 100 + 'vh',
      zIndex:         '1',
      pointerEvents:  'none',
      boxShadow:      '0 0 4px rgba(230,0,18,0.5)',
      animation:      `float-particle ${6 + Math.random() * 10}s ease-in-out infinite`,
      animationDelay: `-${Math.random() * 10}s`,
    });

    container.appendChild(particle);
  }
}

/* Inyecta los keyframes de las partículas flotantes al <head> */
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float-particle {
    0%   { transform: translateY(0px)    translateX(0px);   opacity: 0.3; }
    25%  { transform: translateY(-30px)  translateX(10px);  opacity: 0.8; }
    50%  { transform: translateY(-60px)  translateX(-10px); opacity: 0.5; }
    75%  { transform: translateY(-30px)  translateX(15px);  opacity: 0.9; }
    100% { transform: translateY(0px)    translateX(0px);   opacity: 0.3; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();


/* ——————————————————————————————————————————
   LÍNEA DE ESCANEO (HUD effect)
   ——————————————————————————————————————————
   Una línea roja semitransparente que recorre
   la pantalla de arriba a abajo continuamente,
   reforzando la sensación de monitor HUD militar.
—————————————————————————————————————————— */
const scanLine = document.createElement('div');
Object.assign(scanLine.style, {
  position:      'fixed',
  top:           '0',
  left:          '0',
  width:         '100%',
  height:        '2px',
  background:    'linear-gradient(to right, transparent, rgba(230,0,18,0.4), transparent)',
  zIndex:        '5',
  pointerEvents: 'none',
  animation:     'scan-line 6s linear infinite',
});
document.body.appendChild(scanLine);

/* Keyframes de la línea de escaneo descendente */
const scanStyle = document.createElement('style');
scanStyle.textContent = `
  @keyframes scan-line {
    0%   { top: 0;     opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 100vh; opacity: 0; }
  }
`;
document.head.appendChild(scanStyle);