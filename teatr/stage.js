// stage
'use strict';

var Rectangle = require('./geometry').Rectangle;

function Stage(width, height) {
    Rectangle.call(this, width, height);
}
Stage.prototype = Object.create(Rectangle.prototype, {});


module.exports ={
    'Stage': Stage
}
