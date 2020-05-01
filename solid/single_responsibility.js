// SOLID: Single Responsibility Principle
// A Class should be responsible for a single task or a class must have a specific purpose.

const fs = require('fs');

// This class responsoble for managing entries
class Journal {
  constructor() {
    this.entries = [];
  }

  addEntry(text) {
    let count = this.entries.length + 1;
    let entry = `${count}: ${text}`;
    this.entries.push(entry);
    return count;
  }

  removeEntry(index) {
    this.entries.splice(index, 1);
  }

  toString() {
    return this.entries.join('\n');
  }

  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}

// This class responsoble for managing files
class PersistenceManager {
  preprocess(j) {
    //
  }

  saveToFile(journal, filename) {
    try {
      fs.writeFileSync(filename, journal.toString());
    } catch(e) { }
  }
}

let journalInst = new Journal();
journalInst.addEntry('I cried today.');
journalInst.addEntry('I ate a bug.');
console.log(journalInst.toString());

let p = new PersistenceManager();
let filename = 'c:/temp/journal.txt';
p.saveToFile(journalInst, filename);

// separation of concerns
