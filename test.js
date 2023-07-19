const originalList = ['a', 'b', 'c', 'd', 'e', 'f'];
const sublistSize = 2;

const sublist = Array.from({length: Math.ceil(originalList.length / sublistSize)}, (_, index) =>
  originalList.slice(index * sublistSize, (index + 1) * sublistSize)
);
console.log(sublist)