const sipForm = document.getElementById('RD-calculator-form');
const resultElement = document.getElementById('result');
const monthlyInvestmentInput = document.getElementById('monthly-investment');
const expectedReturnInput = document.getElementById('expected-return');
const investmentPeriodInput = document.getElementById('investment-period');
const monthlyInvestmentValueOutput = document.getElementById('monthly-investment-value');
const expectedReturnValueOutput = document.getElementById('expected-return-value');
const investmentPeriodValueOutput = document.getElementById('investment-period-value');

// Update output values on scroll
monthlyInvestmentInput.addEventListener('input', () => {
  monthlyInvestmentValueOutput.textContent = monthlyInvestmentInput.value;
  updateResult();
});
expectedReturnInput.addEventListener('input', () => {
  expectedReturnValueOutput.textContent = expectedReturnInput.value;
  updateResult();
});
investmentPeriodInput.addEventListener('input', () => {
  investmentPeriodValueOutput.textContent = investmentPeriodInput.value;
  updateResult();
});

// Calculate and display result on form submit
sipForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get input values
  const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);
  const expectedAnnualReturn = parseFloat(expectedReturnValueOutput.textContent);
  const investmentPeriod = parseInt(investmentPeriodInput.value);

  // Validate input
  if (isNaN(monthlyInvestment) || isNaN(expectedAnnualReturn) || isNaN(investmentPeriod)) {
    resultElement.textContent = 'Please enter valid numbers.';
    return;
  }

  // Calculate future value
  const futureValue = calculateRD(monthlyInvestment, expectedAnnualReturn, investmentPeriod);
  const formattedRupees = futureValue.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  // Display result
  resultElement.textContent = `Your estimated future value is: ${formattedRupees}`;
});

// SIP calculation function
function calculateRD(monthlyInvestment, expectedAnnualReturn, investmentPeriod) {
  const monthlyRate = (expectedAnnualReturn / 100) / 12;
  const numberOfPayments = investmentPeriod * 12;
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, numberOfPayments) - 1) / monthlyRate) * (1 + monthlyRate);
  return futureValue;
}