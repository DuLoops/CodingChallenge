var Tree = function() {
    this.root = null;
}

Tree.prototype.insert = function(node, data) {
    if (node == null){
    	node = new Node(data);
    }
 	else if (data < node.data){
        node.left  = this.insert(node.left, data);
    }
    else{
        node.right = this.insert(node.right, data);   
    }

    return node;
}

var Node = function(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

/* head ends */

/*
    Node is defined as
    var Node = function(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
*/

// This is a "method-only" submission.
// You only need to complete this method.

function preOrderRecursive(root) {
    let st = ''
    if (root) {
        st += `${root.data} `
        st += preOrderRecursive(root.left)
        st += preOrderRecursive(root.right)
    }
    return st
}

function preOrder(root) {
    let st = preOrderRecursive(root)
    console.log(st)
}

/* tail begins */