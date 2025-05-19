const gradient = document.getElementById('gradient');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth * 100;  // Percentage based on window width
  const y = e.clientY / window.innerHeight * 100; // Percentage based on window height

  // Set gradient origin based on cursor
  gradient.style.background = `radial-gradient(ellipse farthest-corner at ${x}% ${y}%, 
  var(--colorHotPink) 25%, 
  var(--colorCyanSplash) 60%, 
  var(--colorNeonYellow))`;

});

// https://www.sinds1971.nl/lava/index.html