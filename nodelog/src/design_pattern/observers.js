var calc = (function () {

    var calcInstance;
    var observers = [];

    function create (initVal) {
        var result = initVal || 0;
        function add(num) {
            result += num;
            notify('add');
            return calcInstance;
        }

        function subtract(num) {
            result -= num;
            notify('subtract');
            return calcInstance;
        }

        function multiply(num) {
            result *= num;
            notify('multiply');
            return calcInstance;
        }

        function divide(num) {
            result /= num;
            notify('divide');
            return calcInstance;
        }

        function equals(cb) {
            if (cb) {
                cb(result);
                return calcInstance;
            } else {
                return result;
            }
        }

        function subscribe(cb) {
          observers.push(cb);
          return calcInstance;
        }

        function unsubscribe(cb) {
            var index = observers.indexOf(cb);
            if(index > -1) {
              observers.splice(index, 1);
            }
            return calcInstance;
        }

        function notify(val) {
            for (var i = 0; i < observers.length; i++) {
                observers[i](val);
            }
        }

        return {
            add: add,
            subtract: subtract,
            multiply: multiply,
            divide: divide,
            equals: equals,
            subscribe: subscribe,
            unsubscribe: unsubscribe
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
        },
        subscribe: function(cb) {
            return calcInstance && calcInstance.subscribe(cb);
        },
        unsubscribe: function(cb) {
            return calcInstance && calcInstance.unsubscribe(cb);
        }
    };

})();

module.exports = calc;