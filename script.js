/* ========= Setup ========= */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('game-container');
const $ = id => document.getElementById(id);

const startScreen = $('start-screen'), pauseScreen = $('pause-screen'), gameoverScreen = $('gameover-screen');
const scoreDisplay = $('score-display'), livesContainer = $('lives-container'), levelChip = $('level-chip'), comboChip = $('combo-chip');
const banner = $('banner'), flashEl = $('flash');

// Título com letras animadas
function buildTitle(el, text, baseDelay) {
  el.innerHTML = '';
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'tl';
    s.textContent = ch;
    s.style.animationDelay = `${(baseDelay + i * 0.18).toFixed(2)}s, ${(i * 0.2).toFixed(2)}s`;
    s.style.setProperty('--r', (i % 2 ? 2.5 : -2.5) + 'deg');
    el.appendChild(s);
  });
}
buildTitle($('t1'), 'FOOD', 0);
buildTitle($('t2'), 'CATCH', 0.4);

let W = 0, H = 0;
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
const MOBILE = window.matchMedia('(pointer: coarse)').matches;
const FX = MOBILE ? 0.6 : 1;   // menos partículas no celular
let foodSize = 40;

/* ========= Textura de madeira ========= */
const woodCanvas = document.createElement('canvas');
const woodCtx = woodCanvas.getContext('2d');

function generateWood() {
  if (!W || !H) return;
  woodCanvas.width = W; woodCanvas.height = H;
  const c = woodCtx;
  c.fillStyle = '#4a2912'; c.fillRect(0, 0, W, H);
  const ph = 78, n = Math.ceil(H / ph);
  for (let i = 0; i < n; i++) {
    const y = i * ph;
    const tone = Math.random() * 12 - 6;
    const g = c.createLinearGradient(0, y, 0, y + ph);
    g.addColorStop(0, `rgb(${112 + tone},${66 + tone},${32 + tone})`);
    g.addColorStop(0.5, `rgb(${84 + tone},${48 + tone},${22 + tone})`);
    g.addColorStop(1, `rgb(${58 + tone},${31 + tone},${12 + tone})`);
    c.fillStyle = g; c.fillRect(0, y, W, ph - 3);
    // veios
    for (let k = 0; k < 14; k++) {
      c.strokeStyle = Math.random() < 0.5 ? 'rgba(0,0,0,0.10)' : 'rgba(255,200,140,0.05)';
      c.lineWidth = 0.6 + Math.random() * 1.8;
      const gy = y + 4 + Math.random() * (ph - 10);
      c.beginPath(); c.moveTo(0, gy);
      c.bezierCurveTo(W * 0.3, gy + (Math.random() * 10 - 5), W * 0.65, gy + (Math.random() * 12 - 6), W, gy + (Math.random() * 6 - 3));
      c.stroke();
    }
    // nó da madeira
    if (Math.random() < 0.6) {
      const kx = Math.random() * W, ky = y + ph / 2 + (Math.random() * 16 - 8);
      for (let r = 12; r > 2; r -= 3) {
        c.strokeStyle = `rgba(30,12,2,${0.25 - r * 0.01})`; c.lineWidth = 1.5;
        c.beginPath(); c.ellipse(kx, ky, r * 1.8, r * 0.7, 0, 0, Math.PI * 2); c.stroke();
      }
    }
    // brilho no topo e emenda escura
    c.fillStyle = 'rgba(255,220,170,0.10)'; c.fillRect(0, y, W, 2);
    c.fillStyle = '#150a03'; c.fillRect(0, y + ph - 3, W, 3);
    // pregos
    c.fillStyle = 'rgba(20,8,2,0.7)';
    [14, W - 14].forEach(px => { c.beginPath(); c.arc(px, y + ph / 2, 2.4, 0, Math.PI * 2); c.fill(); });
  }
  const v = c.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.7)');
  c.fillStyle = v; c.fillRect(0, 0, W, H);
  // luz quente do alto (pré-renderizada)
  const hl = c.createRadialGradient(W / 2, -20, 10, W / 2, -20, H * 0.95);
  hl.addColorStop(0, 'rgba(255,205,130,0.32)'); hl.addColorStop(0.5, 'rgba(255,170,80,0.08)'); hl.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hl; c.fillRect(0, 0, W, H);
  // sombra do chão
  const fg = c.createLinearGradient(0, H - 30, 0, H);
  fg.addColorStop(0, 'rgba(0,0,0,0)'); fg.addColorStop(1, 'rgba(0,0,0,0.7)');
  c.fillStyle = fg; c.fillRect(0, H - 30, W, 30);
  // vinheta final
  const vg = c.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.45, W / 2, H / 2, Math.max(W, H) * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.45)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

function resizeCanvas() {
  W = container.clientWidth; H = container.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  plate.width = Math.max(92, Math.min(120, W * 0.28));
  foodSize = W < 420 ? 36 : 40;
  generateWood();
  bakePlate();
  plate.y = H - 88;
  plate.x = Math.min(Math.max(plate.x, 10), W - 10 - plate.width);
  initDust();
}

/* ========= Áudio ========= */
let audioReady = false, catchSynth, missSynth, uiSynth, musicSynth, bassSynth, musicLoop;
let musicOn = (localStorage.getItem('fc_music') ?? (MOBILE ? '0' : '1')) !== '0';
let sfxOn = localStorage.getItem('fc_sfx') !== '0';

