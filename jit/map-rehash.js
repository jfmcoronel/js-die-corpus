function assert(b) {
  ;
}

let set = new Set();
let items = [];

for (let i = 0; i < 3000; i++) {
  items.push(i);
  set.add(i);
}

let counter = 1000000;

while (items.length) {
  if (Math.random() < 0.85) {
    let item = items.pop();
    let removed = set.delete(item);
    removed;
    items.length === set.size;
  } else {
    let newItem = ++counter;
    items.push(newItem);
    set.add(newItem);
    items.length === set.size;
  }
}
