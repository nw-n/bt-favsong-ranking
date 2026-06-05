const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("startButton");

const resultScreen = document.getElementById("result-screen");
const top3 = document.getElementById("top3");
const fullRanking = document.getElementById("full-ranking");
const recognition = document.getElementById("recognition");

const leftSong = document.getElementById("leftSong");
const rightSong = document.getElementById("rightSong");

const superLikeLeftButton = document.getElementById("superLikeLeft");
const superLikeRightButton = document.getElementById("superLikeRight");
const skipButton = document.getElementById("skip");
const unknownLeftButton = document.getElementById("unknownLeft");
const unknownRightButton = document.getElementById("unknownRight");
const unknownBothButton = document.getElementById("unknownBoth");
const drawButton = document.getElementById("draw");
const bothLikeButton = document.getElementById("bothLike");
const undoButton = document.getElementById("undoButton");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

const backToTopGame = document.getElementById("backToTopGame");
const copyResultButton = document.getElementById("copyResultButton");
const backToStart = document.getElementById("backToStart");

let lastState = null;
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

function displaySong(button, song) {
  button.innerHTML = `
    <div>${song.name}</div>
    <div class="song-rating">⭐ ${Math.round(song.rating)}</div>
  `;
}
function getSelectableSongs() {
  const selectableSongs = songs.filter(song => {
    if (song.unknownCount === 0) {
      return true;
    }
    return Math.random() < 0.2;
  });

  if (selectableSongs.length >= 2) {
    return selectableSongs;
  }

  return songs;
}

