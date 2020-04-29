var isdone = false;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var str = 'str';
var list = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [10, 'pp'];
var list4 = [1, '33', false];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 8] = "Green";
    Color[Color["Blue"] = 9] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Red;
var c1 = Color[2];
console.log(c1);
var nosure = 4;
nosure = "maybe";
nosure = false;
function warnuser() {
    console.log('this is test');
}
var unusable = undefined;
var u = undefined;
var n = null;
function err(msg) {
    throw new Error(msg);
}
function infiniteLoop() {
    while (true) { }
}
var someValue = "this is a string";
var strLength = someValue.length;
console.log(strLength, 'kkk44');
//# sourceMappingURL=type.js.map