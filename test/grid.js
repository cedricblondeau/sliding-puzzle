import assert from 'assert'
import { solvableGrid, solvableGridSolution, unsolvableGrid } from './mock'
import Grid from '../src/js/models/Grid'
import _ from 'lodash'

describe('Solvable 4x4 grid but not solved yet grid', () => {
    it('Should be solvable', () => {
        assert.equal(solvableGrid.isSolvable(), true)
    })

    it('Should not be solved yet', () => {
        assert.equal(solvableGrid.isSolved(), false)
    })
})

describe('Unsolvable 4x4 grid', () => {
    after(() => {
        unsolvableGrid.reset()
    })

    it('Shoud not be solvable', () => {
        assert.equal(unsolvableGrid.isSolvable(), false)
    })

    it('Makes it solvable', () => {
        unsolvableGrid.ensureSolvable()
        assert.equal(unsolvableGrid.isSolvable(), true)
    })
})

describe('Position to x,y coords', () => {
    it('Returns 0,0 on top left', () => {
        assert.deepEqual(solvableGrid.getTileCoordinates(0), { x: 0, y: 0 })
    })

    it('Returns 1,0 for second tile', () => {
        assert.deepEqual(solvableGrid.getTileCoordinates(2 - 1), { x: 1, y: 0 })
    })

    it('Returns 0,1 for fifth tile', () => {
        assert.deepEqual(solvableGrid.getTileCoordinates(5 - 1), { x: 0, y: 1 })
    })

    it('Returns 3,3 on bottom right', () => {
        assert.deepEqual(solvableGrid.getTileCoordinates(15), { x: 3, y: 3 })
    })
})

describe('Move grid tiles', () => {
    after(() => {
        solvableGrid.reset()
    })

    it('Has empty position on bottom right corner on start', () => {
        assert.equal(solvableGrid.emptyPosition, 15)
    })

    it('Can move up and left only', () => {
        const validMoves = solvableGrid.getValidMoves()
        assert.equal(_.includes(validMoves, Grid.MOVE_UP), true)
        assert.equal(_.includes(validMoves, Grid.MOVE_LEFT), true)
        assert.equal(_.includes(validMoves, Grid.MOVE_RIGHT), false)
        assert.equal(_.includes(validMoves, Grid.MOVE_DOWN), false)
    })

    it('Moves up', () => {
        solvableGrid.move(Grid.MOVE_UP)
        assert.equal(solvableGrid.emptyPosition, 11)

        solvableGrid.move(Grid.MOVE_UP)
        assert.equal(solvableGrid.emptyPosition, 7)

        solvableGrid.move(Grid.MOVE_UP)
        assert.equal(solvableGrid.emptyPosition, 3)
    })

    it('Cannot move up again', () => {
        const validMoves = solvableGrid.getValidMoves()
        assert.equal(_.includes(validMoves, Grid.MOVE_UP), false)
    })
})

describe('Solve the puzzle by moving tiles', () => {
    after(() => {
        solvableGrid.reset()
    })

    it('Should be solved after applying the right moves sequence', () => {
        for (let move of solvableGridSolution) {
            solvableGrid.move(move)
        }
        assert.equal(solvableGrid.isSolved(), true)
    })
})
