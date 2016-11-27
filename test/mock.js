import Grid from '../src/js/models/Grid'
import _ from 'lodash'

const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']
const solvableTiles = [1, 2, 7, 4, 5, 8, 3, 11, 9, 6, 12, 15, 13, 14, 10, '']
const solvableTilesEmptyPosition = 15

export const solvableGrid = new Grid(solvableTiles, solvableTilesEmptyPosition, solvedState)
export const solvableGridSolution = [
  'UP',
  'LEFT',
  'DOWN',
  'RIGHT',
  'UP',
  'UP',
  'UP',
  'LEFT',
  'DOWN',
  'LEFT',
  'UP',
  'RIGHT',
  'RIGHT',
  'DOWN',
  'LEFT',
  'UP',
  'LEFT',
  'DOWN',
  'DOWN',
  'RIGHT',
  'RIGHT',
  'DOWN'
]

const unsolvableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, '']
const unsolvableTilesEmptyPosition = 15
export const unsolvableGrid = new Grid(unsolvableTiles, unsolvableTilesEmptyPosition, solvedState)
