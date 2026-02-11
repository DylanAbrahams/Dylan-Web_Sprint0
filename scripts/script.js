let gameStarted = false;
let playerName = "";

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const nameInput = document.getElementById("player-name");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

const button = document.querySelector('.theme-button');
const gravity = 0.05;
let waterThemeEnabled = false;
let message = ""       // De tekst in de popups
let messageTimer = 0   // timer zodat de popup tijdelijk verschijnt

// Canvas
const canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
canvas.width = 430
canvas.height = 932

// Toetsen die je ingedrukt houdt
const keys = {
  right: { pressed: false },
  left: { pressed: false }
}

// =================== START KNOP ===================
startButton.addEventListener("click", async () => {
  playerName = nameInput.value.trim();
  if (!playerName) {
    alert("Vul eerst je naam in!");
    return;
  }

  startScreen.style.display = "none";
  gameStarted = true;

  await checkPlayerNameWithAPI(playerName); // check speler

  // Leerdoelen in de boeken wordt uit API gehaald
  await updateBooksContentFromAPI(289); // mijn ID is 289
});

// =================== THEMA KNOP ===================
button.addEventListener('click', () => {
  waterThemeEnabled = !waterThemeEnabled;

  if (waterThemeEnabled) {
    document.documentElement.setAttribute('data-theme', 'water');
  } else {
    document.documentElement.removeAttribute('data-theme');

  }
  console.log("Water Theme: " + waterThemeEnabled)
});

// ===================== WATER =====================
let waterHeight = 0;

const bubblesArray = [];
const maxBubbles = 15;

// initial bubbles
for (let i = 0; i < maxBubbles; i++) {
  bubblesArray.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 4 + Math.random() * 6,
    speed: 1.5 + Math.random() * 3,  // verhoogd van 0.3–1 → 2–5
    alpha: 0.1 + Math.random() * 0.15,
  });
}


// ===================== CLASSES =====================
class Player {
  constructor() {
    this.position = { x: 350, y: 400 }
    this.velocity = { x: 0, y: 0 }
    this.width = 30
    this.height = 30
    this.speed = 4

    // 🌈 HSL kleuren
    this.hue = 0; // startkleur
    this.color = `hsl(${this.hue}, 100%, 50%)`;
    this.colorInterval = null;
    this.isCyclingColors = false; // toggle
  }

  draw() {
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;
    const radius = this.width / 2;

    // Speler
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = 'black';
    c.lineWidth = 2;
    c.stroke();

    // Glans
    c.fillStyle = 'rgba(255, 255, 255, 0.3)';
    c.beginPath();
    c.arc(centerX - radius / 3, centerY - radius / 3, radius / 2.5, 0, Math.PI * 2);
    c.fill();

    // Ogen
    const eyeOffsetY = -radius / 4;
    const eyeRadius = radius / 5;
    const pupilRadius = radius / 10;

    let eyeDir = 0;
    if (keys.left.pressed) eyeDir = -radius / 3;
    else if (keys.right.pressed) eyeDir = radius / 3;

    const drawEye = (x, y) => {
      c.fillStyle = 'white';
      c.beginPath();
      c.arc(x, y, eyeRadius, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = 'black';
      c.lineWidth = 1;
      c.stroke();

      c.fillStyle = 'black';
      c.beginPath();
      c.arc(x, y, pupilRadius, 0, Math.PI * 2);
      c.fill();
    };

    drawEye(centerX - radius / 3 + eyeDir, centerY + eyeOffsetY);
    drawEye(centerX + radius / 3 + eyeDir, centerY + eyeOffsetY);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (waterThemeEnabled) {
      this.velocity.y += gravity / 3;
      this.velocity.y *= 0.98;
    } else {
      if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity;
    }
  }

  toggleColorCycle() {
    if (this.isCyclingColors) {
      clearInterval(this.colorInterval);
      this.colorInterval = null;
      this.isCyclingColors = false;
    } else {
      this.isCyclingColors = true;
      this.colorInterval = setInterval(() => {
        this.hue = (this.hue + 5) % 360; // sneller door hogere stap
        this.color = `hsl(${this.hue}, 100%, 50%)`;
      }, 30); // snelheid van kleuren wisselen
    }
  }
}

// 👇 Key handling voor toggle
window.addEventListener('keydown', (e) => {
  if (e.key === 'h' || e.key === 'H') player.toggleColorCycle();
});


class Platform {
  constructor({ x, y, width, height }) {
    this.position = { x, y }
    this.width = width
    this.height = height
  }

