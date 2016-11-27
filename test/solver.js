import assert from 'assert'
import { solvableGrid, solvableGridSolution } from './mock'
import Solver from '../src/js/models/solver'

describe('Compute a solution', () => {
    after(() => {
        solvableGrid.reset()
    })
    const solver = new Solver(solvableGrid)

    it('It should find a solution for a solvable 4x4 grid', () => {
        assert.deepEqual(solver.solve(), solvableGridSolution)
    })
})
