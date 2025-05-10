let arrays = [[1, 2, 3], [4, 5], [6]];
let flattened = arrays.reduce((a, b) => a.concat(b), []);
console.log(flattened);
// → [1, 2, 3, 4, 5, 6]