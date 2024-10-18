const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const peopleError = document.getElementById("peopleError");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("customTip");
const tipAmountDisplay = document.getElementById("tipAmount");
const totalAmountDisplay = document.getElementById("totalAmount");
const resetButton = document.getElementById("resetBtn");

let billValue = 0;
let peopleValue = 0; // Initialize to 0
let tipPercentage = 0;

// Function to reset people input error state
function resetPeopleInputError() {
  peopleInput.style.outlineColor = "";
  peopleError.textContent = "";
  peopleError.style.display = "none";
}

// Function to calculate tip and total per person
function calculateAmounts() {
  // Validate "Number of People" input
  if (peopleInput.value.trim() === "" || peopleInput.value <= 0) {
    peopleInput.style.outlineColor = "red"; // Show red outline
    peopleError.textContent = "Can't be zero"; // Show error message
    peopleError.style.display = "inline"; // Make the error message visible
    return; // Prevent calculations if the input is invalid
  }

  // Reset error state if valid
  resetPeopleInputError();

  // Proceed with calculations if inputs are valid
  if (billValue > 0 && peopleValue > 0) {
    const tipAmountPerPerson =
      (billValue * (tipPercentage / 100)) / peopleValue;
    const totalPerPerson = billValue / peopleValue + tipAmountPerPerson;

    tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  updateResetButtonVisibility(); // Update reset button state
}

// Function to update reset button visibility
function updateResetButtonVisibility() {
  if (
    billInput.value ||
    peopleInput.value ||
    customTipInput.value ||
    tipPercentage > 0
  ) {
    resetButton.style.opacity = "1"; // Fully visible
    resetButton.disabled = false; // Enable button
  } else {
    resetButton.style.opacity = "0.3"; // Barely visible
    resetButton.disabled = true; // Disable button
  }
}

// Validate "Number of People" input and show error if invalid
function validatePeopleInput() {
  if (!peopleInput.value || peopleInput.value <= 0) {
    peopleInput.style.outlineColor = "red"; // Show red outline
    peopleError.textContent = "Can't be zero"; // Show error message
    peopleError.style.display = "inline"; // Make the error message visible
  } else {
    resetPeopleInputError();
    peopleValue = parseFloat(peopleInput.value) || 1; // Update value
    calculateAmounts();
  }
}

// Update bill value
billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value) || 0;
  calculateAmounts();
});

// Update number of people
peopleInput.addEventListener("input", () => {
  validatePeopleInput();
});

// Handle tip button clicks
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercentage = parseFloat(button.getAttribute("data-tip"));
    customTipInput.value = ""; // Clear custom input
    calculateAmounts();
  });
});

// Handle custom tip input
customTipInput.addEventListener("input", () => {
  tipPercentage = parseFloat(customTipInput.value) || 0;
  calculateAmounts();
});

// Reset everything when reset button is clicked
resetButton.addEventListener("click", () => {
  billValue = 0;
  peopleValue = 0; // Reset to 0
  tipPercentage = 0;

  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";

  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  resetPeopleInputError(); // Reset error state

  updateResetButtonVisibility(); // Ensure reset button goes back to barely visible
});

// Initial state check
updateResetButtonVisibility();
