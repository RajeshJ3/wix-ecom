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

function handleLoadGame() {
  const previewContainer = $w("#preview-container");
  previewContainer.hide();

  const gameContainer = $w("#game-container");
  gameContainer.show();
}

$w.onReady(function () {
  $w("#play-btn").onClick(handleClickPlayBtn);
  $w("#close-game-btn").onClick(handleCloseGame);
  $w("#load-game-btn").onClick(handleLoadGame);
});
