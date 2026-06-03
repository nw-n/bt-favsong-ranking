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

function getRandomSong() {
  return songs[Math.floor(Math.random() * songs.length)];
}

const buttons = document.querySelectorAll(".song-button");

buttons[0].textContent = getRandomSong();
buttons[1].textContent = getRandomSong();
