function create () {
    function F() {};
    F.prototype = proto;
    F.prototype.constructor = F;

    return new F();
    
}