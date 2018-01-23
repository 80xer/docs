# Javascript Function

- function, 함수 - 선언되면 몇번이든 실행가능한 scope단위의 코드 블럭
- parameters, 매개변수, 인수 - 함수 실행시 함께 전달되는 값들. 함수 내에서 지역변수 처럼 사용 할 수 있다.
- method, 메소드 - 어떤 객체의 속성으로 정의된 함수
- constructor, 생성자 - 어떤 객체의 인스턴스를 생성할때 실행되는 함수
- 함수는 중첩되어 선언될 수 있고 속한 scope의 변수들에 대하여 접근 가능 하다.(closure)
- 일급객체(first-class-object)로서 함수는 인자와 반환값으로 쓰일 수 있고 프로퍼티 할당도 가능하다.

### 1. 함수 사용
#### 1.1 함수 선언문
```javascript
function add(num1, num2) {
    return num1 + num2;
}

var val = add(1,2);
log(val);
```
#### 1.2 함수 표현식
주로 객체의 메소드로 정의할때 표현식을 사용.
```javascript
var add = function (num1, num2) {
    return num1 + num2;
}

var calc = {
    add: function(num1, num2) {
        return num1 + num2;
    }
}

var v1 = add(10,20);
var v2 = calc.add(100,200);

log(v1);
log(v2);
```
##### 익명 함수표현식 anonymous function expression
```javascript
var add = function (num1, num2) {
    return num1 + num2;
};
```
##### 기명 함수표현식 named function
```javascript
var add = function add(num1, num2) {
    return num1 + num2;
};

var math = {
  'factorial': function factorial(n) {
    if (n <= 1)
      return 1;
    return n * factorial(n - 1);
  }
};
```
##### 즉시실행함수표현식 Immediately-invoked function expression; IIFE
함수 표현식을 이용하여 함수를 정의하고 바로 실행하기도 하는데 그런 표현식을 즉시실행함수표현식이라 한다.

표준 ECMA-262 에서는 함수표현식에 대해 다음과 같은 경우를 제한한다.

