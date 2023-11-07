//refers to first element within document that matches specfied selector
const pandaImage = document.querySelector("img");

//makes an event listener to makes an alert to first p element
//first is the type of event it listens to, second is the function it plays
//when the event is activated
document.querySelector("p").addEventListener("click", makeAlert);

//event handler basically
function makeAlert() {
    alert("ouch!, stop poking me!");
}

//create an onclick function for the pandaImage
pandaImage.onclick = function() {
    const mySrc = pandaImage.getAttribute("src");
    if(mySrc === "images/panda.png") {
        pandaImage.setAttribute("src","images/panda2.jpg");
    } else {
        pandaImage.setAttribute("src","images/panda.png");
    }
}

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name.");
    if(!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = "Pandas are so cool " + myName;
    }

}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = "Pandas are so cool, " + storedName;
}

myButton.onclick = function() {
    setUserName();
}
