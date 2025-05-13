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

                artList.insertAdjacentHTML("beforeend", `
                <li>
                <h1>` + artName +`</h1>
                <h2>` + artistName + `</h2>
                </li>`);
            });

            
        })
        .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchArtists();





