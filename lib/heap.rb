class MaxHeap
  def self.build_max_heap(arr)
    # only need to heapify from middle of array to beginning
    # because every element after n/2 is a leaf
    heap = Heap.new(arr)
    (heap.size / 2).downto(0) { |i| max_heapify(i) }
    heap
  end

  attr_reader :size

  def initialize(array)
    # underlying data structure for heap will be implemented as an array
    @array = array
    @size = array.size
  end

  def [](idx)
    @array[idx]
  end

  def []=(idx, val)
    @array[idx] = val
  end

  def ==(other_heap)
    return false if self.size != other_heap.size
    @size.times do |i|
      return false if self[i] != other_heap[i]
    end

    true
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

  def extract_max!
    return nil if @size == 0
    max = @array.first
    @array[0], @array[size - 1] = @array[size - 1], @array[0]
    @size -= 1
    max_heapify(0)
    max
  end

  def insert(el)
    # dregs = @array[size..-1]
    # @array[size] = el
    # @array = @array[0..size] + dregs
    # @size += 1
  end
end




test_heap = MaxHeap.new([6, 9, 8, 4, 7, 3, 2])
test_heap.max_heapify(0)
puts test_heap == [9, 7, 8, 4, 6, 3, 2]
puts test_heap.extract_max! == 9
puts test_heap == [8, 7, 3, 4, 6, 2]
# test_heap.insert(9)
# puts test_heap == [9, 7, 8, 4, 6, 3, 2]