function initAudio() {
  if (audioReady || typeof Tone === 'undefined') return;
  try {
    Tone.start().then(() => {
      catchSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.05, release: 0.1 } }).toDestination();
      catchSynth.volume.value = -6;
      missSynth = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 4, oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 } }).toDestination();
      missSynth.volume.value = -2;
      uiSynth = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.08, sustain: 0, release: 0.05 } }).toDestination();
      uiSynth.volume.value = -10;
      musicSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' }, envelope: { attack: 0.02, decay: 0.25, sustain: 0.15, release: 0.5 } }).toDestination();
      bassSynth = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.6 } }).toDestination();
      applyMusicVolume();
      const chords = [['C4', 'E4', 'G4', 'E4'], ['A3', 'C4', 'E4', 'C4'], ['F3', 'A3', 'C4', 'A3'], ['G3', 'B3', 'D4', 'B3']];
      const bass = ['C2', 'A1', 'F1', 'G1'];
      let step = 0;
      musicLoop = new Tone.Loop(time => {
        const bar = Math.floor(step / 8) % 4;
        musicSynth.triggerAttackRelease(chords[bar][step % 4], '8n', time);
        if (step % 8 === 0) bassSynth.triggerAttackRelease(bass[bar], '2n', time);
        step++;
      }, '8n').start(0);
      Tone.Transport.bpm.value = 108;
      Tone.Transport.start();
      audioReady = true;
    });
  } catch (e) {}
}
function applyMusicVolume() {
  if (!musicSynth) return;
  musicSynth.volume.value = musicOn ? -24 : -Infinity;
  bassSynth.volume.value = musicOn ? -16 : -Infinity;
}
function playCatchSound(c = 1) {
  if (!audioReady || !sfxOn) return;
  const notes = ['C5', 'E5', 'G5', 'B5', 'C6', 'E6'];
  catchSynth.triggerAttackRelease(notes[Math.min(c - 1, notes.length - 1)], '16n');
}
function playMissSound() { if (audioReady && sfxOn) missSynth.triggerAttackRelease('C2', '8n'); }
function playUI(n = 'A5') { if (audioReady && sfxOn) uiSynth.triggerAttackRelease(n, '32n'); }
function playLevelUp() {
  if (!audioReady || !sfxOn) return;
  const t = Tone.now();
  ['C5', 'E5', 'G5', 'C6'].forEach((n, i) => catchSynth.triggerAttackRelease(n, '16n', t + i * 0.08));
}

/* ========= Estado ========= */
let gameState = 'START';
let score = 0, lives = 5, combo = 0, level = 1, speedMultiplier = 1, spawnTimer = 0, spawnInterval = 60, frame = 0;
let highscore = parseInt(localStorage.getItem('food_catch_highscore')) || 0;
$('start-highscore').textContent = highscore;

const FOOD_TYPES = [
  { emoji: '🍕', points: 10, speed: 3.5, glow: '#ffb347' },
  { emoji: '🍔', points: 10, speed: 3.5, glow: '#ff9a3c' },
  { emoji: '🍩', points: 15, speed: 4.2, glow: '#ff7eb6' },
  { emoji: '🍦', points: 15, speed: 4.0, glow: '#ffd6f0' },
  { emoji: '🍉', points: 12, speed: 3.8, glow: '#ff5c6c' },
  { emoji: '🍟', points: 10, speed: 3.7, glow: '#ffd23f' },
  { emoji: '🌮', points: 15, speed: 4.2, glow: '#ffc04d' },
  { emoji: '🍣', points: 20, speed: 4.8, glow: '#ff8a65' },
  { emoji: '⭐', points: 50, speed: 6.0, glow: '#fff176', bonus: true }
];

const plate = { x: 0, y: 0, width: 120, height: 30, speed: 9, vx: 0, squash: 0, lastX: 0, tilt: 0 };

let foods = [], ambient = [], particles = [], rings = [], texts = [], splats = [], dust = [];
let shake = 0, flashA = 0, flashColor = '255,60,60', dangerGlow = 0, levelPulse = 0;

const keys = { left: false, right: false };

/* ========= Telas ========= */
function setState(s) { gameState = s; container.dataset.state = s; }
function showScreen(name) {
  [startScreen, pauseScreen, gameoverScreen].forEach(el => el.classList.remove('active'));
  if (name) $(name).classList.add('active');
}
function showPanel(name) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('show'));
  $('panel-' + name).classList.add('show');
}
function goMenu() { setState('START'); foods = []; showPanel('main'); showScreen('start-screen'); $('start-highscore').textContent = highscore; }

function startGame() {
  score = 0; lives = 5; combo = 0; level = 1; speedMultiplier = 0.6; spawnInterval = 80; spawnTimer = 0;
  foods = []; ambient = []; particles = []; rings = []; texts = []; splats = [];
  shake = 0; flashA = 0;
  plate.x = W / 2 - plate.width / 2; plate.y = H - 88; plate.lastX = plate.x;
  fx.slow = fx.magnet = fx.double = 0; shield = false; lastPower = frame;
  updatePowerBar();
  updateHUD(); updateCombo(true);
  showScreen(null);
  setState('PLAYING');
}
function togglePause() {
  if (gameState === 'PLAYING') { setState('PAUSED'); showScreen('pause-screen'); }
  else if (gameState === 'PAUSED') { setState('PLAYING'); showScreen(null); }
}
function gameOver() {
  setState('GAMEOVER');
  const isRecord = score > highscore && score > 0;
  if (isRecord) { highscore = score; localStorage.setItem('food_catch_highscore', highscore); }
  $('final-score').textContent = score;
  $('final-level').textContent = level;
  $('final-highscore').textContent = highscore;
  $('new-record').classList.toggle('show', isRecord);
  updateCombo(true);
  if (isRecord) confettiBurst();
  setTimeout(() => showScreen('gameover-screen'), 600);
}

