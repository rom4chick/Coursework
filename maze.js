const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

async function main () {
    while(!isMazeDone()) {
        for (const eater of eaters) {
            moveEater(eater);
        }
        if (withAnimation) {
            drawMaze();
        for (const eater of eaters) {
            drawEater(eater);
        }
        await delay(delayTimeout);
        }
    }
    drawMaze();
}

const createMatrix = (columns, rows) => {
    const matrix = [];

    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < columns; x++) {
            row.push(false);
        }
        matrix.push(row);
    }

    return matrix
}

const drawMaze = () => {
    canvas.width = canvasPadding * 2 + columns * cellSize;
    canvas.height = canvasPadding * 2 + rows * cellSize;

    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor;
    context.fill();
    
    for (let y = 0; y < columns; y++) {
        for (let x = 0; x < rows; x++) {
            const color = matrix[y][x] ? freeCellsColor : wallColor;

            context.beginPath();
            context.rect(canvasPadding + x * cellSize, canvasPadding + y * cellSize, cellSize, cellSize);
            context.fillStyle = color;
            context.fill();
        }
    } 
}

const drawEater = eater => {
    context.beginPath();
    context.rect(canvasPadding + eater.x * cellSize, canvasPadding + eater.y * cellSize, cellSize, cellSize);
    context.fillStyle = eaterColor;
    context.fill();
}

const moveEater = eater => {
    const directions = [];

    if (eater.x > 0) {
        directions.push([-2, 0]);
    }

    if (eater.x < columns - 1) {
        directions.push([2, 0]);
    }

    if (eater.y > 0) {
        directions.push([0, -2]);
    }

    if (eater.y < rows - 1) {
        directions.push([0, 2]);
    }

    const [dx, dy] = getRandomItem(directions);

    eater.x += dx;
    eater.y += dy;

    if (!matrix[eater.y][eater.x]) {
        matrix[eater.y][eater.x] = true;  
        matrix[eater.y - dy / 2][eater.x - dx / 2] = true;  
    }
}

const getRandomItem = array => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const isMazeDone = () => {
    for (let y = 0; y < columns; y += 2) {
        for (let x = 0; x < rows; x += 2) {
            if (!matrix[y][x]) {
                return false;
            }
        }
    }
    let matrixJson = JSON.stringify(matrix);
    return true;
}


const cellSize = 10;
const canvasPadding = 5;
const wallColor = '#000';
const freeCellsColor = '#fff';
const backgroundColor = '#333';
const columns = prompt("Введите кол-во колонок");
const rows = prompt("Введите кол-во строк");
const eaterColor = "#FF5733"
const delayTimeout = 0;
const eatersAmount = prompt("Введите кол-во пожирателей");
let withAnimation = prompt("Вы хотите создание алгоритма с анимацией или без");
withAnimation === "1" ? withAnimation = true : withAnimation = false;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const matrix = createMatrix(columns, rows);
const eaters = [];
for (let i = 0; i < eatersAmount; i++) {
    eaters.push({
        x: 0,
        y: 0,
    })
}

matrix[0][0] = true;

main();