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


// Get the correct art details
let convertedList = [];
const artList = document.querySelector(".artList");

const currentURL = window.location.href;
const currentID = currentURL.replace("http://localhost:3000/detail_pagina/", "");
let dataFilter = [];


// Fetch de artist lijst van de JSON file
function fetchArtists() {
    fetch('https://aiaiai.art/wp-json/wp/v2/pages/' + currentID + "?_fields=author,id,excerpt,title,link,content")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // dataFilter = data.filter(data => data.ARTIST && data.ARTIST.trim() !== "");
            let unsplitLong = data.content.rendered;

            let splitLong = unsplitLong.replace('\n<h2 class=\"wp-block-heading is-style-default\">', "").replace('</h2>', "").replace('<figure class="wp-block-image size-large"><img decoding="async" src="', "").replace('</p>', "").replace('" alt=""/><figcaption class="wp-element-caption">', "").replace('</figcaption></figure>', "").replace(/<p>/g, "").replace('<p class=\"is-style-text-annotation is-style-text-annotation--1\">', "").replace("</p></p></p>\n", "").replace(/\n\n\n\n/g, "").replace('<a href=\"https://www.cyberneticforests.com/online-portfolio\">', "").replace('<a href=\"', "").replace('</a>', "").replace('</p><figure class=\"wp-block-image size-large\"><img decoding=\"async\" src=\"', "").replace('\" alt=""/></figure><figure class="wp-block-image size-large"><img decoding="async" src="', "").replace('" alt=""/></figure><figure class="wp-block-image size-large"><img decoding="async" src="', "").replace('" alt=""/></figure>\n', "");
            splitLong = splitLong.split("|");

            const itemID = data.id;
            const itemTitle = data.title.rendered;
            const itemArtist = splitLong[1];
            const itemImage = splitLong[2];
            const itemAlt = splitLong[3];
            const itemType = splitLong[5];
            const itemDescription = splitLong[7];
            const itemExercise = splitLong[9];

            const itemLink = splitLong[11].split('">')[0];

            if (splitLong.length > 13) {
              const itemImageE1 = splitLong[13].replace('<a href=\"', "").split('">')[0];
              const itemImageE2 = splitLong[15].replace('<a href=\"', "").split('">')[0];
              const itemImageE3 = splitLong[17].replace('<a href=\"', "").split('">')[0];
  
              let newArt = { id: itemID, title: itemTitle, artist: itemArtist, type: itemType, description: itemDescription, exercise: itemExercise, alt: itemAlt, image: itemImage, link: itemLink, imageE1: itemImageE1, imageE2: itemImageE2, imageE3: itemImageE3 };
              convertedList.push(newArt);
            } else {

              let newArt = { id: itemID, title: itemTitle, artist: itemArtist, type: itemType, description: itemDescription, exercise: itemExercise, alt: itemAlt, image: itemImage, link: itemLink };
              convertedList.push(newArt);
            }
            
            updateDisplay();
        })
        .catch(error => console.error('Failed to fetch data:', error));
}

// Update het display gebaseerd op de geselecteerde filter en sort opties
function updateDisplay() {
        // put data in variables
        const artistName = convertedList[0].artist;
        const artName = convertedList[0].title || "Zonder titel";
        const artistLink = convertedList[0].link || "#";
        const artImgLink = convertedList[0].image || "";
        const artDescriptionText = convertedList[0].description || "";
        const artAlt = convertedList[0].alt || "";

        const artImageE1 = convertedList[0].imageE1 || "";
        const artImageE2 = convertedList[0].imageE2 || "";
        const artImageE3 = convertedList[0].imageE3 || "";

        // Get elements on the detail page
        const artTitle = document.querySelector(".artTitle");
        const artist = document.querySelector(".artist");
        const artDescription = document.querySelector(".artDescription");
        const artLink = document.querySelector(".artLink");
        const artImage = document.querySelector(".artImage");

        const artImageE1spot = document.querySelector(".artImageE1spot");
        const artImageE2spot = document.querySelector(".artImageE2spot");
        const artImageE3spot = document.querySelector(".artImageE3spot");

        // Put data on the detail page
        artTitle.innerHTML = artName;
        artist.innerHTML = artistName;
        artDescription.innerHTML = artDescriptionText;
        artLink.href = artistLink;
        artImage.src = artImgLink;
        artImage.alt = artAlt;

        if (artImageE1 != "") {
          artImageE1spot.src = artImageE1;
          artImageE2spot.src = artImageE2;
          artImageE3spot.src = artImageE3;
        } else {
          artImageE1spot.style.display = "none";
          artImageE2spot.style.display = "none";
          artImageE3spot.style.display = "none";
        }

}

fetchArtists();
