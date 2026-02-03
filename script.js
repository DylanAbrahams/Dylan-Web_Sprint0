console.log("Dit is een log");

// Achtergrond knop
const button = document.querySelector('.background-button');

button.addEventListener('click', () => {
  document.body.classList.toggle('night');
});


// Pijltoetsen
const arrows = document.querySelectorAll('.arrow');

// Muis events
arrows.forEach(button => {
  button.addEventListener('mousedown', () => button.classList.add('active'));
  button.addEventListener('mouseup', () => button.classList.remove('active'));
  button.addEventListener('mouseleave', () => button.classList.remove('active'));
});

// Toetsenbord events (W/A/D + pijltjes)
const keyMap = {
  w: "ArrowUp",
  a: "ArrowLeft",
  d: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight"
};

document.addEventListener("keydown", event => {
  const key = keyMap[event.key];
  if (!key) return;
  document.querySelector(`.arrow[data-key="${key}"]`)?.classList.add("active");
});

document.addEventListener("keyup", event => {
  const key = keyMap[event.key];
  if (!key) return;
  document.querySelector(`.arrow[data-key="${key}"]`)?.classList.remove("active");
});
