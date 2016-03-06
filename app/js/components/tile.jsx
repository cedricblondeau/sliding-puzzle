var React = require('react');
var ReactDOM = require('react-dom');

var Tile =  React.createClass({
    componentDidMount: function() {
        if (this.props.drawImage) {
            var context = ReactDOM.findDOMNode(this).getContext('2d');
            this.drawImage(context);
        }
    },

    drawImage: function(context) {
        context.drawImage(
            this.props.img,
            this.props.coordinates.x * this.props.width,
            this.props.coordinates.y * this.props.height,
            this.props.width,
            this.props.height,
            0,
            0,
            this.props.width,
            this.props.height
        );
    },

    clickHandler: function(element) {
        this.props.click(element, this.props.position);
    },

    render: function() {
        return <canvas width={this.props.width} height={this.props.height} className="tile" onClick={this.clickHandler}></canvas>;
    }
});

module.exports = Tile;