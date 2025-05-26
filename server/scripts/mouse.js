const hoverEffect = document.querySelectorAll(".hoverEffect");

const colors = ["--colorPearlBlue", "--colorLavenderSheen", "--colorSoftMint", "--colorGlowShadow"];


hoverEffect.forEach(hoverEffect => {
  hoverEffect.addEventListener('mouseover', (e) => {
    let x = e.pageX - hoverEffect.offsetLeft;
    let y = e.pageY - hoverEffect.offsetTop;
  
    let randomNumber = Math.floor((Math.random() * colors.length) - 1);
    let randomColor = colors[randomNumber]

    hoverEffect.style.setProperty('--x', x + "px")
    hoverEffect.style.setProperty('--y', y + "px")
    hoverEffect.style.setProperty('--randomColor', "var(" + randomColor + ")")
  })
})