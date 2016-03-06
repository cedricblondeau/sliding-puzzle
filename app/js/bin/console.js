var Grid = require('../models/grid');
var Solver = require('../models/solver');

// 3x3 grid:
//var grid = Grid.buildFromSize(3);

// Simple 4x4 grid:
var grid = new Grid([1, 2, 7, 4, 5, 8, 3, 11, 9, 6, 12, 15, 13, 14, 10, ''], 15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']);

console.log('Generated grid:');
grid.print();

console.log('Grid heuristic: ' + grid.heuristic());

var solver = new Solver(grid);
var solution = solver.solve();
console.log('Computed solution:');
console.log(solution);