  draw() {
  const gradient = c.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
  gradient.addColorStop(0, "#4CAF50"); // bovenkant
  gradient.addColorStop(1, "#2E7D32"); // onderkant
  c.fillStyle = gradient;
  c.fillRect(this.position.x, this.position.y, this.width, this.height);
  
  // Optioneel: subtiele rand
  c.strokeStyle = "#1B5E20";
  c.lineWidth = 2;
  c.strokeRect(this.position.x, this.position.y, this.width, this.height);
}

}

class Book {
  constructor({ x, y, content, type}) {
    this.position = { x, y };
    this.width = 22.5;
    this.height = 30; // slightly taller for book feel
    this.content = content;
    this.type = type;
  }

  draw() {
    // Base gradient for book cover
    const gradient = c.createLinearGradient(
      this.position.x, this.position.y,
      this.position.x, this.position.y + this.height
    );
    gradient.addColorStop(0, '#8B4513'); // top: saddle brown
    gradient.addColorStop(1, '#A0522D'); // bottom: sienna
    c.fillStyle = gradient;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Outline
    c.strokeStyle = '#3E1F0D';
    c.lineWidth = 2;
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);

    // Spine detail
    c.fillStyle = '#5C3317';
    c.fillRect(this.position.x - 2, this.position.y, 4, this.height);

    // Optional: subtle highlights
    c.fillStyle = 'rgba(255, 255, 255, 0.2)';
    c.fillRect(this.position.x + 2, this.position.y + 2, this.width - 4, 6);

    // Optional: little bookmark
    c.fillStyle = '#FFD700'; // gold
    c.fillRect(this.position.x + this.width - 6, this.position.y + 4, 2, 8);
  }
}


// ===================== GAME OBJECTS =====================
const player = new Player()
const platforms = [
  new Platform({ x: 0, y: 160, width: 258, height: 20 }),
  new Platform({ x: 359, y: 160, width: 77, height: 20 }),
  new Platform({ x: 258, y: 225, width: 80, height: 20 }),
  new Platform({ x: 170, y: 305, width: 260, height: 20 }),
  new Platform({ x: 88, y: 385, width: 80, height: 20 }),
  new Platform({ x: 0, y: 465, width: 104, height: 20 }),
  new Platform({ x: 290, y: 465, width: 139, height: 20 }),
  new Platform({ x: 140, y: 550, width: 80, height: 20 }),

  new Platform({ x: 85, y: 640, width: 265, height: 20 }),
  new Platform({ x: 0, y: 562, width: 50, height: 20 }),
  new Platform({ x: 85, y: 465, width: 20, height: 194 }),

  new Platform({ x: 0, y: 750, width: 112, height: 20 }),
  new Platform({ x: 183, y: 750, width: 85, height: 20 }),
  new Platform({ x: 330, y: 750, width: 100, height: 20 }),
  new Platform({ x: 0, y: 912, width: 432, height: 20 }),
]
let books = [
  new Book({ x: 74, y: 92, content: "", type: 1}),
  new Book({ x: 375, y: 812, content: "", type: 2}),
  new Book({ x: 10, y: 512, content: "", type: 3}),
]




// ===================== COLLISION =====================
function isColliding(a, b) {
  return (
    a.position.x < b.position.x + b.width &&
    a.position.x + a.width > b.position.x &&
    a.position.y < b.position.y + b.height &&
    a.position.y + a.height > b.position.y
  )
}

