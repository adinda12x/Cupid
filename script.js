const envelope = document.getElementById("envelope");
const arrow = document.getElementById("arrow");
const sceneEnvelope = document.getElementById("scene-envelope");
const sceneProposal = document.getElementById("scene-proposal");

const askView = document.getElementById("ask-view");
const acceptedView = document.getElementById("accepted-view");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const buttonArena = document.getElementById("button-arena");
const heartRain = document.getElementById("heart-rain");

let alreadyShot = false;

// Gambar pixel cat memegang hati
function drawPixelCat(canvasId, happy = false) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const p = 7; // ukuran 1 pixel blok

  const grid = [
    "....#......#....",
    "...##......##...",
    "..###..##..###..",
    "..############..",
    ".##############.",
    ".##############.",
    ".####.#..#.####.",
    ".##############.",
    "..############..",
    "...##########...",
    "....########....",
    ".....##..##.....",
  ];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((row, rIdx) => {
    [...row].forEach((cell, cIdx) => {
      if (cell === "#") {
        ctx.fillStyle = "#1c1419";
        ctx.fillRect(cIdx * p, rIdx * p, p, p);
      }
    });
  });

  // Mata / ekspresi
  ctx.fillStyle = "#ffffff";
  if (!happy) {
    ctx.fillRect(4 * p, 5 * p, p, p);
    ctx.fillRect(11 * p, 5 * p, p, p);
  } else {
    // Mata melengkung senang
    ctx.fillRect(4 * p, 5 * p, p, p);
    ctx.fillRect(5 * p, 4 * p, p, p);
    ctx.fillRect(10 * p, 4 * p, p, p);
    ctx.fillRect(11 * p, 5 * p, p, p);
  }

  // Hati merah di depan kucing
  const heartOffsets = [
    [6, 7], [9, 7],
    [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    [6, 9], [7, 9], [8, 9], [9, 9],
    [7, 10], [8, 10],
  ];
  ctx.fillStyle = "#e63956";
  heartOffsets.forEach(([x, y]) => {
    ctx.fillRect(x * p, y * p, p, p);
  });
}

function shootArrow() {
  if (alreadyShot) return;
  alreadyShot = true;
  arrow.classList.add("shoot");

  setTimeout(() => {
    sceneEnvelope.classList.add("hidden");
    sceneProposal.classList.remove("hidden");
    drawPixelCat("pixel-cat", false);
  }, 680);
}

envelope.addEventListener("click", shootArrow);
arrow.addEventListener("click", shootArrow);
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !alreadyShot) {
    e.preventDefault();
    shootArrow();
  }
});

// Tombol NO menghindar saat didekati
function moveNoButton() {
  const arenaRect = buttonArena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(10, arenaRect.width - btnRect.width - 10);
  const maxY = Math.max(10, arenaRect.height - btnRect.height - 10);

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", moveNoButton);

// Hujan hati saat klik YES
function startHeartRain() {
  const colors = ["#ff5c8a", "#ff8fab", "#ffb3c6", "#f77f00", "#e63946"];
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "falling-heart";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    heart.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
    heartRain.appendChild(heart);

    setTimeout(() => heart.remove(), 5200);
  }, 180);
}

yesBtn.addEventListener("click", () => {
  askView.classList.add("hidden");
  acceptedView.classList.remove("hidden");
  drawPixelCat("pixel-cat-happy", true);
  startHeartRain();
});
