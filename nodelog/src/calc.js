var Calc = function(initVal) {
    this.result = initVal || 0;
}

Calc.prototype.add = function(num) {
    this.result += num;
    return this;
};

Calc.prototype.multiply = function(num) {
    this.result *= num;
    return this;
};

Calc.prototype.equals = function(cb) {
    if (cb) {
        cb(this.result);
        return this;
    } else {
        return this.result;
    }
};

var Calc2 = function(initVal) {
    this.result = initVal || 0;
}

Calc2.prototype = new Calc();
Calc2.constructor = Calc2;
Calc2.prototype.minus = function(num) {
    this.result -= num;
    return this;
};

module.exports = {
    add: function(x, y) {
        return new Calc(x).add(y || 0);
    },
    multiply: function(x, y) {
        return new Calc(x).multiply(y || 1);
    },
    minus: function(x, y) {
        return new Calc2(x).minus(y || 0);
    }
}