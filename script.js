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
range.addEventListener("input", () => setPos(range.value));
setPos(50);

function mostrar(n) {
  imgAntes.src = `antes-${n}.jpg`;
  imgDepois.src = `depois-${n}.jpg`;
  range.value = 50;
  setPos(50);
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
