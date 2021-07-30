class Person {
  static firstName;
  static lastName;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default Person;
