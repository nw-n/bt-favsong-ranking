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

let matchCount = 0;

const progressText =
  document.getElementById("progress-text");

const progressFill =
  document.getElementById("progress-fill");

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

function updateProgress() {

  progressText.textContent =
    `${matchCount} / ${MAX_MATCHES}`;

  const percent =
    (matchCount / MAX_MATCHES) * 100;

  progressFill.style.width =
    `${percent}%`;
}

leftSong.addEventListener("click", () => {

  currentLeft.rating += 10;
  currentRight.rating -= 10;
  matchCount++;
  updateProgress();

  console.log("左勝ち");
  console.log(currentLeft);
  console.log(currentRight);

  nextMatch();
});

rightSong.addEventListener("click", () => {

  currentRight.rating += 10;
  currentLeft.rating -= 10;
  matchCount++;
  updateProgress();

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

  updateProgress();
  nextMatch();

});
