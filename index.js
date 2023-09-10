class Node {
  constructor(data) {
    this.data = data
    this.leftChild = null
    this.rightChild = null
  }
}

class Tree {
  constructor(arr) {
    this.array = this.formatArray(arr)
    this.root = this.createBST(this.array, 0, this.array.length - 1)
  }

  formatArray(array) {
    // Removes the duplicates
    const filterDuplicates = array.filter(
      (value, index) => array.indexOf(value) === index
    )

    // Ascend sort
    const sortArray = filterDuplicates.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })

    return sortArray
  }

  createBST(array, start, end) {
    if (start > end) return null

    const mid = Math.round((start + end) / 2)
    const node = new Node(array[mid])

    node.leftChild = this.createBST(array, start, mid - 1)
    node.rightChild = this.createBST(array, mid + 1, end)
    // console.log(array)
    return node
  }

  insert(data, root = this.root) {
    const node = new Node(data)
    if (root === null) {
      root = node
      return root
    }

    if (root.data > data) {
      root.leftChild = this.insert(data, root.leftChild)
    } else if (root.data < data) {
      root.rightChild = this.insert(data, root.rightChild)
    }
    return root
  }

  delete(data, root = this.root) {
    if (this.root === null) {
      return root
    }
    // Traverse
    if (root.data > data) {
      root.leftChild = this.delete(data, root.leftChild)
      return root
    } else if (root.data < data) {
      root.rightChild = this.delete(data, root.rightChild)
      return root
    }

    // FOUND A MATCH!
    // CAE 1 ITS A LEAF NODE
    // Since its pointing directly to the current node we can return null
    if (root.leftChild === null && root.rightChild === null) {
      return null
    }

    // CASE 2 ONLY ONE CHILD IS NULL
    if (root.leftChild === null) {
      let temp = root.rightChild
      root = null
      return temp
    } else if (root.rightChild === null) {
      let temp = root.leftChild
      root = null
      return temp
    }

    // CASE 3 BOTH CHILDREN EXIST

    let parentSuccessor = root
    let successor = parentSuccessor.rightChild

    while (successor.leftChild != null) {
      parentSuccessor = successor
      successor = successor.leftChild
    }

    // When the successor has a right child make the parent point to it
    if (parentSuccessor != root) {
      parentSuccessor.leftChild = successor.rightChild
    } else {
      parentSuccessor.rightChild = successor.rightChild
    }

    root.data = successor.data

    return root
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      )
    }
  }

  find(key, root = this.root) {
    if (root === null) {
      return null
    }
    if (key > root.data) {
      return this.find(key, root.rightChild)
    }
    if (key < root.data) {
      return this.find(key, root.leftChild)
    }
    // If the two condtions before are not met then we found a match
    return root
  }

  levelOrder(root = this.root) {
    if (root === null) return
    const q = []
    q.push(root)
    let current
    while (q.length !== 0) {
      current = q[0]
      console.log(current.data)
      if (current.leftChild != null) q.push(current.leftChild)
      if (current.rightChild != null) q.push(current.rightChild)
      q.splice(0, 1)
    }
  }

  height(root = this.root) {
    if (root == null) return 0

    let leftHeight = this.height(root.leftChild)
    let rightHeight = this.height(root.rightChild)

    if (leftHeight > rightHeight) return leftHeight + 1

    return rightHeight + 1
  }

  depth(key, root = this.root) {
    if (root === null) return
    if (key < root.data) {
      return this.depth(key, root.leftChild) + 1
    }

    if (key > root.data) {
      return this.depth(key, root.rightChild) + 1
    }

    if (key === root.data) {
      return 0
    }
  }

  isBalanced(root = this.root) {
    if (root === null) return
    let leftHeight = this.height(root.leftChild)
    let rightHeight = this.height(root.rightChild)

    let calculateHeight = Math.abs(leftHeight - rightHeight)
    if (calculateHeight > 1) return false
    return true
  }

  rebalance() {
    const arr = []

    inorder(this.root, add)

    function add(value) {
      arr.push(value)
    }

    this.createBST(arr, 0, arr.length - 1)
  }
}

// Main
const array = []
for (let i = 0; i < 100; i++) {
  const randomNum = Math.floor(Math.random() * 100)
  array.push(randomNum)
}

const tree = new Tree(array)
tree.prettyPrint()
console.log(tree.isBalanced())
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

// const tree = new Tree(array)
//
// tree.prettyPrint()
// tree.insert(1001)
// // tree.insert(1001)
// tree.insert(200)
// tree.insert(350)
// tree.insert(400)
//
// tree.rebalance()
// tree.prettyPrint()
// tree.levelOrder()
// inorder(tree.root)

// preorder(tree.root)
// console.log("height: " + tree.height())
// console.log(tree.find(6345))

// console.log("Node found")
// console.log(nodeToFind)
// tree.delete(4)
// tree.prettyPrint()

// // tree.delete(9)
// // tree.delete(3)
// tree.prettyPrint()

function preorder(root) {
  if (root === null) return

  console.log(root.data)
  preorder(root.leftChild)
  preorder(root.rightChild)
}

function inorder(root, add) {
  if (root === null) return
  inorder(root.leftChild, add)

  if (add === null) console.log(root.data)
  else add(root.data)
  inorder(root.rightChild, add)
}

function postorder(root) {
  if (root === null) return
  postorder(root.leftChild)
  postorder(root.rightChild)
  console.log(root.data)
}
