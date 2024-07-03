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
  $w(`#button-${key}`).label = `${value}`;
}

function generateOptions() {
  let randomOptions = [];
  for (let i = 0; i < Array(16).length; i++) {
    randomOptions = [...randomOptions, generateRandomNumber()];
  }
  return randomOptions;
}

function generateResult() {
  $w("#result").text = `${generateRandomNumber()}`;
}

function generateGame() {
  const options = generateOptions();
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    putOption(i + 1, element);
  }

  generateResult();
}

function handleLoadGame() {
  const previewContainer = $w("#preview-container");
  previewContainer.hide();

  const gameContainer = $w("#game-container");
  gameContainer.show();

  generateGame();
}

function evaluate() {
  const operand1 = $w("#operand-1").text;
  const operand2 = $w("#operand-2").text;
  const operand3 = $w("#operand-3").text;
  const operand4 = $w("#operand-4").text;

  const operation1 = $w("#operation-1").text;
  const operation2 = $w("#operation-2").text;
  const operation3 = $w("#operation-3").text;

  if (!(operand1 && operand2 && operand3 && operand4)) {
    return;
  }

  const equation = `${operand1} ${operation1} ${operand2} ${operation2} ${operand3} ${operation3} ${operand4}`;

  const result = eval(equation);

  const expectedResult = $w("#result").text;

  if (`${result}` === `${expectedResult}`) {
    $w(
      "#result"
    ).html = `<p style="color: lightgreen; font-size: 22px; font-weight: bold">${
      $w("#result").text
    }</p>`;
  }
}

function updateOperands(value) {
  const operand1 = $w("#operand-1");
  const operand2 = $w("#operand-2");
  const operand3 = $w("#operand-3");
  const operand4 = $w("#operand-4");

  if (operand1.text === "__") {
    operand1.text = value;
  } else if (operand2.text === "__") {
    operand2.text = value;
  } else if (operand3.text === "__") {
    operand3.text = value;
  } else if (operand4.text === "__") {
    operand4.text = value;
  }
}

function handleClickOption(key) {
  const button = $w(`#button-${key}`);
  updateOperands(button.label);
  evaluate();
}

function setupButtonPressHandler() {
  for (let i = 0; i < Array(16).length; i++) {
    $w(`#button-${i + 1}`).onClick(() => handleClickOption(i + 1));
  }
}

function handleReset() {
  const operand1 = $w("#operand-1");
  const operand2 = $w("#operand-2");
  const operand3 = $w("#operand-3");
  const operand4 = $w("#operand-4");

  operand1.text = "__";
  operand2.text = "__";
  operand3.text = "__";
  operand4.text = "__";
}

$w.onReady(function () {
  $w("#play-btn").onClick(handleClickPlayBtn);
  $w("#close-game-btn").onClick(handleCloseGame);
  $w("#load-game-btn").onClick(handleLoadGame);
  setupButtonPressHandler();
  $w("#reset-btn").onClick(handleReset);
});
