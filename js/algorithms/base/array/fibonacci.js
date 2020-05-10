var arr = [];

function fb(n, arr) {
    var res1 = 0;
    var res2 = 1;
    arr[0] = 0;
    arr[1] = 1;
    var sum;
    for (var i = 2; i < n; i++) {
        sum = res1 + res2;
        res1 = res2;
        res2 = sum;
        arr[i] = sum;
    }
    return arr;
}
console.log(fb(8, arr));
