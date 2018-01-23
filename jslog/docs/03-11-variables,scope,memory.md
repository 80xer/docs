### 1. Primitive Types and Reference Types

브라우저의 새 창(프레임,탭)이 생성될때 운영체제는 적당량의 메모리를 브라우저가 사용할 수 있도록 할당한다.

javascript에서 데이터는 이 메모리에 저장되며 <br>
변수를 통해 메모리에 저장된 데이터들에 대해 접근하고 조작할 수 있다. <br>
우리는 평소 변수에 값이 저장된다. 라고 표현한다.

실제 변수를 통해 저장되는 값은 그 데이터타입에 따라 원시값과 참조값으로 나뉜다.

원시값이란 메모리에 있는 실제 값 - stack

참조값이란 메모리의 포인터 - heap

- 원시값으로 저장되는 데이터타입
 - Undefined
 - Null
 - Boolean
 - Number
 - String
- 참조값으로 저장되는 데이터타입
 - Object (객체)

javascript는 메모리에 직접 접근을 허용하지 않으므로 객체에 대한 조작을 할 때는 객체에 대한 '참조'를 조작(접근)한다.

### 2. Dynamic properties

javascript에서 Undefined와 Null을 제외한 모든 것들은 객체처럼 동작한다고 했지만 <br>
사실 변수에 저장된 값이 원시값이냐 참조값이냐에 따라 다르게 동작한다.

참조값은 동적으로 프로퍼티와 메서드를 추가, 변경, 삭제할 수 있다.
```
var person = new Object();
person.name = 'guno';
console.log(person.name);   //'guno'
```
원시값은 동적으로 프로퍼티와 메서드를 추가할때 에러는 발생하지 않지만
바로 삭제되어 사용할 수 없다.
```
var name = 'guno';
name.age = '37';
console.log(abc.name);  //undefined
```

### 3. Copy
원시값의 변수를 복사한다는 것은 말 그대로 값 자체가 복사되어 독립된 변수로 분리된다.

참조값의 변수를 복사하면 포인터값이 복사되고 두 변수는 같은 객체를 가르키게 되며 한쪽을 조작하면 다른 쪽도 반영된다.

### 4. Arguments
함수에 인자를 전달하게 되면 값으로 전달되며 지역변수와 같이 취급된다.

### 5. Typeof
```
var s = "Nicholas";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();

console.log(typeof s);   //string
console.log(typeof i);   //number
console.log(typeof b);   //Boolean
console.log(typeof u);   //undefined
console.log(typeof n);   //object
console.log(typeof o);   //object
```
typeof 연산자는 원시값에 대하여 정확한 타입을 반환하지만
Object와 null에 대해서는 'object'를 반환한다.

보통 객체에 대해 타입값을 찾기보다는 <br>
어떤 변수가 어떤 객체의 인스턴스인지를 알아야할 경우가 많다.

이럴 경우 instanceof 연산자를 사용한다.

instanceof 연산자는 변수가 어떤 참조타입의 인스턴스일때 true를 반환하며 <br>
원시값은 항상 false를 반환한다.
```
var Person = function(name){
    this.name = name;
}

var kim = new Person('guno');

console.log(typeof kim); //'object'
console.log(kim.name);  //'guno'
console.log(kim instanceof Person); //true
console.log(kim instanceof Object); //true
```

### 6. Scope
Scope란 변수의 유효범위를 뜻한다. 유효범위란 접근성과 생존기간을 의미한다. <br>
Scope는 Global Scope 와 Local Scope 가 있다.

```
var name = 'dongeun';

console.log(name);

function fa() {
    var name = 'dongseung';
    console.log(name);
}

fa();

console.log(name);
```

local scope 는 global scope 에 접근 가능하지만 그 반대의 경우는 불가능하다.

함수의 scope는 함수 실행환경이 아닌 함수 정의 환경을 참조한다.

```
function f1() {
    var a = 10;
    console.log(a);
    f2();
}

function f2() {
    console.log('in f2');
    // console.log(a);
}

f1();
```

#### Hoisting
javascript는 모든 변수와 함수의 선언문을 Scope 최상단으로 끌어올린다.
```
f1();
f2();

function f1() {
    console.log(num);
    var num = 10;
    console.log(num);
}

function f2() {
    var num;
    console.log(num);
    num = 10;
    console.log(num);
}

```

변수에 함수표현식을 이용하여 함수를 정의했을때는 변수의 선언만 Hoisting 되므로 함수로 동작하지 않는다.

```
f1();
f2();

function f1() {
    console.log(num);
    var num = 10;
    console.log(num);
}

f2 = function f2() {
    var num;
    console.log(num);
    num = 10;
    console.log(num);
}
```

scope의 최상단으로 hoisting 된다.

