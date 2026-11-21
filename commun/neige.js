// Neige qui tombe sur le site, commune à toutes les pages.
// - Calque transparent par-dessus la page : il ne bloque aucun clic.
// - Désactivée par défaut : le bouton ❄️ en bas à droite la lance ou l'arrête, et le choix est mémorisé.
// - En pause quand l'onglet est caché, pour ne pas consommer de batterie.
(function () {
  const KEY = "neige";
  let on = false;
  try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}

  const style = document.createElement("style");
  style.textContent = `
    #neige { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50; }
    #neige-btn {
      position: fixed; right: max(12px, env(safe-area-inset-right)); bottom: max(12px, env(safe-area-inset-bottom));
      z-index: 51; width: 44px; height: 44px; border-radius: 50%; font-size: 1.3rem; line-height: 1; cursor: pointer;
      border: 2px solid var(--line, #D6DCE8); background: var(--paper, #fff); box-shadow: 0 2px 8px rgba(0,0,0,.12);
    }
    #neige-btn[aria-pressed="false"] { opacity: .55; filter: grayscale(1); }
    #neige-btn:focus-visible { outline: 3px solid var(--orange, #FFB43A); outline-offset: 2px; }`;
  document.head.appendChild(style);

  const canvas = document.createElement("canvas");
  canvas.id = "neige";
  canvas.setAttribute("aria-hidden", "true");
  const btn = document.createElement("button");
  btn.id = "neige-btn";
  btn.type = "button";
  btn.textContent = "❄️";
  document.body.append(canvas, btn);

  const ctx = canvas.getContext("2d");
  let w, h, flakes = [], raf = null, last = 0, colors;

  // Couleur des flocons selon le fond de la page : bleu glacier sur fond clair, blanc sur fond sombre.
  function pickColors() {
    const m = getComputedStyle(document.body).backgroundColor.match(/\d+/g) || [255, 255, 255];
    const lum = (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255;
    colors = lum > 0.5
      ? { fill: "#9DBBE3", shadow: "rgba(40, 80, 140, .45)" }
      : { fill: "#FFFFFF", shadow: "rgba(150, 190, 255, .6)" };
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", pickColors);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Un flocon pour environ 9000 px², entre 25 et 140.
    const n = Math.max(25, Math.min(140, Math.round(w * h / 9000)));
    while (flakes.length < n) flakes.push(flake(true));
    flakes.length = n;
  }
  function flake(anywhere) {
    const r = 1.2 + Math.random() * 2.8;
    return {
      x: Math.random() * w, y: anywhere ? Math.random() * h : -10,
      r, vy: 18 + r * 12 + Math.random() * 10,       // px/s : les gros flocons tombent plus vite
      sway: 10 + Math.random() * 25, phase: Math.random() * Math.PI * 2, freq: .4 + Math.random() * .8,
      a: .55 + Math.random() * .4
    };
  }
  function frame(t) {
    const dt = Math.min(.05, (t - (last || t)) / 1000);
    last = t;
    ctx.clearRect(0, 0, w, h);
    ctx.shadowColor = colors.shadow;
    ctx.shadowBlur = 3;
    ctx.fillStyle = colors.fill;
    for (const f of flakes) {
      f.y += f.vy * dt;
      f.phase += f.freq * dt;
      const x = f.x + Math.sin(f.phase) * f.sway;
      if (f.y - f.r > h) Object.assign(f, flake(false));
      ctx.globalAlpha = f.a;
      ctx.beginPath();
      ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }
  function play() { if (!raf && on && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
  function render() {
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Arrêter la neige" : "Faire tomber la neige");
    btn.title = btn.getAttribute("aria-label");
    canvas.style.display = on ? "" : "none";
    if (on) play(); else { stop(); ctx.clearRect(0, 0, w, h); }
  }

  btn.addEventListener("click", () => {
    on = !on;
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
    render();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : play());
  window.addEventListener("resize", resize);
  pickColors();
  resize();
  render();
})();
