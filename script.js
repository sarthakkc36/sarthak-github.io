(function() {
    // Initialize all DOM elements
    const initializeElements = () => {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile Menu Initialization
        const initializeMobileMenu = () => {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const menuOverlay = document.querySelector('.menu-overlay');

            if (mobileMenuButton && hamburger && navLinks && menuOverlay) {
                const toggleMenu = () => {
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                    menuOverlay.classList.toggle('active');
                    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
                };

                mobileMenuButton.addEventListener('click', toggleMenu);
                menuOverlay.addEventListener('click', toggleMenu);

                // Close menu when clicking a link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navLinks.classList.contains('active')) {
                            toggleMenu();
                        }
                    });
                });

                // Close menu on window resize
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            }
        };

        // Smooth Scroll
        const initializeSmoothScroll = () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        };

        // Card Animation
        const initializeCardAnimations = () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.card').forEach(card => {
                observer.observe(card);
            });
        };

        // Form Validation
        const initializeFormValidation = () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    let isValid = true;
                    const requiredFields = form.querySelectorAll('[required]');
                    
                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.classList.add('error');
                            
                            let errorMsg = field.nextElementSibling;
                            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                                errorMsg = document.createElement('div');
                                errorMsg.classList.add('error-message');
                                field.parentNode.insertBefore(errorMsg, field.nextSibling);
                            }
                            errorMsg.textContent = `${field.getAttribute('placeholder')} is required`;
                        } else {
                            field.classList.remove('error');
                            const errorMsg = field.nextElementSibling;
                            if (errorMsg && errorMsg.classList.contains('error-message')) {
                                errorMsg.remove();
                            }
                        }
                    });
                    
                    if (isValid) {
                        const successMsg = document.createElement('div');
                        successMsg.classList.add('success-message');
                        successMsg.textContent = 'Form submitted successfully!';
                        form.appendChild(successMsg);
                        
                        setTimeout(() => {
                            form.reset();
                            successMsg.remove();
                        }, 2000);
                    }
                });
            });
        };

        // Initialize all components
        initializeMobileMenu();
        initializeSmoothScroll();
        initializeCardAnimations();
        initializeFormValidation();
    };

    // Run initialization when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeElements);
})();