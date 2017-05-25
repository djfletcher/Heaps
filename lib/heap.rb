class MaxHeap
  def self.build_max_heap(arr)

    Heap.new(arr)
  end

  attr_reader :heap

  def initialize(arr)
    @heap = arr
  end

  def [](idx)
    @heap[idx]
  end

  def []=(idx, val)
    @heap[idx] = val
  end

  def size
    @heap.size
  end

  def max_heapify(idx)
    # no need to max_heapify if idx is a leaf
    return self[idx] if is_leaf?(idx)
    left_idx, right_idx = child_indices(idx)

    # no need to heapify unless the max heap is violated at idx
    if out_of_place?(idx)
      larger = larger(left_idx, right_idx)
      self[idx], self[larger] = self[larger], self[idx]
      max_heapify(larger)
    end
  end

  def is_leaf?(idx)
    idx > self.size / 2
  end

  def out_of_place?(idx)
    left_idx, right_idx = child_indices(idx)
    self[idx] < self[left_idx] ||
    right_idx && self[idx] < self[right_idx]
  end

  def larger(left_idx, right_idx)
    return left_idx if !right_idx
    self[left_idx] > self[right_idx] ? left_idx : right_idx
  end

  def child_indices(idx)
    left = 2 * idx + 1
    # there is no right child if left child is last element in heap
    right = (left == self.size - 1) ? nil : left + 1
    [left, right]
  end
end


def build_max_heap(arr)

end


def max(heap)
  heap.first
end

def extract_max(heap)

end

def insert(heap, el)

end




test_heap = MaxHeap.new([6, 9, 8, 4, 7, 3, 2])
test_heap.max_heapify(0)
puts test_heap.heap == [9, 7, 8, 4, 6, 3, 2]
