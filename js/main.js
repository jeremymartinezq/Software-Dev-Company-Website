// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');

    if (openMenuBtn && closeMenuBtn && navLinks) {
        openMenuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if it's not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animation for stats counter
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const speed = 50; // Lower is faster
            const increment = target / speed;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 40);
            } else {
                stat.innerText = target;
            }
        });
    };

    // Intersection Observer for scrolling animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                } else {
                    entry.target.classList.add('animated');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in and slide-in classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .stats-container');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Project slider navigation
    const projectsSlider = document.querySelector('.projects-slider');
    const prevProjectBtn = document.querySelector('.projects-nav .prev-btn');
    const nextProjectBtn = document.querySelector('.projects-nav .next-btn');

    if (projectsSlider && prevProjectBtn && nextProjectBtn) {
        prevProjectBtn.addEventListener('click', () => {
            projectsSlider.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });

        nextProjectBtn.addEventListener('click', () => {
            projectsSlider.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
    }

    // Testimonials slider navigation
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const prevTestimonialBtn = document.querySelector('.testimonials-nav .prev-btn');
    const nextTestimonialBtn = document.querySelector('.testimonials-nav .next-btn');

    if (testimonialsSlider && prevTestimonialBtn && nextTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });

        nextTestimonialBtn.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form submission would go here - for demo, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Newsletter subscription would go here - for demo, just show a success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
}); 