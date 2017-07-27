// Source: https://www.hackerrank.com/challenges/ctci-find-the-running-median
// Find the running median of a list
class Heap {
  constructor() {
    this.heap = [];
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2, 0);
  }

  childIndices(i) {
    return { left: 2 * (i + 1) - 1, right: 2 * (i + 1) };
  }
}

let h = new Heap;
console.log(h.parentIndex(2));
console.log(h.parentIndex(5));
console.log(h.childIndices(0));
console.log(h.childIndices(2));
