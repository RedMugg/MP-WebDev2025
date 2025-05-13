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

                artList.insertAdjacentHTML("beforeend", `
                <li>
                <h1>` + artistName + `</h1>
                </li>`);
            });

            
        })
        .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchArtists();





