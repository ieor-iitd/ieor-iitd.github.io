/**
 * IEOR College Website JavaScript
 * Handles image slider, dropdown navigation, and other interactive elements
 */

// Wait for the DOM to be fully loaded
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

    // Mobile Navigation Toggle
    const handleMobileNav = () => {
        // Check if we're on a mobile device (screen width < 768px)
        const isMobile = window.innerWidth < 768;
        const navItems = document.querySelectorAll('.navitem');
        
        if (isMobile) {
            // Add click listeners to dropdown buttons on mobile
            navItems.forEach(item => {
                const button = item.querySelector('.dropdown-button');
                const dropdownContent = item.querySelector('.dropdown-content');
                
                // Skip if there's no dropdown content
                if (!dropdownContent) return;
                
                // Add click event for mobile
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close all other dropdowns first
                    document.querySelectorAll('.dropdown-content').forEach(content => {
                        if (content !== dropdownContent) {
                            content.style.display = 'none';
                        }
                    });
                    
                    // Toggle this dropdown
                    const isDisplayed = dropdownContent.style.display === 'block';
                    dropdownContent.style.display = isDisplayed ? 'none' : 'block';
                });
            });
        } else {
            // Desktop behavior is handled by CSS hover
            navItems.forEach(item => {
                const dropdownContent = item.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = '';
                }
            });
        }
    };

    // Run mobile navigation logic initially
    handleMobileNav();
    
    // Update on window resize
    window.addEventListener('resize', handleMobileNav);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's not a valid anchor
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation classes to elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.news-item, .event-item, .academic-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    }

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Add active class to current page in navigation
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if this link matches the current path
            if (currentPath.endsWith(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html')) {
                
                // Find the parent button and add active class
                const parentButton = link.closest('.dropdown-button');
                if (parentButton) {
                    parentButton.classList.add('active');
                }
                
                // If link is direct child of button, add active to button
                const directParent = link.parentElement;
                if (directParent.classList.contains('dropdown-button')) {
                    directParent.classList.add('active');
                }
            }
        });
    }
    
    // Highlight current page in nav
    highlightCurrentPage();
});

/* ieor highlight*/
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
});

