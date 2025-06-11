const gradient = document.getElementById('gradient'); // Zorg dat dit element bestaat

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
});

function animate() {
  // Lerp om huidige waarden richting target te bewegen
  const delayFactor = 0.04; // Hoe kleiner, hoe trager de animatie

  currentX += (targetX - currentX) * delayFactor;
  currentY += (targetY - currentY) * delayFactor;

 gradient.style.setProperty('--currentX', currentX / 100);
 gradient.style.setProperty('--currentY', currentY / 100);

  requestAnimationFrame(animate);
}

animate();

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

