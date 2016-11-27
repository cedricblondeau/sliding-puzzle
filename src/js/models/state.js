import _ from 'lodash'
import Grid from './grid'

class State {

    constructor(grid, moves) {
        this.grid = grid
        this.moves = moves
        this.cost = moves.length + grid.heuristic()
    }

    expand() {
        let states = []
        const validMoves = _.shuffle(this.grid.getValidMoves())

        for (let i in validMoves) {
            const move = validMoves[i]
            const lastMove = _.last(this.moves)

            if (!lastMove || Grid.getOppositeDirection(lastMove) != move) {
                const newGrid = this.grid.clone()
                newGrid.move(move)
                states.push(new State(newGrid, this.moves.concat([move])))
            }
        }

        return states
    }
}

export default State
