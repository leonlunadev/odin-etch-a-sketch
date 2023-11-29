function addSquares() {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const square = document.createElement("div");
      square.className = "square";
      const grid = document.querySelector(".grid");
      grid.appendChild(square);
    }
  }
}

function changeSquareClass(length) {}

addSquares();

function handleNewGridSize() {
  const gridEvent = document.querySelector("#numSquaresSubmit");
  gridEvent.addEventListener("click", adjustNumSquares);
}

function adjustNumSquares(e) {
  const input = document.querySelector("#numSquares");
  const numSquares = Number(input.value);
  input.value = "";
  const newSquareLength = 960 / numSquares;
}

function startJavascript() {
  handleNewGridSize();
}

startJavascript();
