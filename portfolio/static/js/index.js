// ===== INDEX PAGE INITIALIZATION START =====
document.addEventListener('DOMContentLoaded', function() {
    // Wait for fonts and critical resources to load
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initializeIndexPage();
        });
    } else {
        initializeIndexPage();
    }
});

function initializeIndexPage() {
    
    // Initialize with error handling
    try {
        initializeHeroSection();
        initializeYouTubeSection();
        initializeResearchFocus();
        initializeQuickStats();
        initializeQuickLinks();
        initializeScrollAnimations();
        initializeThemeAdaptations();
        initializeMouseGlowEffects();
        initializePerformanceOptimizations();
    
    } catch (error) {
        initializeFallbackAnimations();
    }
}

// ===== PERFORMANCE OPTIMIZATIONS START =====
function initializePerformanceOptimizations() {
    // Debounce function for scroll/resize events
    window.debounce = function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    };

    // Throttle function for frequent events
    window.throttle = function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Reduce layout thrashing
    window.batchDOMUpdates = function(callback) {
        requestAnimationFrame(callback);
    };
}

// ===== FALLBACK ANIMATIONS START =====
function initializeFallbackAnimations() {
    
    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-image, .youtube-stats, .focus-card, .link-card'
    );
    
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Basic number counting fallback
    document.querySelectorAll('[data-target]').forEach(el => {
        el.textContent = el.getAttribute('data-target');
    });
}
// ===== FALLBACK ANIMATIONS END =====

// ===== HERO SECTION JAVASCRIPT START =====
function initializeHeroSection() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {
        console.warn('Hero section not found');
        return;
    }

    // Typing Animation with improved timing and error handling
    initializeTypingAnimation();
    
    // Number Counting Animation
    initializeHeroNumberAnimation();
    
    // Scroll and interaction effects
    initializeHeroInteractions();
    
    // Intersection Observer for animations
    initializeHeroObservers();
}

function initializeTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
        'Machine Learning',
        'Artificial Intelligence', 
        'Deep Learning',
        'Computer Science'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let animationFrameId;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        animationFrameId = setTimeout(type, typingSpeed);
    }

    // Start with delay and cleanup on page leave
    const startTimeout = setTimeout(() => {
        type();
    }, 1000);

    // Cleanup function
    window.addEventListener('beforeunload', () => {
        clearTimeout(startTimeout);
        clearTimeout(animationFrameId);
    });
}

function initializeHeroNumberAnimation() {
    const numberElements = document.querySelectorAll('.youtube-stat-number[data-target]');
    if (numberElements.length === 0) return;

    const duration = 2000;
    const startTime = Date.now();
    
    function updateNumber(element, target, startValue, isDecimal = false) {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (target - startValue) * easeOut;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(2);
        } else {
            element.textContent = Math.floor(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(() => updateNumber(element, target, startValue, isDecimal));
        } else {
            element.textContent = isDecimal ? target.toFixed(2) : target;
        }
    }

    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        updateNumber(element, target, 0);
    });
}

function initializeHeroInteractions() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // 3D Parallax Effect - Throttled for performance
    const throttledScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const yPos = -(scrolled * 0.5);
            heroBackground.style.transform = `translateY(${yPos}px)`;
        }
    }, 16);

    window.addEventListener('scroll', throttledScroll);

    // Mouse Move 3D Parallax Effect - Debounced for performance
    const debouncedMouseMove = debounce((e) => {
        const floatingElements = document.querySelectorAll('.floating-element');
        const heroShapes = document.querySelectorAll('.hero-shape');
        
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * 20 * speed;
            const y = mouseY * 20 * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            const x = mouseX * 10 * speed;
            const y = mouseY * 10 * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 16);

    hero.addEventListener('mousemove', debouncedMouseMove);

    // Smooth Scroll for Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.youtube-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn-glow');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image Hover Effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function initializeHeroObservers() {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('youtube-hero-stats')) {
                    setTimeout(initializeHeroNumberAnimation, 500);
                }
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    const heroElements = document.querySelectorAll('.hero-text, .hero-image, .youtube-hero-stats');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroObserver.observe(el);
    });
}
// ===== HERO SECTION JAVASCRIPT END =====

// ===== YOUTUBE SECTION JAVASCRIPT START =====
function initializeYouTubeSection() {
    const youtubeSection = document.querySelector('.youtube-section');
    if (!youtubeSection) {
        console.warn('YouTube section not found');
        return;
    }

    // Number Counting Animation
    initializeYouTubeNumberAnimation();
    
    // Progress bar animations
    initializeProgressAnimations();
    
    // Card interactions
    initializeYouTubeInteractions();
    
    // Intersection Observer
    initializeYouTubeObservers();
}

function initializeYouTubeNumberAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target], .header-stat .stat-value');
    if (statNumbers.length === 0) return;

    const duration = 2500;
    const startTime = Date.now();
    
    function updateNumber(element, target, startValue) {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(() => updateNumber(element, target, startValue));
        } else {
            element.textContent = target;
        }
    }

    statNumbers.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        updateNumber(element, target, 0);
    });
}

function initializeProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill, .progress-bar::after');
    if (progressBars.length === 0) return;

    const duration = 1500;
    const startTime = Date.now();
    
    function updateProgress(bar, width) {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentWidth = width * easeOut;
        
        bar.style.width = `${currentWidth}%`;
        
        if (progress < 1) {
            requestAnimationFrame(() => updateProgress(bar, width));
        } else {
            bar.style.width = `${width}%`;
        }
    }

    progressBars.forEach(bar => {
        const width = parseInt(bar.getAttribute('data-width')) || 100;
        updateProgress(bar, width);
    });
}

