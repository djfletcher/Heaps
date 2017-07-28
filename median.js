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

  peek() {
    return this.heap[0];
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

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(val, this.heap.length - 1);
  }

  extract() {
    if (this.heap.length === 0) {
      return undefined;
    }
    this.swap(0, this.heap.length - 1);
    let val = this.heap.pop();
    this.heapifyDown(this.heap[0], 0);
    return val;
  }

  heapifyUp(val, idx) {
    let parentIdx = this.parentIndex(idx);
    if (idx > 0) {
      this.swap(idx, parentIdx);
      this.heapifyUp(val, parentIdx);
    }
  }

  heapifyDown(val, idx) {
    let childIndices = this.childIndices(idx);
    if (childIndices.left < this.heap.length) {
      this.swap(idx, childIndices.left);
      this.heapifyDown(val, childIndices.left);
    } else if (childIndices.right < this.heap.length) {
      this.swap(idx, childIndices.right);
      this.heapifyDown(val, childIndices.right);
    }
  }
}

class MaxHeap extends Heap {
  heapifyUp(val, idx) {
    let parentIdx = this.parentIndex(idx);
    if (this.heap[parentIdx] < val) {
      this.swap(idx, parentIdx);
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
        this.swap(idx, max);
        this.heapifyDown(val, max);
      }
    } else if (childIndices.left < this.heap.length) {
      if (val < this.heap[childIndices.left]) {
        this.swap(idx, childIndices.left);
        this.heapifyDown(val, childIndices.left);
      }
    } else if (childIndices.right < this.heap.length) {
      if (val < this.heap[childIndices.right]) {
        this.swap(idx, childIndices.right);
        this.heapifyDown(val, childIndices.right);
      }
    }
  }
}

class MinHeap extends Heap {
  heapifyUp(val, idx) {
    let parentIdx = this.parentIndex(idx);
    if (this.heap[parentIdx] > val) {
      this.swap(idx, parentIdx);
      this.heapifyUp(val, parentIdx);
    }
  }

  heapifyDown(val, idx) {
    let childIndices = this.childIndices(idx);
    if (childIndices.left < this.heap.length && childIndices.right < this.heap.length) {
      let min;
      if (this.heap[childIndices.left] < this.heap[childIndices.right]) {
        min = childIndices.left;
      } else {
        min = childIndices.right;
      }
      if (val > this.heap[min]) {
        this.swap(idx, min);
        this.heapifyDown(val, min);
      }
    } else if (childIndices.left < this.heap.length) {
      if (val > this.heap[childIndices.left]) {
        this.swap(idx, childIndices.left);
        this.heapifyDown(val, childIndices.left);
      }
    } else if (childIndices.right < this.heap.length) {
      if (val > this.heap[childIndices.right]) {
        this.swap(idx, childIndices.right);
        this.heapifyDown(val, childIndices.right);
      }
    }
  }
}




let h = new MinHeap;
h.insert(3)
h.insert(5)
h.insert(4)
h.insert(6)
h.insert(-15)
h.insert(0)
h.insert(1000)
console.log(h.heap);
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
console.log(h.extract());
// h.heap = [5, 3, 4, 6]
// console.log(h.heap);
// h.heapifyUp(6, 3);
// console.log(h.heap);
