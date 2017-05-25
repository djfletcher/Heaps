class MaxHeap
  def self.build_max_heap(arr)

    Heap.new(arr)
  end

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
    return self[idx] if idx > self.size / 2
    left_idx = 2 * (idx + 1)
    right_idx = left_idx + 1

    # if the max heap is violated at idx
    if self[idx] < self[left_idx] || self[idx] < self[right_idx]
      larger = self[left_idx] > self[right_idx] ? left_idx : right_idx
      self[idx], self[larger] = self[larger], self[idx]
      max_heapify(larger)
    end
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
