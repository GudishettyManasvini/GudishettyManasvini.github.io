class UserFetcher {
  static async getUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}

async function findUser() {
  const email = document.getElementById('emailInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Searching...';

  const users = await UserFetcher.getUsers();
  const user = users.find(u => u.email.toLowerCase() === email);

  if (user) {
    resultDiv.textContent = `Name: ${user.name}`;
  } else {
    resultDiv.textContent = 'No user found with that email.';
  }
}
