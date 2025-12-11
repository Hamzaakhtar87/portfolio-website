// ============================================
// MUHAMMAD HAMZA - PORTFOLIO INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typing Animation ---
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "AI Developer",
        "Data Scientist",
        "Web3 Enthusiast",
        "Photographer",
        "Creative Thinker"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing if element exists
    if (typingElement) typeEffect();


    // --- 2. Particles Background ---
    const canvasContainer = document.getElementById('particles-background');
    if (canvasContainer) {
        // Simple particle system using DOM elements for performance/simplicity
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 'px';
            particle.style.height = particle.style.width;

            // Random colors (Blue, Purple, White)
            const rand = Math.random();
            if (rand < 0.33) particle.style.background = 'var(--color-accent-blue)';
            else if (rand < 0.66) particle.style.background = 'var(--color-accent-purple)';
            else particle.style.background = 'rgba(255,255,255,0.3)';

            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            // Random animation params
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            particle.style.animation = `floatParticle ${duration}s infinite linear ${delay}s`;

            canvasContainer.appendChild(particle);
        }

        // Add keyframes dynamically
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes floatParticle {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                20% { opacity: 0.5; }
                50% { transform: translateY(-100px) translateX(20px); opacity: 0.8; }
                80% { opacity: 0.5; }
                100% { transform: translateY(-200px) translateX(-20px); opacity: 0; }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
                40% {transform: translateY(-10px) translateX(-50%);}
                60% {transform: translateY(-5px) translateX(-50%);}
            }
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleSheet);
    }


    // --- 3. Scroll & Navbar Logic ---
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0,0,0,0.9)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(0,0,0,0.5)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }


    // --- 4. Intersection Observer for Fade-In ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // --- 5. Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = 'var(--color-accent-blue)';
                btn.style.color = '#000';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = ''; // Reset to default CSS
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }
});
