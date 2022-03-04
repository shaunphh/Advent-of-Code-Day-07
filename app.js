const billAmount = document.getElementById("bill-amount");
const numberOfPeople = document.querySelector('input[name="number-of-people"]');

const tipAmount = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-per-person");

const tips = document.querySelectorAll('input[name="tip"]');

function onlyNumberKey(event) {
  const ASCIICode = event.which ? event.which : event.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

function fixedTo(price) {
  return Number.parseFloat(price).toFixed(2);
}

function getTipAmount(amount) {
  return fixedTo(billAmount.value * (parseFloat(amount) / 100.0));
}

function getTotalPerPerson(amount) {
  const totalPer = fixedTo(parseFloat(billAmount.value) + parseFloat(tipAmount.innerHTML)) / numberOfPeople.value;
  return fixedTo(totalPer);
}

console.log(getTotalPerPerson());

["blur", "change"].forEach((event) =>
  billAmount.addEventListener(event, () => {
    billAmount.value = fixedTo(billAmount.value);

    const newTip = document.querySelector('input[name="tip"]:checked').value;
    tipAmount.innerHTML = getTipAmount(newTip);

    totalPerPerson.innerHTML = getTotalPerPerson();

    if (isNaN(billAmount.value)) {
      billAmount.value = 0;
    }
  })
);

["blur", "change"].forEach((event) =>
  numberOfPeople.addEventListener(event, () => {
    totalPerPerson.innerHTML = getTotalPerPerson();

    if (numberOfPeople.value === "") {
      numberOfPeople.value = 1;
    }
  })
);

tips.forEach((tip, index) =>
  tip.addEventListener("click", () => {
    tipAmount.innerHTML = getTipAmount(tips[index].value);
    totalPerPerson.innerHTML = getTotalPerPerson();
  })
);

getTotalPerPerson();
