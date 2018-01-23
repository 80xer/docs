# Javascript Object; 자바스크립트 객체의 이해
## 1. 프로퍼티 정의
```javascript
var person1 = {
    name = "jun suck lim"
}

var person2 = new Obejct();
person2.name = "sung eun lee"

person1.age = 40
person2.age = 20

person1.name = "dong eun lee"
person2.name = "eun sun kim"
```
객체는 person1 처럼 객체 리터럴로 생성할 수 있고. person2 처럼 Object 생성자로도 생성할 수 있다.

객체의 프로퍼티는 생성후에도 수정할 수 있고 새로운 프로퍼티도 추가할 수 있다.

자바스크립트는 객체의 프로퍼티를 추가할 때 객체에 있는 [[Put]]이라는 내부 메소드를 호출한다.

[[Put]]을 호출하면 객체에 고유 프로퍼티가 생성된다.

기존 프로퍼티에 새 값을 할당할 때는 [[Set]]이 호출된다.

[[Set]]은 프로퍼티의 현재 값을 새 값으로 교체한다.

## 2. 프로퍼티 탐지
객체의 프로퍼티는 언제든 추가 할 수 있기 때문에 종종 현재 객체에 프로퍼티가 있는지 확인 해야할 일이 있다.

```javascript
if(person1.age) {
    console.log(person1.age);
}
```
위와 같은 방법으로 프로퍼티를 확인하게 되면 자바스크립트의 강제 형변환이 결과에 영향을 주어 의도한 대로 작동하지 않을 수 있다.

자바스크립트의 if 조건문은 주어진 값이 truthy value 일 경우 true로 취급하고, falsy value 일 경우 false로 취급한다.

예를 들어 person1.age의 값이 0 이라는 값을 가졌어도 위의 조건문은 false로 취급하여 if블록이 실행되지 않는다.

정확하게 프로퍼티의 존재여부를 확인하기 위해서는 in 연사자를 사용한다.

in연산자는 해시테이블에 주어진 키가 있으면 true를 반환한다.

```javascript
console.log('name' in person1);     //true
console.log('age' in person1);      //true
console.log('phone' in person1);    //false
```

in연산자는 고유프로퍼티와 프로토타입프로퍼티를 모두 찾는다.

만약 고유프로퍼티인지 확인하려면 해당 객체의 hasOwnProperty() 메소드를 사용한다.

```javascript
var person1 = {
    name: 'lee',
    age: 30,
    sayName: function() {
        console.log(this.name);
    }
}

console.log('name' in person1);                     // true
console.log(person1.hasOwnProperty('name'));        // true

console.log('toString' in person1);                 // true
console.log('person1.hasOwnProperty('toString'));   // false
```

## 3. 프로퍼티 제거
객체의 프로퍼티를 삭제하기 위해서 null값을 할당하는 것은 [[Set]]메소드를 이용하여 값을 null 로 저장하는 것이지 프로퍼티가 삭제되는것이 아니다.

객체의 프로퍼티를 삭제하기 위해서는 delete 연산자를 사용한다.

delete 연산자는 내부적으로 [[Delete]]가 호출한다.

delete 연산자는 키/값 쌍을 삭제하고 이상이 없을 시 true를 반환한다.

```javascript
var person1 = {
    name: 'lee'
}
console.log('name' in person1); // true
delete person1.name;
console.log('name' in person1); // false
console.log(person1.name);      // undefined
```
## 4. 열거
객체의 프로퍼티는 열거가 가능하여 for-in 반복문을 통해 순차적으로 접근 가능하다.

열거가 가능한 프로퍼티는 내부적으로 [[Enumerable]] 속성이 true 값을 갖는다.

for-in 문은 객체의 프로퍼티를 순회하면서 다음 [[Enumerable]]속성이 true인 프로퍼티의 이름이 변수에 할당된다.

비슷한 동작을 Object.keys() 메소드를 통해서 할 수도 있다.

Object.keys(인스턴스) 를 실행하면 객체의 열거가능한 프로퍼티로 이루어진 배열을 반환한다.

