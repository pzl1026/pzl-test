var Projection = function (min, max) {
    this.min = min;
    this.max = max;
};

Projection.prototype = {
    //（3）
    overlaps: function (projection) {
        return this.max > projection.min && projection.max > this.min;
    }
}