var Shape = function () {
    this.x = undefined;
    this.y = undefined;
    this.strokeStyle = 'rgba(255,253,208.0.9)';
    this.fillStyle = 'rgba(147, 197, 114, 0.8)';
};

Shape.prototype = {
    // 检测判断的方法（1）
    collidesWith: function (shape) {
        // var axes = this.getAxes().concat(shape.getAxes());
        // return !this.separationOnAxes(axes, shape);

        var axes = shape.getAxes();

        if (axes === undefined) {
            return polygonCollidesWidthCircle(this, shape);
        } else {
           axes.concat(this.getAxes());
           return !this.separationOnAxes(axes, shape);
        }
    },
    
    // （2）
    separationOnAxes: function (axes, shape) {
        for (var i = 0; i < axes.length; i++) {
            axis = axes[i];
            projection1 = shape.project(axis);
            projection2 = this.project(axis);
            if (!projection1.overlaps(projection2)) {
                return true;
            }
        }
        return false;
    },

    // 最小平移量
    minimumTranslationVector: function (axes, shape) {
        var minimumOverlap = 10000,
            overlap,
            axisWithSmallestOverlap;

        for (var i = 0; i < axes.length; ++i) {
            axis = axes[i];
            projection1 = shape.project(axis);
            projection2 = this.project(axis);
            overlap = projection1.overlap(projection2);

            if (overlap === 0) {
                return {
                    axis: undefined,
                    overlap: 0
                };
            } else {
                if (overlap < minimumOverlap) {
                    minimumOverlap = overlap;
                    axisWithSmallestOverlap = axis;
                }
            }
        }

        return {
            axis: axisWithSmallestOverlap,
            overlap: minimumOverlap
        };
    },

    project: function (axis) {
        throw 'project(axis) not implemented';
    },

    getAxes: function () {
        throw 'getAxes() not implemented';
    },

    move: function (dx, dy) {
        throw 'move(dx, dy) not implemented';
    },

    createPath: function (context) {
        throw 'createPath(context) not implemented';
    },

    fill: function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.createPath(context);
        context.fill();
        context.restore();
    },

    stroke: function (context) {
        context.save();
        context.strokeStyle = this.strokeStyle;
        this.createPath(context);
        context.stroke();
        context.restore();
    },

    isPointInPath: function(context, x, y) {
        this.createPath(context);
        return context.isPointInPath(x, y)
    }
}