function search() {
    console.log("search");

    let inputTag = document.getElementById("input");
    let songName = inputTag.value;

    console.log(songName);

    // iTunes Search API - add &country=us (or lk, jp, etc.) if you want to restrict by country
    let url = "https://itunes.apple.com/search?term=" + encodeURIComponent(songName) + "&entity=musicTrack&limit=1";

    let htmlRequest = new XMLHttpRequest();
    htmlRequest.open("GET", url);

    htmlRequest.send();
    htmlRequest.responseType = "json";

    htmlRequest.onload = () => {
        let response = htmlRequest.response;
        console.log(response);

        if (response.resultCount > 0) {
            let song = response.results[0];

            // Poster (album artwork)
            let imgTag = document.getElementById("poster");
            imgTag.src = song.artworkUrl100.replace("100x100", "300x300");

            // Title
            let titleTag = document.getElementById("title");
            titleTag.innerHTML = "Title: " + song.trackName;

            // Artist
            let artistTag = document.getElementById("artist");
            artistTag.innerHTML = "Artist: " + song.artistName;

            // Album
            let albumTag = document.getElementById("album");
            albumTag.innerHTML = "Album: " + song.collectionName;

            // Genre
            let genreTag = document.getElementById("genre");
            genreTag.innerHTML = "Genre: " + song.primaryGenreName;

            // Year
            let yearTag = document.getElementById("year");
            yearTag.innerHTML = "Year: " + new Date(song.releaseDate).getFullYear();

            // Preview audio
            let previewTag = document.getElementById("preview");
            if (song.previewUrl) {
                previewTag.src = song.previewUrl;
                previewTag.style.display = "block";
            } else {
                previewTag.style.display = "none";
            }
        } else {
            alert("No songs found!");
        }
    };
}       
