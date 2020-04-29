function greeter(person: string) {
    return 'hello' + person;
}
let user = 'pzl';

console.log(greeter(user));

interface Person {
    firstName: string;
    lastName: string;
}

function greeter2(person: Person) {
    return 'hello' + person.firstName + ' ' + person.lastName;
}

let user2 = {
    firstName: 'p999',
    lastName: 'zl',
};

console.log(greeter2(user2));

class student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person2 {
    firstName: string;
    lastName: string;
}

function greeter3(person: Person2) {
    return "hello" + person.firstName + " " + person.lastName;
}

let user3 = new student("Jane", "M2.", "User");
console.log(greeter3(user3))
