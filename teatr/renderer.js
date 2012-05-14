// renderer
'use strict';

function Renderer(context) {
    this.context = context;
}

Renderer.prototype = Object.create((function () {
    function drawBitmap(point, bitmap, options) {
        this.context.drawImage(bitmap, point.x, point.y);
    }
    
    function drawPolygon(point, polygon, options) {
        options = options || {'stroke': true};
        var ctx = this.context;
        ctx.fillStyle = options.fillStyle || 'black';
        ctx.strokeStyle = options.strokeStyle || 'black';
        ctx.beginPath();
        polygon.vertices.forEach(function (p, i) {
            if (i === 0) {
                ctx.moveTo(point.x + p.x, point.y + p.y);
            }
            ctx.lineTo(point.x + p.x, point.y + p.y);
        });
        ctx.closePath();
        if (options.fill) {
            ctx.fill();
        }
        else if (options.stroke) {
            ctx.stroke();
        }
    }
    
    function drawText(point, text, options) {
        // TODO: implement
    }

    function render(scene) {
        // TODO: implement
    }

    function clear() {
        var ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    return {
        'drawBitmap': drawBitmap,
        'drawPolygon': drawPolygon,
        'drawTest': drawText,
        'render': render,
        'clear': clear
    };
}()));


module.exports = {
    'Renderer': Renderer
};