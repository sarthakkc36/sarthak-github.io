// Enhanced JavaScript Functionality

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for header styling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
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

// Enhanced Card Reveal Animation
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

// Form Validation
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
                
                // Add error message
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
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.classList.add('success-message');
            successMsg.textContent = 'Form submitted successfully!';
            form.appendChild(successMsg);
            
            // Clear form after 2 seconds
            setTimeout(() => {
                form.reset();
                successMsg.remove();
            }, 2000);
        }
    });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}

// Package Selection
const packageCards = document.querySelectorAll('.package-card');
packageCards.forEach(card => {
    card.addEventListener('click', function() {
        packageCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Testimonial Slider
class TestimonialSlider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.testimonial-slide');
        this.currentSlide = 0;
        this.init();
    }
    
    init() {
        this.createDots();
        this.showSlide(0);
        this.setupAutoPlay();
    }
    
    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('slider-dots');
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => this.showSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.container.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    setupAutoPlay() {
        setInterval(() => {
            const nextSlide = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextSlide);
        }, 5000);
    }
}

// Initialize testimonial slider if exists
const testimonialContainer = document.querySelector('.testimonial-slider');
if (testimonialContainer) {
    new TestimonialSlider(testimonialContainer);
}

// Download Progress Simulation
function simulateDownload(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Downloading...';
    
    setTimeout(() => {
        button.innerHTML = '✓ Downloaded';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 2000);
}

// Add this to download buttons
document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        simulateDownload(button);
    });
});
// Consultation Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initializeForm();
    
    // Initialize animations
    initializeAnimations();
});

function initializeForm() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    // Set minimum date for date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            handleFormSubmission(this);
        }
    });
}

