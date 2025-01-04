// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollToTop();
    initializeFormHandling();
    initializeAnimations();
    initializeSmoothScroll();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!mobileMenuButton || !mobileMenu || !menuOverlay) return;

    function toggleMenu() {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Handle button animations
        const bars = mobileMenuButton.querySelectorAll('.bar');
        if (mobileMenuButton.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    // Event Listeners
    mobileMenuButton.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu when links are clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on desktop resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    const progressRing = button.querySelector('.progress');
    const circumference = 2 * Math.PI * 22.5;
    progressRing.style.strokeDasharray = circumference;

    function updateScroll() {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY;
        const scrollPercentage = scrollProgress / scrollTotal;
        
        const offset = circumference - (scrollPercentage * circumference);
        progressRing.style.strokeDashoffset = offset;

        button.classList.toggle('visible', scrollProgress > 300);
    }

    // Throttled scroll event handler
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Smooth scroll to top
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial update
    updateScroll();
}

// Form Handling
function initializeFormHandling() {
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-button');
            const btnText = submitBtn?.querySelector('.button-text');
            const btnLoader = submitBtn?.querySelector('.button-loader');
            
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                
                const data = await response.json();
                
                if (data.ok) {
                    showAlert(form, 'success');
                    form.reset();
                } else {
                    showAlert(form, 'error');
                }
            } catch (error) {
                showAlert(form, 'error');
            } finally {
                if (btnText) btnText.style.display = 'inline-block';
                if (btnLoader) btnLoader.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    });
}

// Helper function to show form alerts
function showAlert(form, type) {
    const alert = form.querySelector(`#${type}Alert`);
    if (alert) {
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    }
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For stat counters
                if (entry.target.hasAttribute('data-value')) {
                    animateValue(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe elements with animation classes
    document.querySelectorAll('.fade-up, .fade-in, .scale-up, .about-stat-number')
        .forEach(el => observer.observe(el));
}

// Helper function to animate number counters
function animateValue(element) {
    const end = parseInt(element.dataset.value);
    const duration = 2000;
    const start = 0;
    const increment = end / (duration / 16);
    let current = start;
    
    function update() {
        current += increment;
        if (current < end) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(update);
}


// Smooth scroll functionality
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

        // Start animation when the section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.stats-section'));



    // Animate numbers
        document.addEventListener('DOMContentLoaded', function() {
        const stats = document.querySelectorAll('.stat-number:not(.static-text)');
        
        const observerOptions = {
            threshold: 0.5
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // Animation duration in milliseconds
                    const steps = 50; // Number of steps in the animation
                    const stepValue = target / steps;
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += stepValue;
                        if (current < target) {
                            entry.target.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                            entry.target.classList.add('completed');
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    
        stats.forEach(stat => observer.observe(stat));
    });