// Date

const date = new Date();
console.log(date);
console.log(date.getDate());
console.log(date.getFullYear());
console.log(typeof date.getFullYear())

// Map
const map = new Map();
map.set('name', 'Harkirat');
map.set('age', 30);

const firstName = map.get('name');
console.log(firstName);
 
map.set('name', 'Harryt');
map.set('age', 31);

const secondName = map.get('name');
console.log(secondName);