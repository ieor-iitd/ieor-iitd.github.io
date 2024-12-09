//slider 
var imgs = document.querySelectorAll('.slider img');
var dots = document.querySelectorAll('.dot');
var currentImg = 0; // index of the first image
const interval = 6000; // duration(speed) of the slide

function changeSlide(slideIndex) {
    // Hide all slides and set opacity to 0
    imgs.forEach(img => {
        img.classList.remove('active');
        img.style.zIndex = 0;
    });
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Show the selected slide
    imgs[slideIndex].classList.add('active');
    imgs[slideIndex].style.zIndex = 1;
    // Add active class to the selected dot
    dots[slideIndex].classList.add('active');

    currentImg = slideIndex;
}

// Function to move to the next slide
function nextSlide() {
    currentImg = (currentImg + 1) % imgs.length;
    changeSlide(currentImg);
}

// Function to move to the previous slide
function prevSlide() {
    currentImg = (currentImg - 1 + imgs.length) % imgs.length;
    changeSlide(currentImg);
}

// Set the interval for auto-sliding
setInterval(nextSlide, interval);

// Initial display setup
changeSlide(currentImg);
