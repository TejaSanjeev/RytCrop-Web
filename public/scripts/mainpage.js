// slider
const carousel = document.querySelector('.carousel');
const slides = document.querySelector('.carousel-slides');
const slideWidth = carousel.clientWidth;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
alert();
// Set the initial position of the slides
slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

// Go to the previous slide
prevBtn.addEventListener('click', () => {
    if (currentSlide === 0) {
        currentSlide = slides.children.length - 1;
    } else {
        currentSlide--;
    }
    slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
});

// Go to the next slide
nextBtn.addEventListener('click', () => {
    if (currentSlide === slides.children.length - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
});

// Automatically advance to the next slide every 3 seconds
setInterval(() => {
    if (currentSlide === slides.children.length - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}, 3000);

function signUP() {
    window.location.href = "/signup";
  }