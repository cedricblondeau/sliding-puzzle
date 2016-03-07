var React = require('react');

var Scoreboard = React.createClass({
    render: function() {
        return (
            <div id="scoreboard">
                <div className="block">
                    <label>Grid #</label>
                    <span>{this.props.gridId}</span>
                </div>
                <div className="block">
                    <label>Moves</label>
                    <span>{this.props.moves}</span>
                </div>
            </div>
        );
    }
});

module.exports = Scoreboard;