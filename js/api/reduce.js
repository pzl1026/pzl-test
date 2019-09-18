Array.prototype.myReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this);
    let res, startindex;

    res = initialValue || arr[0];
    startindex = initialValue ? 0 : 1;
    for (var i = startindex; i < arr.length; i++) {
        res = fn.call(null, res, this[i], i, this);
    }
    return res;
}

let test = [1,2,3,4].myReduce((res, item) => {
    return res + item;
});
console.log(test);
