// Function to create a Min Heap from an array of values
export function createMinHeap(values) {
  const heap = [];

  // Insert elements into the Min Heap
  for (const value of values) {
    heap.push(value);
    heapifyUp(heap, heap.length - 1);
  }

  return heap;
}

// Helper function to maintain Min Heap property
function heapifyUp(heap, index) {
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (heap[parentIndex] <= heap[index]) {
      break;
    }
    // Swap parent and child
    [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
    index = parentIndex;
  }
}
  