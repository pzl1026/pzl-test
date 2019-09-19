Function.prototype.myBind = function (context, ...args) {
    let self = this;
    let fBound = function () {
        return self.apply(this instanceof fBound ? this : context || window, args.concat(Array.prototype.slice.call(arguments)));
    }

    fBound.prototype = Object.create(fBound.prototype);

    return fBound;
}

var test = {};
function test1(a) {
    return a;
}

console.log(test1.myBind(test, 2222)());
console.log(test1.myBind(test)(3333));
console.log(222);