function updateHUD(popScore) {
  scoreDisplay.textContent = score;
  if (popScore) { scoreDisplay.classList.remove('pop'); void scoreDisplay.offsetWidth; scoreDisplay.classList.add('pop'); }
  let h = '';
  for (let i = 0; i < 5; i++) h += i < lives ? '❤️' : '🖤';
  livesContainer.innerHTML = h;
  livesContainer.classList.toggle('danger', lives === 1);
  levelChip.textContent = 'Nível ' + level;
}
function updateCombo(hide) {
  if (hide || combo < 2) { comboChip.classList.remove('show'); return; }
  comboChip.textContent = '🔥 COMBO x' + combo;
  comboChip.classList.add('show');
  comboChip.classList.remove('pop'); void comboChip.offsetWidth; comboChip.classList.add('pop');
}
function showBanner(text) {
  banner.textContent = text;
  banner.classList.remove('go'); void banner.offsetWidth; banner.classList.add('go');
}
function flashScreen(rgb, a = 0.35) { flashColor = rgb; flashA = a; }

/* ========= Controles ========= */
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') togglePause();
});
window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
});
[['btn-left', 'left'], ['btn-right', 'right']].forEach(([id, k]) => {
  const el = $(id);
  el.addEventListener('touchstart', e => { e.preventDefault(); keys[k] = true; });
  el.addEventListener('touchend', e => { e.preventDefault(); keys[k] = false; });
  el.addEventListener('touchcancel', () => { keys[k] = false; });
});
function pointerMove(clientX) {
  if (gameState !== 'PLAYING') return;
  const r = canvas.getBoundingClientRect();
  plate.x = clientX - r.left - plate.width / 2;
}
canvas.addEventListener('touchmove', e => { e.preventDefault(); if (e.touches.length) pointerMove(e.touches[0].clientX); }, { passive: false });
canvas.addEventListener('touchstart', e => { if (e.touches.length) pointerMove(e.touches[0].clientX); }, { passive: true });
canvas.addEventListener('mousemove', e => { if (e.buttons === 1) pointerMove(e.clientX); });
canvas.addEventListener('mousedown', e => pointerMove(e.clientX));

/* ========= Botões ========= */
$('start-btn').addEventListener('click', () => { initAudio(); setTimeout(() => playUI('C6'), 120); startGame(); });
$('how-btn').addEventListener('click', () => { initAudio(); playUI(); showPanel('how'); });
$('opts-btn').addEventListener('click', () => { initAudio(); playUI(); showPanel('opts'); });
document.querySelectorAll('.back-btn').forEach(b => b.addEventListener('click', () => { playUI('E5'); showPanel('main'); }));
$('resume-btn').addEventListener('click', () => { playUI(); togglePause(); });
$('restart-pause-btn').addEventListener('click', () => { playUI(); startGame(); });
$('menu-pause-btn').addEventListener('click', () => { playUI(); goMenu(); });
$('restart-btn').addEventListener('click', () => { playUI(); startGame(); });
$('menu-go-btn').addEventListener('click', () => { playUI(); goMenu(); });
$('pause-btn').addEventListener('click', () => { playUI(); togglePause(); });

function refreshToggles() {
  const m = $('music-toggle'), s = $('sfx-toggle');
  m.textContent = '🎵 Música: ' + (musicOn ? 'LIGADA' : 'DESLIGADA'); m.classList.toggle('off', !musicOn);
  s.textContent = '🔊 Efeitos: ' + (sfxOn ? 'LIGADOS' : 'DESLIGADOS'); s.classList.toggle('off', !sfxOn);
}
$('music-toggle').addEventListener('click', () => { initAudio(); musicOn = !musicOn; localStorage.setItem('fc_music', musicOn ? '1' : '0'); applyMusicVolume(); refreshToggles(); playUI(); });
$('sfx-toggle').addEventListener('click', () => { initAudio(); sfxOn = !sfxOn; localStorage.setItem('fc_sfx', sfxOn ? '1' : '0'); refreshToggles(); playUI(); });
$('reset-btn').addEventListener('click', () => { highscore = 0; localStorage.removeItem('food_catch_highscore'); $('start-highscore').textContent = 0; playUI('A4'); });
refreshToggles();

/* ========= Efeitos ========= */
function rnd(a, b) { return a + Math.random() * (b - a); }

