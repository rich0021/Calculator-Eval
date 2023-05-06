let firstEx = null;
let secondEx = null;
let operator = null;
let outputString = "0";
let outputResult = 0;
let evalString = "";
const operatorConst = ["+", "-", "/", "*"];

const outputUI = document.getElementById("outputValue");
const inputStringUI = document.getElementById("inputString");
const numItem = document.querySelectorAll(".numItem");

numItem.forEach((element) => {
  element.addEventListener("click", () => num(element.innerHTML));
});

function evaluateResult(string) {
  try {
    let evalOp = eval(string.toString().replace("x", "*")).toString();
    if (evalOp == "Infinity") {
      outputString = "Cant Divide By Zero";
      resetFN(false);
    } else if (evalOp == "NaN") {
      outputString = "Unknown Number";
      resetFN(false);
    } else {
      outputResult = evalOp;
    }
  } catch (error) {
    return;
  }
}

function render(outputString, inputString) {
  inputStringUI.innerHTML = inputString;
  outputUI.innerHTML = outputString;
}

function num(num) {
  evalString += num;
  if (operator == null) {
    if (!firstEx) {
      firstEx = num;
    } else {
      firstEx += num;
    }
    outputString = firstEx;
  } else {
    if (!secondEx) {
      secondEx = num;
    } else {
      secondEx += num;
    }
    outputString = secondEx;
  }
  render(outputString, evalString);
}

function operatorSet(op) {
  if (
    evalString.length <= 0 ||
    evalString.charAt(evalString.length - 1) == op
  ) {
    return;
  }

  if (
    operatorConst.includes(op) &&
    operatorConst.includes(evalString.charAt(evalString.length - 1))
  ) {
    evalString = evalString.replace(
      evalString.charAt(evalString.length - 1),
      op
    );
    render(outputString, evalString);
    return;
  }

  if (firstEx && secondEx) {
    evaluateResult(evalString);
    firstEx = outputResult.toString();
    secondEx = null;
    evalString = outputResult.toString() + op;
    outputString = outputResult.toString();
  } else {
    evalString += op;
  }
  operator = op;
  render(outputString, evalString);
}

function resetFN(withUI) {
  if (withUI) {
    outputUI.innerHTML = "0";
    inputStringUI.innerHTML = "<span style='visibility: hidden'>.</span>";
  }
  evalString = "";
  operator = null;
  firstEx = null;
  secondEx = null;
}

function calculate() {
  if (firstEx && secondEx && operator) {
    evaluateResult(evalString);
    evalString += "=";
    outputString = outputResult.toString();
    render(outputString, evalString);
    firstEx = outputResult.toString();
    secondEx = null;
    evalString = outputResult.toString();
    operator = null;
  }
}

window.onload = function () {
  render(outputString, "<span style='visibility: hidden'>.</span>");
};