배열의 length만큼 반복문을 실행하며 프로퍼티에 순차적으로 접근할 수 있다.

for-in문은 고유 프로퍼티와 열거가능한 프로토타입 프로퍼티에도 접근하지만 Object.keys()메소드는 고유프로퍼티만 반환한다.

열거가능한 프로퍼티인지 확인할 때는 propertyIsEnumerable()메소드를 이용한다.
```javascript
var person1 = function() {
    this.name = 'lee';
    this.age = 30;
}

person1.prototype.sayName = function() {
    console.log(this.name);
}

var p = new person1();
var ar = Object.keys(p);

for(prop in p) {
    console.log('for-in : ' + prop + ':' + p[prop]);
}

for (var i = ar.length - 1; i >= 0; i--) {
    console.log('Object.keys() : ' + ar[i] + ':' + p[ar[i]]);
}

console.log(p.propertyIsEnumerable('name'));
console.log(p.propertyIsEnumerable('age'));
console.log('sayName' in person1.prototype);
console.log('sayName' in p);
console.log(p.hasOwnProperty('name'));
console.log(p.hasOwnProperty('sayName'));
console.log(person1.prototype.propertyIsEnumerable('sayName'));
```

## 5. 프로퍼티 종류
프로퍼티는 데이타프로퍼티(Data property)와 접근자프로퍼티(accessor property)가 있다.
데이터프로퍼티는 [[Put]] 메소드에 의해 생성된다.
접근자프로퍼티는 값을 포함하지 않고 프로퍼티를 읽을 때 호출할 함수(getter)와 프로퍼티를 설정할 때 호출할 함수(setter)를 정의하여 생성한다. 게터와 세터는 둘중 하나만 있어도 된다.

```javascript
var person = {
    _name: "lee",

    get name() {
        console.log('reading name...');
        return this._name;
    },

    set name(value) {
        console.log('setting name...');
        this._name = value;
    }
};

console.log(person.name);
person.name = 'kim';
console.log(person.name);
```
접근자프로퍼티는 단순 값을 저장하고 가져오는 용도보다는 추가적인 동작을 할 때 사용된다.
## 6. 프로퍼티 속성
ECMAscript5에서는 프로퍼티의 속성에 접근할 수 있는 방법이 추가 되었다. 덕분에 네이티브 프로퍼티처럼 동작하는 프로퍼티를 만들 수 있게 되었다.
프로퍼티의 속성은 종류에 따라 (데이타프로퍼티와 접근자프로퍼티) 다른 부분이 있다.

#### 공통 속성
- [[Enumerable]] - 열거가능한 프로퍼티인지 정하는 속성. 기본값은 true.

- [[Configurable]] - 설정가능한 프로퍼티인지 정하는 속성. 기본값은 true.

[[configurable]] 속성이 true 이면 delete 연산자를 사용해서 삭제할 수 있고 다른 속성들도 변경 할 수 있다.

프로퍼티의 속성을 변경할 때는 Object.defineProperty()메소드를 이용한다.
```javascript
var person = {
    name: 'lee'
};

Object.defineProperty(person, 'name', {
    enumerable: false
});

console.log('name' in person);
console.log(person.propertyIsEnumerable('name'));

var props = Object.keys(person);
console.log(props.length);

Object.defineProperty(person, 'name', {
    configurable: false
});

delete person.name;

console.log('name' in person);
console.log(person.name);

Object.defineProperty(person, 'name', {
    enumerable: true,
    configurable: true
});
```

#### 데이타프로퍼티 속성
- [[Value]] - 프로퍼티의 값을 저장한다. 함수라면 함수내용이 저장된다.
- [[Writable]] - 프로퍼티에 값을 저장할 수 있는지 정의한다. 기본값은 true

defineProperty() 메소드는 해당 프로퍼티가 없다면 새로 생성한다.
이때 설정옵션에 포함되지 않은 설정들은 모두 false로 설정된다.

다시 말해 이전 코드에서 객체생성 부분을 다음과 바꿀때

