const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];

function updateList() {
  expenseList.innerHTML = '';
  let total = 0;
  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name} - $${expense.amount.toFixed(2)}</span>
      <button class="remove-btn" onclick="removeExpense(${index})">Remove</button>
    `;
    expenseList.appendChild(li);
  });
  totalAmount.textContent = total.toFixed(2);
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateList();
}

expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  if (name && !isNaN(amount) && amount > 0) {
    expenses.push({ name, amount });
    updateList();
    expenseForm.reset();
  }
});

// Make removeExpense globally accessible
window.removeExpense = removeExpense;

// Initial render
updateList();
