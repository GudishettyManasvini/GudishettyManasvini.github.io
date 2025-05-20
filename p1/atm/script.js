const customers = [
  { cart: "1234567890", pin: "1234", name: "John", balance: 1000 },
  { cart: "1234567891", pin: "12345", name: "Cathy", balance: 1500 },
];

let currentCustomer = null;

const login = () => {
  const card = document.getElementById("card").value;
  const pin = document.getElementById("pin").value;
  const msg = document.getElementById("msg");
  const box = document.getElementById("login-box");

  const customer = customers.find(
    (c) => c.cart === card && c.pin === pin
  );

  if (customer) {
    currentCustomer = customer;
    box.innerHTML = `
      <h2>Welcome, ${customer.name}!</h2>
      <p>Balance: ₹<span id="balance">${customer.balance}</span></p>
      <select id="action">
        <option value="">-- Select Action --</option>
        <option value="withdraw">Withdraw</option>
        <option value="deposit">Deposit</option>
      </select>
      <input type="number" id="amount" placeholder="Enter Amount" />
      <button onclick="processTransaction()">Submit</button>
      <button onclick="logout()" style="margin-left: 10px; background-color: #bdb2ff;">Logout</button>
      <p id="msg"></p>
    `;
  } else {
    msg.textContent = "Invalid card number or PIN!";
  }
};

const processTransaction = () => {
  const action = document.getElementById("action").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const msg = document.getElementById("msg");
  const balanceEl = document.getElementById("balance");

  if (!action || isNaN(amount) || amount <= 0) {
    msg.textContent = "Please select action and enter a valid amount.";
    return;
  }

  if (action === "withdraw") {
    if (amount > currentCustomer.balance) {
      msg.textContent = "Insufficient balance!";
      return;
    }
    currentCustomer.balance -= amount;
  } else if (action === "deposit") {
    currentCustomer.balance += amount;
  }

  balanceEl.textContent = currentCustomer.balance;
  msg.textContent = `Transaction successful! New balance: ₹${currentCustomer.balance}`;
};

const logout = () => {
  const box = document.getElementById("login-box");
  currentCustomer = null;
  box.innerHTML = `
    <input type="text" id="card" placeholder="Enter Card Number" />
    <input type="password" id="pin" placeholder="Enter PIN" />
    <button onclick="login()">Login</button>
    <p id="msg"></p>
  `;
};
