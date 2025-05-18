function greet(){
  console.log("Hello World")
}
 
async function dispData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json()
  console.log(data);
}
async function main() {
    await dispData();
    greet();
}
dispData();
greet();
 