const artList = document.querySelector(".artList");
const filterDropdown = document.getElementById("filterDropdown");
const sortDropdown = document.getElementById("sortDropdown");

let convertedList = [];

let dataFilter = [];


// Fetch de artist lijst van de JSON file
function fetchArtists() {
    fetch('https://aiaiai.art/wp-json/wp/v2/pages?_fields=author,id,excerpt,title,link,content')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // dataFilter = data.filter(data => data.ARTIST && data.ARTIST.trim() !== "");
            data.forEach(data => {
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

                let newArt = {id: itemID, title: itemTitle, artist: itemArtist, type: itemType, description: itemDescription, exercise: itemExercise, alt: itemAlt, image: itemImage, link: itemLink};
                convertedList.push(newArt);
            }) 
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
        filtered = convertedList.filter(item => item.type?.toLowerCase().includes("image"));
    } else if (filterType === "sound") {
        filtered = convertedList.filter(item => item.type?.toLowerCase().includes("sound"));
    } else if (filterType === "text") {
        filtered = convertedList.filter(item => item.type?.toLowerCase().includes("text"));
    } else {
        filtered = [...convertedList];
    }

    // Sorteer
    // Als er geen sortering is geselecteerd, gebruik dan a-z data
    if (sortType === "artist-asc") {
        filtered.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (sortType === "artist-desc") {
        filtered.sort((a, b) => b.artist.localeCompare(a.artist));
    } else if (sortType === "artwork-asc") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "artwork-desc") {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Leeg de lijst
    artList.innerHTML = "";

    // Vul opnieuw
    filtered.forEach(item => {
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
                <div>
                    <h2>${artName}</h2>
                    <h3>${artistName}</h3>
                    <p>${artType}</p>
                    </div>
                </a>
            </li>
        `);
    });
}

// Event listeners voor de filter en sort dropdowns
filterDropdown.addEventListener("change", updateDisplay);
sortDropdown.addEventListener("change", updateDisplay);

fetchArtists();
