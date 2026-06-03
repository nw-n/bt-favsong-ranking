const startScreen =
  document.getElementById("start-screen");

const gameScreen =
  document.getElementById("game-screen");

const startButton =
  document.getElementById("startButton");

const resultScreen =
  document.getElementById("result-screen");

const top3 =
  document.getElementById("top3");

const fullRanking =
  document.getElementById("full-ranking");

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

const skipButton =
  document.getElementById("skip");

const unknownLeftButton =
  document.getElementById("unknownLeft");

const unknownRightButton =
  document.getElementById("unknownRight");

const unknownBothButton =
  document.getElementById("unknownBoth");

const drawButton =
  document.getElementById("draw");

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

checkEnd();

if (matchCount < MAX_MATCHES) {
  nextMatch();
}
});

rightSong.addEventListener("click", () => {

  currentRight.rating += 10;
  currentLeft.rating -= 10;
  
  matchCount++;

updateProgress();

checkEnd();

if (matchCount < MAX_MATCHES) {
  nextMatch();
}
});

skipButton.addEventListener("click", () => {

  nextMatch();

});

unknownLeftButton.addEventListener("click", () => {

  currentLeft.unknownCount++;

  matchCount++;
  updateProgress();
  checkEnd();

  if (matchCount < MAX_MATCHES) {
    nextMatch();
  }

});

unknownRightButton.addEventListener("click", () => {

  currentRight.unknownCount++;

  matchCount++;
  updateProgress();
  checkEnd();

  if (matchCount < MAX_MATCHES) {
    nextMatch();
  }

});

unknownBothButton.addEventListener("click", () => {

  currentLeft.unknownCount++;
  currentRight.unknownCount++;

  matchCount++;
  updateProgress();
  checkEnd();

  if (matchCount < MAX_MATCHES) {
    nextMatch();
  }

});

drawButton.addEventListener("click", () => {

  matchCount++;

  updateProgress();

  checkEnd();

  if (matchCount < MAX_MATCHES) {
    nextMatch();
  }

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

function showResults() {

  const sortedSongs =
    [...songs].sort(
      (a, b) => b.rating - a.rating
    );

  gameScreen.style.display = "none";

  resultScreen.style.display = "block";

  top3.innerHTML = `
    <h3>🥇 ${sortedSongs[0].name}</h3>
    <h3>🥈 ${sortedSongs[1].name}</h3>
    <h3>🥉 ${sortedSongs[2].name}</h3>
  `;

  let rankingHTML = "";

  sortedSongs.forEach((song, index) => {

    rankingHTML += `
      <p>
        ${index + 1}位　
        ${song.name}
        (${song.rating})
      </p>
    `;

  });

  fullRanking.innerHTML = rankingHTML;
  
}

function checkEnd() {

 if (matchCount >= MAX_MATCHES) {

    showResults();

  }

}
