//this needs a refactor

/*
 every time you change the color mode

 youre going to have to unhighlight a button

 all the functionality should be handled by the the colorMode variable 

need to move the listeners to the first levvel to make them global






*/

let color = "rgb(0,0,0)";
let drawMode = "Hover";
let mousedown = false;
let darken = false;
let lighten = false;

let colorMode = "color";

const colorModeOptions = ["color", "darken", "lighten", "rainbow", "eraser"];

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
listenForDarken();
listenForLighten();

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
  if (drawMode == "Hover") {
    switch (colorMode) {
      case "color":
        e.target.style.backgroundColor = color;
        break;
      case "darken":
        let currentColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = getDarkerShade(currentColor);
        break;
      case "lighten":
        let currColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = getLighterShade(currColor);
        break;
      case "random":
        e.target.style.backgroundColor = hexToRgb(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
        break;
      case "eraser":
        e.target.style.backgroundColor = color;
        break;
      default:
        colorMode = "color";
        break;
    }
  } else {
    if (mousedown) {
      switch (colorMode) {
        case "color":
          e.target.style.backgroundColor = color;
          break;
        case "darken":
          let currentColor = e.target.style.backgroundColor;
          e.target.style.backgroundColor = getDarkerShade(currentColor);
          break;
        case "lighten":
          let currColor = e.target.style.backgroundColor;
          e.target.style.backgroundColor = getLighterShade(currColor);
          break;
        case "random":
          e.target.style.backgroundColor = hexToRgb(
            "#" + Math.floor(Math.random() * 16777215).toString(16)
          );
          break;
        case "eraser":
          e.target.style.backgroundColor = color;
          break;
        default:
          colorMode = "color";
          break;
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
  if (red != 0) red = decrementShade(red);
  if (blue != 0) blue = decrementShade(blue);
  if (green != 0) green = decrementShade(green);
  return `rgb(${red},${green},${blue})`;
}

function decrementShade(color) {
  color = color - 25;
  color = Math.max(color, 0);
  return color;
}

function getLighterShade(currentColor) {
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
  color = color + 25;
  color = Math.min(color, 255);
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
    colorMode = "color";
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
    darken = false;
    color = "random";
    colorMode = "random";
  });
}

function listenForEraser() {
  const eraser = document.querySelector("#eraser");
  const backgroundColor = document.querySelector(".grid").style.backgroundColor;
  eraser.addEventListener("click", () => {
    color = backgroundColor;
    colorMode = "eraser";
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

function listenForDarken() {
  const darkenButton = document.querySelector("#darken");
  darkenButton.addEventListener("click", (e) => {
    toggleDarken(darkenButton);
    colorMode = "darken";
  });
}

function listenForLighten() {
  const lightenButton = document.querySelector("#lighten");
  lightenButton.addEventListener("click", (e) => {
    colorMode = "lighten";
  });
}

function toggleLighten(lightenButton) {}

function toggleDarken(darkenButton) {
  if (darken) {
    darken = false;
    darkenButton.style.backgroundColor = "white";
  } else {
    darkenButton.style.cssText = "background-color: grey;";
    darken = true;
  }
}

function hexToRgb(hex) {
  const RR = hex[1] + hex[2];
  const GG = hex[3] + hex[4];
  const BB = hex[5] + hex[6];
  return `rgb(${parseInt(RR, 16)},${parseInt(GG, 16)},${parseInt(BB, 16)})`;
}