function createParticles(x, y, color, count = 12, o = {}) {
  count = Math.ceil(count * FX);
  if (particles.length > 140) return;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, sp = rnd(1.5, o.speed || 6);
    particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (o.up || 2), r: rnd(1.5, o.size || 4.5), color, alpha: 1, decay: o.decay || 0.03, g: o.g || 0.12, shape: o.shape || 'circle', rot: rnd(0, 6), vr: rnd(-0.3, 0.3), glow: o.glow !== false });
  }
}
function confettiBurst() {
  const cols = ['#ff4d6d', '#ffd23f', '#4dd8ff', '#7dff6b', '#c77dff', '#ff9a3c'];
  for (let k = 0; k < 6; k++) {
    setTimeout(() => {
      const cx = rnd(W * 0.15, W * 0.85), cy = rnd(H * 0.2, H * 0.45);
      for (let i = 0; i < 40; i++) {
        const a = Math.random() * Math.PI * 2, sp = rnd(2, 8);
        particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3, r: rnd(3, 6), color: cols[(Math.random() * cols.length) | 0], alpha: 1, decay: 0.008, g: 0.15, shape: 'rect', rot: rnd(0, 6), vr: rnd(-0.3, 0.3), glow: false });
      }
      rings.push({ x: cx, y: cy, r: 4, max: 90, alpha: 0.8, color: '255,230,120', w: 4 });
    }, k * 160);
  }
}
function addText(text, x, y, color = '#ffd700', size = 22) {
  texts.push({ text, x, y, alpha: 1, color, vy: -1.8, size, scale: 0.4 });
}
function addRing(x, y, color, max = 60) { rings.push({ x, y, r: 6, max, alpha: 0.9, color, w: 3 }); }
function addSplat(x, color) {
  splats.push({ x, y: H - 12, alpha: 0.85, r: rnd(12, 20), color, drops: Array.from({ length: 6 }, () => ({ dx: rnd(-22, 22), dy: rnd(-12, 2), r: rnd(2, 5) })) });
}

function initDust() {
  dust = Array.from({ length: Math.round(28 * FX) }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.8, 2.4), vx: rnd(-0.15, 0.15), vy: rnd(-0.25, -0.05), ph: rnd(0, 6) }));
}

/* ========= Spawn ========= */
function spawnFood() {
  if (frame - lastPower > 420 && Math.random() < (lives <= 2 ? 0.28 : 0.15)) { spawnPower(); return; }
  const bonus = Math.random() < 0.08;
  const t = bonus ? FOOD_TYPES[FOOD_TYPES.length - 1] : FOOD_TYPES[(Math.random() * (FOOD_TYPES.length - 1)) | 0];
  foods.push({ x: rnd(26, W - 26), y: -40, size: foodSize, speed: (t.speed + Math.random() * 0.8) * speedMultiplier, emoji: t.emoji, points: t.points, bonus: !!t.bonus, glow: t.glow, rot: 0, vr: rnd(-0.05, 0.05), ph: rnd(0, 6) });
}
function spawnAmbient() {
  const t = FOOD_TYPES[(Math.random() * FOOD_TYPES.length) | 0];
  ambient.push({ x: rnd(0, W), y: -50, size: [30, 42, 54][(Math.random() * 3) | 0], speed: rnd(0.8, 2.2), emoji: t.emoji, glow: t.glow, rot: rnd(0, 6), vr: rnd(-0.03, 0.03), sway: rnd(0, 6), alpha: 1 });
}

/* ========= Atualização ========= */
function update() {
  frame++;

  // poeira / ambiente
  dust.forEach(d => { d.x += d.vx; d.y += d.vy; d.ph += 0.03; if (d.y < -5) { d.y = H + 5; d.x = rnd(0, W); } if (d.x < -5) d.x = W + 5; if (d.x > W + 5) d.x = -5; });

  if (gameState !== 'PLAYING') {
    if (gameState === 'START' || gameState === 'GAMEOVER' || gameState === 'PAUSED') {
      if (gameState !== 'PAUSED' && frame % 22 === 0) spawnAmbient();
      if (gameState !== 'PAUSED') ambient.forEach(a => { a.y += a.speed; a.rot += a.vr; a.sway += 0.02; a.x += Math.sin(a.sway) * 0.4; });
      ambient = ambient.filter(a => a.y < H + 80);
    }
  } else {
    updatePlay();
  }
  if (gameState !== 'PAUSED') updateFX();
}

