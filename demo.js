// demo
'use strict';

// expose this to the browser, for poking around in the console.
window.Renderer = require('./teatr/renderer.js').Renderer;
window.geo = require('./teatr/geometry.js');
  
(function (context) {
    var canvas;
    
    canvas = context.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.renderer = new Renderer(context);
    
    renderer.drawPolygon(
        new geo.Point(0, 0),
        new geo.Triangle(
            new geo.Point(0, 0),
            new geo.Point(50, 0),
            new geo.Point(25, 50)
        )
    );
    
    renderer.drawPolygon(
        new geo.Point(0, 50),
        new geo.Square(50)
    );
    
    renderer.drawPolygon(
        new geo.Point(50, 0),
        new geo.Rectangle(50, 100)
    );
}(document.getElementById('stage').getContext('2d')));
