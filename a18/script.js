async function fetchUserData() {
  const email = document.getElementById('emailInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Loading...";

  try {
    // Fetch all users
    const userRes = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await userRes.json();

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      resultDiv.textContent = "User not found!";
      return;
    }

    // Fetch posts by user ID
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await postRes.json();

    resultDiv.innerHTML = `
      <p>Username: <strong>${user.username}</strong></p>
      <p>Number of Posts: <strong>${posts.length}</strong></p>
    `;
  } catch (error) {
    resultDiv.textContent = "An error occurred. Please try again.";
    console.error(error);
  }
}
