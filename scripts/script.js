
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
canvas.width = innerWidth
canvas.height = innerHeight

// Zwaartekracht
const gravity = 0.05;
let message = ""       // de tekst die in beeld komt
let messageTimer = 0   // timer zodat tekst tijdelijk verschijnt

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

class Player {
  constructor(
    // {x,y,}
  ) {
    this.position = {
      x: 350,
      y: 400
    }
    this.velocity = {
      x: 0, y: 0,
    }
    this.width = 20
    this.height = 20
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      this.speed = 1,
    )
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <=
      canvas.height)
      this.velocity.y += gravity //gravity zorgt ervoor dat de speler steeds sneller valt
  }
}

class Platform {
  constructor(
    { x, y, width, height }
  ) {
    this.position = {
      x, y
    }
    this.width = width
    this.height = height
  }

  draw() {
    c.fillStyle = 'green'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    )
  }
}

class Book {
  constructor(
    { x, y, content}
  ) {
    this.position = {
      x, y
    }
    this.width = 30
    this.height = 30
    this.content = content
  }

  draw() {
    c.fillStyle = 'brown'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    )
  }
}


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
  new Book({ x: 74, y: 92, content: "Leerdoel 1 - Ik wil indrukwekkende animaties kunnen maken in CSS"}),
  new Book({ x: 10, y: 512, content: "Leerdoel 2 - Ik wil mezelf verbeteren in ideeen bedenken voor themas van websites"}),
  new Book({ x: 375, y: 812, content: "Leerdoel 3 - Ik wil meer efficient code kunnen schrijven en zo min mogelijk overbodige code hebben."}),
]





function isColliding(a, b) {
  return (
    a.position.x < b.position.x + b.width &&
    a.position.x + a.width > b.position.x &&
    a.position.y < b.position.y + b.height &&
    a.position.y + a.height > b.position.y
  )
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  // Platforms tekenen
  platforms.forEach((platform) => {
    platform.draw()
  })

  // books tekenen
  books.forEach((book) => {
    book.draw()
  })

  // Speler besturen (links en rechts)
  if (keys.right.pressed) {
    player.velocity.x = player.speed
  } else if (keys.left.pressed) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0
  }

  // Niet buiten de canvas
  if (player.position.x < 0) {
    player.position.x = 0
    player.velocity.x = 0
  }
  if (player.position.x + player.width > canvas.width) {
    player.position.x = canvas.width - player.width
    player.velocity.x = 0
  }


  // Platform collision
  platforms.forEach((platform) => {
    // Bovenkant
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width > platform.position.x &&
      player.position.x < platform.position.x + platform.width
    ) {
      player.velocity.y = 0
      player.position.y = platform.position.y - player.height
    }

    // Linkerkant
    if (
      player.position.x + player.width <= platform.position.x &&
      player.position.x + player.width + player.velocity.x >= platform.position.x &&
      player.position.y + player.height > platform.position.y &&
      player.position.y < platform.position.y + platform.height
    ) {
      player.velocity.x = 0
      player.position.x = platform.position.x - player.width
    }

    // Rechterkant
    if (
      player.position.x >= platform.position.x + platform.width &&
      player.position.x + player.velocity.x <= platform.position.x + platform.width &&
      player.position.y + player.height > platform.position.y &&
      player.position.y < platform.position.y + platform.height
    ) {
      player.velocity.x = 0
      player.position.x = platform.position.x + platform.width
    }

    // Onderkant
    if (
      player.position.y >= platform.position.y + platform.height &&
      player.position.y + player.velocity.y <= platform.position.y + platform.height &&
      player.position.x + player.width > platform.position.x &&
      player.position.x < platform.position.x + platform.width
    ) {
      player.velocity.y = 0
      player.position.y = platform.position.y + platform.height
    }
  })

  books = books.filter((book) => {
    if (isColliding(player, book)) {
      message = book.content
      messageTimer = 1000
      return false   // book verdwijnt
    }
    return true
  })

if (messageTimer > 0) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");

    popupMessage.textContent = message; // zet de tekst
    popup.style.display = "block";      // toon popup

    messageTimer--;
} else {
    document.getElementById("popup").style.display = "none"; // verberg als timer 0
}


}


animate()







// Pijltoetsen
const arrows = document.querySelectorAll('.arrow');

// Helper: ArrowKey → direction
function getDirection(key) {
  if (key === "ArrowLeft") return "left";
  if (key === "ArrowRight") return "right";
  if (key === "ArrowUp") return "up";
  return null; // ArrowDown doen we nog niet
}

// De pijltoetsen
arrows.forEach(button => {
  const arrowKey = button.dataset.key;
  const dir = getDirection(arrowKey);

  function press() {
    button.classList.add('active');

    if (dir === "up") {
      // SPRINGEN op mobiel / touch
        if (player.velocity.y === 0 || waterThemeEnabled) {
          player.velocity.y -= 3;
        }
    }

    if (dir && dir !== "up") keys[dir].pressed = true;
  }

  function release() {
    button.classList.remove('active');
    if (dir && dir !== "up") keys[dir].pressed = false;
  }

  // Muis events
  button.addEventListener('mousedown', press);
  button.addEventListener('mouseup', release);
  button.addEventListener('mouseleave', release);

  // Touch events (mobiel)
  button.addEventListener('touchstart', e => {
    e.preventDefault(); // voorkomt scroll/zoom
    press();
  }, { passive: false });

  button.addEventListener('touchend', release);
  button.addEventListener('touchcancel', release);
});

// Toetsenbord events (WASD + pijltjes)
const keyMap = {
  a: "ArrowLeft",
  w: "ArrowUp",
  s: "ArrowDown",
  d: "ArrowRight",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowRight: "ArrowRight",
  " ": "ArrowUp", // Space
};

document.addEventListener("keydown", event => {
  const key = keyMap[event.key];
  if (!key) return;

  if (event.repeat) return;

  if (key === "ArrowUp") {
      if (player.velocity.y === 0 || waterThemeEnabled) {
        player.velocity.y -= 3;
      }
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






