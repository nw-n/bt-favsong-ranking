const startScreen =
  document.getElementById("start-screen");

const gameScreen =
  document.getElementById("game-screen");

const startButton =
  document.getElementById("startButton");

let MAX_MATCHES = 500;

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
  } while (currentRight.name === currentLeft.name);

  leftSong.textContent = currentLeft.name;
rightSong.textContent = currentRight.name;
}

leftSong.addEventListener("click", () => {

  currentLeft.rating += 10;
  currentRight.rating -= 10;

  console.log("左勝ち");
  console.log(currentLeft);
  console.log(currentRight);

  nextMatch();
});

rightSong.addEventListener("click", () => {

  currentRight.rating += 10;
  currentLeft.rating -= 10;

  console.log("右勝ち");
  console.log(currentLeft);
  console.log(currentRight);

  nextMatch();
});

startButton.addEventListener("click", () => {

  const selectedDifficulty =
    document.querySelector(
      'input[name="difficulty"]:checked'
    );

  MAX_MATCHES =
    Number(selectedDifficulty.value);

  startScreen.style.display = "none";

  gameScreen.style.display = "block";

  nextMatch();

});
