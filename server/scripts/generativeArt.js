const canvasCount = 3;
const canvasSize = 240;
let sketches = [];

function createThumbnails() {
  sketches.forEach(sk => sk.remove());
  sketches = [];

  for (let i = 0; i < canvasCount; i++) {
    sketches.push(new p5((p) => {
      let seed = Date.now() + i * 12345;
      let t = 0;

      let baseHue, styleType;

      p.setup = function () {
        let cnv = p.createCanvas(canvasSize, canvasSize);
        cnv.parent('thumbnail-container');
        p.noiseSeed(seed);
        p.randomSeed(seed);
        p.colorMode(p.HSB, 360, 100, 100, 100);

        styleType = seed % 5;
        baseHue = p.random(360);
      };

      p.draw = function () {
        t += 0.01;
        p.background(255);
        p.translate(p.width / 2, p.height / 2);
        p.noFill();

        switch (styleType) {
          case 0: drawRings(p, t, baseHue); break;
          case 1: drawGrid(p, t, baseHue); break;
          case 2: drawSpiral(p, t, baseHue); break;
          case 3: drawBlob(p, t, baseHue); break;
          case 4: drawSoundWaves(p, t, baseHue); break;
        }
      };

      // -- RINGS: variatie per ring in radius & noise schaal
      function drawRings(p, t, baseHue) {
        let layers = 6;
        for (let j = 0; j < layers; j++) {
          // Variatie in radius en noise schaal
          let r = 30 + j * 10 + p.noise(j * 0.5, seed * 0.01) * 10;
          let noiseScale = 2 + p.noise(j * 0.3, seed * 0.02);

          let hue = (baseHue + j * 30 + seed * 0.1) % 360;
          let fillCol = p.color(hue, 60, 90, 80);
          let strokeCol = p.color(hue, 80, 40, 100);

          p.fill(fillCol);
          p.stroke(strokeCol);
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            let off = p.noise(a * noiseScale, j * 0.3, t) * 8;
            let x = (r + off) * p.cos(a);
            let y = (r + off) * p.sin(a);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }
      }

      // -- GRID: variatie per vakje in kleur, offset en lijn/bol
      function drawGrid(p, t, baseHue) {
        let step = 20;
        p.strokeWeight(1);
        for (let x = -60; x <= 60; x += step) {
          for (let y = -60; y <= 60; y += step) {
            let idxSeed = seed + x * 7 + y * 13;
            let hue = (baseHue + x + y + t * 50 + idxSeed * 0.3) % 360;
            let fillCol = p.color(hue, 70, 80, 80);
            let strokeCol = p.color(hue, 80, 60, 100);
            p.stroke(strokeCol);
            p.fill(fillCol);

            if (p.noise(x * 0.1, y * 0.1, t + idxSeed) > 0.3) {
              let offset = p.noise(x * 0.1, y * 0.1, t + idxSeed) * 4;
              p.line(x - 4 + offset, y - 4 + offset, x + 4 + offset, y + 4 + offset);
              p.noFill();
            } else {
              let offset = p.noise(x * 0.1, y * 0.1, t + idxSeed) * 2;
              p.ellipse(x + offset, y + offset, 8, 8);
            }
          }
        }
      }

      // -- SPIRAL: variatie in aantal lagen, noise schaal & snelheid per laag
      function drawSpiral(p, t, baseHue) {
        let layers = 2 + Math.floor(p.noise(seed) * 3);
        for (let layer = 0; layer < layers; layer++) {
          let hue = (baseHue + layer * 40 + seed * 0.5) % 360;
          let fillCol = p.color(hue, 60, 80, 50);
          let strokeCol = p.color(hue, 80, 60, 100);

          p.fill(fillCol);
          p.stroke(strokeCol);

          p.beginShape();
          let currentT = 0;
          let speedMod = 0.1 + p.noise(layer * 0.3, seed * 0.2) * 0.1;
          for (let i = 0; i < 500; i++) {
            let r = 0.5 * i + p.noise(i * 0.01, layer * 0.5) * 20;
            let x = r * p.cos(currentT);
            let y = r * p.sin(currentT);
            p.vertex(x, y);
            currentT += speedMod + p.noise(i * 0.01, t + layer * 10) * 0.05;
          }
          p.endShape();
        }
      }

      // -- BLOB: variatie in radius en noise offset per punt
      function drawBlob(p, t, baseHue) {
        let points = 100;
        let baseRadius = 60;
        let hue = baseHue;
        let fillCol = p.color(hue, 70, 80, 80);
        let strokeCol = p.color(hue, 90, 50, 100);

        p.fill(fillCol);
        p.stroke(strokeCol);

        p.beginShape();
        for (let i = 0; i < points; i++) {
          let a = p.TWO_PI * (i / points);
          let noiseOffset = p.noise(p.cos(a) * 3 + seed, p.sin(a) * 3 + seed, t);
          let r = baseRadius + p.map(noiseOffset, 0, 1, -20, 20);
          // extra variatie op radius
          r += p.noise(i * 0.1, seed * 0.5) * 10;
          let x = r * p.cos(a);
          let y = r * p.sin(a);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
      }

      // -- SOUNDWAVES: al variatie door noise per lijn en kleur
      function drawSoundWaves(p, t, baseHue) {
        p.strokeWeight(1.5);
        let lines = 4;
        let spacing = 50;

        for (let j = 0; j < lines; j++) {
          let yOffset = -50 + j * spacing;

          let hue = (baseHue + j * 60 + seed * 0.2) % 360;
          let strokeCol = p.color(hue, 80, 40, 100);
          let fillCol = p.color(hue, 80, 70, 30);

          p.stroke(strokeCol);
          p.fill(fillCol);
          p.beginShape();
          for (let x = -canvasSize / 2; x <= canvasSize / 2; x += 2) {
            let noiseVal = p.noise(x * 0.003 + j * 30 + seed, t * 0.5 + j * 100);
            let amp = p.map(noiseVal, 0, 1, -50, 50);
            let y = yOffset + amp;
            p.curveVertex(x, y);
          }
          p.curveVertex(canvasSize / 2, canvasSize / 2);
          p.curveVertex(-canvasSize / 2, canvasSize / 2);
          p.endShape(p.CLOSE);
        }
      }

    }));
  }
}

window.onload = () => {
  createThumbnails();
  document.getElementById('refreshBtn').addEventListener('click', createThumbnails);
};
