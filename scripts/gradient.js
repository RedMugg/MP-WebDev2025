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

// Gradient met CSS en y en x als custom properties.

function iniColorschemeInteraction() {
    // if OS color scheme setting is changed
    window.matchMedia("(prefers-color-scheme: light)").addEventListener('change', () => {
      const colorSchemeRadioValue = $('[name="setting--color-theme"]:checked').value;
      if(colorSchemeRadioValue == "system") {
        setColorScheme("system");
      }
    });

    // if color scheme radio is selected
    colorSchemeRadios.forEach(colorSchemeRadio => {
      colorSchemeRadio.onchange = handleColorSchemeChange;
    });
  }




