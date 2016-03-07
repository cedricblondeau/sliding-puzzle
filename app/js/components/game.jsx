var React = require('react');
var Grid = require('./grid.jsx');
var Menu = require('./menu.jsx');
var Scoreboard = require('./scoreboard.jsx');
var GridModel = require('../models/grid');
var SolverModel = require('../models/solver');

var gridModelInstance;
var solution;

var timeouts = [];
function clearTimeouts() {
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

var Game = React.createClass({
    getInitialState: function() {
        gridModelInstance = GridModel.buildFromSize(3);
        return {
            gridModel: gridModelInstance,
            gridId: 1,
            moves: 0
        };
    },

    next: function() {
        clearTimeouts();
        gridModelInstance = GridModel.buildFromSize(3);
        solution = null;
        this.setState({
            gridModel: gridModelInstance,
            gridId: this.state.gridId + 1,
            moves: 0
        });
    },

    hint: function() {
        if (!this.isSolving()) {
            if (!solution) {
                solution = new SolverModel(gridModelInstance).solve();
            }
            if (solution && solution.length > 0) {
                var direction = solution.shift();
                this.move(direction);
            }
        }
    },

    solve: function() {
        if (!this.isSolving()) {
            if (!solution) {
                solution = new SolverModel(gridModelInstance).solve();
            }
            if (solution && solution.length > 0) {
                var game = this;
                var delay = 100;
                for (var i = 0; i < solution.length; i++) {
                    (function(n) {
                        timeouts.push(setTimeout(function() {
                            game.move(solution[n]);
                        }, delay));
                    } (i));
                    delay = delay + 100;
                }
            }
        }
    },

    isSolving: function() {
        return timeouts.length ? true : false;
    },

    move: function(direction) {
        gridModelInstance.move(direction);
        this.state.gridModel = gridModelInstance;
        this.state.moves++;
        this.setState(this.state);
    },

    moveTile: function(position) {
        if (!this.isSolving()) {
            var changed = gridModelInstance.moveTile(position);
            if (changed) {
                solution = null;
                this.state.gridModel = gridModelInstance;
                this.state.moves++;
                this.setState(this.state);
            }
        }
    },

    render: function() {
        return (
            <div id="game">
                <Grid key={this.state.gridId} model={this.state.gridModel} moveTile={this.moveTile} />
                <div id="aside">
                    <Scoreboard moves={this.state.moves} gridId={this.state.gridId} />
                    <Menu next={this.next} hint={this.hint} solve={this.solve} isSolved={this.state.gridModel.isSolved()} />
                </div>
            </div>
        );
    }
});

module.exports = Game;