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
  } else {
    e.target.style.backgroundColor = color;
  }
}

function handleNewColorMode() {}

function handleNewDrawMode() {}

function startJavascript() {
  addSquares(60, 16);
  addDrawMode("mouseover");
  handleNewGridSize();
}

let color = "blue";

startJavascript();
