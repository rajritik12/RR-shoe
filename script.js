// This ensures the JavaScript code runs only after the entire HTML document has been fully loaded and parsed.
// This is important because the script tries to find HTML elements (like navigation links or shoes),
// and those elements might not exist yet if the script runs too early.
document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------
    // 1. Smooth Scrolling for Navigation Links
    // -----------------------------------------------------

    // Selects all <a> (anchor) tags inside a <nav> element
    // whose 'href' attribute starts with '#' (meaning it's an internal link to a section on the same page).
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        // Adds an event listener to each found anchor link.
        // This function will run when a user clicks on the link.
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevents the browser's default behavior (which is to jump instantly to the section)

            // Finds the HTML element on the page whose 'id' matches the 'href' of the clicked link.
            // Then, it tells the browser to scroll smoothly to that element.
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // 'smooth' makes the scroll animated, 'auto' would be instant
            });
        });
    });

    // -----------------------------------------------------
    // 2. Intersection Observer for Scroll Reveal Animations
    // -----------------------------------------------------

    // Selects all HTML elements that have the CSS class 'animate-on-scroll'.
    // These are the elements we want to animate into view when the user scrolls to them.
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    // Defines options for the Intersection Observer.
    const observerOptions = {
        root: null, // 'null' means the viewport (the browser window) is the area we are watching for intersections.
        rootMargin: '0px', // No extra margin around the root (viewport).
        threshold: 0.1 // The animation will trigger when 10% (0.1) of the target element is visible in the viewport.
    };

    // Creates a new Intersection Observer instance.
    // The callback function will run whenever an observed element's visibility changes.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Checks if the element is currently visible in the viewport
                entry.target.classList.add('visible'); // If visible, adds the 'visible' CSS class to the element.
                // This 'visible' class will trigger the CSS animations (opacity, transform).
                observer.unobserve(entry.target); // Stops observing this element once it has become visible and animated.
                // This is good for performance, as we don't need to animate it again.
            }
        });
    }, observerOptions); // Passes the options we defined earlier.

    // Loops through all elements that should animate on scroll.
    // For each element, it tells the observer to start watching it.
    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // -----------------------------------------------------
    // 3. Optional: Hero Shoe Subtle Animation on Mouse Hover
    // -----------------------------------------------------

    // Finds the image element for the main hero shoe that has the class 'animated-shoe'.
    const heroShoe = document.querySelector('.animated-shoe');

    // Checks if the hero shoe element actually exists on the page.
    if (heroShoe) {
        // Adds an event listener for when the mouse pointer enters the area of the hero shoe.
        heroShoe.addEventListener('mouseover', () => {
            // Changes the 'transform' CSS property of the shoe.
            // This makes it lift slightly, rotate less, and scale up a tiny bit, creating a subtle animation.
            heroShoe.style.transform = 'translateY(-5px) rotateY(-5deg) rotateX(0deg) scale(1.02)';
        });

        // Adds an event listener for when the mouse pointer leaves the area of the hero shoe.
        heroShoe.addEventListener('mouseout', () => {
            // Resets the 'transform' CSS property to its original state, making the shoe return to its initial position.
            heroShoe.style.transform = 'translateY(0px) rotateY(-15deg) rotateX(5deg) scale(0.9)';
        });
    }
});