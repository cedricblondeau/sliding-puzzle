var React = require('react');

var Menu = React.createClass({
    nextClickHandler: function() {
        this.props.next();
    },

    hintClickHandler: function() {
        this.props.hint();
    },

    solveClickHandler: function() {
        this.props.solve();
    },

    render: function() {
        return (
            <div id="menu">
                <button disabled={this.props.isSolved} onClick={this.hintClickHandler}>I need a hint</button>
                <button disabled={this.props.isSolved} onClick={this.solveClickHandler}>Solve it for me</button>
                <button onClick={this.nextClickHandler}>Next puzzle, please</button>
            </div>
        );
    }
});

module.exports = Menu;