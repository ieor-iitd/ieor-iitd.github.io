/**
 * IEOR College Website JavaScript
 * Handles image slider, dropdown navigation, and other interactive elements
 */

// Wait for the DOM to be fully loaded
// Run this in browser console to see what's happening



document.addEventListener('DOMContentLoaded', function() {
    // Image Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider img');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let slideInterval;

    // Initialize the slider
    function initSlider() {
        if (slides.length === 0) return;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = 0;
        });
        
        // Show the first slide
        slideIndex = 0;
        slides[slideIndex].style.opacity = 1;
        
        // Start automatic slideshow
        startSlideshow();
        
        // Update the active dot
        updateDots();
    }

    // Start automatic slideshow
    function startSlideshow() {
        // Clear existing interval if any
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Show a specific slide
    function showSlide(n) {
        // Reset interval to prevent quick transitions
        startSlideshow();
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = 0;
        });
        
        // Ensure n is within bounds
        slideIndex = n;
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }
        
        // Show the current slide
        slides[slideIndex].style.opacity = 1;
        
        // Update the active dot
        updateDots();
    }

    // Update the dots to reflect current slide
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next slide function
    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    // Previous slide function
    function prevSlide() {
        showSlide(slideIndex - 1);
    }

    // Make these functions globally accessible
    window.changeSlide = function(n) {
        showSlide(n);
    };

    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // Initialize the slider
    initSlider();
});

// humburger menu for mobile 

// main.js - Put this in your main JavaScript file
// Put this in your main JavaScript file
// Run the mobile menu initialization on DOMContentLoaded as well as headerLoaded
document.addEventListener('DOMContentLoaded', initMobileMenu);
document.addEventListener('headerLoaded', initMobileMenu);

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navlist = document.querySelector('.navlist');
    const hamburger = document.querySelector('.hamburger');
    
    if (menuToggle && navlist && hamburger) {
        setupMobileMenu(menuToggle, navlist, hamburger);
        
        // Also check responsive state immediately
        checkResponsive(menuToggle, navlist, hamburger);
    } else {
        console.error('Mobile menu elements not found');
    }
}

function setupMobileMenu(menuToggle, navlist, hamburger) {
    // Responsive check
    function checkResponsive() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navlist.classList.add('mobile-hidden');
        } else {
            menuToggle.style.display = 'none';
            navlist.classList.remove('mobile-hidden');
            navlist.classList.remove('navlist-visible');
            hamburger.classList.remove('is-active');
        }
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        navlist.classList.toggle('navlist-visible');
        hamburger.classList.toggle('is-active');
    });
    
    // Mobile dropdowns
    document.querySelectorAll('.dropdown-button:not(.no-dropdown-sign)').forEach(button => {
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownContainer = this.closest('.dropdown-container');
                if (dropdownContainer) {
                    dropdownContainer.classList.toggle('active');
                    document.querySelectorAll('.dropdown-container').forEach(container => {
                        if (container !== dropdownContainer) {
                            container.classList.remove('active');
                        }
                    });
                }
            }
        });
    });
    
    // Initial setup
    checkResponsive();
    
    // Window resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkResponsive, 100);
    });
}


/* ieor highlight
document.addEventListener("DOMContentLoaded", function () {
    const scrollList = document.getElementById("scroll-list");
    
    // Duplicate list items for infinite scrolling effect
    const items = [...scrollList.children];
    items.forEach(item => {
        const clone = item.cloneNode(true);
        scrollList.appendChild(clone);
    });

    let scrollAmount = 0;
    let isPaused = false;

    function scroll() {
        if (!isPaused) {
            scrollAmount += 1; // Adjust speed here
            scrollList.style.transform = `translateY(-${scrollAmount}px)`;

            // Reset when first set of items completely disappears
            if (scrollAmount >= items[0].offsetHeight * items.length) {
                scrollAmount = 0;
            }
        }
        requestAnimationFrame(scroll);
    }
    
    // Start scrolling
    scroll();

    // Pause scrolling on hover
    scrollList.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    // Resume scrolling when mouse leaves
    scrollList.addEventListener("mouseleave", () => {
        isPaused = false;
    });
});*/
/* hamburger menu for mobile*/