function updatePlay() {
  if (keys.left) plate.x -= plate.speed;
  if (keys.right) plate.x += plate.speed;
  if (plate.x < 10) plate.x = 10;
  if (plate.x + plate.width > W - 10) plate.x = W - 10 - plate.width;

  const newLevel = 1 + Math.floor(score / 80);
  // começa bem devagar e acelera aos poucos, de forma contínua
  speedMultiplier = Math.min(1.8, 0.6 + score * 0.0012);
  spawnInterval = Math.max(34, 80 - Math.floor(score / 40) * 2);
  if (newLevel > level) {
    level = newLevel; updateHUD();
    showBanner('NÍVEL ' + level + '!');
    flashScreen('255,210,80', 0.35); addRing(W / 2, H / 2, '255,220,120', 220);
    createParticles(W / 2, H / 2, '#ffe27a', 40, { speed: 9, size: 5 });
    playLevelUp();
  }

  // power-ups ativos
  let pchanged = false;
  for (const k of ['slow', 'magnet', 'double']) { if (fx[k] > 0) { fx[k]--; if (fx[k] === 0) pchanged = true; } }
  if (pchanged || frame % 5 === 0) updatePowerBar();
  if (fx.magnet > 0 && frame % 24 === 0) addRing(plate.x + plate.width / 2, plate.y, '255,140,80', 90);
  if (fx.double > 0 && frame % 8 === 0) createParticles(plate.x + rnd(0, plate.width), plate.y, '#ffe27a', 1, { speed: 1.5, size: 3, decay: 0.05, up: 3 });

  if (++spawnTimer >= spawnInterval) { spawnFood(); spawnTimer = 0; }

  let danger = 0;
  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i];
    f.y += f.speed * (fx.slow > 0 ? 0.55 : 1); f.rot += f.vr; f.ph += 0.15;
    if (fx.magnet > 0 && f.y > 30) f.x += (plate.x + plate.width / 2 - f.x) * 0.07;
    if (!f.power && f.y > H * 0.78) danger = Math.max(danger, (f.y - H * 0.78) / (H * 0.22));

    // rastro de estrela
    if (f.bonus && frame % 2 === 0) createParticles(f.x, f.y, '#fff3a0', 1, { speed: 1.5, size: 3, decay: 0.05, g: 0.02, up: 0 });
    else if (frame % 6 === 0) createParticles(f.x, f.y - 8, f.glow, 1, { speed: 0.8, size: 2.2, decay: 0.06, g: -0.02, up: 0 });

    // pegou
    if (f.y + f.size / 2 >= plate.y && f.y - f.size / 2 <= plate.y + plate.height && f.x >= plate.x - 10 && f.x <= plate.x + plate.width + 10) {
      if (f.power) { collectPower(f); foods.splice(i, 1); continue; }
      combo++;
      let gained = f.points + (combo > 3 ? combo * 2 : 0);
      if (fx.double > 0) gained *= 2;
      score += gained;
      plate.squash = 1;
      playCatchSound(combo);
      createParticles(f.x, plate.y, f.bonus ? '#ffe100' : f.glow, f.bonus ? 28 : 14, { speed: 7, size: 4.5 });
      createParticles(f.x, plate.y, '#ffffff', 6, { speed: 4, size: 2.5 });
      addRing(f.x, plate.y + 6, f.bonus ? '255,225,60' : '255,255,255', f.bonus ? 80 : 50);
      addText('+' + gained + (combo > 2 ? '  ' + combo + 'x' : ''), f.x, plate.y - 14, f.bonus ? '#ffe100' : '#ffffff', f.bonus ? 28 : 22);
      if (f.bonus) { flashScreen('255,230,100', 0.25); shake = Math.max(shake, 5); }
      if (combo > 0 && combo % 5 === 0) { addText('🔥 COMBO ' + combo + '!', W / 2, H * 0.42, '#ff9a3c', 34); flashScreen('255,140,40', 0.2); }
      updateHUD(true); updateCombo();
      foods.splice(i, 1);
      continue;
    }

    // chão
    if (f.y > H - 18) {
      if (f.power) { createParticles(f.x, H - 20, f.glow, 6, { speed: 3 }); foods.splice(i, 1); continue; }
      combo = 0; updateCombo(true);
      if (!f.bonus) {
        if (shield) {
          shield = false; updatePowerBar();
          addText('🛡️ BLOQUEADO!', f.x, H - 50, '#8fdcff', 24);
          addRing(f.x, H - 20, '90,200,255', 90);
          createParticles(f.x, H - 20, '#8fdcff', 16, { speed: 6 });
          flashScreen('90,200,255', 0.25);
          foods.splice(i, 1); continue;
        }
        lives--;
        playMissSound();
        shake = 14; flashScreen('255,50,50', 0.4);
        if (navigator.vibrate) navigator.vibrate(60);
        createParticles(f.x, H - 20, '#ff5555', 18, { speed: 6 });
        addSplat(f.x, '#ff4d4d');
        addText('ERROU! ❌', f.x, H - 50, '#ff5555', 24);
        updateHUD();
        if (lives <= 0) { foods.splice(i, 1); gameOver(); return; }
      } else {
        addText('⭐ escapou...', f.x, H - 50, '#ffe58a', 18);
        createParticles(f.x, H - 20, '#fff3a0', 8, { speed: 3 });
      }
      foods.splice(i, 1);
    }
  }
  dangerGlow += (danger - dangerGlow) * 0.1;
}

function updateFX() {
  plate.vx = plate.x - plate.lastX; plate.lastX = plate.x;
  plate.tilt += (Math.max(-0.25, Math.min(0.25, plate.vx * 0.02)) - plate.tilt) * 0.2;
  plate.squash *= 0.86;
  shake *= 0.88; if (shake < 0.2) shake = 0;
  flashA *= 0.9;
  if (flashA > 0.02) {
    if (flashEl._c !== flashColor) { flashEl._c = flashColor; flashEl.style.background = `radial-gradient(circle, rgba(${flashColor},0) 30%, rgba(${flashColor},0.9) 100%)`; }
    flashEl.style.opacity = Math.min(1, flashA / 0.9);
  } else if (flashEl.style.opacity !== '0') flashEl.style.opacity = 0;
  if (gameState !== 'PLAYING') dangerGlow *= 0.9;

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.99; p.rot += p.vr; p.alpha -= p.decay;
    if (p.alpha <= 0) particles.splice(i, 1);
  }
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i]; r.r += (r.max - r.r) * 0.14 + 0.6; r.alpha -= 0.035;
    if (r.alpha <= 0) rings.splice(i, 1);
  }
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i]; t.y += t.vy; t.alpha -= 0.018; t.scale += (1 - t.scale) * 0.25;
    if (t.alpha <= 0) texts.splice(i, 1);
  }
  for (let i = splats.length - 1; i >= 0; i--) { splats[i].alpha -= 0.004; if (splats[i].alpha <= 0) splats.splice(i, 1); }
}

