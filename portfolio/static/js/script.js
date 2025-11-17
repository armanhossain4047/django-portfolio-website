// ===== WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializeWebsite() {
    initializeHeader();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeThemeSwitcher();
    initializeSocialLinks();
    initializeNewsletter();
    initializeAnimations();
    initializeSmoothScrolling();
    initializeKeyboardNavigation();
    initializeHoverEffects();
}

// ===== HEADER FUNCTIONALITY =====
function initializeHeader() {
    const header = document.querySelector('.premium-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
                scrollTopBtn.style.transform = 'translateY(10px)';
            }
        });
    }
}

// ===== THEME SWITCHER FUNCTIONALITY =====
function initializeThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('website-theme') || 'default';
    setTheme(savedTheme);
    
    // Set active button based on saved theme
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Add click event listeners to theme buttons
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active button
            themeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Set theme
            setTheme(theme);
            
            // Save to localStorage
            localStorage.setItem('website-theme', theme);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.15)';
            }, 150);
        });
    });
}

// ===== SET THEME FUNCTION =====
function setTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-default', 'theme-light', 'theme-dark');
    
    // Set data attribute for CSS variables
    body.setAttribute('data-theme', theme);
    
    // Add smooth transition
    body.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Remove transition after theme change
    setTimeout(() => {
        body.style.transition = '';
    }, 700);
}

// ===== SOCIAL LINKS FUNCTIONALITY =====
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Platform-specific URL handlers
    const platformHandlers = {
        'LinkedIn': () => window.open('https://www.linkedin.com/in/armanhossain4047', '_blank'),
        'GitHub': () => window.open('https://github.com/armanhossain4047', '_blank'),
        'ResearchGate': () => window.open('https://researchgate.net/profile/arman-hossain', '_blank'),
        'Kaggle': () => window.open('https://kaggle.com/ahbijoy121', '_blank'),
        'Twitter': () => window.open('https://twitter.com/CSEMasteryArman', '_blank'),
        'Facebook': () => window.open('https://facebook.com/armanhossain4047', '_blank'),
        'Instagram': () => window.open('https://instagram.com/armanitaly_', '_blank'),
        'YouTube': () => window.open('https://youtube.com/c/@CSEMasteryArman', '_blank'),
        'Medium': () => window.open('https://medium.com/@armanhossain', '_blank'),
        'Reddit': () => window.open('https://reddit.com/user/armanhossain', '_blank'),
        'Stack Overflow': () => window.open('https://stackoverflow.com/users/armanhossain', '_blank'),
        'TikTok': () => window.open('https://tiktok.com/@aramn_italy', '_blank'),
        'WhatsApp': () => window.open('https://wa.me/01609437299', '_blank'),
        'Clash of Clans': () => window.open('https://link.clashofclans.com/?action=OpenPlayerProfile&tag=YOURTAG', '_blank')
    };

    // Add staggered animation to social links
    socialLinks.forEach((link, index) => {
        // Initial hidden state
        link.style.opacity = '0';
        link.style.transform = 'scale(0.8) rotate(-10deg)';
        link.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        
        // Animate in
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'scale(1) rotate(0deg)';
        }, 600 + (index * 100));
        
        // Add click handlers
        const platform = link.getAttribute('data-tooltip');
        if (platformHandlers[platform]) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add ripple effect
                createRippleEffect(e, link);
                
                // Open platform link
                setTimeout(() => {
                    platformHandlers[platform]();
                }, 400);
            });
        }
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1.15)';
        });
    });
}

// ===== HOVER EFFECTS FIX =====
function initializeHoverEffects() {
    // Fix for navigation links - ensure text remains visible
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.zIndex = '2';
        });
    });

    // Fix for social links in light theme
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const originalColor = window.getComputedStyle(link).color;
        
        link.addEventListener('mouseenter', function() {
            this.style.color = '#000000';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = originalColor;
        });
    });
}

// ===== NEWSLETTER FUNCTIONALITY =====
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success state
                showNewsletterSuccess(newsletterBtn);
            } else {
                // Show error state
                showNewsletterError(newsletterInput);
            }
        });
    }
}

// ===== NEWSLETTER SUCCESS ANIMATION =====
function showNewsletterSuccess(button) {
    const originalHTML = button.innerHTML;
    const originalBG = button.style.background;
    
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = 'var(--success-color)';
    button.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = originalBG;
        button.style.transform = '';
    }, 2000);
}

// ===== NEWSLETTER ERROR ANIMATION =====
function showNewsletterError(input) {
    const originalBorder = input.style.borderColor;
    const originalTransform = input.style.transform;
    
    input.style.borderColor = 'var(--accent-color)';
    input.style.transform = 'scale(1.05)';
    input.style.boxShadow = '0 0 20px var(--accent-color)';
    
    setTimeout(() => {
        input.style.borderColor = originalBorder;
        input.style.transform = originalTransform;
        input.style.boxShadow = '';
    }, 2000);
}

// ===== ANIMATIONS INITIALIZATION =====
function initializeAnimations() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape, .footer-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.nav-link, .social-link, .footer-link, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
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
}

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('social-link')) {
                focusedElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    focusedElement.style.transform = '';
                }, 300);
            }
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Ripple effect creator
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        transform: scale(0);
        animation: ripple 0.8s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ADD RIPPLE ANIMATION STYLE =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .premium-header {
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .scroll-top {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .theme-switcher {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Fix for hover text visibility */
    .nav-link:hover .link-text,
    .nav-link:hover .link-icon {
        position: relative;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

// ===== LOADING OPTIMIZATIONS =====
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Preload critical images
    const criticalImages = [
        "{{ url_for('static', filename='images/profile.jpg') }}"
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', throttle(function() {
    // Handle any resize-specific logic
}, 250));