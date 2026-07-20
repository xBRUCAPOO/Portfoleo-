/* =============================================
   script.js — Portfolio x BRUCAP.O.O.
============================================= */


/* ——————————————————————————————————————————
   CANVAS DE CÓDIGO (fondo)
—————————————————————————————————————————— */
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

const CODE_TOKENS = [
  'const', 'let', 'var', 'function', 'return', 'async', 'await',
  'import', 'export', 'default', 'class', 'new', 'this', 'if',
  'else', 'for', 'while', 'try', 'catch', 'null', 'true', 'false',
  '=>', '===', '!==', '&&', '||', '...', '?.', '??',
  'def', 'self', 'None', 'True', 'False', 'lambda', 'yield', 'pass',
  'len()', 'str()', 'int()', 'list()', 'dict()',
  '<div>', '</div>', '<span>', 'href=', 'class=', 'id=',
  ':root', 'var(--', 'flex', 'grid', 'rem', 'rgba(',
  '{', '}', '()', '->', '::', '[]', '/*', '*/',
  '0x', 'NaN', 'Infinity', '$_', '__init__',
  'git', 'push', 'pull', 'commit', 'merge',
  'npm', 'pip', 'node', 'python3', 'cd ..',
  '404', '200', '{}', '[]', 'fetch()', 'resolve', 'reject',
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT',
];

const FONT_SIZE = 13;
let columns, drops;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / (FONT_SIZE * 6));
  drops   = new Array(columns).fill(0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawCodeBackground() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = FONT_SIZE + 'px Share Tech Mono';
  drops.forEach((y, i) => {
    const token = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
    const x     = i * (FONT_SIZE * 6);
    ctx.fillStyle = Math.random() > 0.97 ? '#ffffff' : '#e60012';
    ctx.fillText(token, x, y * FONT_SIZE);
    if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawCodeBackground, 80);


/* ——————————————————————————————————————————
   NAVBAR — scroll y hamburguesa
   NOTA: navToggle y navLinks pueden no existir en
   Redes.html (no tiene menú hamburguesa).
   Se verifican antes de agregar listeners.
—————————————————————————————————————————— */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'var(--red)';
    navbar.style.boxShadow         = '0 2px 20px rgba(230,0,18,0.2)';
  } else {
    navbar.style.borderBottomColor = 'var(--red-dim)';
    navbar.style.boxShadow         = 'none';
  }
});

/* Solo agrega el listener si el botón hamburguesa existe en la página */
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}


/* ——————————————————————————————————————————
   ANIMACIÓN MW2 — DESCIFRADO DE TEXTO
—————————————————————————————————————————— */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@|01%$&~';
const SCRAMBLE_DURATION = 380;
const CHAR_DELAY = 38;

function decipherText(element) {
  const originalText = element.textContent.trim();
  if (!originalText || originalText.length === 0) return;
  if (element.querySelectorAll('[class]').length > 0) return;

  const finalText = originalText;
  const chars = finalText.split('');
  let html = '';
  chars.forEach((ch, i) => {
    if (ch === ' ') {
      html += `<span class="decipher-done"> </span>`;
    } else {
      html += `<span class="decipher-char" data-index="${i}" data-final="${ch}" style="opacity:0">${ch}</span>`;
    }
  });
  element.innerHTML = html;

  chars.forEach((ch, i) => {
    if (ch === ' ') return;
    const span = element.querySelector(`[data-index="${i}"]`);
    if (!span) return;
    const startDelay = i * CHAR_DELAY;
    const finalChar  = ch;
    setTimeout(() => {
      span.style.opacity = '1';
      span.classList.add('decipher-char');
      const scrambleInterval = setInterval(() => {
        span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }, 40);
      setTimeout(() => {
        clearInterval(scrambleInterval);
        span.textContent = finalChar;
        span.classList.remove('decipher-char');
        span.classList.add('decipher-done');
      }, SCRAMBLE_DURATION);
    }, startDelay);
  });
}

