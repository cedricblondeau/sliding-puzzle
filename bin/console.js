import Grid from '../src/js/models/grid'
import Solver from '../src/js/models/solver'

const tiles = [1, 2, 7, 4, 5, 8, 3, 11, 9, 6, 12, 15, 13, 14, 10, '']
const emptyPosition = 15
const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']

const grid = new Grid(tiles, emptyPosition, expected)

console.log('Generated grid:');
grid.print();

console.log('Grid heuristic: ' + grid.heuristic());

const solver = new Solver(grid)
const solution = solver.solve()
console.log('Computed solution:');
console.log(solution);
