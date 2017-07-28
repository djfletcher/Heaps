// Source: https://www.hackerrank.com/challenges/ctci-find-the-running-median
// Find the running median of a list

class MedianTracker {
  constructor() {
    this.largeNums = new MinHeap;
    this.smallNums = new MaxHeap;
  }

  getMedian() {
    if (this.largeNums.size() > this.smallNums.size()) {
      return this.largeNums.peek();
    } else if (this.smallNums.size() > this.largeNums.size()) {
      return this.smallNums.peek();
    } else {
      return (this.largeNums.peek() + this.smallNums.peek()) / 2;
    }
  }

  even() {
    return (this.largeNums.size() + this.smallNums.size()) % 2 === 0;
  }

  rebalance() {
    if (this.largeNums.size() - this.smallNums.size() > 1) {
      this.migrate(this.largeNums, this.smallNums);
    } else if (this.smallNums.size() - this.largeNums.size() > 1) {
      this.migrate(this.smallNums, this.largeNums);
    }
  }

  insert(val) {
    if (val >= this.largeNums.peek()) {
      this.largeNums.insert(val);
    }
    else {
      this.smallNums.insert(val);
    }
    this.rebalance();
  }

  migrate(fromHeap, toHeap) {
    toHeap.insert(fromHeap.extract());
  }
}



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

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  swap(idx1, idx2) {
    if (idx1 >= this.size() || idx2 >= this.size()) {
      throw "Index out of bounds";
    }
    let val1 = this.heap[idx1];
    let val2 = this.heap[idx2];
    this.heap[idx1] = val2;
    this.heap[idx2] = val1;
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(val, this.size() - 1);
  }

  extract() {
    if (this.size() === 0) {
      return undefined;
    }
    this.swap(0, this.size() - 1);
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
    if (childIndices.left < this.size()) {
      this.swap(idx, childIndices.left);
      this.heapifyDown(val, childIndices.left);
    } else if (childIndices.right < this.size()) {
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
    if (childIndices.left < this.size() && childIndices.right < this.size()) {
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
    } else if (childIndices.left < this.size()) {
      if (val < this.heap[childIndices.left]) {
        this.swap(idx, childIndices.left);
        this.heapifyDown(val, childIndices.left);
      }
    } else if (childIndices.right < this.size()) {
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
    if (childIndices.left < this.size() && childIndices.right < this.size()) {
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
    } else if (childIndices.left < this.size()) {
      if (val > this.heap[childIndices.left]) {
        this.swap(idx, childIndices.left);
        this.heapifyDown(val, childIndices.left);
      }
    } else if (childIndices.right < this.size()) {
      if (val > this.heap[childIndices.right]) {
        this.swap(idx, childIndices.right);
        this.heapifyDown(val, childIndices.right);
      }
    }
  }
}


let m = new MedianTracker
m.insert(5)
m.insert(1)
m.insert(3)
m.insert(2)
m.insert(1)
console.log(m.getMedian());