const mw2Observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('mw2-active');

    const isTextElement = (
      el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' ||
      el.tagName === 'H3' || el.tagName === 'SPAN' || el.tagName === 'A' ||
      el.tagName === 'BUTTON'
    );

    const cssDelay = parseFloat(getComputedStyle(el).transitionDelay || '0') * 1000;

    if (isTextElement && el.textContent.trim().length > 0) {
      setTimeout(() => decipherText(el), cssDelay + 60);
    }

    /* Animar barra de progreso si es skill-card */
    if (el.classList.contains('skill-card')) {
      const fill    = el.querySelector('.skill-fill');
      const percent = el.dataset.percent;
      if (fill && percent) {
        setTimeout(() => { fill.style.width = percent + '%'; }, cssDelay + 420);
      }
    }

    mw2Observer.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.mw2-reveal').forEach(el => mw2Observer.observe(el));


/* ——————————————————————————————————————————
   ROTADOR DE CÓDIGO (Hero)
   Solo se inicializa si el elemento existe en la página.
—————————————————————————————————————————— */
const codeDisplay = document.getElementById('code-display');

if (codeDisplay) {
  const CODE_BLOCKS = [
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

    `/* ANÁLISIS DE NÚCLEO — HABILIDADES */
const skills = {
  HTML:       { level: 50, rank: 'INTER.'    },
  CSS:        { level: 50, rank: 'INTER.'    },
  JavaScript: { level: 30, rank: 'JUNIOR'    },
  Python:     { level: 60, rank: 'INTER.'    },
  Git:        { level: 60, rank: 'INTER.'    },
  SQL:        { level: 60, rank: 'INTER.'    },
  Mermaid:    { level: 80, rank: 'EXPERT'    },
  CapCut:     { level: 90, rank: 'EXPERT'    },
};
// >> Todos los módulos operativos <<`,

    `/* PROTOCOLO_DE_REDES — ABIERTO */
/* CAMBIO: renombrado de CONTACTO a REDES */
const redes = ['GitHub','YouTube','Steam','Gmail'];
redes.forEach(r => console.log(\`[\${r}] ACTIVO\`));

async function openComms(config) {
  const conn = await fetch('/api/redes', {
    method: 'POST',
    body: JSON.stringify(config),
  });
  return conn.ok ? 'TRANSMITIDO' : 'ERROR';
}
// >> LISTO PARA RECIBIR TRANSMISIÓN <<`,

    `# ABSOLUTE_SOLVER — INSTANCIA ACTIVA
def identify(entity: dict) -> str:
    alias  = entity.get('alias', 'UNKNOWN')
    role   = entity.get('role',  'None')
    threat = 'NULA' if entity['friendly'] else 'ALTA'
    return f"[{alias}] {role} — threat={threat}"

agent = { 'alias': 'x BRUCAP.O.O.',
          'role': 'Programador — Editor',
          'friendly': True }
print(identify(agent))
# >> FIN_DE_TRANSMISIÓN`,
  ];

  let codeIndex = 0;
  function showCode(index) {
    codeDisplay.style.animation = 'none';
    void codeDisplay.offsetWidth;
    codeDisplay.textContent    = CODE_BLOCKS[index];
    codeDisplay.style.animation = 'code-fade-in 0.6s ease';
  }
  showCode(0);
  setInterval(() => { codeIndex = (codeIndex + 1) % CODE_BLOCKS.length; showCode(codeIndex); }, 5000);
}


/* ——————————————————————————————————————————
   SONIDO DE GLITCH EN HOVER
—————————————————————————————————————————— */
let audioCtx = null;
function playGlitch() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = audioCtx.sampleRate * 0.04;
    const buffer     = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.08;
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass'; filter.frequency.value = 1800;
    source.connect(filter); filter.connect(audioCtx.destination);
    source.start();
  } catch (e) {}
}
/* CAMBIO: selector actualizado de ".contact-card" a ".redes-card" */
document.querySelectorAll('a, button, .flip-card, .redes-card').forEach(el => {
  el.addEventListener('mouseenter', playGlitch);
});


