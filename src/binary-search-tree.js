const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = this._addWithin(this.treeRoot, data);
  }

  _addWithin(node, data) {
    if (!node) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this._addWithin(node.left, data);
    } else if (data > node.data) {
      node.right = this._addWithin(node.right, data);
    }

    return node;
  }

  has(data) {
    return this._searchWithin(this.treeRoot, data) !== null;
  }

  _searchWithin(node, data) {
    if (!node) {
      return null;
    }

    if (node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this._searchWithin(node.left, data);
    } else {
      return this._searchWithin(node.right, data);
    }
  }

  find(data) {
    return this._searchWithin(this.treeRoot, data);
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // Node with no children
      if (!node.left && !node.right) {
        return null;
      }

      // Node with only one child
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Node with two children
      let minRight = this._findMinNode(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this.treeRoot) {
      return null;
    }
    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return null;
    }
    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};
