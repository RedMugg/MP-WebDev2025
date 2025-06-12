let convertedList = [];

const currentURL = window.location.href;
const currentID = currentURL.replace("https://mp-webdev2025.onrender.com/detail_pagina/", "");
console.log(currentID);
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
            console.log(data);
            // dataFilter = data.filter(data => data.ARTIST && data.ARTIST.trim() !== "");
            let unsplitLong = data.content.rendered;

            let splitLong = unsplitLong.replace('\n<h2 class=\"wp-block-heading is-style-default\">', "").replace('</h2>', "").replace('<figure class="wp-block-image size-large"><img decoding="async" src="', "").replace('</p>', "").replace('" alt=""/><figcaption class="wp-element-caption">', "").replace('</figcaption></figure>', "").replace(/<p>/g, "").replace('<p class=\"is-style-text-annotation is-style-text-annotation--1\">', "").replace("</p></p></p>\n", "").replace(/\n\n\n\n/g, "").replace('<a href=\"https://www.cyberneticforests.com/online-portfolio\">', "").replace('</a>', "");
            splitLong = splitLong.split("|");

            const itemID = data.id;
            const itemTitle = data.title.rendered;
            const itemArtist = splitLong[1];
            const itemImage = splitLong[2];
            const itemAlt = splitLong[3];
            const itemType = splitLong[5];
            const itemDescription = splitLong[7];
            const itemExercise = splitLong[9];
            const itemLink = splitLong[11];

            let newArt = { id: itemID, title: itemTitle, artist: itemArtist, type: itemType, description: itemDescription, exercise: itemExercise, alt: itemAlt, image: itemImage, link: itemLink };
            convertedList.push(newArt);

            console.log(convertedList);

            updateDisplay();
        })
        .catch(error => console.error('Failed to fetch data:', error));
}

// Update het display gebaseerd op de geselecteerde filter en sort opties
function updateDisplay() {
    // Leeg de lijst
    artList.innerHTML = "";

    // Vul opnieuw
    convertedList.forEach(item => {
        const artID = item.id;
        const artistName = item.artist;
        const artName = item.title || "Zonder titel";
        const artistLink = item.link || "#";
        const artImg = item.image || "";
        const artAlt = item.alt || "";
        const artType = item.type || "";

        // toont de data op de pagina
        artList.insertAdjacentHTML("beforeend", `
            <li class="artistCard">
                <a href="/detail_pagina/` + artID + `">
                <img src="` + artImg + `" alt="` + artAlt + `">
                    <h2>${artName}</h2>
                    <h3>${artistName}</h3>
                    <p>${artType}</p>
                </a>
            </li>
        `);
    });
}

fetchArtists();