/* ——————————————————————————————————————————
   TYPING EFFECT (Hero) — solo si existe el elemento
—————————————————————————————————————————— */
const typingEl = document.getElementById('typing-role');

if (typingEl) {
  const ROLES = [
    'Diseñador Web',
    'Programación Orientada a Objeto',
    'Editor de videos',
    'Programador FULLSTACK',
    'Prompter',
  ];
  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function typeRole() {
    const currentRole = ROLES[roleIndex];
    if (!isDeleting) {
      typingEl.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
    } else {
      typingEl.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % ROLES.length;
      }
    }
    setTimeout(typeRole, isDeleting ? 60 : 110);
  }
  setTimeout(typeRole, 1000);
}


/* ——————————————————————————————————————————
   GLITCH ESPORÁDICO en "P.O.O." — solo si existe
—————————————————————————————————————————— */
const heroPoo = document.querySelector('.hero-poo');
function randomGlitch() {
  if (!heroPoo) return;
  heroPoo.style.transform = `translateX(${(Math.random() - 0.5) * 6}px)`;
  heroPoo.style.filter    = 'brightness(1.5) hue-rotate(10deg)';
  setTimeout(() => { heroPoo.style.transform = ''; heroPoo.style.filter = ''; }, 100);
  setTimeout(randomGlitch, 2000 + Math.random() * 5000);
}
if (heroPoo) setTimeout(randomGlitch, 3000);


/* ——————————————————————————————————————————
   PARTÍCULAS FLOTANTES
—————————————————————————————————————————— */
function createParticles() {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    Object.assign(p.style, {
      position: 'fixed', borderRadius: '50%',
      width:  Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      background:     `rgba(230, 0, 18, ${Math.random() * 0.4 + 0.1})`,
      left:           Math.random() * 100 + 'vw',
      top:            Math.random() * 100 + 'vh',
      zIndex:         '1', pointerEvents: 'none',
      boxShadow:      '0 0 4px rgba(230,0,18,0.5)',
      animation:      `float-particle ${6 + Math.random() * 10}s ease-in-out infinite`,
      animationDelay: `-${Math.random() * 10}s`,
    });
    document.body.appendChild(p);
  }
}
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float-particle {
    0%   { transform: translateY(0px)   translateX(0px);   opacity: 0.3; }
    25%  { transform: translateY(-30px) translateX(10px);  opacity: 0.8; }
    50%  { transform: translateY(-60px) translateX(-10px); opacity: 0.5; }
    75%  { transform: translateY(-30px) translateX(15px);  opacity: 0.9; }
    100% { transform: translateY(0px)   translateX(0px);   opacity: 0.3; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();


/* ——————————————————————————————————————————
   LÍNEA DE ESCANEO
—————————————————————————————————————————— */
const scanLine = document.createElement('div');
Object.assign(scanLine.style, {
  position: 'fixed', top: '0', left: '0',
  width: '100%', height: '2px',
  background: 'linear-gradient(to right, transparent, rgba(230,0,18,0.4), transparent)',
  zIndex: '5', pointerEvents: 'none',
  animation: 'scan-line 6s linear infinite',
});
document.body.appendChild(scanLine);
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

/* ——————————————————————————————————————————
Botones
—————————————————————————————————————————— */
function Boton_Enviar_Correo() {

  let nombre= document.getElementById("Nombre").value;

  if (nombre == "") {
    alert("Actualmente esta función se encuentra en desarrollo, lamento los inconvenientes, si precisa contactarme puede hacerlo por las mis redes que puede encontrar debajo en ´Mis Redes ´")
  }
  if (nombre !== ""){
    alert("Hola "+ nombre + ", actualmente esta función se encuentra en desarrollo, lamento los inconvenientes, si precisa contactarme puede hacerlo por las mis redes que puede encontrar debajo en ´Mis Redes ´");
  }


}