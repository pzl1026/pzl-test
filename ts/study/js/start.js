function greeter(person) {
    return 'hello' + person;
}
var user = 'pzl';
console.log(greeter(user));
function greeter2(person) {
    return 'hello' + person.firstName + ' ' + person.lastName;
}
var user2 = {
    firstName: 'p999',
    lastName: 'zl'
};
console.log(greeter2(user2));
var student = (function () {
    function student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return student;
}());
function greeter3(person) {
    return "hello" + person.firstName + " " + person.lastName;
}
var user3 = new student("Jane", "M2.", "User");
console.log(greeter3(user3));
//# sourceMappingURL=start.js.map