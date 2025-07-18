const allElements = document.querySelectorAll('body *');



// ANIMATIE TOGGLE






// LIGHT AND DARK MODE

// Zet het html element als root en zet de radios met name colorMode in als colorRadios
const root = document.documentElement;
const colorRadios = document.querySelectorAll('input[name="colorMode"]');

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

// Haalt de kleurmode op uit de local storage en selecteert de juiste radio button en past de colorscheme toe
// als deze aangepast wordt.
  colorRadios.forEach(radio => {
    radio.addEventListener('change', e => {
      const mode = e.target.value;
      localStorage.setItem('colorMode', mode);
      applyTheme(mode);
    });
  });





// LETTERGROOTTE SLIDER

  // const slider = document.getElementById('fontSlider');
  // const label = document.getElementById('fontSizeLabel');

  //   // Haalt de standaard lettergrootte op vanuit de styling op het document. 
  //   allElements.forEach(el => {
  //     const style = window.getComputedStyle(el);
  //     const originalSize = parseFloat(style.fontSize);
  //     el.setAttribute('data-base-font-size', originalSize);
  //   });

  //   // Zorgt dat de waarde die in de label wordt weergegeven gelijk is aan de waarde van de slider.
  //   slider.addEventListener('input', () => {
  //   const newValue = parseInt(slider.value);
  //     label.textContent = newValue;

  //   // Voegt de toegevoedgde waarde toe aan het orgineel en maakt de fontsize op alle elementen groter.
  //   allElements.forEach(el => {
  //   const original = parseFloat(el.getAttribute('data-base-font-size'));
  //       el.style.fontSize = (original + newValue) + 'px';
  //     });
  //   });


// List View
const viewRadios = document.querySelectorAll('input[name="viewRadios"]');

function applyView(view) {
  if (view === 'list') {
    root.setAttribute('data-view', 'list');
  } else if (view === 'thumbnail') {
    root.removeAttribute('data-view', 'thumbnail');
  }
}

// Haalt de kleurmode op uit de local storage en selecteert de juiste radio button en past de colorscheme toe
// als deze aangepast wordt.
viewRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    const view = e.target.value;
    localStorage.setItem('viewMode', view);
    applyView(view);
  });
});

// LOCAL STORAGE 
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
        // Voegt de waarde van de slider uit de local storage toe aan de label en zet de slider op de juiste waarde.
        // Ook wordt de de fontsize op de pagina aangepast aan wat er uit de local storage gehaald wordt.
        // if (inputField.type === "range") {
        //       inputField.value = storedData[key];
        //       slider.dispatchEvent(new Event('input'));
        //       }

        // Vult de value van de radio button in met de waarde die in de local storage staat.
         if (inputField.type === "radio") {
                var input = document.querySelector(`[name=${key}][value=${storedData[key]}]`)
                if (input) {
                  input.setAttribute ("checked", "checked")
                } 
            }
      }
    }
  }

  // Past de colorscheme die in de local storage staat toe aan de pagina.
  const storedColorMode = localStorage.getItem('colorMode');
if (storedColorMode) {
  applyTheme(storedColorMode);
}

// OPSLAAN IN FAVORIETEN