const fruits = ["apple","mango","banana","orange"]
function filterFruits() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = fruits.filter(fruit => fruit.toLowerCase().includes(input));

  const list = document.getElementById("fruitList");
  list.innerHTML = "";
}