function nextMatch() {

  const selectableSongs =
    getSelectableSongs();

  currentLeft =
    selectableSongs[
      Math.floor(Math.random() * selectableSongs.length)
    ];

  const candidates = selectableSongs
    .filter(song => song.name !== currentLeft.name)
    .sort((a, b) =>
      Math.abs(a.rating - currentLeft.rating) -
      Math.abs(b.rating - currentLeft.rating)
    );

  const topCandidates = candidates.slice(0, Math.min(5, candidates.length));

  currentRight =
    topCandidates[Math.floor(Math.random() * topCandidates.length)];

  displaySong(leftSong, currentLeft);
  displaySong(rightSong, currentRight);
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

function saveState() {
  lastState = {
    ratings: songs.map(song => song.rating),
    unknownCounts: songs.map(song => song.unknownCount),
    matchCount: matchCount,
    left: currentLeft,
    right: currentRight
  };
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
  <h3>
  🥇 ${sortedSongs[0].name}
  <div class="top-rating">
    ⭐ ${Math.round(sortedSongs[0].rating)}
  </div>
 </h3>

  <h3>
    🥈 ${sortedSongs[1].name}
    <div class="top-rating">
      ⭐ ${Math.round(sortedSongs[1].rating)}
    </div>
  </h3>

  <h3>
    🥉 ${sortedSongs[2].name}
    <div class="top-rating">
      ⭐ ${Math.round(sortedSongs[2].rating)}
    </div>
  </h3>
`;

  const knownSongs = songs.filter(song => song.unknownCount === 0).length;
  const recognitionRate = (knownSongs / songs.length) * 100;

  const unknownSongs = songs.filter(song => song.unknownCount > 0);

  recognition.innerHTML = `
    <div class="recognition-card">
      <h3>📊 認知率</h3>
      <p>${knownSongs} / ${songs.length} 曲</p>
      <p>${recognitionRate.toFixed(1)}%</p>
    </div>
  `;

  let rankingHTML = "";

  for (let i = 3; i < Math.min(20, sortedSongs.length); i++) {
    rankingHTML += `
      <p class="ranking-row">
        <span>${i + 1}位　${sortedSongs[i].name}</span>
        <span>${Math.round(sortedSongs[i].rating)}</span>
      </p>
    `;
  }

  if (sortedSongs.length > 20) {
    rankingHTML += `
      <button id="showMoreRanking">もっと表示</button>
      <div id="more-ranking" style="display:none;">
    `;

    for (let i = 20; i < sortedSongs.length; i++) {
      rankingHTML += `
        <p class="ranking-row">
          <span>${i + 1}位　${sortedSongs[i].name}</span>
          <span>${Math.round(sortedSongs[i].rating)}</span>
        </p>
      `;
    }

    rankingHTML += `</div>`;
  }

  fullRanking.innerHTML = rankingHTML;

  const showMoreButton = document.getElementById("showMoreRanking");
  const moreRanking = document.getElementById("more-ranking");
  const showUnknownButton = document.getElementById("showUnknownSongs");
  const unknownSongsList = document.getElementById("unknownSongsList");

  if (unknownSongs.length > 0) {

  let unknownHTML = `
    <hr>

    <h3>📝 「わからない」を選択した曲リスト</h3>

    <button id="showUnknownSongs">
      もっと表示
    </button>

    <div
      id="unknownSongsList"
      style="display:none;"
    >
  `;

  unknownSongs.forEach(song => {

    unknownHTML += `
      <p>${song.name}</p>
    `;

  });

  unknownHTML += `
    </div>
  `;

  fullRanking.innerHTML += unknownHTML;
}
  if (
  showUnknownButton &&
  unknownSongsList
) {

  showUnknownButton.addEventListener(
    "click",
    () => {

      unknownSongsList.style.display =
        "block";

      showUnknownButton.style.display =
        "none";

    }
  );

}
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
  saveState();
  updateElo(currentLeft, currentRight);
  finishOneMatch();
});

rightSong.addEventListener("click", () => {
  saveState();
  updateElo(currentRight, currentLeft);
  finishOneMatch();
});

superLikeLeftButton.addEventListener("click", () => {
  saveState();
  updateElo(currentLeft, currentRight);
  currentLeft.rating += 15;
  finishOneMatch();
});

superLikeRightButton.addEventListener("click", () => {
  saveState();
  updateElo(currentRight, currentLeft);
  currentRight.rating += 15;
  finishOneMatch();
});

skipButton.addEventListener("click", () => {
  nextMatch();
});

unknownLeftButton.addEventListener("click", () => {
  saveState();
  currentLeft.unknownCount++;
  finishOneMatch();
});

unknownRightButton.addEventListener("click", () => {
  saveState();
  currentRight.unknownCount++;
  finishOneMatch();
});

unknownBothButton.addEventListener("click", () => {
  saveState();
  currentLeft.unknownCount++;
  currentRight.unknownCount++;
  finishOneMatch();
});

drawButton.addEventListener("click", () => {
  saveState();
  finishOneMatch();
});

bothLikeButton.addEventListener("click", () => {
  saveState();
  currentLeft.rating += 5;
  currentRight.rating += 5;
  finishOneMatch();
});

undoButton.addEventListener("click", () => {
  if (!lastState) {
    alert("戻せる選択がありません");
    return;
  }

  songs.forEach((song, index) => {
    song.rating = lastState.ratings[index];
    song.unknownCount = lastState.unknownCounts[index];
  });

  matchCount = lastState.matchCount;
  currentLeft = lastState.left;
  currentRight = lastState.right;

  displaySong(leftSong, currentLeft);
  displaySong(rightSong, currentRight);

  updateProgress();
  lastState = null;
});

backToTopGame.addEventListener("click", () => {
  const ok = confirm("ランキングを中断してトップに戻りますか？");
  if (!ok) return;

  resultScreen.style.display = "none";
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
});

copyResultButton.addEventListener("click", () => {
  const sortedSongs = [...songs].sort((a, b) => b.rating - a.rating);
  const text =
    "BULLET TRAIN Favorite Song Ranking\n\n" +
    sortedSongs
      .map((song, index) => `${index + 1}位 ${song.name}`)
      .join("\n");

  navigator.clipboard.writeText(text);

  alert("結果をコピーしました！");
});

backToStart.addEventListener("click", () => {
  songs.forEach(song => {
    song.rating = 1500;
    song.unknownCount = 0;
  });

  matchCount = 0;
  updateProgress();

  resultScreen.style.display = "none";
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
});

startButton.addEventListener("click", () => {
  const selectedDifficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  );

  MAX_MATCHES = Number(selectedDifficulty.value);
  matchCount = 0;
  lastState = null;

  songs.forEach(song => {
    song.rating = 1500;
    song.unknownCount = 0;
  });

  startScreen.style.display = "none";
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";

  updateProgress();
  nextMatch();
});
