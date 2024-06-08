function showFeaturedPlaylist(){
    const main_container = document.getElementById('main-container');
    const randomElement = data.playlists[Math.floor(Math.random() * data.playlists.length)];
    main_container.innerHTML = `
        <span>
            <img class="ft-img" src="${randomElement.playlist_art}" style="width:600px;height:600px;">
            <h2 class="ft-name">
                ${randomElement.playlist_name}
            </h2>
        </span>
        <div class="ft-song-cards" id="ft-song-cards">

        </div>
    `;

    const songCardsContainer = document.getElementById('ft-song-cards');
    createSongCards(randomElement, songCardsContainer);

}

function createSongCards(playlist, songCardsContainer){
    console.log(playlist.songs)
    playlist.songs.forEach(song => {
        const song_card = document.createElement('div');
        song_card.classList.add('ft-song-card');
        song_card.innerHTML = `
          <div class="ft-song-info">
            <img src="${song.cover_art}" style="width:75px;height:75px;" class="ft-song-img">
            <div class="ft-stuff">
                <h3 class="ft-title">${song.title}</h3>
                <p class="ft-artist">${song.artist}</p>
                <p class="ft-album">${song.album}</p>
            </div>
            <div class="ft-duration">${song.duration}</div>
          </div>
        `;
        songCardsContainer.appendChild(song_card);
      });
}

showFeaturedPlaylist()
