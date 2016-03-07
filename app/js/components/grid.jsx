var React = require('react');
var Tile = require('./tile.jsx');

var images = [
    'http://i.giphy.com/26FPCXdkvDbKBbgOI.gif',
    'http://i.giphy.com/13CoXDiaCcCoyk.gif',
    'http://i.giphy.com/xWlPqPbrlkEQU.gif',
    'http://i.giphy.com/QPDVAzBOnShLq.gif',
    'http://i.giphy.com/13FJKNTaIiZ2lG.gif',
    'http://i.giphy.com/5ZdCsQHEoCUBq.gif',
    'http://i.giphy.com/BeGJ3IXngxyeY.gif',
    'http://i.giphy.com/LhenEkp5EsPJe.gif',
    'http://i.giphy.com/3o6UB65bfF8P1anIZ2.gif',
    'http://i.giphy.com/l0NwLUVdksjwmtgLC.gif'
];

var Grid = React.createClass({
    getInitialState: function() {
        return {
            imageLoaded: false,
            imageObject: null
        };
    },

    componentDidMount: function() {
        this.loadNewImage();
    },

    loadNewImage: function() {
        var image = new Image();
        image.src = images[Math.floor(Math.random() * images.length)];
        this.setState({
            imageLoaded: image.complete,
            imageObject: image
        });
        var grid = this;
        image.onload = function () {
            grid.state.imageLoaded = true;
            grid.setState(grid.state);
        };
    },

    tileClick: function(element, position) {
        this.props.moveTile(position);
    },

    render: function() {
        if (this.state.imageObject && this.state.imageLoaded) {
            if (this.props.model.isSolved()) {
                return (
                    <div id="grid">
                        <img src={this.state.imageObject.src} width="450" />
                    </div>
                );
            } else {
                var tileWidth = this.state.imageObject.width / this.props.model.size;
                var tileHeight = this.state.imageObject.height / this.props.model.size;

                return (
                    <div id="grid">
                        {this.props.model.tiles.map(function(number, currentPosition) {
                            var drawImage = number ? true : false;
                            var expectedPosition = number - 1;
                            var coordinates = this.props.model.getTileCoordinates(expectedPosition);
                            return ( <Tile key={number}
                                           position={currentPosition}
                                           coordinates={coordinates}
                                           drawImage={drawImage}
                                           img={this.state.imageObject}
                                           width={tileWidth}
                                           height={tileHeight}
                                           click={this.tileClick} /> );
                        }, this)}
                    </div>
                );
            }
        } else {
            return <div id="grid">Loading...</div>
        }
    }
});

module.exports = Grid;