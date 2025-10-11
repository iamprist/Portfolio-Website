// ===== PORTFOLIO WEBSITE INTERACTIVITY =====
// Pretty Mangwadi Portfolio - JavaScript Enhancement

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initTypingAnimation();
    initParallaxEffects();
    initGallery();
    initImageLazyLoading();
    initCoursework();
    initCVDropdown();
    
    console.log(' Pretty Mangwadi Portfolio Loaded Successfully!');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active navigation link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Event listeners for scroll
    window.addEventListener('scroll', function() {
        updateActiveLink();
        updateNavbarBackground();
        handleScrollAnimations();
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Special handling for home link - scroll to top instantly
                if (targetId === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'instant'
                    });
                } else {
                    // For other sections, use smooth scrolling with navbar offset
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .project-card,
        .skill-item,
        .timeline-item,
        .about-card,
        .contact-item,
        .stat
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function handleScrollAnimations() {
    // Additional scroll-based animations can be added here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 30; // Animation speed
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 50);
}

// ===== SKILL ITEM ANIMATION =====
function animateSkillItem(element) {
    element.style.animationDelay = `${Math.random() * 0.5}s`;
    element.classList.add('skill-bounce');
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let index = 0;
    const typeSpeed = 80;
    
    function typeText() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Add blinking cursor effect
            tagline.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    // Start typing animation after other animations
    setTimeout(typeText, 2000);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== EMAILJS CONFIGURATION =====
/*
📧 EMAILJS SETUP INSTRUCTIONS:

1. Go to https://www.emailjs.com/ and create a free account
2. Create an Email Service:
   - Go to Email Services > Add New Service
   - Choose Gmail, Outlook, or any email provider
   - Follow the setup instructions
   - Copy the Service ID

3. Create an Email Template:
   - Go to Email Templates > Create New Template
   - Use these template variables in your email:
     {{from_name}} - Sender's name
     {{from_email}} - Sender's email
     {{subject}} - Email subject
     {{message}} - Message content
     {{to_name}} - Your name (Pretty Mangwadi)
   - Copy the Template ID

4. Get your Public Key:
   - Go to Account > General
   - Copy your Public Key

5. Replace the values below with your actual credentials:
*/

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_f47rzy9',        // Replace with your EmailJS Service ID
    TEMPLATE_ID: 'template_m7cw7kf',      // Replace with your EmailJS Template ID
    PUBLIC_KEY: 'SudcOKpFV-2FBTYx6'         // Replace with your EmailJS Public Key
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log(' EmailJS initialized successfully');
    }
})();

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validateForm(formObject)) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    {
                        from_name: formObject.name,
                        from_email: formObject.email,
                        subject: formObject.subject,
                        message: formObject.message,
                        to_name: 'Pretty Mangwadi'
                    }
                ).then(
                    function(response) {
                        console.log(' Email sent successfully:', response);
                        showNotification('Message sent successfully!  I\'ll get back to you soon.', 'success');
                        contactForm.reset();
                    },
                    function(error) {
                        console.error(' Email sending failed:', error);
                        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                    }
                ).finally(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
            } else {
                // Fallback for when EmailJS is not configured
                console.warn(' EmailJS not configured properly. Using demo mode.');
                setTimeout(() => {
                    showNotification('Demo Mode: EmailJS not configured yet. Please set up your credentials.', 'info');
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        }
    });

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// ===== FORM VALIDATION =====
function validateForm(formData) {
    let isValid = true;
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && value === '') {
        showFieldError(field.name, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.name, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2d5a27' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== DOWNLOAD CV FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const downloadCVButton = document.getElementById('downloadCV');
    
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show notification (since we don't have an actual CV file)
           // showNotification('CV download will be available soon!', 'info');
            
            // In a real implementation, you would:
             window.open('cv.pdf', '_blank');
            // or trigger a download of the actual CV file
        });
    }
});

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill item click effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// ===== LOADING SCREEN (Optional) =====
function initLoadingScreen() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading Pretty's Portfolio...</p>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--text-light);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Remove loading screen when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Konami code easter egg
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Fun animation when Konami code is entered
    const body = document.body;
    body.style.animation = 'rainbow 2s ease-in-out';
    
    showNotification('🎉 You found the secret! Pretty loves creative developers!', 'success');
    
    setTimeout(() => {
        body.style.animation = '';
    }, 2000);
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScrollAnimations, 10);
    });
}

