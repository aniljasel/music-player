const songs = [
    { title: "MANIAC", artist: "YO YO HONEY SINGH", src: "media/MANIAC.mp3", cover: "media/library.jpg" },
    { title: "Nazra_Ke_Teer", artist: "Vikram Sarkar", src: "media/Nazra_Ke_Teer.mp3", cover: "media/library.jpg" },
    { title: "Ek-Pardesi-Mera-Dil-2.0", artist: "Yo Yo Honey Singh", src: "media/Ek-Pardesi-Mera-Dil-2.0.mp3", cover: "media/library.jpg" },
    { title: "She Move It Like", artist: "Warina Hussain", src: "media/She Move It Like.mp3", cover: "media/library.jpg" },
    { title: "Koka", artist: "Khandaani Shafakhana", src: "media/Koka.mp3", cover: "media/library.jpg" },
    { title: "Jisne daaru nahi pi", artist: "RAHUL VAIDYA", src: "media/Jisne daaru nahi pi.mp3", cover: "media/library.jpg" },
    { title: "Party Mashup 2025", artist: "Dj Shiv Chauhan", src: "media/Party Mashup 2025.mp3", cover: "media/library.jpg" },
    { title: "Dhanda Nyoliwala", artist: "Deepesh Goyal", src: "media/Dhanda Nyoliwala.mp3", cover: "media/library.jpg" },
    //---playlist attitude-----------
    { title: "SOMRAS", artist: "YO YO HONEY SINGH", src: "media/attitude/SOMRAS.mp3", cover: "media/library.jpg" },
    { title: "Car Mein Music Baja", artist: "Neha Kakkar, Tony Kakkar", src: "media/attitude/Car Mein Music Baja.mp3", cover: "media/library.jpg" },
    { title: "Party Ho Rai Hai", artist: "Danish, Naaz Aulakh, Muskan Sharma", src: "media/attitude/Party Ho Rai Hai.mp3", cover: "media/library.jpg" },
    { title: "Uyi Amma", artist: "Azaad, Aaman D, Rasha Thadani", src: "media/attitude/Uyi Amma.mp3", cover: "media/library.jpg" },
    //---Playlist Party time---------------
    { title: "Abhi Toh Party Shuru Hui Hai", artist: "Khoobsurat, Badshah, Aastha", src: "media/party/Abhi Toh Party Shuru Hui Hai.mp3", cover: "media/library.jpg" },
    { title: "Badshah", artist: "Akriti K, Varun, Alia", src: "media/party/Badshah.mp3", cover: "media/library.jpg" },
    { title: "Hookah Bar", artist: "Akshay Kumar, Himesh Reshammiya", src: "media/party/Hookah Bar.mp3", cover: "media/library.jpg" },
    { title: "Sajna Ve Sajna", artist: "Rajkummar, Shehnaaz, Sunidhi", src: "media/party/Sajna Ve Sajna.mp3", cover: "media/library.jpg" },
    //---Playlist Sad----------------
    { title: "AANKH_HAI_BHARI_BHARI_2.0", artist: "Rahul Vaidya, Rashami Desai", src: "media/sad/AANKH_HAI_BHARI_BHARI_2.0.mp3", cover: "media/library.jpg" },
    { title: "Dil Chahte Ho", artist: "Jubin Nautiyal, Mandy Takhar", src: "media/sad/Dil Chahte Ho.mp3", cover: "media/library.jpg" },
    { title: "Kya Vo Mujhse Jyada", artist: "Arrjun Pandey, Bheem Pandey", src: "media/sad/Kya Vo Mujhse Jyada.mp3", cover: "media/library.jpg" },
    { title: "Meri Tarah", artist: "Jubin N, Payal D", src: "media/sad/Meri Tarah.mp3", cover: "media/library.jpg" },
    //---Playlist Hariyanvi---------------
    { title: "Blender", artist: "Masoom Sharma", src: "media/hariyanvi/Blender.mp3", cover: "media/library.jpg" },
    { title: "Maregi Maregi", artist: "Raj Mawar, Renuka Panwar", src: "media/hariyanvi/Maregi Maregi.mp3", cover: "media/library.jpg" },
    { title: "TICH BUTTON", artist: "Rasool Sidhu, Jasmeen Akhtar", src: "media/hariyanvi/TICH BUTTON.mp3", cover: "media/library.jpg" },
    { title: "YANTA", artist: "RENUKA PANWAR&RAJA, SAHIL SANDHU", src: "media/hariyanvi/YANTA.mp3", cover: "media/library.jpg" },
];

const playlists = {
    "playlist1": [0, 2],
    "playlist2": [1]
};

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const songTitle = document.querySelector(".song-info h3");
const songArtist = document.querySelector(".song-info p");
const albumArt = document.querySelector(".player img");
const playButton = document.querySelector(".controls button:nth-child(2)");
const prevButton = document.querySelector(".controls button:nth-child(1)");
const nextButton = document.querySelector(".controls button:nth-child(3)");

function loadSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].src;
    audioPlayer.load();
    songTitle.innerText = songs[index].title;
    songArtist.innerText = songs[index].artist;
    albumArt.src = songs[index].cover;
    playMusic();
    trackSongStats(songs[index].title, songs[index].artist);
}

function playMusic() {
    audioPlayer.play();
    playButton.innerHTML = "&#10074;&#10074;";
}

function pauseMusic() {
    audioPlayer.pause();
    playButton.innerHTML = "&#9654;";
}

playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

const seekBar = document.getElementById("seek-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");

audioPlayer.addEventListener("timeupdate", () => {
    seekBar.value = audioPlayer.currentTime;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    updateListeningTime();
});

audioPlayer.addEventListener("loadedmetadata", () => {
    seekBar.max = audioPlayer.duration;
    totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
});

seekBar.addEventListener("input", () => {
    audioPlayer.currentTime = seekBar.value;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

const volumeSlider = document.getElementById("volume-slider");
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" || event.code === "ArrowRight") {
        nextTrack();
    } else if (event.key === "ArrowLeft" || event.code === "ArrowLeft") {
        prevTrack();
    }
});

function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Select all song cards
const songCards = document.querySelectorAll(".song-card");

// Add click event listener to each card
songCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        loadSong(index); // Load and play the clicked song
    });
});

// Function to load and play a song
function loadSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].src;
    audioPlayer.load();
    songTitle.innerText = songs[index].title;
    songArtist.innerText = songs[index].artist;
    albumArt.src = songs[index].cover;
    playMusic();
    trackSongStats(songs[index].title, songs[index].artist);
}

// 🎵 LISTENING STATS DASHBOARD
let totalListeningTime = 0;
function updateListeningTime() {
    totalListeningTime++;
    document.getElementById("total-time").textContent = `${Math.floor(totalListeningTime / 60)} min`;
}

// ---Most playcount songs------------------
let playCount = {};

function trackSongStats(songTitle, artist) {

    playCount[songTitle] = (playCount[songTitle] || 0) + 1;

    
    let mostPlayed = Object.keys(playCount).reduce((a, b) => (playCount[a] > playCount[b] ? a : b), "");

    
    document.getElementById("most-played-song").textContent = mostPlayed;
}


function loadSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].src;
    audioPlayer.load();
    songTitle.innerText = songs[index].title;
    songArtist.innerText = songs[index].artist;
    albumArt.src = songs[index].cover;
    playMusic();

    trackSongStats(songs[index].title, songs[index].artist);
    updateRecentlyPlayed();
}



// 📶 ONLINE RADIO & PODCASTS----------
const radioStations = [
    { name: "BBC Radio 1", src: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one" },
    { name: "Jazz FM", src: "https://radio.jazzfm.com/stream" }
];

const radioList = document.getElementById("radio-list");
radioStations.forEach(station => {
    const btn = document.createElement("button");
    btn.textContent = station.name;
    btn.addEventListener("click", () => {
        audioSource.src = station.src;
        audioPlayer.load();
        playMusic();
    });
    radioList.appendChild(btn);
});

// Store the last played song
let recentlyPlayed = null;

// Update Recently Played song
function updateRecentlyPlayed() {
    const recentlyPlayedContainer = document.getElementById("recently-played");

    // Remove previous song
    recentlyPlayedContainer.innerHTML = "";

    // Add current song
    const songElement = document.createElement("p");
    songElement.textContent = `${songs[currentSongIndex].title} - ${songs[currentSongIndex].artist}`;
    recentlyPlayedContainer.appendChild(songElement);

    recentlyPlayed = songs[currentSongIndex];
}

function loadSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].src;
    audioPlayer.load();
    songTitle.innerText = songs[index].title;
    songArtist.innerText = songs[index].artist;
    albumArt.src = songs[index].cover;
    playMusic();
    trackSongStats(songs[index].title, songs[index].artist);

    // ✅ Update Recently Played
    updateRecentlyPlayed();
}

document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        if (audioPlayer.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    } else if (event.key === "ArrowRight" || event.code === "ArrowRight") {
        nextTrack();
    } else if (event.key === "ArrowLeft" || event.code === "ArrowLeft") {
        prevTrack();
    }
});

function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// 📌 SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(reg => console.log("Service Worker Registered", reg))
        .catch(err => console.error("Service Worker Registration Failed", err));
}

// PlaySong -----
window.playSong = function playSong(index) {
    if (index >= 0 && index < songs.length) {
        loadSong(index);
    } else {
        console.error("Invalid song index:", index);
    }
};

// open plyalist-----------------
function togglePlaylist(playlistId) {
    const playlistSongs = document.getElementById(`${playlistId}-songs`);
    const allPlaylists = document.querySelectorAll('.playlist-songs');

    // Agar playlist already open hai toh ise close kar do
    if (playlistSongs.style.display === "block") {
        playlistSongs.style.display = "none";
        return;
    }

    // Sirf clicked playlist ko open kar do
    playlistSongs.style.display = "block";
}
