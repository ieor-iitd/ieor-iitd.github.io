/**
 * IEOR College Website JavaScript
 * Handles image slider, dropdown navigation, and other interactive elements
 */

//------------------------ Image Slider functionality ------------------------

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


//------------------------ humburger menu for mobile view------------------------
// Robust mobile menu JavaScript - Clean version

(function() {
    'use strict';
    
    let isInitialized = false;
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 100;
    let cleanupHandlers = [];

    function initMobileMenu() {
        // Prevent multiple initializations
        if (isInitialized) {
            console.log('Mobile menu already initialized');
            return;
        }

        const menuToggle = document.querySelector('.menu-toggle');
        const navlist = document.querySelector('.navlist');
        const navbar = document.querySelector('.navbar');
        
        console.log('Attempting to initialize mobile menu...', {
            menuToggle: !!menuToggle,
            navlist: !!navlist,
            navbar: !!navbar,
            retryCount: retryCount
        });
        
        if (menuToggle && navlist && navbar) {
            try {
                setupMobileMenu(menuToggle, navlist);
                isInitialized = true;
                retryCount = 0;
                console.log('Mobile menu initialized successfully');
            } catch (error) {
                console.error('Error setting up mobile menu:', error);
                retryInitialization();
            }
        } else {
            console.warn('Mobile menu elements not found');
            retryInitialization();
        }
    }

    function retryInitialization() {
        if (retryCount < maxRetries) {
            retryCount++;
            const delay = retryDelay * Math.pow(2, retryCount - 1);
            console.log(`Retrying mobile menu initialization in ${delay}ms (attempt ${retryCount}/${maxRetries})`);
            
            setTimeout(initMobileMenu, delay);
        } else {
            console.error('Failed to initialize mobile menu after', maxRetries, 'attempts');
        }
    }

    function setupMobileMenu(menuToggle, navlist) {
        // Clean up any existing handlers
        cleanup();
        
        // Create fresh references to avoid duplicate listeners
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        function checkResponsive() {
            if (window.innerWidth <= 768) {
                newMenuToggle.style.display = 'block';
                navlist.classList.remove('active');
                newMenuToggle.classList.remove('active');
            } else {
                newMenuToggle.style.display = 'none';
                navlist.classList.remove('active');
                newMenuToggle.classList.remove('active');
                closeAllDropdowns();
            }
        }

        function closeAllDropdowns() {
            // Close main dropdowns
            document.querySelectorAll('.dropdown-container').forEach(container => {
                container.classList.remove('active');
            });
            // Close sub-dropdowns
            document.querySelectorAll('.dropdown-subcontainer').forEach(subContainer => {
                subContainer.classList.remove('active');
            });
        }

        // Main menu toggle handler
        function handleMenuToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Menu toggle clicked');
            navlist.classList.toggle('active');
            newMenuToggle.classList.toggle('active');
        }

        // Main dropdown handler
        function handleDropdownClick(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownContainer = this.closest('.dropdown-container');
                if (dropdownContainer) {
                    const isCurrentlyActive = dropdownContainer.classList.contains('active');
                    
                    // Close all dropdowns first
                    document.querySelectorAll('.dropdown-container').forEach(container => {
                        if (container !== dropdownContainer) {
                            container.classList.remove('active');
                        }
                    });
                    closeAllSubDropdowns();
                    
                    if (!isCurrentlyActive) {
                        dropdownContainer.classList.add('active');
                    } else {
                        dropdownContainer.classList.remove('active');
                    }
                }
            }
        }

        // Sub-dropdown handler
        function handleSubDropdownClick(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const subContainer = this.closest('.dropdown-subcontainer');
                if (subContainer) {
                    const isCurrentlyActive = subContainer.classList.contains('active');
                    
                    // Close other sub-dropdowns in the same parent
                    const parentDropdown = subContainer.closest('.dropdown-container');
                    if (parentDropdown) {
                        parentDropdown.querySelectorAll('.dropdown-subcontainer').forEach(sub => {
                            if (sub !== subContainer) {
                                sub.classList.remove('active');
                            }
                        });
                    }
                    
                    if (!isCurrentlyActive) {
                        subContainer.classList.add('active');
                    } else {
                        subContainer.classList.remove('active');
                    }
                }
            }
        }

        function closeAllSubDropdowns() {
            document.querySelectorAll('.dropdown-subcontainer').forEach(subContainer => {
                subContainer.classList.remove('active');
            });
        }

        // Outside click handler
        function handleOutsideClick(e) {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.navbar')) {
                    navlist.classList.remove('active');
                    newMenuToggle.classList.remove('active');
                    closeAllDropdowns();
                }
            }
        }

        // Resize handler with debounce
        let resizeTimer;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                checkResponsive();
                setupDropdowns();
            }, 150);
        }

        function setupDropdowns() {
            // Setup main dropdown listeners
            const dropdownButtons = document.querySelectorAll('.dropdown-button:not(.no-dropdown-sign)');
            
            dropdownButtons.forEach(button => {
                // Skip if it's a sub-dropdown button
                if (button.closest('.dropdown-subcontainer')) {
                    return;
                }
                
                // Remove existing listeners by cloning
                const newButton = button.cloneNode(true);
                if (button.parentNode) {
                    button.parentNode.replaceChild(newButton, button);
                    newButton.addEventListener('click', handleDropdownClick);
                }
            });

            // Setup sub-dropdown listeners
            const subDropdownButtons = document.querySelectorAll('.dropdown-subbutton');
            
            subDropdownButtons.forEach(button => {
                // Remove existing listeners by cloning
                const newButton = button.cloneNode(true);
                if (button.parentNode) {
                    button.parentNode.replaceChild(newButton, button);
                    newButton.addEventListener('click', handleSubDropdownClick);
                }
            });
        }

        // Setup event listeners
        newMenuToggle.addEventListener('click', handleMenuToggle);
        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', handleResize);
        
        // Store handlers for cleanup
        cleanupHandlers.push(
            () => document.removeEventListener('click', handleOutsideClick),
            () => window.removeEventListener('resize', handleResize),
            () => clearTimeout(resizeTimer)
        );

        // Setup dropdowns
        setupDropdowns();
        
        // Initial responsive check
        checkResponsive();
    }

    function cleanup() {
        cleanupHandlers.forEach(handler => handler());
        cleanupHandlers = [];
    }

    // Global cleanup function
    window.cleanupMobileMenu = function() {
        cleanup();
        isInitialized = false;
        retryCount = 0;
    };

    // Initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        setTimeout(initMobileMenu, 0);
    }

    // Custom event listener
    document.addEventListener('headerLoaded', function() {
        console.log('headerLoaded event received');
        setTimeout(initMobileMenu, 50);
    });

    // Fallback for window load
    window.addEventListener('load', function() {
        if (!isInitialized) {
            console.log('Window load triggered mobile menu init');
            setTimeout(initMobileMenu, 100);
        }
    });

    // Mutation Observer fallback
    function setupMutationObserver() {
        if (isInitialized) return;
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const navbar = document.querySelector('.navbar');
                    if (navbar && !isInitialized) {
                        console.log('Navbar detected via MutationObserver');
                        observer.disconnect();
                        setTimeout(initMobileMenu, 50);
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => observer.disconnect(), 10000);
    }

    // Start mutation observer if needed
    if (document.readyState !== 'loading') {
        setTimeout(() => {
            if (!isInitialized && !document.querySelector('.navbar')) {
                setupMutationObserver();
            }
        }, 500);
    }

})();

/* ------------------------------------ieor highlight--------------------------------- */
/*
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
*/