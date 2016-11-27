import PriorityQueue from 'js-priority-queue'
import _ from 'lodash'
import Grid from './grid'
import State from './state'

class Solver {

    constructor(grid) {
        this.queue = new PriorityQueue({
            comparator: function(a, b) { return a.cost - b.cost; },
            strategy: PriorityQueue.BinaryHeapStrategy
        })
        this.queue.queue(new State(grid, []))
    }

    solve() {
        const visitedSet = new Set()
        const maxIterations = 200000
        let iterations = 0

        while (this.queue.length > 0) {
            iterations++
            if (iterations > maxIterations) {
                return false
            }

            const state = this.queue.dequeue()
            if (state.grid.isSolved()) {
                return state.moves
            } else {
                visitedSet.add(state)
                const newStates = state.expand(state)

                for (let i in newStates) {
                    const newState = newStates[i]
                    if (!visitedSet.has(newState)) {
                        this.queue.queue(newState)
                    }
                }
            }
        }
    }
}

export default Solver