// ===== ADDITIONAL CSS FOR ANIMATIONS =====
const additionalStyles = `
    <style>
        .cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .skill-bounce {
            animation: bounceIn 0.8s ease-out;
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(45, 90, 39, 0.2);
            border-top: 4px solid var(--primary-green);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .image-modal .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .image-modal .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .image-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10001;
            transition: background 0.2s ease;
        }
        
        .image-modal .modal-close:hover {
            background: rgba(0, 0, 0, 0.9);
        }
        
        .image-modal .modal-image {
            width: 100%;
            max-height: 70vh;
            object-fit: contain;
        }
        
        .image-modal .modal-info {
            padding: 1.5rem;
            text-align: center;
            background: var(--bg-light);
        }
        
        .image-modal .modal-info h4 {
            color: var(--text-dark);
            margin-bottom: 0.5rem;
        }
        
        .image-modal .modal-info p {
            color: var(--secondary-green);
        }
        
        img.loaded {
            animation: imageLoad 0.5s ease-out;
        }
        
        @keyframes imageLoad {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function() {
    initInteractiveElements();
    initEasterEggs();
    optimizePerformance();
    
    // Optional: uncomment to add loading screen
    // initLoadingScreen();
});

// ===== GALLERY FUNCTIONALITY =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add click functionality for gallery items
        item.addEventListener('click', function() {
            const image = this.querySelector('.gallery-image');
            const info = this.querySelector('.gallery-info');
            
            if (image && info) {
                openImageModal(image.src, image.alt, info.innerHTML);
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== IMAGE MODAL FUNCTIONALITY =====
function openImageModal(imageSrc, imageAlt, infoHTML) {
    // Remove existing modal
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
            <div class="modal-info">
                ${infoHTML}
            </div>
        </div>
    `;
    
    // Modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    function closeModal() {
        modal.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
    
    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, { once: true });
}

// ===== IMAGE LAZY LOADING =====
function initImageLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.filter = 'blur(5px)';
                img.style.transition = 'filter 0.3s ease-in-out';
                
                // Simulate loading
                setTimeout(() => {
                    img.style.filter = 'blur(0)';
                    img.classList.add('loaded');
                }, 100);
                
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PROFILE IMAGE HOVER EFFECTS =====
function initProfileImageEffects() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Initialize profile image effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProfileImageEffects();
});

// ===== COURSEWORK SCROLL FUNCTIONALITY =====
window.toggleCoursework = function() {
    console.log('Scroll to coursework function called');
    const courseworkSection = document.getElementById('coursework');
    
    if (!courseworkSection) {
        console.error('Coursework section not found');
        return;
    }
    
    // Simply scroll to coursework section
    courseworkSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
};

// ===== COURSEWORK INITIALIZATION =====
function initCoursework() {
    console.log('Initializing coursework section');
    const courseworkSection = document.getElementById('coursework');
    const toggleBtn = document.querySelector('.toggle-btn');
    
    if (courseworkSection) {
        console.log('Coursework section found and visible');
    } else {
        console.error('Coursework section not found during initialization');
    }
    
    if (toggleBtn) {
        console.log('Toggle button found and ready');
        // Update button text to indicate it will scroll to coursework
        toggleBtn.innerHTML = '<i class="fas fa-graduation-cap"></i> View Coursework';
        
        // Add click event listener (backup to onclick)
        toggleBtn.addEventListener('click', function(e) {
            console.log('Button clicked - scrolling to coursework');
            e.preventDefault();
            window.toggleCoursework();
        });
    } else {
        console.error('Toggle button not found during initialization');
    }
}

// ===== CV DROPDOWN FUNCTIONALITY =====
function initCVDropdown() {
    const dropdown = document.querySelector('.cv-dropdown');
    const dropdownToggle = document.getElementById('cvDropdown');
    const dropdownMenu = document.getElementById('cvMenu');
    
    if (!dropdown || !dropdownToggle || !dropdownMenu) {
        console.log('CV dropdown elements not found');
        return;
    }
    
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    });
    
    // Add analytics tracking for CV downloads (optional)
    const downloadLinks = dropdownMenu.querySelectorAll('.dropdown-item');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            const cvType = this.querySelector('.cv-title').textContent;
            console.log(`📄 CV Downloaded: ${cvType}`);
            // You can add Google Analytics tracking here if needed
            // gtag('event', 'download', { 'cv_type': cvType });
        });
    });
    
    console.log('✅ CV dropdown initialized successfully');
}