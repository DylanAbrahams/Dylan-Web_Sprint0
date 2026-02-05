
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
  console.log("Water Theme: "+waterThemeEnabled)
});






// Canvas
const canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

// Zwaartekracht
const gravity = 0.05;
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
      x: 300,
      y: 300
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
    // {x,y,}
  ) {
    this.position = {
      x: 200,
      y: 500
    }
    this.width = 200
    this.height = 20
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

const player = new Player()
const platform = new Platform()

var platforms = [
  new Platform({
    x: 500,
    y: 300
  }),
  new Platform({
    x: 300,
    y: 465
  })]




function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  platforms.forEach((platform) => {
    platform.draw()
  })

  // Speler besturen (links en rechts)
  // Rechts
  if (keys.right.pressed && player.position.x < 500 ||
    (keys.right.pressed)) {
    player.velocity.x = player.speed
    // Links
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed &&
      player.position.x > 0)
  ) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0
  }

  // Platform collision (alleen de bovenkant)

  if (player.position.y + player.height <=
    platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
    platform.position.y &&
    player.position.x + player.width >=
    platform.position.x &&
    player.position.x <=
    platform.position.x + platform.width) {
    player.velocity.y = 0
  }


  console.log(player.position.x);
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

// Muis + touch events
arrows.forEach(button => {
  const arrowKey = button.dataset.key;
  const dir = getDirection(arrowKey);

  function press() {
    button.classList.add('active');

    if (dir === "up") {
      // SPRINGEN op mobiel / touch
      platforms.forEach(platform => {
        if (player.velocity.y === 0) {
          player.velocity.y -= 3;
        }
      });
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
    platforms.forEach(platform => {
      if (player.velocity.y === 0) {
        player.velocity.y -= 3;
      }
    });
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






