
// Achtergrond knop
const button = document.querySelector('.background-button');

button.addEventListener('click', () => {
  document.body.classList.toggle('night');
});




// Canvas
const canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

// Zwaartekracht
const gravity = 0.01;
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




function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  platform.draw()

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

// Helper: ArrowKey → direction (alleen voor keys)
function getDirection(key) {
  if (key === "ArrowLeft") return "left";
  if (key === "ArrowRight") return "right";
  return null; // ArrowUp / ArrowDown doen nog niks
}

// Muis events
arrows.forEach(button => {
  const arrowKey = button.dataset.key;
  const dir = getDirection(arrowKey);

  button.addEventListener('mousedown', () => {
    button.classList.add('active');
    if (dir) keys[dir].pressed = true;
  });

  button.addEventListener('mouseup', () => {
    button.classList.remove('active');
    if (dir) keys[dir].pressed = false;
  });

  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
    if (dir) keys[dir].pressed = false;
  });
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
};

document.addEventListener("keydown", event => {
  const key = keyMap[event.key];
  if (!key) return;

  document
    .querySelector(`.arrow[data-key="${key}"]`)
    ?.classList.add("active");

  const dir = getDirection(key);
  if (dir) keys[dir].pressed = true;
});

document.addEventListener("keyup", event => {
  const key = keyMap[event.key];
  if (!key) return;

  document
    .querySelector(`.arrow[data-key="${key}"]`)
    ?.classList.remove("active");

  const dir = getDirection(key);
  if (dir) keys[dir].pressed = false;
});
