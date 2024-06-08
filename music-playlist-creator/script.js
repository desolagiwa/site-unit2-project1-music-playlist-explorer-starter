var modal = document.getElementById('playlist-modal');
const modalContent = document.querySelector('.modal-content');

function openModal(playlist) {
    document.getElementById('playlist-title').innerText = playlist.playlist_name;
    document.getElementById('playlist-img').src = playlist.playlist_art;
    document.getElementById('creator-name').innerText = playlist.playlist_creator;
    modal.style.display = "block";

    const existingShuffleButton = document.getElementById('shuffle');
    if (existingShuffleButton) {
        shuffle_button = existingShuffleButton;
    } else {
        shuffle_cont = document.createElement("div");
        shuffle_cont.innerHTML = `<span id="shuffle" >Shuffle</span>`;
        modalContent.appendChild(shuffle_cont);
        shuffle_button = document.getElementById('shuffle');
    }

    shuffle_button.addEventListener('click', function() {
        console.log("shuffle");
        shuffle_button.classList.add('clicked');
        shuffleSongs(playlist);
     })
    createSongCards(playlist);
 }

 window.onclick = function(event) {
    if (event.target == modal) {
       modal.style.display = "none";
    }
 }
 function shuffleSongs(playlist){
    shuffleArray(playlist.songs);
    createSongCards(playlist);
  }

function shuffleArray(arr) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }


function createSongCards(playlist){
    const songCardsContainer = document.getElementById('song-cards');
    songCardsContainer.innerHTML = '';
    console.log(playlist.songs)
    playlist.songs.forEach(song => {
        const song_card = document.createElement('div');
        song_card.classList.add('song-card');
        song_card.innerHTML = `
          <div class="song-info">
            <img src="${song.cover_art}" style="width:75px;height:75px;">
            <div class="stuff">
                <h3 class="title">${song.title}</h3>
                <p class="artist">${song.artist}</p>
                <p class="album">${song.album}</p>
            </div>
            <div class="duration">${song.duration}</div>
          </div>
        `;
        songCardsContainer.appendChild(song_card);
      });
}

function createPlaylistCards() {
    const playlistCardsContainer = document.getElementById('playlist-cards');
    data.playlists.forEach(playlist => {
      const card = document.createElement('div');
      card.classList.add('playlist-card');
      card.innerHTML = `
        <img src="${playlist.playlist_art}" style="width:200px;height:200px;">
        <h3 class="playlist-name">${playlist.playlist_name}</h3>
        <p class="creator-name">${playlist.playlist_creator}</p>
        <div class="likes"><span id="icon" class="fa-solid fa-heart"></span>
        <div class="like-count">${playlist.likeCount} likes</div></div>
      `;

      card.querySelector('.fa-solid.fa-heart').addEventListener('click', function() {
        event.stopPropagation();
        card.querySelector('.like-count').innerText = `${playlist.likeCount++} likes`;
        card.querySelector('.fa-solid.fa-heart').classList.add('clicked');
        updateLikes(playlist,card);
      });
      card.addEventListener('click', function() {
        openModal(playlist);
      });
      playlistCardsContainer.appendChild(card);
    });
  }
  createPlaylistCards();



const icon = document.getElementById('icon');
function updateLikes(playlist_n, card){
    for(let i = 0; i < data.playlists.length; i++){
        if(data.playlists[i].playlist_name == playlist_n){
            data.playlists[i].likeCount ++;
            card.querySelector('.like-count').innerText = `${data.playlists[i].likeCount} likes`;
        }
    }
}
