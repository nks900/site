const song = document.getElementById("song");
const progress = document.getElementById("progress");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");

const swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 0,
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

function loadActiveTrack() {
  song.src = swiper.slides[swiper.activeIndex].dataset.audio;
  progress.value = 0;
}

function updatePlayIcon() {
  controlIcon.classList.toggle("fa-play", song.paused);
  controlIcon.classList.toggle("fa-pause", !song.paused);
  playPauseButton.setAttribute("aria-label", song.paused ? "Play" : "Pause");
}

function playOnPageClick(event) {
  if (event.target.closest("a, button, input")) return;
  if (song.paused) playSong();
}

async function playSong(allowPageClickFallback = false) {
  try {
    await song.play();
    document.removeEventListener("click", playOnPageClick, true);
  } catch (error) {
    if (error.name === "NotAllowedError" && allowPageClickFallback) {
      document.addEventListener("click", playOnPageClick, true);
    } else if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
      console.warn("Could not play the track", error);
    }

    updatePlayIcon();
  }
}

playPauseButton.addEventListener("click", () => {
  if (song.paused) {
    playSong();
  } else {
    song.pause();
  }
});

song.addEventListener("play", updatePlayIcon);
song.addEventListener("pause", updatePlayIcon);

song.addEventListener("loadedmetadata", () => {
  if (Number.isFinite(song.duration)) {
    progress.max = song.duration;
  }

  progress.value = song.currentTime;
});

song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
});

progress.addEventListener("input", () => {
  if (Number.isFinite(song.duration)) {
    song.currentTime = Number(progress.value);
  }
});

progress.addEventListener("change", () => {
  playSong();
});

swiper.on("slideChange", () => {
  loadActiveTrack();
  playSong(true);
});

song.addEventListener("ended", () => {
  updatePlayIcon();
  swiper.slideNext();
});

loadActiveTrack();
playSong(true);
