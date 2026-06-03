const songs = [
  "TRAIN",
  "No More Cry",
  "Shake body",
  "Secret Express",
  "pani pani",
  "POLICE MEN",
  "Drive on week",
  "FLASHBACK",
  "Bloody Night",
  "Make it hot!"
];

const leftSong = document.getElementById("leftSong");
const rightSong = document.getElementById("rightSong");

let currentLeft;
let currentRight;

function nextMatch() {

  currentLeft =
    songs[Math.floor(Math.random() * songs.length)];

  do {
    currentRight =
      songs[Math.floor(Math.random() * songs.length)];
  } while (currentRight === currentLeft);

  leftSong.textContent = currentLeft;
  rightSong.textContent = currentRight;
}

leftSong.addEventListener("click", () => {
  nextMatch();
});

rightSong.addEventListener("click", () => {
  nextMatch();
});

nextMatch();
