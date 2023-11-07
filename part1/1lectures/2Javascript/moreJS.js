console.log("Hello, world");
console.log("你好，世界！"); // Nearly all Unicode characters can be written literally in string literals

console.log("hello"[1] === "e")

//strings have utility methods
const age = 25
const name = 'Alvin Wong'
console.log(name.length)
console.log("I am " + age + " years old."); // String concatenation
console.log(`I am ${age} years old.`); // Template literal

//returns undefined, as var is undefined
let x;
console.log(x)

//three ways to define var in js (let, var and const)
const obj = {};
obj.a = 1; // no error
console.log(obj); // { a: 1 }

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) { // myLetVariable is *not* visible out here
    // myLetVariable is only visible in here
  }   // myLetVariable is *not* visible out here

//var is not block scoped and is kinda like global var, dont use it

// function foo(x, condition) {
//     if (condition) {
//         let x = 2;
//       console.log(x);
//          x = 2;
//       console.log(x);
//     }
//   }
  
// foo(1, true);


//for loops
const myArray = [1,2,3,4,5]
for (const x of myArray) {
    console.log(x)// do something with value
  }

const myObject = {
    name: "Alvin Wong",
    age: 18
}

for (const a in myObject) {
    console.log(a)
}

const action = "eat";
switch (action) {
    case "draw":
    //   drawIt();
      break;
    case "eat":
    //   eatIt();
      break;
    default:
    //   doNothing();
}

//javascipt errors
// try {
//     buildMySite("./website");
//   } catch (e) {
//     console.error("Building site failed:", e);
// }

// Note the { } braces: this is destructuring an object
function area({ width, height }) { //have to be same name
    return width * height;
  }
  
  // The { } braces here create a new object
  console.log(area({ width: 2, height: 3 }));