/**
 * Cepheus Front-End Animation Engine
 * Hyper-optimized native viewport scroll tracking
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // High-performance configuration options for the observer engine
  const observerOptions = {
    root: null, // Relative to the browser viewport
    rootMargin: "0px",
    threshold: 0.1 // Triggers when exactly 10% of the element enters the view
  };

  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Check if the specific structural block has crossed into the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Critical Optimization: Stop watching the element once it's visible.
        // This frees up RAM and processing cycles for smooth 60fps scrolling.
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Safely hook every element that needs to gracefully fade in
  const elementsToReveal = document.querySelectorAll('.reveal');
  elementsToReveal.forEach(element => {
    scrollRevealObserver.observe(element);
  });
});