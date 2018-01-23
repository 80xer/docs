// module
// console.log('====== module ======')
// var calcModule = require('./calc');

// calcModule.add(1,2).multiply(3).equals(function(result){
//     console.log('( 1 + 2 ) x 3 = ' + result);
// });

// calcModule.multiply(1,3).multiply(4).equals(function(result){
//     console.log('1 x 3 x 4 = ' + result);
// });

// calcModule.minus(5,4).add(3).equals(function(result){
//     console.log('( 5 - 4 ) + 3 = ' + result);
// }).add(5).equals(function(result){
//     console.log('( 5 - 4 ) + 3 + 5 = ' + result);
// });


// // singleton
// console.log('====== singleton ======')
// var calcSingleton = require('./design_pattern/singleton')

// var objCalc = calcSingleton.getInstance(1);
// objCalc.add(2).equals(function(result){
//     console.log(result);
// });

// var d = calcSingleton.add(10,20);
// console.log(d.equals());

// var newCalc = calcSingleton.getInstance(1000);
// console.log(newCalc.add(100).equals());

// prototype
// console.log('====== prototype ======');
// var calcPrototype = require('./design_pattern/prototype');

// var cc = calcPrototype.add(5,5).multiply(5).subtract(10).divide(10).equals();
// console.log(cc);

// observers
// console.log('====== observers ======');
// var calcObservers = require('./design_pattern/observers');
// var obsvCalc = calcObservers.getInstance();

// function observer1(val) {
//     console.log(val + ' fired!! - in observer 1')
// }

// function observer2(val) {
//     console.log(val + ' fired!! - in observer 2')
// }

// obsvCalc.subscribe(observer1);
// obsvCalc.subscribe(observer2);

// console.log(obsvCalc.add(100).subtract(10).multiply(2).equals());

// obsvCalc.unsubscribe(observer2);

// console.log(obsvCalc.add(100).subtract(10).multiply(2).equals());

funcCall();

function funcCall() {
    func(1,2,3,4,5);   
}

function func(){
    var a = 'a'

    console.log(a);
    console.log(arguments.callee.caller);
}