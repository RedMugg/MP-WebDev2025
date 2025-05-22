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

  // Gradient updaten met vertraagde (current) waarden
  gradient.style.backgroundImage = 
    `radial-gradient(at ${currentX / 2}% ${currentY + 30 / 3 * 2}%, rgb(23, 23, 23) 0px, transparent 50%), 
     radial-gradient(at ${currentX / 3}% ${currentY}%, rgb(31, 221, 255) 0px, transparent 50%), 
     radial-gradient(at ${currentX}% ${currentY / 3}%, rgb(16, 194, 234) 0px, transparent 50%), 
     radial-gradient(at ${currentX * 2}% ${currentY + 20}%, rgb(255, 133, 224) 0px, transparent 50%), 
     radial-gradient(at ${currentX * 2 / 3}% ${currentY + 20}%, rgb(222, 94, 94) 0px, transparent 50%), 
     radial-gradient(at ${currentX * 3 / 2}% ${currentY / 3}%, rgb(17, 17, 44) 0px, transparent 50%), 
     radial-gradient(at 0% 0%, rgb(169, 67, 173) 0px, transparent 50%)`;

  requestAnimationFrame(animate);
}

animate();