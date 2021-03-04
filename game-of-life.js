const canvas = document.getElementById("canvas")
const lifeButton = document.getElementById("life-button")
const ctx = canvas.getContext("2d")
const grid = []

const width = Math.floor(document.querySelector("canvas").getAttribute("width"))
const height = Math.floor(
    document.querySelector("canvas").getAttribute("height")
)
const centerX = width / 2
const centerY = height / 2
const cellSize = 3
const columns = Math.floor(height / cellSize)
const rows = Math.floor(width / cellSize)
const throttleFactor = 2
let throttleCounter = 0

class Cell {
    constructor(y, x) {
        this.alive = false
        this.neighbors = []
        this.y = y
        this.x = x
        this.aliveForNextTick = false
    }

    makeAlive() {
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
        this.alive = true
    }

    kill() {
        ctx.clearRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
        this.alive = false
    }

    isAlive() {
        return this.alive
    }

    setStateForNextTick() {
        const livingNeighbors = this.neighbors.filter(
            (n) => n != null && n.isAlive()
        ).length
        if (
            livingNeighbors > 1 &&
            livingNeighbors < 4 &&
            (this.alive || livingNeighbors > 2)
        ) {
            this.aliveForNextTick = true
        }
    }

    update() {
        if (this.aliveForNextTick && !this.alive) {
            this.makeAlive()
        } else if (!this.aliveForNextTick && this.alive) {
            this.kill()
        }
        this.aliveForNextTick = false
    }
}

function createCells() {
    for (let rowIndex = 0; rowIndex < columns; rowIndex++) {
        let row = []
        cellX = rowIndex * cellSize
        for (let cellIndex = 0; cellIndex < rows; cellIndex++) {
            cell = new Cell(rowIndex, cellIndex)
            row.push(cell)
        }
        grid.push(row)
    }
}

const neighborIndexes = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]

function assignNeighbors() {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex]
        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const cell = row[cellIndex]
            for (const relativeCoords of neighborIndexes) {
                const [yOffset, xOffset] = relativeCoords
                neighborY = cell.y + yOffset
                neighborX = cell.x + xOffset
                if (
                    neighborY >= 0 &&
                    neighborY < grid.length &&
                    neighborX >= 0 &&
                    neighborX < row.length
                ) {
                    neighbor = grid[neighborY][neighborX]
                    cell.neighbors.push(neighbor)
                } else {
                    cell.neighbors.push(null)
                }
            }
        }
    }
}

function tick() {
    requestAnimationFrame(tick)
    throttleCounter++
    const needToUpdateFrame = throttleCounter % throttleFactor === 0
    if (needToUpdateFrame) {
        grid.forEach((row) => row.forEach((cell) => cell.setStateForNextTick()))
        grid.forEach((row) => row.forEach((cell) => cell.update()))
    }
}

function createSeed() {
    function switchOn(x, y) {
        grid[y][x].makeAlive()
    }

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex]
        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const cell = row[cellIndex]
            if (Math.floor(Math.random() * 100) % 15 === 0) {
                cell.makeAlive()
            }
        }
    }
}

createCells()
assignNeighbors()
requestAnimationFrame(tick)

lifeButton.addEventListener("click", () => createSeed())