function initializeYouTubeInteractions() {
    const cards = document.querySelectorAll('.stat-card, .playlist-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-play-btn, .floating-subscribers');
    
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initializeYouTubeObservers() {
    const youtubeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('youtube-stats')) {
                    setTimeout(() => {
                        initializeYouTubeNumberAnimation();
                        initializeProgressAnimations();
                    }, 300);
                }
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    const youtubeElements = document.querySelectorAll('.youtube-stats, .playlists-grid, .channel-cta');
    youtubeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        youtubeObserver.observe(el);
    });
}
// ===== YOUTUBE SECTION JAVASCRIPT END =====

// ===== RESEARCH FOCUS SECTION JAVASCRIPT START =====
function initializeResearchFocus() {
    const focusCards = document.querySelectorAll('.focus-card');
    if (focusCards.length === 0) return;

    focusCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const researchObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    focusCards.forEach(card => {
        researchObserver.observe(card);
    });
}
// ===== RESEARCH FOCUS SECTION JAVASCRIPT END =====

// ===== QUICK STATS SECTION JAVASCRIPT START =====
function initializeQuickStats() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    function animateQuickStats() {
        const statNumbers = document.querySelectorAll('.stats-section .stat-number[data-target]');
        if (statNumbers.length === 0) return;

        const duration = 2000;
        const startTime = Date.now();
        
        function updateNumber(element, target, startValue) {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (target - startValue) * easeOut;
            
            if (target % 1 !== 0) {
                element.textContent = currentValue.toFixed(2);
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                requestAnimationFrame(() => updateNumber(element, target, startValue));
            } else {
                element.textContent = target % 1 !== 0 ? target.toFixed(2) : target;
            }
        }

        statNumbers.forEach(element => {
            const target = parseFloat(element.getAttribute('data-target'));
            updateNumber(element, target, 0);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateQuickStats();
            }
        });
    }, {
        threshold: 0.5
    });

    statsObserver.observe(statsSection);
}
// ===== QUICK STATS SECTION JAVASCRIPT END =====

// ===== QUICK LINKS SECTION JAVASCRIPT START =====
function initializeQuickLinks() {
    const linkCards = document.querySelectorAll('.link-card');
    if (linkCards.length === 0) return;

    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const linksObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    linkCards.forEach(card => {
        linksObserver.observe(card);
    });
}
// ===== QUICK LINKS SECTION JAVASCRIPT END =====

// ===== MOUSE GLOW EFFECTS START =====
function initializeMouseGlowEffects() {
    const cardsWithGlow = document.querySelectorAll('.stat-card, .playlist-card, .focus-card, .link-card');
    
    const throttledMouseMove = throttle((e, card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    }, 32);

    cardsWithGlow.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            throttledMouseMove(e, card);
        });
    });
}
// ===== MOUSE GLOW EFFECTS END =====

// ===== SCROLL ANIMATIONS START =====
function initializeScrollAnimations() {
    // Smooth scrolling for anchor links
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

    // 3D Parallax effect for background shapes - Throttled
    const throttledParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.bg-shape, .cta-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }, 16);

    window.addEventListener('scroll', throttledParallax);
}
// ===== SCROLL ANIMATIONS END =====

// ===== THEME ADAPTATIONS START =====
function initializeThemeAdaptations() {
    let themeChangeTimeout;
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                // Debounce theme changes to prevent infinite loops
                clearTimeout(themeChangeTimeout);
                themeChangeTimeout = setTimeout(() => {
                    console.log('Theme changed, reinitializing animations');
                    applyThemeSpecificStyles();
                }, 100);
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    function applyThemeSpecificStyles() {
        const theme = document.body.getAttribute('data-theme');
        
        // Adjust animations based on theme if needed
        if (theme === 'light') {
            // Light theme specific adjustments
            document.documentElement.style.setProperty('--animation-speed', '1s');
        } else {
            // Dark theme specific adjustments
            document.documentElement.style.setProperty('--animation-speed', '1.2s');
        }
    }

    // Apply initial theme styles
    applyThemeSpecificStyles();
}
// ===== THEME ADAPTATIONS END =====

// ===== ERROR HANDLING & CLEANUP START =====
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You can add error reporting service here
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Clean up any ongoing animations or event listeners
    const observers = [
        'heroObserver', 
        'youtubeObserver', 
        'researchObserver', 
        'statsObserver', 
        'linksObserver'
    ];
    
    observers.forEach(observerName => {
        if (window[observerName]) {
            window[observerName].disconnect();
        }
    });
});

// Browser compatibility check
if (typeof IntersectionObserver === 'undefined') {
    console.warn('IntersectionObserver not supported, using fallback animations');
    initializeFallbackAnimations();
}

// Touch device detection and optimization
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');
    
    // Optimize for touch devices
    const hoverElements = document.querySelectorAll('.stat-card, .playlist-card, .focus-card, .link-card');
    hoverElements.forEach(el => {
        el.style.transition = 'transform 0.3s ease';
    });
}
// ===== ERROR HANDLING & CLEANUP END =====

// ===== LOADING STATES START =====
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Remove loading states
    setTimeout(() => {
        document.body.classList.remove('page-loading');
    }, 500);
});

// Show loading state immediately
document.body.classList.add('page-loading');
// ===== LOADING STATES END =====