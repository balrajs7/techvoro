document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if element has a data-delay attribute
                const delay = entry.target.getAttribute('data-delay');
                
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('visible');
                }
                
                // Optional: Stop observing once visible if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with fade-in-up class
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Simple 3D Parallax effect on mousemove for the avatar
    const heroSection = document.querySelector('.hero-section');
    const avatar = document.querySelector('.floating-avatar');
    
    if (heroSection && avatar) {
        const avatarContainer = document.querySelector('.avatar-container');

        heroSection.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to center of the hero section
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            // Apply rotation based on mouse position
            // We keep the animation by applying it wrapping element, but for now we apply rotate directly.
            // A more complex setup would use an inner wrapper to not fight the CSS animation.
            // For simplicity, we just add a slight transform
            avatar.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
        });
        
        // Reset transformation when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            avatar.style.transform = `rotateY(0deg) rotateX(0deg)`;
            // Remove inline style so CSS keyframe float can resume properly if it was fighting
            setTimeout(() => {
                avatar.style.transform = '';
            }, 500);
        });
    }
});
