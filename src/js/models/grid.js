import _ from 'lodash'

class Grid {

    constructor(tiles, emptyPosition, expected) {
        if (tiles.length !== expected.length) {
            throw 'Invalid size'
        }
        this.size = Math.sqrt(tiles.length)
        this.tiles = tiles
        this.initialTiles = _.clone(tiles)
        this.emptyPosition = emptyPosition
        this.initialEmptyPosition = _.clone(emptyPosition)
        this.expected = expected
    }

    isSolvable() {
        function countInversions(array) {
            let invArray = array.map(function (num, i) {
                let inversions = 0
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] && array[j] < num) {
                        inversions += 1
                    }
                }
                return inversions
            })

            return invArray.reduce(function (a, b) {
                return a + b
            })
        }

        if (countInversions(this.tiles) % 2 == 0) {
            return true
        } else {
            return false
        }
    }

    ensureSolvable() {
        function switchTiles(array) {
            let i = 0
            while (!array[i] || !array[i + 1]) i++
            var tile = array[i]
            array[i] = array[i + 1]
            array[i + 1] = tile
            return array
        }

        if (!this.isSolvable()) {
            this.tiles = switchTiles(this.tiles)
        }
    }

    isSolved() {
        return _.isEqual(this.tiles, this.expected)
    }

    getTileCoordinates(position) {
        return {
            x: position % this.size,
            y: Math.floor(position / this.size)
        }
    }

    getValidMoves() {
        const axis = this.getTileCoordinates(this.emptyPosition)
        const max = this.size - 1

        let moves = new Array()
        if (axis.y > 0) moves.push(Grid.MOVE_UP)
        if (axis.x > 0) moves.push(Grid.MOVE_LEFT)
        if (axis.x < max) moves.push(Grid.MOVE_RIGHT)
        if (axis.y < max) moves.push(Grid.MOVE_DOWN)
        return moves
    }

    manhattan(currentPosition, expectedPosition) {
        const currentPositionCoords = this.getTileCoordinates(currentPosition)
        const expectedPositionCoords = this.getTileCoordinates(expectedPosition)
        const x = Math.abs(currentPositionCoords.x - expectedPositionCoords.x)
        const y = Math.abs(currentPositionCoords.y - expectedPositionCoords.y)
        return x + y
    }

    heuristic() {
        let heuristic = 0
        for (let i in this.tiles) {
            const tileContent = this.tiles[i]
            if (tileContent == Grid.EMPTY_TILE_CONTENT) {
                heuristic += this.manhattan(i, this.tiles.length - 1)
            } else {
                heuristic += this.manhattan(i, tileContent - 1)
            }
        }
        return heuristic
    }

    print() {
        let i = 0
        while (i < this.tiles.length) {
            const slice = this.tiles.slice(i, i + this.size)
            i += this.size
            console.log(slice)
        }
    }

    getAdjacentTiles(position) {
        const coordinates = this.getTileCoordinates(position)
        const max = this.size - 1

        let adjacentTiles = new Set()
        if (coordinates.x > 0) {
            adjacentTiles.add(this.tiles[position - 1])
        }
        if (coordinates.x < max) {
            adjacentTiles.add(this.tiles[position + 1])
        }
        if (coordinates.y > 0) {
            adjacentTiles.add(this.tiles[position - this.size])
        }
        if (coordinates.y < max) {
            adjacentTiles.add(this.tiles[position + this.size])
        }
        return adjacentTiles
    }

    swap(swapPosition) {
        this.tiles[this.emptyPosition] = this.tiles[swapPosition]
        this.tiles[swapPosition] = ''
        this.emptyPosition = swapPosition
    }

    moveTile(position) {
        const adjacentTiles = this.getAdjacentTiles(position)
        if (adjacentTiles.has(Grid.EMPTY_TILE_CONTENT)) {
            this.swap(position)
            return true
        }
        return false
    }

    equals(tiles) {
        return _.isEqual(this.tiles, tiles)
    }

    clone() {
        return new Grid(_.clone(this.tiles), _.clone(this.emptyPosition), this.expected, this.initialTiles, this.initialEmptyPosition)
    }

    move(direction) {
        let swapPosition = null

        switch (direction) {
            case Grid.MOVE_UP:
                swapPosition = this.emptyPosition - this.size
                break
            case Grid.MOVE_LEFT:
                swapPosition = this.emptyPosition - 1
                break
            case Grid.MOVE_RIGHT:
                swapPosition = this.emptyPosition + 1
                break
            case Grid.MOVE_DOWN:
                swapPosition = this.emptyPosition + this.size
                break
            default:
                throw 'Invalid direction'
        }

        if (swapPosition !== null) {
            this.swap(swapPosition)
        }
    }

    reset() {
        this.tiles = _.clone(this.initialTiles)
        this.emptyPosition = _.clone(this.initialEmptyPosition)
    }
}

Grid.EMPTY_TILE_CONTENT = ''
Grid.MOVE_UP = 'UP'
Grid.MOVE_DOWN = 'DOWN'
Grid.MOVE_LEFT = 'LEFT'
Grid.MOVE_RIGHT = 'RIGHT'

Grid.getOppositeDirection = function(direction) {
    switch (direction) {
        case Grid.MOVE_UP:
            return Grid.MOVE_DOWN
        case Grid.MOVE_DOWN:
            return Grid.MOVE_UP
        case Grid.MOVE_LEFT:
            return Grid.MOVE_RIGHT
        case Grid.MOVE_RIGHT:
            return Grid.MOVE_LEFT
        default:
            throw 'Invalid direction'
    }
}

Grid.buildFromSize = function(size) {
    let sortedTiles = _.range(1, Math.pow(size, 2))
    let shuffledTiles = _.shuffle(sortedTiles)
    shuffledTiles.push('')
    sortedTiles.push('')

    const grid = new Grid(shuffledTiles, shuffledTiles.length - 1, sortedTiles)
    grid.ensureSolvable()
    return grid
}

export default Grid