/* ========= Desenho ========= */
function drawFoodEmoji(x, y, size, rot, emoji, glow, glowSize, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y); ctx.rotate(rot);
  // sombra projetada
  ctx.shadowColor = 'rgba(0,0,0,0)'; ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath(); ctx.ellipse(4, 12, size / 2.2, size / 5, 0, 0, Math.PI * 2); ctx.fill();
  // brilho
  ctx.shadowColor = glow; ctx.shadowBlur = glowSize;
  ctx.font = `${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",Arial`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff'; // opaco: o emoji herda a opacidade do fillStyle
  ctx.fillText(emoji, 0, 0);
  // segunda passada sem brilho: deixa a comida totalmente sólida e nítida
  ctx.shadowColor = 'rgba(0,0,0,0)'; ctx.shadowBlur = 0;
  ctx.fillText(emoji, 0, 0);
  ctx.restore();
}

function drawPlate() {
  const cx = plate.x + plate.width / 2, cy = plate.y + plate.height / 2;
  const sx = 1 + plate.squash * 0.18, sy = 1 - plate.squash * 0.3;
  const pw = plate.width, ph = plate.height;

  // luz embaixo do prato
  const lg = ctx.createRadialGradient(cx, cy + 16, 4, cx, cy + 16, pw * 0.9);
  lg.addColorStop(0, 'rgba(255,225,170,0.22)'); lg.addColorStop(1, 'rgba(255,225,170,0)');
  ctx.fillStyle = lg; ctx.fillRect(cx - pw, cy - pw * 0.6, pw * 2, pw * 1.6);

  // sombra
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath(); ctx.ellipse(cx, plate.y + ph + 12, pw / 2 + 4, 8, 0, 0, Math.PI * 2); ctx.fill();

  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(plate.tilt); ctx.scale(sx, sy);
  const rx = pw / 2, ry = ph / 2;

  // borda externa (profundidade)
  ctx.fillStyle = '#9a9aa6';
  ctx.beginPath(); ctx.ellipse(0, 4, rx, ry, 0, 0, Math.PI * 2); ctx.fill();

  // aro
  const og = ctx.createLinearGradient(0, -ry, 0, ry);
  og.addColorStop(0, '#ffffff'); og.addColorStop(0.5, '#dcdce6'); og.addColorStop(1, '#a8a8b8');
  ctx.fillStyle = og;
  ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill();

  // filete dourado
  ctx.strokeStyle = '#e8b84a'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.ellipse(0, 0, rx - 2, ry - 1.5, 0, 0, Math.PI * 2); ctx.stroke();

  // centro
  const ig = ctx.createRadialGradient(0, -ry * 0.3, 2, 0, 0, rx - 8);
  ig.addColorStop(0, '#ffffff'); ig.addColorStop(0.7, '#f1f1f7'); ig.addColorStop(1, '#d4d4e2');
  ctx.fillStyle = ig;
  ctx.beginPath(); ctx.ellipse(0, 0, rx - 9, ry - 5.5, 0, 0, Math.PI * 2); ctx.fill();

  // pintura azul de porcelana
  ctx.strokeStyle = 'rgba(70,110,200,0.75)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.ellipse(0, 0, rx - 13, ry - 8, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(70,110,200,0.65)';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath(); ctx.arc(Math.cos(a) * (rx - 19), Math.sin(a) * (ry - 11), 1.4, 0, Math.PI * 2); ctx.fill();
  }

  // brilho
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath(); ctx.ellipse(-rx * 0.25, -ry * 0.55, rx * 0.35, 2.2, -0.1, 0, Math.PI * 2); ctx.fill();
  const sp = 0.6 + 0.4 * Math.sin(frame * 0.08);
  ctx.fillStyle = `rgba(255,255,255,${0.5 * sp})`;
  ctx.beginPath(); ctx.arc(rx * 0.55, -ry * 0.4, 2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  if (shake > 0) ctx.translate(rnd(-shake, shake), rnd(-shake, shake));

  // fundo
  if (woodCanvas.width) ctx.drawImage(woodCanvas, 0, 0);


  // respingos no chão
  splats.forEach(s => {
    ctx.save(); ctx.globalAlpha = Math.max(0, s.alpha); ctx.fillStyle = s.color;
    ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r, s.r * 0.4, 0, 0, Math.PI * 2); ctx.fill();
    s.drops.forEach(d => { ctx.beginPath(); ctx.arc(s.x + d.dx, s.y + d.dy, d.r, 0, Math.PI * 2); ctx.fill(); });
    ctx.restore();
  });

  // chão / faixa de perigo
  if (gameState === 'PLAYING' || gameState === 'PAUSED') {
    const pulse = 0.5 + 0.5 * Math.sin(frame * 0.2);
    const a = 0.12 + dangerGlow * (0.45 + pulse * 0.25) + (lives === 1 ? 0.12 * pulse : 0);
    const dg = ctx.createLinearGradient(0, H - 70, 0, H);
    dg.addColorStop(0, 'rgba(255,40,40,0)'); dg.addColorStop(1, `rgba(255,50,50,${a})`);
    ctx.fillStyle = dg; ctx.fillRect(0, H - 70, W, 70);
  }

  // comidas decorativas do menu
  ambient.forEach(a => drawFoodSprite(a.x, a.y, a.size, a.rot, a.emoji, a.glow, 1, 1));

  // poeira dourada
  dust.forEach(d => {
    const al = 0.25 + 0.25 * Math.sin(d.ph);
    ctx.fillStyle = `rgba(255,225,170,${al})`;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
  });

  // comidas
  foods.forEach(f => {
    if (f.power) {
      const pr = f.size * 0.78 + Math.sin(f.ph) * 3;
      ctx.save();
      ctx.globalAlpha = 0.22; ctx.fillStyle = f.glow;
      ctx.beginPath(); ctx.arc(f.x, f.y, pr, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.95; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
    const sc = (f.bonus || f.power) ? 1 + 0.09 * Math.sin(f.ph) : 1;
    drawFoodSprite(f.x, f.y, f.size, f.rot, f.emoji, f.glow, 1, sc);
  });

  // prato
  if (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'GAMEOVER') drawPlateFast();

  // tom roxo da câmera lenta
  if (fx.slow > 0) { ctx.fillStyle = 'rgba(120,90,200,0.14)'; ctx.fillRect(-20, -20, W + 40, H + 40); }

  // anéis
  rings.forEach(r => {
    ctx.save(); ctx.globalAlpha = Math.max(0, r.alpha);
    ctx.strokeStyle = `rgb(${r.color})`; ctx.lineWidth = r.w;
    ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  });

  // partículas
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') { ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r); }
    else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * Math.max(0.3, p.alpha), 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  });

  // textos
  texts.forEach(t => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, t.alpha);
    ctx.translate(t.x, t.y); ctx.scale(t.scale, t.scale);
    ctx.font = `700 ${t.size}px Fredoka, sans-serif`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(30,10,0,0.9)'; ctx.lineJoin = 'round';
    ctx.strokeText(t.text, 0, 0);
    ctx.fillStyle = t.color; ctx.fillText(t.text, 0, 0);
    ctx.restore();
  });

  ctx.restore();
}

