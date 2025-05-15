const artList = document.querySelector(".artList");

function fetchArtists() {
    fetch('./sources/artist_list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {

            var dataFilter = data.filter((artist) => {
                return artist.ARTIST != null && artist.ARTIST != "" && artist.ARTIST != undefined;
            });

            console.log(dataFilter);

            dataFilter.forEach(dataFilter => {
                var artistName = dataFilter.ARTIST;
                var artName = dataFilter.ARTWORK_NAME;
                var artistLink = dataFilter.LINK;
                var artImg = dataFilter.img_url;
                var artType = dataFilter.FORMAT;

                artList.insertAdjacentHTML("beforeend", `
                <li class="artistCard">
                <a href="` + artistLink + `">
                <img src="` + artImg + `">
                </img>
                <h2>` + artName +`</h2>
                <h3>` + artistName + `</h3>
                <p>` + artType + `</p>
                </a>
                </li>`);
            });

            
        })
        .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchArtists();