[ecma-262 5.1 - '{', 'function' 로 시작할 수 없다.](http://www.ecma-international.org/ecma-262/5.1/#sec-12.4)

[ecma-262 6.0 - '{', 'function', 'class', 'let \[' 로 시작할 수 없다.](http://www.ecma-international.org/ecma-262/6.0/#sec-expression-statement)

함수선언문이나 클래스선언문으로 판단될 수 있는 경우를 예방하기 위해 해당 예약어로 시작할 수 없다.

다음과 같이 문장의 시작을 허용하는 문자이면서 실행결과에 영형을 주지 않는 문자를 사용하는 여러 방법을 사용한다.

```javascript
//() - 소괄호를 이용
(function () {
    log(100);
})();

(function () {
    log(100);
}());

//!,~,+,- 등의 함수호출 보다 우선순위가 늦은 단항연산자를 이용한다.
!function () {
    log(100);
}();

```
즉시실행함수는 값을 반환하지 않으므로 반환받는 값은 undefined 이다.
undefined 에대하여 단항연산자 !,~,+,-는 각각 true, -1, NaN, NaN을 반환하며 할당하지 않는 리터럴로서 아무일도 하지않는 문장으로 해석될뿐이다.

Javascript는 할당하지 않는 리터럴을 실행컨택스트 생성시 실행컨택스트의 temp키에 배열값으로 저장한다. 실행컨택스트의 temp는 개발자가 접근할 수 없고 prototype chain, scope chain에서도 탐색되지 않는다.

엄청나게 잦은 남용이 아닌 이상 메모리의 낭비에서 성능저하의 문제를 가져오기는 힘들지만 내부적으로 어쨌든 메모리가 사용되고 있다는 것이다.

##### 즉시실행함수의 활용
###### A. 전역스코프를 오염시키지 않기 위해
```javascript
(function () {
    var firstName = "LEE";

    function init () {
        name(firstName);
    } 

    function name(name){
        log(name);
    }

    init(); 
})();
```
###### B. 조건연산자와 함께
```javascript
var unnamedDocs = [];
var namedDocs = ["lee_dongeun", "kim_sungeun"];

function createDoc(documentTitle) {
    var documentName = documentTitle
    ?
    (function (theName) {
        var newNamedDoc = theName.toLocaleLowerCase().replace(" ", "_");
        namedDocs.push(newNamedDoc);
        return newNamedDoc;
    })(documentTitle)
    :
    (function () {
        var newUnnamedDoc = "untitled_" + Number(namedDocs.length + 1);
        unnamedDocs.push(newUnnamedDoc);
        return newUnnamedDoc;
    })();

    return documentName;
}

log(createDoc("kim_eunsun"));
log(createDoc());
```

###### C. 반복문안의 클로저
```javascript
function iDCreator (names) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < names.length; i++) {
        names[i]["id"] = function (j)  {
            return function () {
                return uniqueID + j;
            }
        } (i);
    }
    return names;
}

var namesDefault = [
    {name: 'lee'},
    {name: 'kim'},
    {name: 'park'}
];

var idForActionCelebs = iDCreator (namesDefault);

var lee = idForActionCelebs[0];
log(lee.name + ':' + lee.id());

var kim = idForActionCelebs [1]; 
log(kim.name + ':' + kim.id());

var park = idForActionCelebs[2];
log(park.name + ':' + park.id());
```


#### 1.3 매개변수로서 함수
```javascript
function add(num1, num2) {
    return num1 + num2;
}

function calc(func) {
    return func(10,20);
}

log(calc(add));
```
#### 1.4 반환값으로서 함수
```javascript
function calc(func) {
    function add(num1, num2) {
        return num1 + num2;
    }
    return add;
}

var calcAdd = calc();
var val = calcAdd(20, 30);

log(val);
```

### 2. this 키워드
Javascript는 함수 실행시마다 새로운 실행 컨택스트를 생성한다.

실행컨택스트가 생성될때 그 함수를 "실행한 함수"로부터 thisArg 와 argumentsList를 제공받는다.

이 컨택스트안에서 ThisBinding을 통해 현재 함수가 어느 컨택스트에서 실행되고 있는지를 this값에 저장한다.

이때 함수의 모드와 thisArg에 따라 thisBinding하는 대상이 달라지며 그 단계는 다음과 같다.
1. 함수가 strict mode 라면 thisArg가 thisBinding 값이 된다.
2. thisArg가 null 이거나 undefined 라면 글로벌객체가 thisBinding 값이 된다.
3. Type(thisArg)이 Object가 아니라면 ToObject(thisArg)가 thisBinding 값이 된다.
4. 이 외에 경우에는 thisArg 가 thisBinding 값이 된다.

참고:[ECMA-262 10.4.3 Entering Function Code](http://www.ecma-international.org/ecma-262/5.1/#sec-10.4.3)

thisArg 는 함수 호출의 단계중 6,7번 단계에서 결정된다. <br>
참고:[ECMA-262 11.2.3 Function Calls](http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.3)

함수가 호출될때 가장 먼저 함수 객체를 해석하여 함수가 저장된 Reference 값을 얻는다.

이 함수의 Reference는 세가지로 구성되어 있다.
1. base value - 이 Reference가 속한 Context Object, object
2. referenced name - 함수명, string
3. strict reference - 함수의 strict 모드 여부, boolean

Reference ref 에 대하여 thisValue가 결정되는 단계는 다음과 같다.
- 1. Type(ref)가 reference 라면
    - 1. IsPropertyReference(ref)가 true라면 thisValue값은 getBase(ref)값이 된다. <br>
     *IsPropertyReference(ref) : ref가 object 또는 primitive wrapper object(String, Boolean, Number 등의 객체)에 속한 property라면 true를 반환한다.<br>
     *getBase(ref) : base value를 반환한다.
    - 2. 그 외 ref가 Environment Record(Variable Environment Object)라면 getBase(ref)에서 얻어진 값의 ImplicitThisValue()가 바로 thisArg가 된다.
-  2. Type(ref)가 reference 가 아니라면, thisValue값은 undefined가 된다

```javascript
//1.1 생성자에서 사용될때, 객체의 인스턴스에서 사용될때
'use strict';

function demoObject() {
    this.thisValue = this;
    this.whatsthis = function() {
        log("this in function f \n" + this.thisValue); //object
    }
}

var demo = new demoObject();
log(demo.thisValue);
demo.whatsthis();

var say = {
    hi: function(){
        console.log(this);
        return 'hi';
    }
};

say.hi();
```

```javascript
//1.2 전역객체에서 선언문 또는 함수표현식으로 사용될때
'use strict';

function invokeFunction() {
    log("invokeFunction");
    log(this);//Window
    demo1();
    function demo1() {
        log("demo1");
        log(this);//Window

        var demo2 = function() {
            log("demo2");
            log(this);//Window

            var demo3 = function() {
                log("demo3");
                log(this);//Window
            };
        
            demo3();
        };
        
        demo2();
    }
}
log(this);//Window
invokeFunction();
```

```javascript
// call, apply, bind 등으로 this를 바인딩하여 사용할때
'use strict';

var a = {
    name:'A'
};
var b = {
    name: 'B'
};
var c = {
    name: 'C',
    say: function(){
        log(this.name);
    }
};

c.say();
c.say.call(a);
c.say.apply(b);
var sayB = c.say.bind(b);
sayB();
```

### 2 함수의 속성
#### 2.1 arguments
```javascript
function findMax() {
    var i;
    var max = -Infinity;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}

x = findMax(1, 123, 500, 115, 44, 88);

log(x);
```
#### 2.2 length
```javascript
function add(num1, num2) {
    log('arguments length : ' + arguments.length);
    log('add length : ' + this.add.length).init();
    return num1 + num2;
}

add();
add(1,2);
add(10,20,30);
```