```javascript
var person = {}
Object.defineProperty(person, 'name', {
    value: 'lee'
});
```
person.name 프로퍼티는 읽기만 할 수있다.

#### 접근자프로퍼티 속성
- [[Get]] - 값을 읽는 게터함수
- [[Set]] - 값을 저장하는 세터함수
둘중 하나만 정의해도 된다.

데이타 프로퍼티는 객체 생성후에 언제든 리터럴 형식으로 프로퍼티를 추가 할 수 있지만 접근자 프로퍼티는 리터럴형식으로 정의하려면 객체를 생성할때 같이 만드는 수밖에 없다. 나중에 추가하려면 defineProperty()메소드를 사용해야 한다.

defineProperty()를 사용하면 이미 정의된 프로퍼티를 언제든 재정의 하여 종류를 바꿀 수 있지만 데이터프로퍼티의 속성과 접근자프로퍼티의 속성을 함께 설정하면 에러가 발생한다.

```javascript
var person = {
    _name:"lee"
};

Object.defineProperty(person, 'name', {
    configurable: true,
    get: function() {
        return this._name;
    },
    set: function(val) {
        this._name = val;
    }
});

console.log(person.name);
person.name = 'kim';
console.log(person.name);

console.log('name' in person);
console.log(person.propertyIsEnumerable('name'));
var p;
delete person.name;
for(p in person) {
    console.log(p);
}

Object.defineProperty(person, 'name', {
    get: function() {
        return this._name;
    }
});

person.name = 'park';
console.log(person.name);
```
#### 프로퍼티 속성 확인
Object.getOwnPropersyDescriptor(객체, 프로퍼티);
```javascript
var person = {
    name: 'lee'
}
var desc = Object.getOwnPropertyDescriptor(person, 'name');

console.log(desc);
```

## 7. 객체 수정 방지
#### 확장 방지
Object.preventExtensions() - [[Extensible]] false 설정, 객체에 프로퍼티를 추가 할 수 없다.

Object.isExtensible() - [[Extensible]] 확인
```javascript
var person = {
    name: 'lee',
    _addr: 'buchon',
    get addr() {
        return this._addr;
    },
    set addr(val) {
        this._addr = val;
    }
};
console.log(person);

console.log(Object.isExtensible(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

person.name = 'kim';
person.age = 10;

console.log(person);

Object.preventExtensions(person);

console.log(Object.isExtensible(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

Object.defineProperty(person, 'addr', {
    set: function(val) {
        this._addr = val;
    }
})

person.age = 30;
person.gender = 'male';
person.addr = 'seoul';

console.log(person);
```
#### 객체 봉인
Object.seal() - 객체 확장 방지되고 모든 프로퍼티에 [[Configurable]] false 설정

Object.isSealed() - 봉인확인
```javascript
var person = {
    name: 'lee',
    _addr: 'buchon',
    get addr() {
        return this._addr;
    },
    set addr(val) {
        this._addr = val;
    }
};
console.log(person);

console.log(Object.isSealed(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

person.name = 'kim';
person.age = 10;

console.log(person);

Object.seal(person);

console.log(Object.isSealed(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

Object.defineProperty(person, 'addr', {
    set: function(val) {
        this._addr = val;
    }
})

person.age = 30;
person.gender = 'male';
person.addr = 'seoul';

console.log(person);
```
#### 객체 동결
Object.freeze() - 객체 봉인되고 모든 프로퍼티를 읽기 전용으로 설정.

Object.isFrozen() - 동결확인

```javascript
var person = {
    name: 'lee',
    _addr: 'buchon',
    get addr() {
        return this._addr;
    },
    set addr(val) {
        this._addr = val;
    }
};
console.log(person);

console.log(Object.isFrozen(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

person.name = 'kim';
person.age = 10;

console.log(person);

Object.freeze(person);

console.log(Object.isFrozen(person));

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
console.log(Object.getOwnPropertyDescriptor(person, 'addr'));

Object.defineProperty(person, 'addr', {
    set: function(val) {
        this._addr = val;
    }
})

person.age = 30;
person.gender = 'male';
person.addr = 'seoul';

console.log(person);
```