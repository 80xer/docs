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