// geometry
'use strict';

function eq(a, b) { return Math.abs(a - b) < 0.000001; }

function v(vertices, a) { return vertices.map(function (p) { return p[a]; }); }
function max(n){ return Math.max.apply(null, n); }
function min(n) { return Math.min.apply(null, n); }

/* export classes */

function Point (x, y) {
    /* Point on a plane */
    this.x = x;
    this.y = y;
}

Point.prototype = Object.create(null, (function () {
    function distance (point) {
        var dx =  this.x - point.x, dy = this.y - point.y;
        return Math.abs(dx === 0 ? dy : (dy === 0 ? dx :
                                         Math.sqrt(dx * dx + dy * dy)));
    }
    
    return {
        'distance': { 'value': distance }
    }
}()));


function Line (a, b) {
    this.a = a;  // point
    this.b = b;  // point
}

Line.prototype = Object.create(null, (function () {
    function length () {
        return this.a.distance(this.b);
    }
    
    function midpoint () {
        return new Point((this.a.x + this.b.x) / 2,
                         (this.a.y + this.b.y) / 2);
    }
    
    return {
        'length': { 'get': length },
        'midpoint': { 'get': midpoint }
    }
}()));


function Polygon (point1, point2, point3) {
    this.vertices = [].slice.call(arguments);
}
Polygon.prototype = Object.create(null, (function () {
    function area () {
        var area = 0;
        this.vertices.forEach(function (p, i) {
            var o = this.vertices[i + 1] || this.vertices[0];
            area += (p.x * o.y) - (p.y * o.x);
        }.bind(this));
        return Math.abs(area / 2);
    }
    
    function boundingBox () {
        var vx = v(this.vertices, 'x'), vy = v(this.vertices, 'y');
        return new Rectangle(max(vx) - min(vx), max(vy) - min(vy));
    }
    
    return {
        'area': { 'get': area },
        'boundingBox': { 'get': boundingBox }
    };
}()));


function Triangle (point1, point2, point3) {
    Polygon.call(this, point1, point2, point3);
}
Triangle.prototype = Object.create(Polygon.prototype, {});


function Rectangle (width, height) {
    var rectangle = [new Point(0, 0), new Point(width, 0),
                     new Point(width, height), new Point(0, height)];
    Polygon.apply(this, rectangle);
}

Rectangle.prototype = Object.create(Polygon.prototype, (function () {
    return {
        'width': { 'get': function () {
            var vx = v(this.vertices, 'x');
            return max(vx) - min(vx);
        }},
        'height': { 'get': function () {
            var vy = v(this.vertices, 'y');
            return max(vy) - min(vy);
        }},
        'area': { 'get': function () {
            return this.width * this.height;
        }}
    }
}()));


function Square (size) {
    Rectangle.call(this, size, size);
}
Square.prototype = Object.create(Rectangle.prototype);


module.exports = {
    'Point': Point,
    'Line': Line,
    'Polygon': Polygon,
    'Triangle': Triangle,
    'Rectangle': Rectangle,
    'Square': Square
};
