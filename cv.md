- Ivan Lednev
- ivan_liadniou@epam.com

# Summary

I'm currently a test automation engineer at EPAM. I've enrolled into the RSS front-end course to get some practical experience with JS. If I find it interesting, I might pivot and become a front-end or full-stack developer in the future.

# Skills

- Programming languages
    - Core Java
    - Automated testing in Java
    - Java frameworks
        - Selenium
        - JUnit
        - Spring framework
        - JBehave
    - Core Python
    - Automated testing in Python
    - Python frameworks
        - Pytest
        - Unittest
        - Radish
    - Core JavaScript
    - JavaScript frameworks
        - Jest
    - Bash
- Git
- Linux
- IDEs, editors
    - Intellij Idea
    - PyCharm
    - Vim
    - Emacs
    - Visual Studio Code

# Code examples

This is a simple implementation of Conway's game of life
```javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const grid = []

const width = Math.floor(document.querySelector('canvas').getAttribute('width'))
const height = Math.floor(document.querySelector('canvas').getAttribute('height'))
const centerX = width / 2
const centerY = height / 2
const cellSize = 4
const columns = Math.floor(height / cellSize)
const rows = Math.floor(width / cellSize)
const throttleFactor = 3
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
        const livingNeighbors = this.neighbors
            .filter((n) => n != null && n.isAlive())
            .length
        if (livingNeighbors > 1 && livingNeighbors < 4 && (this.alive || livingNeighbors > 2)) {
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
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

function assignNeighbors() {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const cell = row[cellIndex];
            for (const relativeCoords of neighborIndexes) {
                const [yOffset, xOffset] = relativeCoords
                neighborY = cell.y + yOffset
                neighborX = cell.x + xOffset
                if (neighborY >= 0 && neighborY < grid.length && neighborX >= 0 && neighborX < row.length) {
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
        grid.forEach(row => row.forEach(cell => cell.setStateForNextTick()))
        grid.forEach(row => row.forEach(cell => cell.update()))
    }
}

function createSeed() {
    function switchOn(x, y) {
        grid[y][x].makeAlive()
    }
    switchOn(73, 60)
    switchOn(74, 60)
    switchOn(100, 50)
    switchOn(101, 50)
    switchOn(102, 50)
    switchOn(103, 50)
    switchOn(104, 50)
    switchOn(100, 50)
    switchOn(101, 50)
    switchOn(102, 50)
    switchOn(103, 50)
    switchOn(104, 61)
    switchOn(100, 60)
    switchOn(101, 60)
    switchOn(102, 60)
    switchOn(103, 60)
    switchOn(104, 60)
}

createCells()
assignNeighbors()
createSeed()
requestAnimationFrame(tick)
```