// ============= CONFETTI ANIMATIE POPUP ===============
function popupConfetti() {
    const container = document.getElementById("popup-effect");
    const colors = ["#ff4d4d","#4dff4d","#4d4dff","#ffff4d","#ff4dff"];
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        c.style.left = x + "px";
        c.style.top = y + "px";
        container.appendChild(c);

        setTimeout(() => {
            c.style.transform = `translate(${x + (Math.random()-0.5)*150 - x}px, ${y - Math.random()*150 - 50 - y}px) rotate(${Math.random()*720}deg)`;
            c.style.opacity = 0;
        }, 50);

        setTimeout(() => container.removeChild(c), 1200);
    }
}

// ===================== ANIMATE =====================
let lastTime = 0; // tijd van vorige frame

function animate(time) {
  requestAnimationFrame(animate);

  // Bereken deltaTime in milliseconden
  const deltaTime = time - lastTime;
  lastTime = time;

  // Normaliseer deltaTime naar basis van 60 FPS (16.666ms per frame)
  const dt = deltaTime / 16.666;

  const normalBg = getComputedStyle(document.documentElement)
                     .getPropertyValue('--color-background').trim();
  const waterBg = getComputedStyle(document.documentElement)
                     .getPropertyValue('--water-background').trim();

// Gradient van warm naar zacht pastel
const bgGradient = c.createLinearGradient(0, 0, 0, canvas.height);
bgGradient.addColorStop(0, "#FFD8A8");  // licht oranje boven (zonsopkomst)
bgGradient.addColorStop(0.5, "#FFE4E1"); // zacht roze midden
bgGradient.addColorStop(1, "#FFF5F5");  // bijna wit onder
c.fillStyle = bgGradient;
c.fillRect(0, 0, canvas.width, canvas.height);

// Subtiele glansbollen / lichteffecten voor sfeer
for (let i = 0; i < 10; i++) {
  const radius = 20 + Math.random() * 30;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const gradient = c.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  c.fillStyle = gradient;
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fill();
}

  // ===== Waterhoogte aanpassen =====
  if (waterThemeEnabled && waterHeight < canvas.height) {
    waterHeight += 7 * dt; // omhoog
  } else if (!waterThemeEnabled && waterHeight > 0) {
    waterHeight -= 7 * dt; // omlaag
  }

  // ===== Water tekenen zolang waterHeight > 0 =====
  if (waterHeight > 0) {
    c.fillStyle = waterBg;
    c.fillRect(0, canvas.height - waterHeight, canvas.width, waterHeight);

    // Bubbels tekenen
    bubblesArray.forEach(b => {
      b.y -= b.speed * dt;
      if (b.y + b.radius < canvas.height - waterHeight) {
        b.y = canvas.height;
        b.x = Math.random() * canvas.width;
      }
      c.beginPath();
      c.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      c.fillStyle = `rgba(173, 216, 230, ${b.alpha})`;
      c.fill();
    });
  }

  // Player update met deltaTime
  player.update(dt);

  // Platforms
  platforms.forEach(platform => platform.draw());

  // Books
  books.forEach(book => book.draw());

  // Player movement
  if (keys.right.pressed) player.velocity.x = player.speed * dt;
  else if (keys.left.pressed) player.velocity.x = -player.speed * dt;
  else player.velocity.x = 0;

  // Canvas boundaries
  if (player.position.x < 0) { player.position.x = 0; player.velocity.x = 0 }
  if (player.position.x + player.width > canvas.width) { player.position.x = canvas.width - player.width; player.velocity.x = 0 }

  // Platform collision (je huidige code kan hier blijven)
  platforms.forEach(platform => {
    // Bovenkant
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width > platform.position.x &&
      player.position.x < platform.position.x + platform.width
    ) { player.velocity.y = 0; player.position.y = platform.position.y - player.height }

    // Linkerkant
    if (
      player.position.x + player.width <= platform.position.x &&
      player.position.x + player.width + player.velocity.x >= platform.position.x &&
      player.position.y + player.height > platform.position.y &&
      player.position.y < platform.position.y + platform.height
    ) { player.velocity.x = 0; player.position.x = platform.position.x - player.width }

    // Rechterkant
    if (
      player.position.x >= platform.position.x + platform.width &&
      player.position.x + player.velocity.x <= platform.position.x + platform.width &&
      player.position.y + player.height > platform.position.y &&
      player.position.y < platform.position.y + platform.height
    ) { player.velocity.x = 0; player.position.x = platform.position.x + platform.width }

    // Onderkant
    if (
      player.position.y >= platform.position.y + platform.height &&
      player.position.y + player.velocity.y <= platform.position.y + platform.height &&
      player.position.x + player.width > platform.position.x &&
      player.position.x < platform.position.x + platform.width
    ) { player.velocity.y = 0; player.position.y = platform.position.y + platform.height }
  });

  // Book collision
  books = books.filter(book => {
  if (isColliding(player, book)) {
    // Reset popup classes
    popup.classList.remove("book1", "book2", "book3");
    popup.classList.add("book" + book.type);

    message = book.content;
    popupMessage.textContent = message;
    popupMessage.removeAttribute("data-text");
    messageTimer = 300;

    if (book.type === 1) {
      popupConfetti();
    }
    if (book.type === 3) {
      popupMessage.setAttribute("data-text", message);
    }
    return false; // verwijder boek
  }
  return true;
});
  // Popup animatie
  if (messageTimer > 0) {
    popupMessage.textContent = message;
    popup.classList.add("show");
    messageTimer -= dt;
  } else {
    popup.classList.remove("show");
  }
}





