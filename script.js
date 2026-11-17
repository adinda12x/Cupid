const sealBtn = document.getElementById("seal-btn");
const sealZone = document.querySelector(".seal-zone");
const stageSeal = document.getElementById("stage-seal");
const stageCard = document.getElementById("stage-card");

const promptPanel = document.getElementById("prompt-panel");
const resultPanel = document.getElementById("result-panel");
const yesChoice = document.getElementById("yes-choice");
const dodgeChoice = document.getElementById("dodge-choice");
const choiceZone = document.getElementById("choice-zone");
const starField = document.getElementById("star-field");

let isUnsealed = false;

// Gambar maskot kelinci piksel memegang bintang
function drawPixelBunny(canvasId, cheerful = false) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = 7;

  const sprite = [
    "...##....##...",
    "...##....##...",
    "...##....##...",
    "..##########..",
    ".############.",
    ".############.",
    ".###.#..#.###.",
    ".############.",
    "..##########..",
    "...########...",
    "....######....",
    ".....#..#.....",
  ];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sprite.forEach((row, r) => {
    [...row].forEach((cell, c) => {
      if (cell === "#") {
        ctx.fillStyle = "#2e2342";
        ctx.fillRect(c * size, r * size, size, size);
      }
    });
  });

  // Mata
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(4 * size, 6 * size, size, size);
  ctx.fillRect(9 * size, 6 * size, size, size);

  if (cheerful) {
    ctx.fillStyle = "#ff7a6b";
    ctx.fillRect(3 * size, 7 * size, size, size);
    ctx.fillRect(10 * size, 7 * size, size, size);
  }

  // Bintang kecil di depan maskot
  const starBlocks = [
    [7, 8],
    [6, 9], [7, 9], [8, 9],
    [7, 10],
  ];
  ctx.fillStyle = "#ffb703";
  starBlocks.forEach(([x, y]) => {
    ctx.fillRect(x * size, y * size, size, size);
  });
}

function unlockPostcard() {
  if (isUnsealed) return;
  isUnsealed = true;
  sealZone.classList.add("unlocked");

  setTimeout(() => {
    stageSeal.classList.add("hidden");
    stageCard.classList.remove("hidden");
    drawPixelBunny("mascot-canvas", false);
  }, 520);
}

sealBtn.addEventListener("click", unlockPostcard);
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !isUnsealed) {
    unlockPostcard();
  }
});

// Tombol "NOT YET" bergeser ke area lain saat didekati
function relocateDodgeButton() {
  const zoneRect = choiceZone.getBoundingClientRect();
  const btnRect = dodgeChoice.getBoundingClientRect();

  const maxLeft = Math.max(8, zoneRect.width - btnRect.width - 8);
  const maxTop = Math.max(6, zoneRect.height - btnRect.height - 6);

  const nextLeft = Math.floor(Math.random() * maxLeft);
  const nextTop = Math.floor(Math.random() * maxTop);

  dodgeChoice.style.left = `${nextLeft}px`;
  dodgeChoice.style.right = "auto";
  dodgeChoice.style.top = `${nextTop}px`;
}

dodgeChoice.addEventListener("mouseenter", relocateDodgeButton);
dodgeChoice.addEventListener("touchstart", (event) => {
  event.preventDefault();
  relocateDodgeButton();
});
dodgeChoice.addEventListener("click", relocateDodgeButton);

// Efek partikel bintang saat konfirmasi
function launchStarParticles() {
  const glyphs = ["✦", "✧", "★", "✨"];
  const palette = ["#7c5dfa", "#ff7a6b", "#ffb703", "#2ec4b6"];

  setInterval(() => {
    const particle = document.createElement("span");
    particle.className = "sparkle-particle";
    particle.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.color = palette[Math.floor(Math.random() * palette.length)];
    particle.style.animationDuration = `${2.6 + Math.random() * 2.2}s`;
    starField.appendChild(particle);

    setTimeout(() => particle.remove(), 5000);
  }, 200);
}

yesChoice.addEventListener("click", () => {
  promptPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  drawPixelBunny("mascot-happy-canvas", true);
  launchStarParticles();
});
