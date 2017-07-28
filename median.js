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

  swap(idx1, idx2) {
    if (idx1 >= this.heap.length || idx2 >= this.heap.length) {
      throw "Index out of bounds";
    }
    let val1 = this.heap[idx1];
    let val2 = this.heap[idx2];
    this.heap[idx1] = val2;
    this.heap[idx2] = val1;
  }
}

class MaxHeap extends Heap {  
  heapifyUp(val, idx) {
    let parentIdx = this.parentIndex(idx);
    if (this.heap[parentIdx] < val) {
      super.swap(idx, parentIdx);
      this.heapifyUp(val, parentIdx);
    }
  }

  heapifyDown(val, idx) {
    let childIndices = this.childIndices(idx);
    if (childIndices.left < this.heap.length && childIndices.right < this.heap.length) {
      let max;
      if (this.heap[childIndices.left] > this.heap[childIndices.right]) {
        max = childIndices.left;
      } else {
        max = childIndices.right;
      }
      if (val < this.heap[max]) {
        super.swap(idx, max);
        this.heapifyDown(val, max);
      }
    } else if (childIndices.left < this.heap.length) {
      if (val < this.heap[childIndices.left]) {
        super.swap(idx, childIndices.left);
        this.heapifyDown(val, childIndices.left);
      }
    } else if (childIndices.right < this.heap.length) {
      if (val < this.heap[childIndices.right]) {
        super.swap(idx, childIndices.right);
        this.heapifyDown(val, childIndices.right);
      }
    }
  }
}




let h = new MaxHeap;
// h.heap = [5, 3, 4, 4]
// console.log(h.heap);
// h.heapifyUp(4, 3);
// console.log(h.heap);
