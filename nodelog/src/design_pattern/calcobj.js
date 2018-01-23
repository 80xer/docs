
function calcObj(calcInstance, result){
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
    }
}


module.exports = calcObj;