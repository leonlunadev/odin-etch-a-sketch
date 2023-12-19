let color = "rgb(0,0,0)";
let drawMode = "Hover";
let mousedown = false;
let darkening = false;

addSquares(60, 16);
addDrawMode();
listenForNewNumSquares();
listenForNewDrawMode();
listenForNewColor();
listenForRandomColor();
listenForNewBackgroundColor();
listenForEraser();
listenForClear();
listenForBorderToggle();
listenForDarkening();

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
    const grid = document.querySelector(".grid");
    const gridStyle = getComputedStyle(grid);
    square.style.cssText = `width: ${squareLength}px; height: ${squareLength}px; border: solid black 1px; background-color: ${gridStyle.backgroundColor};`;

    grid.appendChild(square);
  }
  addDrawMode();
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
        addColor(e);
      });
      square.addEventListener("mouseenter", addColor);
      square.addEventListener("mouseup", () => {
        mousedown = false;
      });
    });
  }
}

function addColor(e) {
  if (!darkening) {
    if (drawMode == "Hover") {
      if (color == "random") {
        e.target.style.backgroundColor = hexToRgb(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      } else {
        e.target.style.backgroundColor = color;
      }
    } else {
      if (mousedown) {
        if (color == "random") {
          e.target.style.backgroundColor = hexToRgb(
            "#" + Math.floor(Math.random() * 16777215).toString(16)
          );
        } else {
          e.target.style.backgroundColor = color;
        }
      }
    }
  } else {
    if (drawMode == "Hover") {
      let currentColor = e.target.style.backgroundColor;
      e.target.style.backgroundColor = getDarkerShade(currentColor);
    } else {
      if (mousedown) {
        let currentColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = getDarkerShade(currentColor);
      }
    }
  }
}

function getDarkerShade(currentColor) {
  currentColor = currentColor.split(")");
  let strSplit = currentColor[0].split("(");
  let numbers = strSplit[1].split(",");
  let red = Number(numbers[0]);
  let green = Number(numbers[1]);
  let blue = Number(numbers[2]);
  if (red != 0) red = incrementShade(red);
  if (blue != 0) blue = incrementShade(blue);
  if (green != 0) green = incrementShade(green);
  return `rgb(${red},${green},${blue})`;
}

function incrementShade(color) {
  color = color - 25;
  color = Math.max(color, 0);
  return color;
}

function clearSquares() {
  const squares = document.querySelectorAll(".grid div");
  squares.forEach((square) => {
    square.remove();
  });
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

function listenForNewColor() {
  const colorPicker = document.querySelector(".changeColor input");
  colorPicker.addEventListener("input", () => {
    color = hexToRgb(colorPicker.value);
  });
}

function listenForNewBackgroundColor() {
  const colorPicker = document.querySelector(".changeBackgroundColor input");
  const colorSubmit = document.querySelector(".changeBackgroundColor button");
  const grid = document.querySelector(".grid");
  const squares = document.querySelectorAll(".grid div");

  colorPicker.addEventListener("input", () => {
    grid.style.backgroundColor = hexToRgb(colorPicker.value);
    squares.forEach((square) => {
      square.style.backgroundColor = hexToRgb(colorPicker.value);
    });
  });
}

function listenForRandomColor() {
  const colorSubmit = document.querySelector("#random");
  colorSubmit.addEventListener("click", () => {
    darkening = false;
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

  clear.addEventListener("click", () => {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
      const backgroundColor =
        document.querySelector(".grid").style.backgroundColor;
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

function listenForDarkening() {
  const darkeningButton = document.querySelector("#darkening");
  darkeningButton.addEventListener("click", (e) => {
    if (darkening) {
      darkening = false;
      darkeningButton.style.backgroundColor = "white";
    } else {
      darkeningButton.style.cssText = "background-color: grey;";
      darkening = true;
    }
  });
}

function hexToRgb(hex) {
  const RR = hex[1] + hex[2];
  const GG = hex[3] + hex[4];
  const BB = hex[5] + hex[6];
  return `rgb(${parseInt(RR, 16)},${parseInt(GG, 16)},${parseInt(BB, 16)})`;
}
