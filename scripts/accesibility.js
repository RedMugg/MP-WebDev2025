const allElements = document.querySelectorAll('body *');


// Animaties uitzetten






// Light and Darkmode






// Lettergrote slider

   const slider = document.getElementById('fontSlider');
    const label = document.getElementById('fontSizeLabel');

    // Store original font sizes
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const originalSize = parseFloat(style.fontSize);
      el.setAttribute('data-original-font-size', originalSize);
    });

    slider.addEventListener('input', () => {
      const delta = parseInt(slider.value);
      label.textContent = delta;

      allElements.forEach(el => {
        const original = parseFloat(el.getAttribute('data-original-font-size'));
        el.style.fontSize = (original + delta) + 'px';
      });
    });