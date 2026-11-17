// Cadeau de fin de quiz, commun à tous les quiz : une vidéo Karambolage (ARTE) tirée au hasard
// dans karambolage.js, parmi celles encore en ligne, à partir de 80 % de réponses justes du premier coup.
// Le lecteur ARTE n'est chargé qu'au clic : rien ne se lance ni ne se télécharge tout seul.
// Utilisation : cadeau(element, justes, total, "mots") — le dernier mot sert au message d'encouragement.
function cadeau(el, good, n, unit) {
  const needed = Math.ceil(n * 4 / 5);
  if (good < needed) {
    el.innerHTML = `
      <p class="gift-title">🎁 Un <span class="hl">cadeau</span> t’attend…</p>
      <p>… à partir de ${needed} / ${n} ${unit} justes du premier coup (80 %). Il t’en manque ${needed - good}. Refais un tour !</p>`;
    return;
  }
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const today = new Date().toISOString().slice(0, 10);
  const list = (typeof KARAMBOLAGE === "undefined" ? [] : KARAMBOLAGE).filter(v => v[4] > today);
  if (!list.length) {
    el.innerHTML = `
      <p class="gift-title">🎁 Ton <span class="hl">cadeau</span></p>
      <p>Va voir les vidéos de <a href="https://www.arte.tv/fr/videos/RC-014034/karambolage/" target="_blank" rel="noopener"><em>Karambolage</em> sur arte.tv</a>.</p>`;
    return;
  }
  const [id, label, title, img] = list[Math.floor(Math.random() * list.length)];
  const t = esc(title);
  el.innerHTML = `
    <p class="gift-title">🎁 Ton <span class="hl">cadeau</span></p>
    <p>Une vidéo de <em>Karambolage</em>, l’émission d’ARTE qui s’amuse des petites différences entre les pays. Il y en a ${list.length}, une nouvelle à chaque fois !</p>
    <button class="gift-video" type="button" style="background-image:url('https://api-cdn.arte.tv/img/v2/image/${img}/640x360')" aria-label="Regarder la vidéo : ${t}"></button>
    <p class="gift-label">${esc(KARAMBOLAGE_LABELS[label])}</p>
    <p class="gift-name">${t}</p>
    <a class="gift-link" href="https://www.arte.tv/fr/videos/${id}/" target="_blank" rel="noopener">Regarder sur arte.tv</a>`;
  const btn = el.querySelector(".gift-video");
  btn.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = `https://www.arte.tv/embeds/fr/${id}?autoplay=true`;
    f.title = "Karambolage – " + title;
    f.allow = "autoplay; fullscreen; picture-in-picture";
    f.allowFullscreen = true;
    btn.replaceWith(f);
  });
}
