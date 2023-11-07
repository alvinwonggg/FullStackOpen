//Basics of Javascript

//Creating array named t
const t = [1,2,3]
t.push(50)
console.log(t.length)
console.log(t[1])
t.forEach(value => {
    console.log(value)
})

//destructing assignment, can assign parts of an array into variables
const [first,second, ...rest] = t
console.log(first,second)
console.log(rest)

//Concat creates new array with added values
const t2 = t.concat(5,4,5,2,3);
t2.forEach(value => {
    console.log(value)
})
console.log(t2)

//can log map and array objects
const m1 = t.map(value => value*2)
console.log(m1)

//can use maps to transform arrays entirely
const m2 = t.map(value => "<li>"  + value + "<li>")
console.log(m2)

//object literals, listing properties within braces
const object1 = {
    name: "Alvin Wong",
    age: 19,
    education: "Undergraduate",
}

const object2 = {
    name: {
        first: "Alvin",
        last: "Wong",
    },
    grades: [3.5,3.81,3.5,3],
    university: "Uni of Florida"
}

console.log(object2.name.first)

//this is the weirdest syntax ive ever seen in a language
const fieldName = "age"
console.log(object1[fieldName]) //19 is printed
console.log(object1["age"]) //19 is also printed

//functions

//arrow functions, very different syntax compared to other languages
const sum = (p1,p2) => { //if single parameter, no parenthese needed
    console.log(p1)
    console.log(p2)
    return (p1+p2)
}

const result = sum(1,5)
console.log(result)

//single expression function
const square = p => p*p //this is a whole function that returns the square
const a = [1,2,3]
const aSquared = a.map(p =>p*p) //single expression function useful when using map

