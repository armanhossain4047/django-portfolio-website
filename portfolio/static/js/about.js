// about.js - Animation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSkillBars();
    initHoverEffects();
});

// Scroll Animations
function initScrollAnimations() {
    const elements = {
        timeline: '.timeline-item',
        skills: '.skill-category',
        courses: '.course-category'
    };

    Object.keys(elements).forEach(key => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(elements[key]).forEach(el => {
            observer.observe(el);
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Hover Effects
function initHoverEffects() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.info-item, .btn, .course-category li');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}