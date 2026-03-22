// ------------------------------
// Music Player JS - lat.js
// ------------------------------

// DOM elements
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

// Songs list
const songs = [
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/shameless.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/hurtyou.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/lostinthefire.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/x/raw/refs/heads/main/heyxf.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/dawnstarry.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/baptized-in-fear.mp3" },
  { title: "", name: "", source: "https://github.com/nks900/site/raw/refs/heads/main/wickedgames.mp3" }
];
let currentSongIndex = 3;

// ------------------------------
// Functions
// ------------------------------

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

// ------------------------------
// Event listeners
// ------------------------------

playPauseButton.addEventListener("click", playPause);

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

// ------------------------------
// Initialize Swiper
// ------------------------------

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: currentSongIndex,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward"
  }
});

// ------------------------------
// Swiper events (ONLY CONTROL HERE)
// ------------------------------

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  playSong(); // always play on slide change
});

// ------------------------------
// Song ended → go next
// ------------------------------

song.addEventListener("ended", () => {
  swiper.slideNext(); // let swiper handle it
});

// ------------------------------
// Initial setup
// ------------------------------

updateSongInfo();
