class MinHeap {
  constructor() {
      this.heap = []
  }
  
  swap(a, b) {
      const temp = this.heap[a]
      this.heap[a] = this.heap[b]
      this.heap[b] = temp
  }
  
  heapifyUp(idx) {
      if (idx <= 0) return null
      const parentIdx = this.getParent(idx)
      if (this.heap[parentIdx] > this.heap[idx]) {
          this.swap(idx, parentIdx)
          this.heapifyUp(parentIdx)
      }
  }
  
  heapifyDown(idx) {
      const left = this.getLeftC(idx)
      const right = this.getRightC(idx)
      const h = this.heap
      if (idx >= h.length || left >= h.length) return
      
      if (h[idx] > h[right] && h[right] < h[left]) {
          this.swap(idx, right)
          this.heapifyDown(right)
      } else if (h[idx] > h[left]) {
          this.swap(idx, left)
          this.heapifyDown(left)
      }
  }
  
  insert(val) {
      this.heap.push(val)
      this.heapifyUp(this.heap.length - 1)
  }
  
  remove(val) {
      const h = this.heap
      if (h.length <= 1) return h.pop()
      
      let idx = h.findIndex(item => item == val)
      if (idx == h.length - 1) {
          h.pop()
          return
      } 
      h[idx] = h.pop()
      this.heapifyDown(idx)
      this.heapifyUp(idx)
  }
  
  peek() {
      return this.heap[0]
  }
  
  getLeftC(idx) {
      return idx * 2 + 1
  }
  
  getRightC(idx) {
      return idx * 2 + 2
  }
  
  getParent(idx) {
      return Math.floor((idx - 1) / 2)
  }
  
  
}

function processData(input) {
  const inputA = input.split(/\s+/)
  const a = new MinHeap()
  let q = inputA.shift();
  let query, val;
  while (q--) {
      query = inputA.shift()
      if (query == 1) {
          a.insert(parseInt(inputA.shift()))
      } else if (query == 2) {
          a.remove(parseInt(inputA.shift()))
      } else {
        console.log(a.peek())
      }
  }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
let count = 0
process.stdin.on("data", function (input) {
  _input += input;
  if (count++ == 23) {
    processData(_input);
  }
});

process.stdin.on("end", function () {
 processData(_input);
});
