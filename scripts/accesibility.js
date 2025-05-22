const allElements = document.querySelectorAll('body *');


// Animaties uitzetten






// Light and Darkmode

const root = document.documentElement;
const radios = document.querySelectorAll('input[name="colorMode"]');

  function applyTheme(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-color-scheme', 'dark');
    } else if (mode === 'light') {
      root.removeAttribute('data-color-scheme');
    } else if (mode === 'auto') {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.setAttribute('data-color-scheme', 'dark');
      } else {
        root.removeAttribute('data-color-scheme');
      }
    }
  }


  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      const mode = e.target.value;
      localStorage.setItem('colorMode', mode);
      applyTheme(mode);
    });
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




// Local Storage 

document.querySelector('form').addEventListener('click', function() {
    // Pak van dit formulier (this) de formulierdata (met new FormData)
    let formData = new FormData(this)

    let temporaryObject = {}
    // Sla dat op in localStorage
    for (const keyValue of formData.entries()) {
      temporaryObject[keyValue[0]] = keyValue[1]
    }

    // Sla dat laatste op in localStorage..
    localStorage['mijn-form'] = JSON.stringify(temporaryObject)

    console.log('localStorage', localStorage['mijn-form'])
  });

  if (localStorage['mijn-form']) {
    const storedData = JSON.parse(localStorage['mijn-form']);

    for (const key in storedData) {
      const inputField = document.querySelector(`[name="${key}"]`);
      if (inputField) {
        if (inputField.type === "range") {
              inputField.value = storedData[key];
              slider.dispatchEvent(new Event('input'));
              }

         if (inputField.type === "radio") {
                var input = document.querySelector(`[name=${key}][value=${storedData[key]}]`)
                if (input) {
                  input.setAttribute ("checked", "checked")
                } 
            }
      }
    }
  }

  const storedColorMode = localStorage.getItem('colorMode');
if (storedColorMode) {
  applyTheme(storedColorMode);
}