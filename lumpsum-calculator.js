const lumpsumForm = document.getElementById('lumpsum-form');
const resultElement = document.getElementById('result');
const investmentAmountInput = document.getElementById('investment-amount');
const investmentHorizonInput = document.getElementById('investment-horizon');
const expectedReturnInput = document.getElementById('expected-return');
const investmentAmountValueOutput = document.getElementById('investment-amount-value');
const investmentHorizonValueOutput = document.getElementById('investment-horizon-value');
const expectedReturnValueOutput = document.getElementById('expected-return-value');

// Update output values on scroll
investmentAmountInput.addEventListener('input', () => {
  investmentAmountValueOutput.textContent = investmentAmountInput.value;
  updateResult(); // Update result on scroll
});
investmentHorizonInput.addEventListener('input', () => {
  investmentHorizonValueOutput.textContent = investmentHorizonInput.value;
  updateResult(); // Update result on scroll
});
expectedReturnInput.addEventListener('input', () => {
  expectedReturnValueOutput.textContent = expectedReturnInput.value;
  updateResult(); // Update result on scroll
});

// Clear result and calculate on form submit
lumpsumForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  resultElement.textContent = ''; // Clear previous result

  // Get input values
  const investmentAmount = parseFloat(investmentAmountInput.value);
  const expectedAnnualReturn = parseFloat(expectedReturnValueOutput.textContent);
  const investmentHorizon = parseInt(investmentHorizonInput.value);

  // Validate input
  if (isNaN(investmentAmount) || isNaN(expectedAnnualReturn) || isNaN(investmentHorizon)) {
    resultElement.textContent = 'Please enter valid numbers.';
    return;
  }

  // Calculate future value
  const futureValue = calculateLumpsum(investmentAmount, expectedAnnualReturn, investmentHorizon);
  const formattedRupees = futureValue.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  // Display result
  resultElement.textContent = `Your estimated future value is: ${formattedRupees}`;
});

// Lumpsum calculation function
function calculateLumpsum(investmentAmount, expectedAnnualReturn, investmentHorizon) {
  const returnRate = expectedAnnualReturn / 100;
  const futureValue = investmentAmount * Math.pow(1 + returnRate, investmentHorizon);
  return futureValue;
}


