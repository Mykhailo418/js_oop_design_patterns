// SOLID: Interface Segregation Principle
// Many specialized interfaces are better than one universal
// Do not put too much into an interface; split into separate interfaces

// Interface
class Machine {
  constructor() {
    if (this.constructor.name === 'Machine')
      throw new Error('Machine is abstract!');
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // ok
  }

  // omitting this is the same as no-op impl

  // fax(doc) {
  //   // do nothing
  // }

  scan(doc) {
    // throw new Error('not implemented!');
    throw new Error('not implemmented')
  }
}

// -- SOLUTION:

// Interface
class Printer {
  constructor(){
    if (this.constructor.name === 'Printer')
      throw new Error('Printer is abstract!');
  }

  print(){}
}

// Interface
class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner')
      throw new Error('Scanner is abstract!');
  }

  scan(){}
}

// this is not work in js but work in TypeScript
class Photocopier implements Printer, Scanner {
  print() {
    // IDE won't help you here
  }

  scan() {
    //
  }
}

// we don't allow this!
// let m = new Machine();

let printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
//printer.scan();
