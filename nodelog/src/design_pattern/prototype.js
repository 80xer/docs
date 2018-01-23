var Calc = function(initVal) {
    this.result = initVal || 0;
}

Calc.prototype = function() {
    var add = function(num) {
        this.result += num;
        return this;
    };

    var subtract = function(num) {
        this.result -= num;
        return this;
    };

    var multiply = function(num) {
        this.result *= num;
        return this;
    };


    var divide = function(num) {
        this.result /= num;
        return this;
    };

    var equals = function(cb) {
        if (cb) {
            cb(this.result);
            return this;
        } else {
            return this.result;
        }
    };

    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        equals: equals
    }
}();

module.exports = {
    add: function(x, y) {
        return new Calc(x).add(y || 0);
    },
    subtract: function(x, y) {
        return new Calc(x).subtract(y || 0);
    },
    multiply: function(x, y) {
        return new Calc(x).multiply(y || 1);
    },
    divide: function(x, y) {
        return new Calc(x).divide(y || 1);
    }
}