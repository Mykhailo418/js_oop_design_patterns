// Copy Through Serialization

class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address: ${this.streetAddress}, ` +
      `${this.city}, ${this.country}`;
  }
}

class Person
{
  constructor(name, address) {
    this.name = name;
    this.address = address; // Object
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` +
      `I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(types){
    this.types = types;
  }

  markRecursive(object, path = '') {
    // anoint each object with a type index
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]);
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

// My Serializer Version
class MySerializerVersion {
  constructor(){
    this.map = new Map();
  }

  markRecursive(object, path = '') {
    this.map.set(path ? path : 'root' , object.constructor);
    Object.keys(object).forEach(key => {
      if (object[key] && typeof object[key] === 'object') {
        this.markRecursive(object[key], `${path}.${key}`);
      }
    })
  }

  reconstructRecursive(object) {
    let result;
    for (var [key, value] of this.map) {
      const newObj = new value();
      if (key === 'root') {
        result = Object.assign(newObj, object);
      } else {
        const paths = key.split('.');
        let curPath;
        let prevObj;
        let obj = result;
        paths.forEach(path => {
          if(path){
            curPath = path;
            prevObj = obj;
            obj = obj[path]
          }
        });
        prevObj[curPath] = Object.assign(newObj, obj);
      }
    }
    return result;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let john = new Person('John', new Address('123 London Road', 'London', 'UK'));

let jane = JSON.parse(JSON.stringify(john));

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

john.greet();
// this won't work
// jane.greet();

// try a dedicated serializer
let s = new Serializer([Person,Address]); // pain point
jane = s.clone(john);

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john.toString());
console.log(jane.toString());
