const songs = [
  {
    name: "TRAIN",
    rating: 1500,
    unknownCount: 0
  },
  {
    name: "No More Cry",
    rating: 1500,
    unknownCount: 0
  },
  {
    name: "Shake body",
    rating: 1500,
    unknownCount: 0
  },
  {
    name: "Secret Express",
    rating: 1500,
    unknownCount: 0
  },
  {
    name: "pani pani",
    rating: 1500,
    unknownCount: 0
  }
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