/* ========= Power-ups ========= */
const POWERS = [
  { id: 'life',   emoji: '❤️', glow: '#ff4d6d', rgb: '255,77,109',  color: '#ff8fa3', label: '+1 VIDA!',       w: 3 },
  { id: 'shield', emoji: '🛡️', glow: '#5ad1ff', rgb: '90,200,255',  color: '#8fdcff', label: 'ESCUDO!',        w: 2 },
  { id: 'slow',   emoji: '⏳', glow: '#b898f0', rgb: '184,152,240', color: '#d4c0ff', label: 'CÂMERA LENTA!',  w: 2 },
  { id: 'magnet', emoji: '🧲', glow: '#ff7a45', rgb: '255,122,69',  color: '#ffb08a', label: 'ÍMÃ!',           w: 2 },
  { id: 'double', emoji: '✨', glow: '#ffe27a', rgb: '255,226,122', color: '#ffe89e', label: 'PONTOS x2!',     w: 2 }
];
const PDUR = { slow: 420, magnet: 480, double: 600 };
const fx = { slow: 0, magnet: 0, double: 0 };
let shield = false, lastPower = 0;
const PC = { shield: $('pc-shield'), slow: $('pc-slow'), magnet: $('pc-magnet'), double: $('pc-double') };

function pickPower() {
  const pool = POWERS.filter(t => !(t.id === 'life' && lives >= 5) && !(t.id === 'shield' && shield));
  const wt = t => (t.id === 'life' && lives <= 2) ? 8 : t.w;
  let r = Math.random() * pool.reduce((a, t) => a + wt(t), 0);
  for (const t of pool) { r -= wt(t); if (r <= 0) return t; }
  return pool[0];
}
function spawnPower() {
  const t = pickPower();
  lastPower = frame;
  foods.push({ x: rnd(30, W - 30), y: -40, size: foodSize + 6, speed: 3.2 * Math.max(0.75, Math.min(speedMultiplier, 1.5)), emoji: t.emoji, points: 0, bonus: false, power: t.id, glow: t.glow, rot: 0, vr: 0, ph: rnd(0, 6) });
}
function collectPower(f) {
  const t = POWERS.find(p => p.id === f.power);
  playPower();
  plate.squash = 1;
  createParticles(f.x, plate.y, t.glow, 26, { speed: 8, size: 5 });
  addRing(f.x, plate.y + 6, t.rgb, 120);
  addRing(f.x, plate.y + 6, '255,255,255', 70);
  addText(t.label, f.x, plate.y - 22, t.color, 26);
  flashScreen(t.rgb, 0.25);
  if (t.id === 'life') { if (lives < 5) lives++; updateHUD(true); }
  else if (t.id === 'shield') shield = true;
  else fx[t.id] = PDUR[t.id];
  updatePowerBar();
}
function updatePowerBar() {
  PC.shield.classList.toggle('on', shield);
  for (const k of ['slow', 'magnet', 'double']) {
    const el = PC[k], on = fx[k] > 0;
    el.classList.toggle('on', on);
    if (on) { el.lastElementChild.style.transform = `scaleX(${(fx[k] / PDUR[k]).toFixed(3)})`; el.classList.toggle('warn', fx[k] < 90); }
  }
}
function playPower() {
  if (!audioReady || !sfxOn) return;
  const t = Tone.now();
  ['E5', 'G5', 'B5', 'E6'].forEach((n, i) => catchSynth.triggerAttackRelease(n, '16n', t + i * 0.06));
}

