// Bootcamp team project
// Run me with:  node index.js

const GREETING = "Good morning";

function greet(name) {
  return `${GREETING}, ${name}!`;
}

const team = ["Ada", "Grace", "Linus"];

for (const person of team) {
  console.log(greet(person));
}
