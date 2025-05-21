const allElements = document.querySelectorAll('body *');


// Animaties uitzetten






// Light and Darkmode

const root = document.documentElement;
  const radios = document.querySelectorAll('input[name="colorMode"]');

  function applyTheme(mode) {
    if (mode === 'donker') {
      root.setAttribute('data-color-scheme', 'dark');
    } else if (mode === 'licht') {
      root.removeAttribute('data-color-scheme');
    } else if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.setAttribute('data-color-scheme', 'dark');
      } else {
        root.removeAttribute('data-color-scheme');
      }
    }
  }


  const saved = localStorage.getItem('colorMode') || 'auto';
  document.getElementById(saved)?.setAttribute('checked', true);
  applyTheme(saved);


  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      const mode = e.target.value;
      localStorage.setItem('colorMode', mode);
      applyTheme(mode);
    });
  });


  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('colorMode') === 'auto') {
      applyTheme('auto');
    }
  });




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