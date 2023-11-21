const pandaImage = document.querySelector("img");
document.querySelector("p").addEventListener("click", makeAlert);


function makeAlert() {
    alert("ouch!, stop poking me!");
}

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