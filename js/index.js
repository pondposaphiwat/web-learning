// let name = "Pond";

// let person = {
//     name: "Pond",
//     age: 25
// };

// person["name"] = "Josh"

let selectedColors = ["Purple"]
selectedColors[3] = 2
console.log(selectedColors.length);

function greet(name) {
    console.log("My name is " + name) ;
}

function Person() {
    this.name = "Pond";
}

let person = new Person();

console.log(person.name);
greet("K");
greet("ded");
greet("K");
greet("K");
greet("K");
