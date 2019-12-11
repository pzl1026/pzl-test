// 多边形与圆碰撞
function polygonCollidesWidthCircle (polygon, circle) {
    var min = 10000, v1, v2,
    edge, perpendicular, normal,
    axes = polygon.getAxes(),
    closestPoint = getPolygonPointClosestToCicle(polygon, circle);
    v1 = new Vector(new Point(circle.x, circle.y));
    v2 = new Vector(new Point(closestPoint.x, closestPoint.y));

    axes.push(v1.subtract(v2).normalize());
    return !polygon.separationOnAxes(axes, circle);
}
 
// 计算多边形与圆最近的点
function getPolygonPointClosestToCicle (polygon, circle) {
    var min = 10000,
        length, 
        testPoint,
        closestPoint;
    
    for (var i = 0; i < polygon.points.length; i++) {
        testPoint = polygon.points[i];
        length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2), Math.pow(testPoint.y - circle.y, 2));

        if (length < min) {
            min = length;
            closestPoint = testPoint;
        }
    }
    return closestPoint;
}

// 多边形与多边形碰撞（最小平移量）
function polygonCollidesWidthPolygon (p1, p2) {
    var mtv1 = p1.minimumTranslationVector(p1.getAxes(), p2),
        mtv2 = p2.minimumTranslationVector(p2.getAxes(), p2);

    if (mtv1.overlap === 0 && mtv2.overlap === 0) {
        return {
            axis: undefined,
            overlap: 0
        };
    } else {
        return mtv1.overlap < mtv2.overlap ? mtv1 : mtv2;
    }
}

// 圆与圆碰撞（最小平移量）
function circleCollidesWithCircle (c1, c2) {
    var distance = Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2));
    overlap = Math.abs(c1.radius + c2.radius) - distance;
    
    return overlap < 0 ?
        new MinimumTranslationVector(undefined, 0) : 
        new MinimumTranslationVector(undefined, overlap);
}

// 多边形与圆碰撞（最小平移量）
function polygonCollidesWidthCircle2 (polygon, circle) {
    var axes = polygon.getAxes(),
        closestPoint = getPolygonPointClosestToCicle(polygon, circle);
    
    axes.push(getCircleAxis(circle, polygon, closestPoint));
    return polygon.minimumTranslationVector(axes, circle);
}


// 两个相互碰撞的图形分离
function separate(shapeMoving, mtv) {
    var dx, 
        dy,
        velocityMagnitude,
        point;
    
    if (mtv.axis = undefined) {
        point = new Point();
        velocityMagnitude = Math.sqrt(Math.pow(velocity.x, 2), Math.pow(velocity.y, 2));

        point.x = velocity.x / velocityMagnitude;
        point.y = velocity.y / velocityMagnitude;

        mtv.axis = new Vector(point);
    }

    dy = mtv.axis.y * mtv.overlap;
    dx = mtv.axis.x *mtv.overlap;

    if ((dx < 0 && velocity.x < 0) || (dx > 0 && velocity.x > 0)) {
        dx = -dx;
    }

    if ((dx < 0 && velocity.y < 0) || (dy > 0 && velocity > 0)) {
        dy = -dy;
    }

    shapeMoving.move(dx, dy);
} 

