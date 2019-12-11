var Circle = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeStyle = 'rgba(255, 253, 208, 0.9)';
    this.fillStyle = 'rgba(147, 197, 114, 0.8)';
};

Circle.prototype = new Shape();

//碰撞
Circle.prototype.collidesWidth = function (shape) {
    var point, length, min = 10000, v1, v2,
        edge,perpendicular, nirmal,
        axes = shapes.getAxes(), distance;
    
        if (axes === undefined) {
            distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
            return distance < Math.abs(this.radius + shape.radius);
        } else {
            return polygonCollidesWidthCircle(shape, this);
        }
};

// 碰撞2(最小平移量)
Circle.prototype.collidesWith2 = function (shape) {
    if (shape.radius === undefined) {
        return polygonCollidesWidthCircle(shape, this);
    } else {
        return circleCollidesWithCircle(this, shape);
    }
}

Circle.prototype.getAxes = function () {
    return undefined;
};

Circle.prototype.project = function (axis) {
    var scalars = [],
        point = new Point(this.x, this.y);
    
    dotProduct = new Vector(point).dotProduct(axis);

    scalars.push(dotProduct);
    scalars.push(dotProduct + this.radius);
    scalars.push(dotProduct - this.radius);

    return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
};

Circle.prototype.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};

Circle.prototype.createPath = function (context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
};
