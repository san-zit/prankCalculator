const displayElem = document.querySelector(".display");
const btnElems = document.querySelectorAll(".btn");
const audio = new Audio("./audio.mp3");

let strToDisplay = "";
let lastOperator = "";
const operators = ["+", "-", "*", "/", "%"];

console.log(btnElems);

const display = (str) => {
  displayElem.innerText = str || "0.00";
};
const randomNumber = () => {
  return Math.round(Math.random() * 10);
};
const getTotal = () => {
  const random = randomNumber();
  const lastChar = strToDisplay.slice(-1);
  if (operators.includes(lastChar)) {
    strToDisplay = strToDisplay.slice(0, -1);
  }

  let totalNumber = eval(strToDisplay);

  if (random < 5) {
    displayElem.classList.add("prank");
    audio.play();
    totalNumber += random;
  }

  //const total = eval(strToDisplay).toString();

  strToDisplay = totalNumber.toString();
  return display(strToDisplay);
};

btnElems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    displayElem.classList.remove("prank");

    if (value === "AC") {
      strToDisplay = "";
      return display(strToDisplay);
    }

    if (value === "=") {
      return getTotal();
    }

    if (value == ".") {
      if (strToDisplay === "") {
        strToDisplay += "0.";
        return display(strToDisplay);
      }

      const lastChar = strToDisplay.slice(-1);
      if (lastChar === ".") {
        return;
      }

      if (!lastOperator) {
        if (strToDisplay.includes(".")) {
          return;
        }
      }
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      if (lastNumberSet.includes(".")) {
        return;
      }
    }

    if (operators.includes(value)) {
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        return;
      }
      if (lastChar === ".") {
        //add .0 after numer if it is left by 9.+ it will be 9.0+
        strToDisplay += "0";
      }
    }

    //c should remore the last element
    if (value === "C") {
      strToDisplay = strToDisplay.slice(0, -1);

      return display(strToDisplay);
    }
    if (operators.includes(value) && strToDisplay.length === 0) {
      return;
    }

    strToDisplay += value;
    display(strToDisplay);
  });
});
