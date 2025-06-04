const artList = document.querySelector(".artList");
const filterDropdown = document.getElementById("filterDropdown");
const sortDropdown = document.getElementById("sortDropdown");

let dataFilter = [];

let canvasCount = 1;
const canvasSize = 240;
let sketches = [];



// Fetch de artist lijst van de JSON file
function fetchArtists() {
    fetch('client/public/sources/artist_list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dataFilter = data.filter(artist => artist.ARTIST && artist.ARTIST.trim() !== "");
            updateDisplay();
        })
        .catch(error => console.error('Failed to fetch data:', error));
}

// Update het display gebaseerd op de geselecteerde filter en sort opties
function updateDisplay() {
    const filterType = filterDropdown.value;
    const sortType = sortDropdown.value;

    // Filteren
    // Als er geen filter is geselecteerd, gebruik dan de originele data
    let filtered = [];
    if (filterType === "image") {
        filtered = dataFilter.filter(item => item.FORMAT?.toLowerCase().includes("image"));
    } else if (filterType === "sound") {
        filtered = dataFilter.filter(item => item.FORMAT?.toLowerCase().includes("sound"));
    } else if (filterType === "text") {
        filtered = dataFilter.filter(item => item.FORMAT?.toLowerCase().includes("text"));
    } else {
        filtered = [...dataFilter];
    }

    // Sorteer
    // Als er geen sortering is geselecteerd, gebruik dan a-z data
    if (sortType === "artist-asc") {
        filtered.sort((a, b) => a.ARTIST.localeCompare(b.ARTIST));
    } else if (sortType === "artist-desc") {
        filtered.sort((a, b) => b.ARTIST.localeCompare(a.ARTIST));
    } else if (sortType === "artwork-asc") {
        filtered.sort((a, b) => a.ARTWORK_NAME.localeCompare(b.ARTWORK_NAME));
    } else if (sortType === "artwork-desc") {
        filtered.sort((a, b) => b.ARTWORK_NAME.localeCompare(a.ARTWORK_NAME));
    }

    // Leeg de lijst
    artList.innerHTML = "";

    // Vul opnieuw
    filtered.forEach(item => {
        const artistName = item.ARTIST;
        const artName = item.ARTWORK_NAME || "Zonder titel";
        const artistLink = item.LINK || "#";
        const artImg = item.img_url || "";
        const artType = item.FORMAT || "";


        // createThumbnails();
        // toont de data op de pagina
        artList.insertAdjacentHTML("beforeend", `
            <li class="artistCard" id="artistCard">
                <a href="/detail_pagina">
                <img src="` + artImg + `">
                    <h2>${artName}</h2>
                    <h3>${artistName}</h3>
                    <p>${artType}</p>
                </a>
            </li>
        ` );
    })};


// Event listeners voor de filter en sort dropdowns
filterDropdown.addEventListener("change", updateDisplay);
sortDropdown.addEventListener("change", updateDisplay);

fetchArtists();

function createThumbnails() {
  sketches.forEach(sk => sk.remove());
  sketches = [];

  for (let i = 0; i < canvasCount; i++) {
    sketches.push(new p5((p) => {
      let seed = Date.now() + i * 12345;
      let t = 0;

      p.setup = function () {
        let cnv = p.createCanvas(canvasSize, canvasSize);
        cnv.parent('artistCard');
        p.noiseSeed(seed);
        p.randomSeed(seed);
      };

      p.draw = function () {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);
        p.noFill();

        let styleType = seed % 5; // Nu 5 stijlen!
        let baseHue = (seed * 11) % 360;
        p.colorMode(p.HSB, 360, 100, 100, 100);
        let col = p.color(baseHue, 80, 30, 80); // donkerder voor wit bg
        p.stroke(col);

        t += 0.01;

        switch (styleType) {
          case 0: drawRings(p, t); break;
          case 1: drawGrid(p, t); break;
          case 2: drawSpiral(p, t); break;
          case 3: drawBlob(p, t); break;
          case 4: drawSoundWaves(p, t); break;
          default: drawRings(p, t);
        }
      };

      function drawRings(p, t) {
        let layers = 10;
        for (let j = 0; j < layers; j++) {
          let r = 30 + j * 10;
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            let off = p.noise(a * 2, j * 0.3, t) * 8;
            let x = (r + off) * p.cos(a);
            let y = (r + off) * p.sin(a);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }
      }

      function drawGrid(p, t) {
        let step = 8;
        p.strokeWeight(1);
        for (let x = -60; x <= 60; x += step) {
          for (let y = -60; y <= 60; y += step) {
            if (p.random() > 0.3) {
              let offset = p.noise(x * 0.1, y * 0.1, t) * 4;
              p.line(x - 4 + offset, y - 4 + offset, x + 4 + offset, y + 4 + offset);
            } else {
              let offset = p.noise(x * 0.1, y * 0.1, t) * 2;
              p.ellipse(x + offset, y + offset, 3, 3);
            }
          }
        }
      }

      function drawSpiral(p, t) {
        let currentT = 0;
        p.beginShape();
        for (let i = 0; i < 500; i++) {
          let r = 0.5 * i;
          let x = r * p.cos(currentT);
          let y = r * p.sin(currentT);
          p.vertex(x, y);
          currentT += 0.1 + p.noise(i * 0.01, t) * 0.05;
        }
        p.endShape();
      }

      function drawBlob(p, t) {
        let points = 100;
        let radius = 60;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / points) {
          let r = radius + p.map(p.noise(p.cos(a) + t, p.sin(a) + t), 0, 1, -20, 20);
          let x = r * p.cos(a);
          let y = r * p.sin(a);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
      }
function drawSoundWaves(p, t) {
  p.strokeWeight(1.5);
  let lines = 4;
  let spacing = 50;

  // Kleurmodus zetten voor HSB
  p.colorMode(p.HSB, 360, 100, 100, 100);

  for (let j = 0; j < lines; j++) {
    let yOffset = -50 + j * spacing;

    // Unieke kleur per lijn
    let hue = (100 + j * 60) % 360;
    let strokeCol = p.color(hue, 80, 40, 100);
    let fillCol = p.color(hue, 80, 70, 30);

    p.stroke(strokeCol);
    p.fill(fillCol);

    p.beginShape();
    for (let x = -canvasSize / 2; x <= canvasSize / 2; x += 2) {
      let noiseVal = p.noise(x * 0.003 + j * 30, t * 0.5 + j * 100);
      let amp = p.map(noiseVal, 0, 1, -50, 50);
      let y = yOffset + amp;
      p.curveVertex(x, y);
    }

    // Sluit vorm naar onderkant canvas
    p.curveVertex(canvasSize / 2, canvasSize / 2);
    p.curveVertex(-canvasSize / 2, canvasSize / 2);
    p.endShape(p.CLOSE);
  }
}



    }));
  }
}
