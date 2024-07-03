function handleClickPlayBtn() {
  const playButton = $w("#play-btn");
  playButton.hide();

  const gameBox = $w("#game-box");
  gameBox.show();
}

function handleCloseGame() {
  const playButton = $w("#play-btn");
  playButton.show();

  const gameBox = $w("#game-box");
  gameBox.hide();

  const previewContainer = $w("#preview-container");
  previewContainer.show();

  const gameContainer = $w("#game-container");
  gameContainer.hide();
}

function generateRandomNumber() {
  // generated a random number between 1 and 100

  let decimals = 100;

  // inital values
  let found = false;
  let randomNo = 0;

  // looping till a valid number is found
  while (!found) {
    randomNo = Math.floor(Math.random() * decimals + 1);
    if (randomNo > 0 && randomNo < 100) {
      found = true;
    }
  }
  return randomNo;
}

function putOption(key, value) {
  $w(`#button-${key}`).label = value
  console.log(key, value);
}

function generateOptions() {
  let randomOptions = [];
  for (let i = 0; i < Array(16).length; i++) {
    randomOptions = [...randomOptions, generateRandomNumber()];
  }
  return randomOptions;
}

function generateGame() {
  const options = generateOptions();
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    putOption(i + 1, element);
  }
}

function handleLoadGame() {
  const previewContainer = $w("#preview-container");
  previewContainer.hide();

  const gameContainer = $w("#game-container");
  gameContainer.show();

  generateGame();
}

$w.onReady(function () {
  $w("#play-btn").onClick(handleClickPlayBtn);
  $w("#close-game-btn").onClick(handleCloseGame);
  $w("#load-game-btn").onClick(handleLoadGame);
});
