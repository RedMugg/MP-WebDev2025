const gradient = document.getElementById('gradient');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth * 100;  // Percentage based on window width
  const y = e.clientY / window.innerHeight * 100; // Percentage based on window height

  // Set gradient origin based on cursor
  gradient.style.background = `radial-gradient(ellipse farthest-corner at ${x}% ${y}%, 
    var(--colorPearlPink) 25%, 
    var(--colorPearlBlue) 60%, 
    var(--colorHighlightWhite))`;
});

// https://www.sinds1971.nl/lava/index.html