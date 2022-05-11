const grid = document.querySelector(".tablet-container");
const sizeSlider = document.getElementById("size-slider");
const sizeLabel = document.querySelector('label[for="size"]');
const gridLinesBtn = document.querySelector('#grid-lines');
const colorPickerBtn = document.querySelector('#color-picker');
const randomColorBtn = document.querySelector('#random-color');
const eraserBtn = document.querySelector('#eraser');
const defaultColorBtn = document.querySelector('#default-color');
const clearBtn = document.querySelector('#clear');

let gridLines = true;
let gridSize = 6;
let randomColor = false;
let eraser = false;
let defaultColor = true;

//initiates the canvas
setUpGrid();

//listens for slider movement
function setUpGrid() {
    showGridSize();
    createGrid(gridSize);
    sizeSlider.addEventListener("input", showGridSize);
    sizeSlider.addEventListener("change", changeGridSize);
};

function showGridSize() {
    sizeLabel.textContent = `Size ${sizeSlider.value} x ${sizeSlider.value}`;
}
//sets grid-size root property, creates and appends divs
function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size);
    for (let i = 0;  i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add("cell");
        grid.appendChild(cell);
    }
    showGridLines();
}

function changeGridSize() {
    const cells = document.querySelectorAll(".cell");
    for ( let cell of cells ) {
        cell.remove();
    }
    gridSize = sizeSlider.value;
    createGrid(gridSize)
}

gridLinesBtn.addEventListener('click', () => {
    if (gridLines) {
        gridLines = false;
        gridLinesBtn.classList.remove("active-button");
        showGridLines()
    } else {
        gridLines = true;
        gridLinesBtn.classList.add("active-button");
        showGridLines()
    }
})

function showGridLines(){
    const cells = document.querySelectorAll(".cell");
    if (gridLines) {
        for (let cell of cells) {
            cell.classList.add("cell-border");
        }
    } else {
        for (let cell of cells) {
            cell.classList.remove("cell-border");
        }
    }
}

grid.addEventListener('mouseenter', startColoring)

function startColoring(){
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener('mouseenter',() =>{
        if (eraser) {
            cell.style.backgroundColor = '';
        } else if (randomColor) {
            colorPickerBtn.value = randomizeColor();
            cell.style.backgroundColor = colorPickerBtn.value;
        } else {
            cell.style.backgroundColor = colorPickerBtn.value;
        }
    } ))
}

randomColorBtn.addEventListener('click', () => {
    if (randomColor) {
        randomColor = false;
        randomColorBtn.classList.remove("active-button");
    } else {
        randomColor = true;
        randomColorBtn.classList.add("active-button");
        eraser = false;
        eraserBtn.classList.remove("active-button");
    }
})

// brother internet shared rgb to hex converter. Credit SO user/Tim Down
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function randomizeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

eraserBtn.addEventListener('click', () => {
    if (eraser) {
        eraser = false;
        eraserBtn.classList.remove("active-button");
    } else {
        eraser = true;
        eraserBtn.classList.add("active-button");
    }
})

defaultColorBtn.addEventListener('click', () => {
    colorPickerBtn.value = '#000000'
    eraser = false;
    eraserBtn.classList.remove("active-button");
    randomColor = false;
    randomColorBtn.classList.remove("active-button"); 
})

clearBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll(".cell");
        for (let cell of cells) {
            cell.style.backgroundColor = '';
        }
})