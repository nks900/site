const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");

function updatePlayButton() {
  const isPlaying = !song.paused && !song.ended;

  controlIcon.classList.toggle("fa-play", !isPlaying);
  controlIcon.classList.toggle("fa-pause", isPlaying);
  playPauseButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
}

playPauseButton.addEventListener("click", async () => {
  if (!song.paused && !song.ended) {
    song.pause();
    return;
  }

  if (song.ended) {
    song.currentTime = 0;
  }

  try {
    await song.play();
  } catch (error) {
    if (error.name !== "AbortError") {
      console.warn("Could not play moonfinal.mp3", error);
    }
    updatePlayButton();
  }
});

song.addEventListener("play", updatePlayButton);
song.addEventListener("pause", updatePlayButton);
song.addEventListener("ended", updatePlayButton);