```
var num = 10;

function f1() {
    console.log(num);
    var num = 20;
    console.log(num);
}

f1();
```

### 7. Execution Context
javascript는 Execution Context 를 생성하여 실행시 필요한 여러 정보를 관리한다.

전역 컨택스트와 함수의 컨택스트들이 생성되고 사라지는 것을 관리하기 위해 Call Stack 을 이용한다.

Call Stack에는 생성되는 컨택스트들이 쌓이고 사리지는것을 반복한다.

함수가 실행되면 함수의 실행 컨택스트가 생성되고 그 순서는 아래와 같다.
1. 활성화 객체 생성
2. arguments객체 생성
3. scope chain 생성
4. this객체 바인딩
5. 실행

활성화 객체에는 arguments 와 지역변수들의 참조값을 갖는다.

arguments객체는 함수로 전달된 인자들의 유사배열이다.

scope chain 은 현재 컨택스트가 실행되기 까지 쌓인 컨택스트들의 리스트이다. <br>
최상단의 global scope까지 이어진다.

this객체는 실행된 함수의 환경에 따라 바인딩되는 값이 다르다. (다음에 설명)

### 8. Garbage Collectors
Javascript는 가비지 콜렉션을 주기적으로 실행하여 더 이상 필요하지 않은 변수에 대하여 할당된 메모리를 회수한다.

브라우저마다 더 이상 필요하지 않은 변수를 식별하는 방법은 크게 두가지로 나뉜다.
1. mark-and-sweep - 모든 변수에 표시를 남기고 컨택스트가 생성될때 변수객체에 포함된 변수들과 그 변수들이 참조하는 변수들의 표시를 지운다. 가바지 콜렉션은 표시가 남아있는 변수의 메모리를 회수한다.
2. reference counting - 각 변수가 참조될때마다 참조카운드를 1씩 증가시키고 참조후에 1씩 감소시킨다.
가비지 콜렉션은 참조 카운트가 0인 변수에 대해 메모리를 회수한다. IE8 이하 버전에서 순환참조의 경우 참조카운트가 제대로 작동하지 않아 메모리 누수 현상이 발생한다. 방지 하기 위하여 변수의 사용이 끝나면 명시적으로 null 을 할당해 참조카운트를 0으로 변경시켜 메모리 회수를 해야 한다.

### 9. Closure
JavaScript의 유효범위 체인을 이용하여 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 방법

외부함수에 중첩된 내부함수가 외부함수의 변수를 참조하며 사용될때
외부함수의 컨택스트가 내부함수의 컨택스트 생명주기동안 사라지지 않고 참조 되고 있는 상태.

```
function outerFunc() {
    var a = 0;
    return {
        innerFunc1: function () {
            a += 1;
            return a;
        },
        innerFunc2: function () {
            a += 2;
            return a;
        }
    };
}

var out = outerFunc();
console.log(out.innerFunc1());
console.log(out.innerFunc2());
console.log(out.innerFunc2());
console.log(out.innerFunc1());
```

```
function outerFunc() {
    var a = 0;
    return {
        innerFunc1: function () {
            a += 1;
            return a;
        },
        innerFunc2: function () {
            a += 2;
            return a;
        }
    };
}

var out1 = outerFunc();
var out2 = outerFunc();
console.log(out1.innerFunc1());
console.log(out1.innerFunc2());
console.log(out2.innerFunc1());
console.log(out2.innerFunc2());
```

```
var sequencer = function() {
    var s = 0;
    return function() {
        return ++s; 
    }
};

var seq = sequencer();

seq(); // 1
seq(); // 2
seq(); // 3
```

클로저를 사용하게 되면 전역변수의 오,남용이 없는 깔끔한 스크립트를 작성 할 수 있다. <br>
같은 변수를 사용하고자 할 때 전역 변수가 아닌 클로저를 통해 같은 내부 변수를 참조하게 되면 전역변수의 오남용을 줄일 수 있다. <br>
JavaScript에 적합한 방식의 스크립트를 구성하고 다양한 디자인 패턴을 적용할 수 있다.<br>
함수 내부의 함수를 이용해 함수 내부변수 또는 함수에 접근 함으로써 JavaScript에 없는 class의 역할을 대신해 비공개 속성/함수, 공개 속성/함수에 대한 접근을 구현할 수 있다.

#### for문안에서의 closure 주의할 점
```
var ar = [1,2,3,4,5,6];

for (var i = 0; i < ar.length; i++) {
    setTimeout(function(){
        console.log(ar[i]);
    }, 100);
}
```
for문 안쪽의 클로저가 실행될때 참조되는 외부 변수의 값은 for문의 반복이 완료된 후의 값.
이럴땐 중첩 함수를 사용해 외부변수를 컨택스트 내부변수처럼 사용하여 해결한다.