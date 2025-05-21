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




