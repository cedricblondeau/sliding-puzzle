var React = require('react');
var Grid = require('./grid.jsx');
var GridModel = require('../models/grid');

var gridModelInstance;

var Game = React.createClass({
    getInitialState: function() {
        gridModelInstance = GridModel.buildFromSize(3);
        return {
            gridModel: gridModelInstance,
            gridId: 1
        };
    },

    moveTile: function(position) {
        var changed = gridModelInstance.moveTile(position);
        if (changed) {
            this.state.gridModel = gridModelInstance;
            this.setState(this.state);
        }
    },

    render: function() {
        return (
            <div id="game">
                <Grid key={this.state.gridId} model={this.state.gridModel} moveTile={this.moveTile} />
            </div>
        );
    }
});

module.exports = Game;