var calc = (function () {

    var calcInstance;

    function create (initVal) {
        var result = initVal || 0;
        function add(num) {
            result += num;
            return calcInstance;
        }

        function subtract(num) {
            result -= num;
            return calcInstance;
        }

        function multiply(num) {
            result *= num;
            return calcInstance;
        }

        function divide(num) {
            result /= num;
            return calcInstance;
        }

        function equals(cb) {
            if (cb) {
                cb(result);
                return calcInstance;
            } else {
                return result;
            }
        };
        return {
            add: add,
            subtract: subtract,
            multiply: multiply,
            divide: divide,
            equals: equals
        };
    }

    return {
        getInstance: function(initVal) {
            if(!calcInstance) {
                calcInstance = create(initVal);
            }
            return calcInstance;
        },
        add: function(x, y) {
            !calcInstance && (calcInstance = create(x)) || (y = x);
            return calcInstance.add(y||0);
        },
        subtract: function(x, y) {
            !calcInstance && (calcInstance = create(x)) || (y = x);
            return calcInstance.subtract(y||0);
        },
        multiply: function(x, y) {
            !calcInstance && (calcInstance = create(x)) || (y = x);
            return calcInstance.multiply(y||1);
        },
        divide: function(x, y) {
            !calcInstance && (calcInstance = create(x)) || (y = x);
            return calcInstance.divide(y||1);
        }
    };

})();

module.exports = calc;