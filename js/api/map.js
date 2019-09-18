Array.prototype.myMap = function (fn, context) {
    var l = this.length;
    var newArr = [];

    for (var i = 0; i < l; i++) {
       newArr.push( fn.call(context,this[i], i, this));
    }
    return newArr;
}

let test = [1,2,3];
test = test.myMap((item) => {
    return ++item;
})
console.log(test);