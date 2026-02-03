console.log("Dit is een log");


const button = document.querySelector('.background-button');

let isDark = false;

button.addEventListener('click', () => {
if (isDark) {
    document.body.style.backgroundColor = '#add8e6'; // light blue
} else {
    document.body.style.backgroundColor = '#0b3c5d'; // dark blue
}

isDark = !isDark;
});