function validateForm(form) {
    clearMessages();
    const errors = [];
    
    // Name validation
    const name = form.querySelector('#name').value.trim();
    if (name.length < 2) {
        errors.push('Please enter a valid name (minimum 2 characters)');
    }
    
    // Email validation
    const email = form.querySelector('#email').value.trim();
    if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phone = form.querySelector('#phone').value.trim();
    if (!isValidPhone(phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Date validation
    const date = form.querySelector('#date').value;
    if (!date || !isValidDate(date)) {
        errors.push('Please select a future date');
    }
    
    // Time validation
    const time = form.querySelector('#time').value;
    if (!time) {
        errors.push('Please select a time slot');
    }
    
    if (errors.length > 0) {
        showMessage('error', errors);
        return false;
    }
    
    return true;
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Disable form and show loading state
    setFormLoading(form, true);
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Simulate API call
    setTimeout(() => {
        showMessage('success', ['Consultation booked successfully! We will contact you soon.']);
        form.reset();
        
        // Reset form state
        setFormLoading(form, false);
        submitButton.textContent = originalText;
    }, 2000);
}

function setFormLoading(form, isLoading) {
    const elements = form.querySelectorAll('input, select, textarea, button');
    elements.forEach(element => {
        element.disabled = isLoading;
    });
}

function showMessage(type, messages) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message message-${type}`;
    
    const messageContent = messages.map(msg => `<p>${msg}</p>`).join('');
    messageContainer.innerHTML = messageContent;
    
    const form = document.querySelector('.booking-form');
    form.insertBefore(messageContainer, form.firstChild);
    
    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s-+()]{10,}$/.test(phone);
}

function isValidDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.benefit-card, .timeline-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility function to prevent form double submission
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Enhanced Download Button Functionality
function simulateDownload(button) {
    if (button.classList.contains('downloading')) {
        return;
    }

    const originalText = button.innerHTML;
    button.classList.add('downloading');
    button.innerHTML = '<span class="loading-spinner"></span>Downloading...';

    // Simulate download progress
    setTimeout(() => {
        button.classList.remove('downloading');
        button.classList.add('success');
        button.innerHTML = '<i class="fas fa-check"></i>Downloaded';

        // Reset button after 2 seconds
        setTimeout(() => {
            button.classList.remove('success');
            button.innerHTML = originalText;
        }, 2000);
    }, 2000);
}

// Filter functionality for downloads page
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        filterTags.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tag
        tag.classList.add('active');
        
        // Here you would normally filter the resources
        // For now, we'll just add the visual feedback
        const filter = tag.getAttribute('data-filter');
        console.log('Filtering by:', filter);
    });
});

// Search functionality
const searchInput = document.getElementById('resourceSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Here you would normally implement the search logic
        console.log('Searching for:', searchTerm);
    });
}
// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
    }
});

function validateForm(form) {
    clearMessages();
    const errors = [];
    
    // Name validation
    const name = form.querySelector('#name').value.trim();
    if (name.length < 2) {
        addError(form.querySelector('#name'), 'Please enter a valid name (minimum 2 characters)');
        errors.push('Invalid name');
    }
    
    // Email validation
    const email = form.querySelector('#email').value.trim();
    if (!isValidEmail(email)) {
        addError(form.querySelector('#email'), 'Please enter a valid email address');
        errors.push('Invalid email');
    }
    
    // Phone validation (optional)
    const phone = form.querySelector('#phone').value.trim();
    if (phone && !isValidPhone(phone)) {
        addError(form.querySelector('#phone'), 'Please enter a valid phone number');
        errors.push('Invalid phone');
    }
    
    // Subject validation
    const subject = form.querySelector('#subject').value;
    if (!subject) {
        addError(form.querySelector('#subject'), 'Please select a subject');
        errors.push('Subject required');
    }
    
    // Message validation
    const message = form.querySelector('#message').value.trim();
    if (message.length < 10) {
        addError(form.querySelector('#message'), 'Please enter a message (minimum 10 characters)');
        errors.push('Message too short');
    }
    
    return errors.length === 0;
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Disable form and show loading state
    setFormLoading(form, true);
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We\'ll get back to you soon.';
        form.insertBefore(successMessage, form.firstChild);
        
        // Reset form
        form.reset();
        
        // Reset button state
        setFormLoading(form, false);
        submitButton.innerHTML = originalText;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 2000);
}

function setFormLoading(form, isLoading) {
    const elements = form.querySelectorAll('input, select, textarea, button');
    elements.forEach(element => {
        element.disabled = isLoading;
    });
}

function addError(element, message) {
    const formGroup = element.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
}

function clearMessages() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
    
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s-+()]{10,}$/.test(phone);
}

// Remove error messages on input
document.addEventListener('input', function(e) {
    if (e.target.closest('.form-group')) {
        const formGroup = e.target.closest('.form-group');
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});
// Payment Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    const packageSelect = document.getElementById('package');

    if (paymentForm) {
        // Initialize form handlers
        initializePaymentForm();
        
        // Handle form submission
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePaymentForm(this)) {
                handlePaymentSubmission(this);
            }
        });
    }

    // Package selection handler
    if (packageSelect) {
        packageSelect.addEventListener('change', updatePaymentSummary);
    }

    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
            updateCardIcon(value);
        });
    }

    // Expiry date formatting
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                value = value.substr(0, 2) + '/' + value.substr(2, 2);
            }
            
            e.target.value = value;
        });
    }

    // CVV validation
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substr(0, 4);
        });
    }
});

function initializePaymentForm() {
    // Set minimum date for expiry
    const today = new Date();
    const minMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const minYear = today.getFullYear().toString().slice(-2);
    
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.setAttribute('min', `${minMonth}/${minYear}`);
    }
}

function validatePaymentForm(form) {
    clearMessages();
    const errors = [];

    // Card Name validation
    const cardName = form.querySelector('#cardName').value.trim();
    if (cardName.length < 3) {
        addError(form.querySelector('#cardName'), 'Please enter a valid cardholder name');
        errors.push('Invalid card name');
    }

    // Card Number validation
    const cardNumber = form.querySelector('#cardNumber').value.replace(/\s/g, '');
    if (!isValidCardNumber(cardNumber)) {
        addError(form.querySelector('#cardNumber'), 'Please enter a valid card number');
        errors.push('Invalid card number');
    }

    // Expiry validation
    const expiry = form.querySelector('#expiry').value;
    if (!isValidExpiry(expiry)) {
        addError(form.querySelector('#expiry'), 'Please enter a valid expiry date');
        errors.push('Invalid expiry');
    }

    // CVV validation
    const cvv = form.querySelector('#cvv').value;
    if (!isValidCVV(cvv)) {
        addError(form.querySelector('#cvv'), 'Please enter a valid CVV');
        errors.push('Invalid CVV');
    }

    // Address validation
    const address = form.querySelector('#address').value.trim();
    if (address.length < 5) {
        addError(form.querySelector('#address'), 'Please enter a valid address');
        errors.push('Invalid address');
    }

    // City validation
    const city = form.querySelector('#city').value.trim();
    if (city.length < 2) {
        addError(form.querySelector('#city'), 'Please enter a valid city');
        errors.push('Invalid city');
    }

    // ZIP code validation
    const zipcode = form.querySelector('#zipcode').value.trim();
    if (!isValidZipCode(zipcode)) {
        addError(form.querySelector('#zipcode'), 'Please enter a valid ZIP code');
        errors.push('Invalid ZIP code');
    }

    // Terms checkbox validation
    const terms = form.querySelector('#terms');
    if (!terms.checked) {
        addError(terms, 'Please accept the terms and conditions');
        errors.push('Terms not accepted');
    }

    return errors.length === 0;
}

function handlePaymentSubmission(form) {
    const submitButton = form.querySelector('.submit-payment-button');
    const originalText = submitButton.innerHTML;
    
    // Disable form and show loading state
    setFormLoading(form, true);
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    
    // Simulate payment processing
    setTimeout(() => {
        showPaymentSuccess();
        form.reset();
        setFormLoading(form, false);
        submitButton.innerHTML = originalText;
    }, 2000);
}

function showPaymentSuccess() {
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'payment-success-modal';
    modal.innerHTML = `
        <i class="fas fa-check-circle success-icon"></i>
        <h2>Payment Successful!</h2>
        <p>Your payment has been processed successfully.</p>
        <p>A confirmation email will be sent to your registered email address.</p>
        <button class="pay-button" onclick="closePaymentModal()">Continue</button>
    `;
    
    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        overlay.classList.add('active');
        modal.classList.add('active');
    }, 100);
}

function closePaymentModal() {
    const overlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.payment-success-modal');
    
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        
        setTimeout(() => {
            overlay.remove();
            modal.remove();
        }, 300);
    }
}

function updatePaymentSummary() {
    const packageSelect = document.getElementById('package');
    const packagePriceElement = document.getElementById('packagePrice');
    const taxAmountElement = document.getElementById('taxAmount');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (!packageSelect || !packagePriceElement || !taxAmountElement || !totalAmountElement) return;
    
    const prices = {
        'basic': 299,
        'pro': 499,
        'enterprise': 999
    };
    
    const selectedPackage = packageSelect.value;
    const price = prices[selectedPackage] || 0;
    const tax = price * 0.1; // 10% tax
    const total = price + tax;
    
    packagePriceElement.textContent = `$${price.toFixed(2)}`;
    taxAmountElement.textContent = `$${tax.toFixed(2)}`;
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

function updateCardIcon(cardNumber) {
    const iconElement = document.querySelector('.card-type-icon');
    if (!iconElement) return;
    
    // Remove existing card type classes
    iconElement.className = 'card-type-icon fas';
    
    // Determine card type based on first digits
    if (cardNumber.startsWith('4')) {
        iconElement.classList.add('fab', 'fa-cc-visa');
    } else if (cardNumber.startsWith('5')) {
        iconElement.classList.add('fab', 'fa-cc-mastercard');
    } else if (cardNumber.startsWith('3')) {
        iconElement.classList.add('fab', 'fa-cc-amex');
    } else if (cardNumber.startsWith('6')) {
        iconElement.classList.add('fab', 'fa-cc-discover');
    } else {
        iconElement.classList.add('fa-credit-card');
    }
}

// Validation Helper Functions
function isValidCardNumber(cardNumber) {
    return cardNumber.length >= 13 && cardNumber.length <= 19 && /^\d+$/.test(cardNumber);
}

function isValidExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/').map(num => parseInt(num, 10));
    const today = new Date();
    const currentYear = parseInt(today.getFullYear().toString().slice(-2), 10);
    const currentMonth = today.getMonth() + 1;
    
    return month >= 1 && month <= 12 && 
           year >= currentYear && 
           (year > currentYear || month >= currentMonth);
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function isValidZipCode(zipcode) {
    return /^\d{5}(-\d{4})?$/.test(zipcode);
}

function setFormLoading(form, isLoading) {
    const elements = form.querySelectorAll('input, select, textarea, button');
    elements.forEach(element => {
        element.disabled = isLoading;
    });
}

function addError(element, message) {
    const formGroup = element.closest('.form-group') || element.parentElement;
    formGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
}

function clearMessages() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// Remove error messages on input
document.addEventListener('input', function(e) {
    if (e.target.closest('.form-group')) {
        const formGroup = e.target.closest('.form-group');
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuBtn && navLinks && menuOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
});
