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

  const customer = customers.find((c) => c.cart === card && c.pin === pin);

  if (customer) {
    currentCustomer = customer;
    renderDashboard();
  } else {
    msg.textContent = "Invalid card number or PIN!";
  }
};

const renderDashboard = () => {
  const box = document.getElementById("login-box");
  box.innerHTML = `
    <h2>Welcome, ${currentCustomer.name}!</h2>
    <p>Balance: ₹<span id="balance">${currentCustomer.balance}</span></p>
    
    <select id="action" onchange="handleActionChange()">
      <option value="">-- Select Action --</option>
      <option value="withdraw">Withdraw</option>
      <option value="deposit">Deposit</option>
      <option value="transfer">Fund Transfer</option>
    </select>

    <input type="number" id="amount" placeholder="Enter Amount" />
    <input type="text" id="recipient" placeholder="Recipient Card No." style="display: none;" />

    <button onclick="processTransaction()">Submit</button>
    <button onclick="logout()" style="margin-left: 10px; background-color: #bdb2ff;">Logout</button>
    <p id="msg"></p>
  `;
};

const handleActionChange = () => {
  const action = document.getElementById("action").value;
  const recipientInput = document.getElementById("recipient");

  
  if (action === "transfer") {
    recipientInput.style.display = "inline-block";
  } else {
    recipientInput.style.display = "none";
  }
};

const processTransaction = () => {
  const action = document.getElementById("action").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const msg = document.getElementById("msg");
  const balanceEl = document.getElementById("balance");
  const recipientCard = document.getElementById("recipient").value;

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
  } else if (action === "transfer") {
    if (!recipientCard || recipientCard === currentCustomer.cart) {
      msg.textContent = "Enter a valid recipient card number.";
      return;
    }

    const recipient = customers.find(c => c.cart === recipientCard);

    if (!recipient) {
      msg.textContent = "Recipient not found!";
      return;
    }

    if (amount > currentCustomer.balance) {
      msg.textContent = "Insufficient balance for transfer!";
      return;
    }

    currentCustomer.balance -= amount;
    recipient.balance += amount;

    msg.textContent = `₹${amount} transferred to ${recipient.name} (Card: ${recipient.cart}).`;
  }

  balanceEl.textContent = currentCustomer.balance;
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
