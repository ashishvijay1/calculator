import React, { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [results, setResults] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTenure) * 12;

    if (principal > 0 && rate > 0 && time > 0) {
      const x = Math.pow(1 + rate, time);
      const monthlyPayment = (principal * x * rate) / (x - 1);
      const totalPayment = monthlyPayment * time;
      const totalInterest = totalPayment - principal;

      setResults({
        monthlyPayment: formatIndianCurrency(monthlyPayment),
        totalPayment: formatIndianCurrency(totalPayment),
        totalInterest: formatIndianCurrency(totalInterest)
      });
    } else {
      setResults(null);
    }
  };

  
  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Loan Calculator (Indian Rupees)</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
            <input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate (% per annum)</label>
            <input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700">Loan Tenure (years)</label>
            <input
              id="loanTenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="Enter loan tenure"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={calculateLoan}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>
      </div>
      {results && (
        <div className="px-6 py-4 bg-gray-100">
          <div className="space-y-2">
            <p><strong>Monthly EMI:</strong> {results.monthlyPayment}</p>
            <p><strong>Total Payment:</strong> {results.totalPayment}</p>
            <p><strong>Total Interest:</strong> {results.totalInterest}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;