# sliding-puzzle
> A sliding puzzle with a solver written in JavaScript using ReactJS for the view part and cat GIFs as your rewards.

[![forthebadge](http://forthebadge.com/images/badges/contains-cat-gifs.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

## Live demo

http://cedricblondeau.github.io/sliding-puzzle/

## Solver algorithm

The application uses [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) with [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) heuristic to solve puzzles.
The algorithm solves 3x3 puzzles and some **simple** 4x4 puzzles but is unsuitable for more complex 4x4 ones.

See [src/js/models/solver.js](app/js/models/solver.js).

To solve 4x4 puzzles, [Iterative_deepening_A*](https://en.wikipedia.org/wiki/Iterative_deepening_A*) and a heuristic such as [pattern database](https://heuristicswiki.wikispaces.com/pattern+database) could be used.

## Development

#### Install dependencies

```bash
npm install
```

#### CLI usage

```bash
babel-node --presets node6 bin/console.js
```

## Execute tests

```bash
npm test
```
