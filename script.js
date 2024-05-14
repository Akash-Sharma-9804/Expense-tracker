const state = {
  earnings: 0,
  expense: 0,
  net: 0,
  transactions: [
    {
      id: Math.floor(Math.random() * 1000),
      category: "Category",
      text: "Description",
      date: "Date",
      amount: 0,
      type: "credit",
    },
  ],
};


const transactionFormEl = document.getElementById("transactionForm");
//////////////------------------    Filter Transaction       ----------------------//////////
const transactionCategory = document.getElementById("category_select");
transactionCategory.addEventListener("change", function filterValues() {
  renderTransactions();
});
///////----------------------     Render Transaction     ------------------------//////////

const renderTransactions = () => {
  const transactionContainerEl = document.querySelector(".transactions");
  const netAmountEl = document.getElementById("netAmount");
  const earningEl = document.getElementById("earning");
  const expenseEl = document.getElementById("expense");
 
  const category = document.getElementById("category");

  const transactions = state.transactions;

  let earning = 0;
  let expense = 0;
  let net = 0;
  transactionContainerEl.innerHTML = "";

  const transactionCategory = document.getElementById("category_select");
  const transactionCategoryValue = transactionCategory.value;

  const filteredTransactions =
    transactionCategoryValue === "All"
      ? state.transactions
      : state.transactions.filter((transaction) => {
          return transaction?.category === transactionCategoryValue;
        });

  filteredTransactions.forEach((transaction, index) => {
    const { id, category, text, date, amount, type } = transaction;
    const isCredit = type === "credit" ? true : false;
    const sign = isCredit ? "+" : "-";

    const transactionEl = ` 
      <div class="transaction" id="${id}">
          <div class="left">
          <table>
                    <tr>
                    <td colspan="2"> <p>${text}</p></td> 
                    <td style="text-align:right"><button id="delete_${index}"><img  src="bin.png" alt=""></button></td>   
                    </tr>
                    <tr >
                    <td><p>${category}</p></td>
                    <td style="text-align:center"> <p>${date}</p></td>
                    <td style="text-align:right"> <p>${sign} ₹ ${amount}</p></td>
                    
                    </tr>
                </table>
          </div>
           <div class="status ${isCredit ? "credit" : "debit"}">${
      isCredit ? "C" : "D"
    }</div>
    </div>`;

    earning += isCredit ? amount : 0;
    expense += !isCredit ? amount : 0;
    net = earning - expense;

    transactionContainerEl.insertAdjacentHTML("afterbegin", transactionEl);

    const deleteButton = document.getElementById(`delete_${index}`);
    deleteButton.addEventListener("click", function () {
      deleteTransaction(index);
    });
  });

  ///////-----------------     Delete Transaction    -----------------//////////

  function deleteTransaction(index) {
    const updatedTransactions = [...state.transactions];

    updatedTransactions.splice(index, 1);
    state.transactions = updatedTransactions;
    renderTransactions();
   
  }

  ////////--------------------  Update total amounts  ---------------/////////////
  netAmountEl.innerHTML = `₹ ${net}`;
  earningEl.innerHTML = `₹ ${earning}`;
  expenseEl.innerHTML = `₹ ${expense}`;
};

const categoryEl = category.value;

///////-----------------------     Add Transaction      -------------------//////////


const addTransaction = (e) => {
  e.preventDefault();

  const dateElement = document.getElementById("date");
  const categoryElement = document.getElementById("category");
  const descriptionElement = document.getElementById("description");
  const amountElement = document.getElementById("amount");
  if (!dateElement.value) {
    alert("Select Date ");
    return;
  }
  if (!categoryElement.value) {
    alert("Select Category");
    return;
  }
  if (!descriptionElement.value) {
    alert("Enter Description");
    return;
  }
  if (!amountElement.value) {
    alert("Enter amount");
    return;
  }

  const isEarn = e.submitter.id === "earnBtn" ? true : false;

  const formData = new FormData(transactionFormEl);
  const tData = {};

  formData.forEach((value, key) => {
    tData[key] = value;
  });
  const { categoryEl, text, date, amount } = tData;
  const transaction = {
    id: Math.floor(Math.random() * 1000),
    category: category.value,
    text: text,
    date: date,
    amount: +amount,
    type: isEarn ? "credit" : "debit",
  };

  state.transactions.push(transaction);
  renderTransactions();

  transactionFormEl.reset();
  console.log({ state });
  
};



renderTransactions();

transactionFormEl.addEventListener("submit", addTransaction);
