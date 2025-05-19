const artList = document.querySelector(".artList");
const sortDropdown = document.getElementById("sortDropdown");

let dataFilter = []; // Globale variable 

function fetchArtists() {
    fetch('./sources/artist_list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Filter alleen records met een artiestennaam
            dataFilter = data.filter(artist => artist.ARTIST && artist.ARTIST.trim() !== "");

            // Initieel sorteren op artiest A-Z
            sortAndDisplay("artist-asc");   
        })
        .catch(error => console.error('Failed to fetch data:', error));
    }


        function sortAndDisplay(type) {
            if (dataFilter.length === 0) return;
        
            if (type === "artist-asc") {
                dataFilter.sort((a, b) => a.ARTIST.localeCompare(b.ARTIST));
            } else if (type === "artist-desc") {
                dataFilter.sort((a, b) => b.ARTIST.localeCompare(a.ARTIST));
            } else if (type === "artwork-asc") {
                dataFilter.sort((a, b) => a.ARTWORK_NAME.localeCompare(b.ARTWORK_NAME));
            } else if (type === "artwork-desc") {
                dataFilter.sort((a, b) => b.ARTWORK_NAME.localeCompare(a.ARTWORK_NAME));
            }


                    // Leeg de lijst
                artList.innerHTML = "";

     // Vul opnieuw
    dataFilter.forEach(item => {
        const artistName = item.ARTIST;
        const artName = item.ARTWORK_NAME || "Zonder titel";
        const artistLink = item.LINK || "#";
        const artImg = item.img_url || "https://via.placeholder.com/300x300?text=No+Image";
        const artType = item.FORMAT || "";

        artList.insertAdjacentHTML("beforeend", `
            <li class="artistCard">
                <a href="./detail_pagina.html">
                <img src="` + artImg + `">
                    <h2>${artName}</h2>
                    <h3>${artistName}</h3>
                    <p>${artType}</p>
                </a>
            </li>
        `);
    });
}

// Event listener voor dropdown
sortDropdown.addEventListener("change", function () {
    sortAndDisplay(this.value);
});

fetchArtists();