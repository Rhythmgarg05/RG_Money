const emiForm = document.getElementById('emi-calculator-form');
const resultElement = document.getElementById('result');
const loanAmountInput = document.getElementById('loan-amount');
const loanTenureInput = document.getElementById('loan-tenure');
const interestRateInput = document.getElementById('interest-rate');
const loanAmountValueOutput = document.getElementById('loan-amount-value');
const loanTenureValueOutput = document.getElementById('loan-tenure-value');
const interestRateValueOutput = document.getElementById('interest-rate-value');

// Update output values on scroll
loanAmountInput.addEventListener('input', () => {
  loanAmountValueOutput.textContent = loanAmountInput.value;
  updateResult();
});
loanTenureInput.addEventListener('input', () => {
  loanTenureValueOutput.textContent = loanTenureInput.value;
  updateResult();
});
interestRateInput.addEventListener('input', () => {
  interestRateValueOutput.textContent = interestRateInput.value;
  updateResult();
});

// Calculate and display result on form submit
emiForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get input values
  const loanAmount = parseFloat(loanAmountInput.value);
  const loanTenure = parseInt(loanTenureInput.value);
  const interestRate = parseFloat(interestRateValueOutput.textContent);

  // Validate input
  if (isNaN(loanAmount) || isNaN(loanTenure) || isNaN(interestRate)) {
    resultElement.textContent = 'Please enter valid numbers.';
    return;
  }

function calculateEMI(loanAmount, interestRate, loanTenure) {
    const monthlyInterestRate = interestRate / (12 * 100);
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenure*12))/ (Math.pow(1 + monthlyInterestRate, loanTenure*12) - 1);
    const totalPayment = emi * loanTenure * 12;
  
    return {
      emi: emi,
      totalPayment: totalPayment
    };
}

const results = calculateEMI(loanAmount, interestRate, loanTenure);
const formattedRupees = results.emi.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  const formattedTotalAmount = results.totalPayment.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
  resultElement.innerHTML = `
  <p>Monthly EMI Amount: ${formattedRupees}</p>
  <p>Principal+Interest: ${formattedTotalAmount}</p>
  `;
});
