function addSquares(squareLength, numSquares) {
  for (let i = 0; i < numSquares * numSquares; i++) {
    const square = document.createElement("div");
    square.style.cssText = `width: ${squareLength}px; height: ${squareLength}px; border: solid black 1px;`;
    const grid = document.querySelector(".grid");
    grid.appendChild(square);
  }
  addDrawMode("mouseover");
}

function clearSquares() {
  const squares = document.querySelectorAll(".grid div");
  squares.forEach((square) => {
    square.remove();
  });
}

function handleNewGridSize() {
  const gridEvent = document.querySelector("#numSquaresSubmit");
  gridEvent.addEventListener("click", adjustNumSquares);
}

function adjustNumSquares(e) {
  const input = document.querySelector("#numSquares");
  const newNumSquares = Number(input.value);
  input.value = "";
  const newSquareLength = 960 / newNumSquares;
  clearSquares();
  addSquares(newSquareLength, newNumSquares);
}

function removeDrawListener() {}

function addDrawMode(mode) {
  const squares = document.querySelectorAll(".grid div");
  squares.forEach((square) => {
    square.addEventListener(mode, addColor);
  });
}

function addColor(e) {
  if (color == "random") {
    e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  } else {
    e.target.style.backgroundColor = color;
  }
}

function handleNewColorMode() {
  const colorPicker = document.querySelector(".changeColor input");
  const colorSubmit = document.querySelector(".changeColor button");
  colorSubmit.addEventListener("click", () => {
    color = colorPicker.value;
  });
}

function handleNewBackgroundColor() {
  const colorPicker = document.querySelector(".changeBackgroundColor input");
  const colorSubmit = document.querySelector(".changeBackgroundColor button");
  const grid = document.querySelector(".grid");
  colorSubmit.addEventListener("click", () => {
    grid.style.backgroundColor = colorPicker.value;
  });
}

function handleRandomColor() {
  const colorSubmit = document.querySelector("#random");
  colorSubmit.addEventListener("click", () => {
    color = "random";
  });
}

function getRandomValue() {
  return Math.floor(Math.random() * 255);
}

function handleNewDrawMode() {}

function startJavascript() {
  addSquares(60, 16);
  addDrawMode("mouseover");
  handleNewGridSize();
  handleNewColorMode();
  handleNewBackgroundColor();
  handleRandomColor();
}

let color = "black";

startJavascript();
