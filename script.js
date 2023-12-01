let color = "rgba(0,0,0,1)";
let drawMode = "Hover";
let mousedown = false;

main();

function main() {
  addSquares(60, 16);
  addDrawMode();
  listen();
}

function listen() {
  listenForNewNumSquares();
  listenForNewDrawMode();
  listenForDrawEvent();
  listenForNewColor();
  listenForRandomColor();
  listenForNewBackgroundColor();
  listenForEraser();
  listenForClear();
  listenForBorderToggle();
}

function listenForNewNumSquares() {
  const gridEvent = document.querySelector("#numSquaresSubmit");
  gridEvent.addEventListener("click", adjustNumSquares);
}

function listenForNewDrawMode() {
  const drawModeListener = document.querySelector("#drawMode");
  drawModeListener.addEventListener("click", (e) => {
    const newButtonLabel = drawMode;
    drawMode = e.target.textContent;
    e.target.textContent = newButtonLabel;
    addDrawMode();
  });
}

function listenForDrawEvent() {}

function listenForNewColor() {}

function adjustNumSquares(e) {
  const input = document.querySelector("#numSquares");
  const newNumSquares = Number(input.value);
  input.value = "";
  const newSquareLength = 960 / newNumSquares;
  clearSquares();
  addSquares(newSquareLength, newNumSquares);
}

function addSquares(squareLength, numSquares) {
  for (let i = 0; i < numSquares * numSquares; i++) {
    const square = document.createElement("div");
    square.style.cssText = `width: ${squareLength}px; height: ${squareLength}px; border: solid black 1px;`;
    const grid = document.querySelector(".grid");
    grid.appendChild(square);
  }
  addDrawMode();
}

function addDrawMode(mode) {
  removeEventListeners();
  if (drawMode == "Hover") {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
      square.addEventListener("mouseover", addColor);
    });
  } else {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
      square.addEventListener("mousedown", (e) => {
        mousedown = true;
        if (color == "random") {
          e.target.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          e.target.style.backgroundColor = color;
        }
      });
      square.addEventListener("mouseenter", addColor);
      square.addEventListener("mouseup", () => {
        mousedown = false;
      });
    });
  }
}

function removeEventListeners() {
  if (drawMode == "Press") {
    const listeners = document.querySelectorAll(".grid div");
    listeners.forEach((square) => {
      square.removeEventListener("mouseover", addColor);
    });
  } else {
    const listeners = document.querySelectorAll(".grid div");
    listeners.forEach((square) => {
      square.removeEventListener("mousedown", () => {});
      square.removeEventListener("mouseenter", addColor);
      square.removeEventListener("mouseup", () => {});
    });
  }
}

function addColor(e) {
  if (drawMode == "Hover") {
    if (color == "random") {
      e.target.style.backgroundColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
    } else {
      e.target.style.backgroundColor = color;
    }
  } else {
    if (mousedown) {
      if (color == "random") {
        e.target.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      } else {
        e.target.style.backgroundColor = color;
      }
    }
  }
}

function clearSquares() {
  const squares = document.querySelectorAll(".grid div");
  squares.forEach((square) => {
    square.remove();
  });
}

function listenForNewColor() {
  const colorPicker = document.querySelector(".changeColor input");
  const colorSubmit = document.querySelector(".changeColor button");
  colorSubmit.addEventListener("click", () => {
    color = colorPicker.value;
  });
}

function listenForNewBackgroundColor() {
  const colorPicker = document.querySelector(".changeBackgroundColor input");
  const colorSubmit = document.querySelector(".changeBackgroundColor button");
  const grid = document.querySelector(".grid");
  colorSubmit.addEventListener("click", () => {
    grid.style.backgroundColor = colorPicker.value;
  });
}

function listenForRandomColor() {
  const colorSubmit = document.querySelector("#random");
  colorSubmit.addEventListener("click", () => {
    color = "random";
  });
}

function listenForEraser() {
  const eraser = document.querySelector("#eraser");
  const backgroundColor = document.querySelector(".grid").style.backgroundColor;
  eraser.addEventListener("click", () => {
    color = backgroundColor;
  });
}

function listenForClear() {
  const clear = document.querySelector("#clear");
  const backgroundColor = document.querySelector(".grid").style.backgroundColor;
  clear.addEventListener("click", () => {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
      square.style.backgroundColor = backgroundColor;
    });
  });
}

function listenForBorderToggle() {
  const border = document.querySelector("#border");
  const squares = document.querySelectorAll(".grid div");
  border.addEventListener("click", (e) => {
    if (e.target.textContent == "Remove Border") {
      squares.forEach((square) => {
        square.style.border = "none";
      });
      e.target.textContent = "Add Border";
    } else {
      squares.forEach((square) => {
        square.style.border = "1px solid black";
      });
      e.target.textContent = "Remove Border";
    }
  });
}
