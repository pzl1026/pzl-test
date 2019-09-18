Function.prototype.myCall = function (context = global, ...args) {
    var func = this;
    var fn = Symbol('fn');
    context[fn] = func;

    var res =  context[fn](...args);
    delete context[fn];
    return res;
}

function test(a) {
    return a + 10;
}

console.log(test.call(null, 10));