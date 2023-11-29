function addSquares(squareLength, numSquares) {
  for (let i = 0; i < numSquares * numSquares; i++) {
    const square = document.createElement("div");
    square.style.cssText = `width: ${squareLength}px; height: ${squareLength}px; border: solid black 1px;`;
    const grid = document.querySelector(".grid");
    grid.appendChild(square);
  }
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

function startJavascript() {
  addSquares(60, 16);
  handleNewGridSize();
}

startJavascript();
