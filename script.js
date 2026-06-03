const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("startButton");

const resultScreen = document.getElementById("result-screen");
const top3 = document.getElementById("top3");
const fullRanking = document.getElementById("full-ranking");

const leftSong = document.getElementById("leftSong");
const rightSong = document.getElementById("rightSong");

const skipButton = document.getElementById("skip");
const unknownLeftButton = document.getElementById("unknownLeft");
const unknownRightButton = document.getElementById("unknownRight");
const unknownBothButton = document.getElementById("unknownBoth");
const drawButton = document.getElementById("draw");
const bothLikeButton = document.getElementById("bothLike");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

let MAX_MATCHES = 500;
let matchCount = 0;
let currentLeft;
let currentRight;

const songs = [
  { name: "TRAIN", rating: 1500, unknownCount: 0 },
  { name: "No More Cry", rating: 1500, unknownCount: 0 },
  { name: "Shake body", rating: 1500, unknownCount: 0 },
  { name: "Secret Express", rating: 1500, unknownCount: 0 },
  { name: "pani pani", rating: 1500, unknownCount: 0 }
];

function nextMatch() {
  currentLeft = songs[Math.floor(Math.random() * songs.length)];

  do {
    currentRight = songs[Math.floor(Math.random() * songs.length)];
  } while (currentRight.name === currentLeft.name);

  leftSong.textContent = currentLeft.name;
  rightSong.textContent = currentRight.name;
}

function updateProgress() {
  progressText.textContent = `${matchCount} / ${MAX_MATCHES}`;

  const percent = (matchCount / MAX_MATCHES) * 100;
  progressFill.style.width = `${percent}%`;
}

function updateElo(winner, loser) {
  const K = 32;

  const expectedWinner =
    1 / (1 + Math.pow(10, (loser.rating - winner.rating) / 400));

  const expectedLoser =
    1 / (1 + Math.pow(10, (winner.rating - loser.rating) / 400));

  winner.rating += K * (1 - expectedWinner);
  loser.rating += K * (0 - expectedLoser);
}

function finishOneMatch() {
  matchCount++;
  updateProgress();
  checkEnd();

  if (matchCount < MAX_MATCHES) {
    nextMatch();
  }
}

function showResults() {
  const sortedSongs = [...songs].sort((a, b) => b.rating - a.rating);

  gameScreen.style.display = "none";
  resultScreen.style.display = "block";

  top3.innerHTML = `
    <h3>🥇 ${sortedSongs[0].name}</h3>
    <h3>🥈 ${sortedSongs[1].name}</h3>
    <h3>🥉 ${sortedSongs[2].name}</h3>
  `;

  let rankingHTML = "";

  for (let i = 3; i < Math.min(20, sortedSongs.length); i++) {
    rankingHTML += `
      <p>
        ${i + 1}位　
        ${sortedSongs[i].name}
      </p>
    `;
  }

  if (sortedSongs.length > 20) {
    rankingHTML += `
      <button id="showMoreRanking">
        もっと表示
      </button>

      <div id="more-ranking" style="display:none;">
    `;

    for (let i = 20; i < sortedSongs.length; i++) {
      rankingHTML += `
        <p>
          ${i + 1}位　
          ${sortedSongs[i].name}
        </p>
      `;
    }

    rankingHTML += `
      </div>
    `;
  }

  fullRanking.innerHTML = rankingHTML;

  const showMoreButton =
    document.getElementById("showMoreRanking");

  const moreRanking =
    document.getElementById("more-ranking");

  if (showMoreButton && moreRanking) {
    showMoreButton.addEventListener("click", () => {
      moreRanking.style.display = "block";
      showMoreButton.style.display = "none";
    });
  }
}

function checkEnd() {
  if (matchCount >= MAX_MATCHES) {
    showResults();
  }
}

leftSong.addEventListener("click", () => {
  updateElo(currentLeft, currentRight);
  finishOneMatch();
});

rightSong.addEventListener("click", () => {
  updateElo(currentRight, currentLeft);
  finishOneMatch();
});

skipButton.addEventListener("click", () => {
  nextMatch();
});

unknownLeftButton.addEventListener("click", () => {
  currentLeft.unknownCount++;
  finishOneMatch();
});

unknownRightButton.addEventListener("click", () => {
  currentRight.unknownCount++;
  finishOneMatch();
});

unknownBothButton.addEventListener("click", () => {
  currentLeft.unknownCount++;
  currentRight.unknownCount++;
  finishOneMatch();
});

drawButton.addEventListener("click", () => {
  finishOneMatch();
});

bothLikeButton.addEventListener("click", () => {
  currentLeft.rating += 5;
  currentRight.rating += 5;
  finishOneMatch();
});

startButton.addEventListener("click", () => {
  const selectedDifficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  );

  MAX_MATCHES = Number(selectedDifficulty.value);
  matchCount = 0;

  startScreen.style.display = "none";
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";

  updateProgress();
  nextMatch();
});
