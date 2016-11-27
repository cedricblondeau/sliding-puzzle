import assert from 'assert'
import {solvableGrid} from './mock'
import State from '../src/js/models/state'

describe('Expand state', () => {
    after(() => {
        solvableGrid.reset()
    })

    it('Should generate 2 next states: up and left', () => {
        const state = new State(solvableGrid, [])
        const nextStates = state.expand()
        assert.equal(nextStates.length, 2)
    })
})
