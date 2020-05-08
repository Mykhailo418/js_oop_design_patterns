// Singleton: pattern that involves a single class which is responsible to create an object while making sure that only single object gets created.
// Restricts the instantiation of a class to one "single" instance.

class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }

  foo() {
    console.log('Doing something...')
  }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log('Are they identical? ' + (s1 === s2));
s1.foo();
