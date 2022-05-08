/* call function that sets up grid:
-shows grid size in label+
-creates grid 
--changes grid size CSS variable to size slider value
--takes value from slider
--removes old elements
--creates new elements on new value
--appends elements to tablet
*/
const grid = document.querySelector(".tablet-container");
const sizeSlider = document.getElementById("size-slider");
const sizeLabel = document.querySelector('label[for="size"]');

let gridSize = 6;

setUpGrid();

function setUpGrid() {
    showGridSize();
    createGrid(gridSize);
    sizeSlider.addEventListener("input", showGridSize);
    sizeSlider.addEventListener("change", changeGridSize);
};

function showGridSize() {
    sizeLabel.textContent = `Size ${sizeSlider.value} x ${sizeSlider.value}`;
}

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size);
    for (let i = 0;  i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add("cell");
        cell.classList.add("cell-border");
        grid.appendChild(cell)
    }
}

function changeGridSize() {
    cells = document.querySelectorAll(".cell");
    for ( let cell of cells) {
        cell.remove();
    }
    gridSize = sizeSlider.value;
    createGrid(gridSize)
}

