function openPopup() {
  console.log("openPopup is aangeroepen");
  const popup = document.getElementById("popup");
  if (popup) {
    console.log("popup element gevonden");
    popup.style.display = "flex";
  } else {
    console.error("popup element NIET gevonden");
  }
}

function closePopup() {
  console.log("closePopup is aangeroepen");
  const popup = document.getElementById("popup");
  if (popup) {
    console.log("popup element gevonden");
    popup.style.display = "none";
  } else {
    console.error("popup element NIET gevonden");
  }
}
