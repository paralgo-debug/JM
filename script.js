// Configurações
const WHATSAPP = "553888129694";
const MENSAGEM = "Olá, gostaria de fazer um orçamento.";
const TOTAL_PARES = 6;

// Links do WhatsApp
const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waUrl;
  a.target = "_blank";
  a.rel = "noopener";
});

// Antes e depois
const slider = document.getElementById("slider");
const range = document.getElementById("range");
const imgAntes = document.getElementById("imgAntes");
const imgDepois = document.getElementById("imgDepois");
const thumbs = document.getElementById("thumbs");

function setPos(v) {
  slider.style.setProperty("--pos", v + "%");
  document.getElementById("line").style.setProperty("--pos", v + "%");
}
setPos(50);

// Movimento automático da linha
const AMPLITUDE = 40;      // a linha vai de 10% a 90%
const VELOCIDADE = 0.0012; // maior = mais rápido
const PAUSA_MS = 1000;     // tempo parado após o toque antes de voltar a mexer
const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
let fase = 0, ultimo = 0, retomaEm = 0, visivel = true;

function animar(agora) {
  if (visivel && !reduzMovimento && agora >= retomaEm) {
    fase += (agora - (ultimo || agora)) * VELOCIDADE;
    const v = 50 + AMPLITUDE * Math.sin(fase);
    range.value = v;
    setPos(v);
  }
  ultimo = agora;
  requestAnimationFrame(animar);
}

// Quando a pessoa mexe, a linha para e depois continua de onde parou
function pausar() {
  retomaEm = performance.now() + PAUSA_MS;
}
function sincronizar() {
  const x = Math.max(-1, Math.min(1, (range.value - 50) / AMPLITUDE));
  fase = Math.asin(x);
  setPos(range.value);
  pausar();
}
range.addEventListener("input", sincronizar);
["pointerdown", "pointermove", "touchstart", "keydown"].forEach(ev =>
  range.addEventListener(ev, pausar, { passive: true })
);
new IntersectionObserver(e => { visivel = e[0].isIntersecting; }).observe(slider);
requestAnimationFrame(animar);

function mostrar(n) {
  imgAntes.src = `antes-${n}.jpg`;
  imgDepois.src = `depois-${n}.jpg`;
  range.value = 50;
  setPos(50);
  fase = 0;
  thumbs.querySelectorAll("button").forEach((b, i) =>
    b.setAttribute("aria-current", i + 1 === n ? "true" : "false")
  );
}

for (let n = 1; n <= TOTAL_PARES; n++) {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-label", `Ver exemplo ${n}`);
  b.innerHTML = `<img src="depois-${n}.jpg" alt="" loading="lazy">`;
  b.addEventListener("click", () => mostrar(n));
  thumbs.appendChild(b);
}
mostrar(1);
