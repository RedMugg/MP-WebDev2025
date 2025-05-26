const artList = document.querySelector(".artList");
const filterDropdown = document.getElementById("filterDropdown");
const sortDropdown = document.getElementById("sortDropdown");

let dataFilter = [];


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

        // toont de data op de pagina
        artList.insertAdjacentHTML("beforeend", `
            <li class="artistCard">
                <a href="/detail_pagina">
                <img src="` + artImg + `">
                    <h2>${artName}</h2>
                    <h3>${artistName}</h3>
                    <p>${artType}</p>
                </a>
            </li>
        `);
    });
}

// Event listeners voor de filter en sort dropdowns
filterDropdown.addEventListener("change", updateDisplay);
sortDropdown.addEventListener("change", updateDisplay);

fetchArtists();