animate()

// ===================== CONTROLS =====================
const arrows = document.querySelectorAll('.arrow');
function getDirection(key) {
  if (key === "ArrowLeft") return "left";
  if (key === "ArrowRight") return "right";
  if (key === "ArrowUp") return "up";
  return null
}

arrows.forEach(button => {
  const arrowKey = button.dataset.key;
  const dir = getDirection(arrowKey);

  function press() {
    button.classList.add('active');
    if (!gameStarted) return;
    if (dir === "up") {
      if (player.velocity.y === 0) player.velocity.y -= 3
      else if (waterThemeEnabled) player.velocity.y -= 1.5
    }
    if (dir && dir !== "up") keys[dir].pressed = true
  }

  function release() {
    button.classList.remove('active');
    if (dir && dir !== "up") keys[dir].pressed = false
  }

  button.addEventListener('mousedown', press)
  button.addEventListener('mouseup', release)
  button.addEventListener('mouseleave', release)
  button.addEventListener('touchstart', e => { e.preventDefault(); press(); }, { passive: false })
  button.addEventListener('touchend', release)
  button.addEventListener('touchcancel', release)
})

// Keyboard
const keyMap = { a:"ArrowLeft", w:"ArrowUp", s:"ArrowDown", d:"ArrowRight", ArrowLeft:"ArrowLeft", ArrowUp:"ArrowUp", ArrowDown:"ArrowDown", ArrowRight:"ArrowRight", " ":"ArrowUp" }

document.addEventListener("keydown", event => {
  const key = keyMap[event.key];
  if (!gameStarted) return;
  if (!key) return;
  if (event.repeat) return;

  if (key === "ArrowUp") {
    if (player.velocity.y === 0) player.velocity.y -= 3
    else if (waterThemeEnabled) player.velocity.y -= 1.5
  }

  document.querySelector(`.arrow[data-key="${key}"]`)?.classList.add("active");

  const dir = getDirection(key);
  if (dir && dir !== "up") keys[dir].pressed = true;
});

document.addEventListener("keyup", event => {
  const key = keyMap[event.key];
  if (!key) return;

  document.querySelector(`.arrow[data-key="${key}"]`)?.classList.remove("active");

  const dir = getDirection(key);
  if (dir && dir !== "up") keys[dir].pressed = false;
});
