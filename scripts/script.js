// Thema knop
const button = document.querySelector('.theme-button');

// Track whether water theme is active
let waterThemeEnabled = false;

button.addEventListener('click', () => {
  waterThemeEnabled = !waterThemeEnabled; // toggle boolean

  if (waterThemeEnabled) {
    document.documentElement.setAttribute('data-theme', 'water');
  } else {
    document.documentElement.removeAttribute('data-theme');

  }
  console.log("Water Theme: " + waterThemeEnabled)
});

// Canvas
const canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
canvas.width = 430
canvas.height = 932

// Zwaartekracht
const gravity = 0.05;
let message = ""       // de tekst die in beeld komt
let messageTimer = 0   // timer zodat tekst tijdelijk verschijnt

const keys = {
  right: { pressed: false },
  left: { pressed: false }
}

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
    speed: 0.3 + Math.random() * 0.7,
    alpha: 0.1 + Math.random() * 0.15,
  });
}

// ===================== CLASSES =====================
class Player {
  constructor() {
    this.position = { x: 350, y: 400 }
    this.velocity = { x: 0, y: 0 }
    this.width = 20
    this.height = 20
    this.speed = 1
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (waterThemeEnabled) {
      this.velocity.y += gravity / 3
      this.velocity.y *= 0.98
    } else {
      if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    }
  }
}

class Platform {
  constructor({ x, y, width, height }) {
    this.position = { x, y }
    this.width = width
    this.height = height
  }

  draw() {
    c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Book {
  constructor({ x, y, content }) {
    this.position = { x, y }
    this.width = 30
    this.height = 30
    this.content = content
  }

  draw() {
    c.fillStyle = 'brown'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
  new Platform({ x: 85, y: 465, width: 20, height: 194 }),
  new Platform({ x: 85, y: 640, width: 265, height: 20 }),
  new Platform({ x: 0, y: 562, width: 50, height: 20 }),
  new Platform({ x: 0, y: 750, width: 112, height: 20 }),
  new Platform({ x: 183, y: 750, width: 85, height: 20 }),
  new Platform({ x: 330, y: 750, width: 100, height: 20 }),
  new Platform({ x: 0, y: 912, width: 432, height: 20 }),
]
var books = [
  new Book({ x: 74, y: 92, content: "Leerdoel 1 - Ik wil indrukwekkende animaties kunnen maken in CSS" }),
  new Book({ x: 10, y: 512, content: "Leerdoel 2 - Ik wil mezelf verbeteren in ideeen bedenken voor themas van websites" }),
  new Book({ x: 375, y: 812, content: "Leerdoel 3 - Ik wil meer efficient code kunnen schrijven en zo min mogelijk overbodige code hebben." }),
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

// ===================== ANIMATE =====================
function animate() {
requestAnimationFrame(animate);

  const normalBg = getComputedStyle(document.documentElement)
                     .getPropertyValue('--color-background').trim();
  const waterBg = getComputedStyle(document.documentElement)
                     .getPropertyValue('--water-background').trim();

  // ===== Normale achtergrond altijd =====
  c.fillStyle = normalBg;
  c.fillRect(0, 0, canvas.width, canvas.height);

  // ===== Waterhoogte aanpassen =====
  if (waterThemeEnabled && waterHeight < canvas.height) {
    waterHeight += 2; // omhoog
  } else if (!waterThemeEnabled && waterHeight > 0) {
    waterHeight -= 2; // omlaag
  }

  // ===== Water tekenen zolang waterHeight > 0 =====
  if (waterHeight > 0) {
    c.fillStyle = waterBg;
    c.fillRect(0, canvas.height - waterHeight, canvas.width, waterHeight);

    // Bubbels tekenen
    bubblesArray.forEach(b => {
      b.y -= b.speed;
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




  // Player
  player.update()

  // Platforms
  platforms.forEach(platform => platform.draw())

  // Books
  books.forEach(book => book.draw())

  // Player movement
  if (keys.right.pressed) player.velocity.x = player.speed
  else if (keys.left.pressed) player.velocity.x = -player.speed
  else player.velocity.x = 0

  // Canvas boundaries
  if (player.position.x < 0) { player.position.x = 0; player.velocity.x = 0 }
  if (player.position.x + player.width > canvas.width) { player.position.x = canvas.width - player.width; player.velocity.x = 0 }

  // Platform collision
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
  })

  // Book collision
  books = books.filter(book => {
    if (isColliding(player, book)) {
      message = book.content
      messageTimer = 1000
      return false
    }
    return true
  })

  // Popup
  if (messageTimer > 0) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.style.display = "block";
    messageTimer--;
  } else {
    document.getElementById("popup").style.display = "none";
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