/* ========= Sprites pré-renderizados (leve) ========= */
const sprites = {};
function getSprite(emoji, glow, size) {
  const key = emoji + size;
  let s = sprites[key];
  if (s) return s;
  const pad = Math.ceil(size * 0.45), full = size + pad * 2;
  const c = document.createElement('canvas');
  c.width = c.height = Math.ceil(full * dpr);
  const x = c.getContext('2d');
  x.scale(dpr, dpr);
  x.font = `${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",Arial`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#ffffff';
  x.shadowColor = glow; x.shadowBlur = size * 0.4;
  x.fillText(emoji, full / 2, full / 2);
  x.shadowColor = 'rgba(0,0,0,0)'; x.shadowBlur = 0;
  x.fillText(emoji, full / 2, full / 2);
  s = { c, full };
  sprites[key] = s;
  return s;
}
function drawFoodSprite(x, y, size, rot, emoji, glow, alpha, scale) {
  const s = getSprite(emoji, glow, size);
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath(); ctx.ellipse(x + 4, y + 12, size / 2.2, size / 5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save();
  ctx.translate(x, y); ctx.rotate(rot);
  if (scale !== 1) ctx.scale(scale, scale);
  if (alpha < 1) ctx.globalAlpha = alpha;
  ctx.drawImage(s.c, -s.full / 2, -s.full / 2, s.full, s.full);
  ctx.restore();
}

let plateSprite = null, plateSW = 0, plateSH = 0;
function bakePlate() {
  const pw = plate.width, ph = plate.height;
  plateSW = pw + 12; plateSH = ph + 20;
  const c = document.createElement('canvas');
  c.width = Math.ceil(plateSW * dpr); c.height = Math.ceil(plateSH * dpr);
  const x = c.getContext('2d');
  x.scale(dpr, dpr); x.translate(plateSW / 2, plateSH / 2);
  const rx = pw / 2, ry = ph / 2;
  x.fillStyle = '#9a9aa6';
  x.beginPath(); x.ellipse(0, 4, rx, ry, 0, 0, Math.PI * 2); x.fill();
  const og = x.createLinearGradient(0, -ry, 0, ry);
  og.addColorStop(0, '#ffffff'); og.addColorStop(0.5, '#dcdce6'); og.addColorStop(1, '#a8a8b8');
  x.fillStyle = og;
  x.beginPath(); x.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); x.fill();
  x.strokeStyle = '#e8b84a'; x.lineWidth = 1.6;
  x.beginPath(); x.ellipse(0, 0, rx - 2, ry - 1.5, 0, 0, Math.PI * 2); x.stroke();
  const ig = x.createRadialGradient(0, -ry * 0.3, 2, 0, 0, rx - 8);
  ig.addColorStop(0, '#ffffff'); ig.addColorStop(0.7, '#f1f1f7'); ig.addColorStop(1, '#d4d4e2');
  x.fillStyle = ig;
  x.beginPath(); x.ellipse(0, 0, rx - 9, ry - 5.5, 0, 0, Math.PI * 2); x.fill();
  x.strokeStyle = 'rgba(70,110,200,0.75)'; x.lineWidth = 1.2;
  x.beginPath(); x.ellipse(0, 0, rx - 13, ry - 8, 0, 0, Math.PI * 2); x.stroke();
  x.fillStyle = 'rgba(70,110,200,0.65)';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    x.beginPath(); x.arc(Math.cos(a) * (rx - 19), Math.sin(a) * (ry - 11), 1.4, 0, Math.PI * 2); x.fill();
  }
  x.fillStyle = 'rgba(255,255,255,0.8)';
  x.beginPath(); x.ellipse(-rx * 0.25, -ry * 0.55, rx * 0.35, 2.2, -0.1, 0, Math.PI * 2); x.fill();
  plateSprite = c;
}
function drawPlateFast() {
  if (!plateSprite) return;
  const cx = plate.x + plate.width / 2, cy = plate.y + plate.height / 2;
  const sx = 1 + plate.squash * 0.18, sy = 1 - plate.squash * 0.3;
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath(); ctx.ellipse(cx, plate.y + plate.height + 12, plate.width / 2 + 4, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(plate.tilt); ctx.scale(sx, sy);
  ctx.drawImage(plateSprite, -plateSW / 2, -plateSH / 2, plateSW, plateSH);
  ctx.restore();
  if (shield) {
    const pu = 0.5 + 0.5 * Math.sin(frame * 0.15);
    ctx.save();
    ctx.globalAlpha = 0.16 + 0.1 * pu; ctx.fillStyle = '#5ad1ff';
    ctx.beginPath(); ctx.ellipse(cx, cy, plate.width / 2 + 14, plate.height / 2 + 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.75; ctx.strokeStyle = '#bfeaff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }
}

/* ========= Loop (passo fixo: mesma velocidade em 60Hz e 120Hz) ========= */
const STEP = 1000 / 60;
let lastT = 0, acc = 0;
function loop(t) {
  requestAnimationFrame(loop);
  if (!lastT) lastT = t;
  let d = t - lastT; lastT = t;
  if (d > 100) d = 100;
  acc += d;
  let n = 0;
  while (acc >= STEP && n < 3) { update(); acc -= STEP; n++; }
  if (n === 3) acc = 0;
  if (n > 0) draw();
}

const plateInit = plate;
let resizeT;
function onResize() { clearTimeout(resizeT); resizeT = setTimeout(resizeCanvas, 150); }
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', onResize);
resizeCanvas();
plate.x = W / 2 - plate.width / 2; plate.lastX = plate.x;
updateHUD();
requestAnimationFrame(loop);