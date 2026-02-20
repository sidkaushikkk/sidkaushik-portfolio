/**
 * script.js
 * Contains logic for theme toggle, mobile menu, typing effect, scroll progress, and scroll reveal.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Set Copyright Year dynamically
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Theme Toggle Logic
    const themeBtn = document.getElementById("theme-toggle");
    const moonIcon = document.getElementById("moon-icon");
    const sunIcon = document.getElementById("sun-icon");
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            moonIcon.style.display = "none";
            sunIcon.style.display = "block";
        } else {
            moonIcon.style.display = "block";
            sunIcon.style.display = "none";
        }
        
        // Save preference
        localStorage.setItem("theme", theme);
    });

    // --- 3. Mobile Menu (Hamburger) Logic
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Highlight active link on scroll
    const sections = document.querySelectorAll("section");
    
    const highlightMenu = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for navbar
            const sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add("active");
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove("active");
            }
        });
    }
    
    window.addEventListener("scroll", highlightMenu);

    // --- 4. Typing Effect in Hero Section
    const typingTextElement = document.querySelector(".typing-text");
    const textArray = ["Computer Science Engineer", "Software Enthusiast.", "Problem Solver."];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if(!typingTextElement) return;

        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing new text
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // --- 5. Scroll Progress Indicator
    const scrollProgress = document.getElementById("scroll-progress");
    
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        const progressWidth = (scrollPosition / totalHeight) * 100;
        if(scrollProgress) {
            scrollProgress.style.width = progressWidth + "%";
        }
    });

    // --- 6. Scroll Reveal Animations & Progress Bars
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Show element when it's 100px from viewport bottom

        // Handle normal elements revealing
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });

        // Handle progress bars width animation
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < windowHeight - elementVisible) {
                // Get original target width from dataset
                const targetWidth = bar.getAttribute("data-width");
                if (targetWidth && bar.style.width !== targetWidth) {
                    bar.style.width = targetWidth;
                }
            }
        });
    };

    // Initial check and listen for scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

});
