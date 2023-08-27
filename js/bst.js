// Function to insert a value into the BST
export function insertBST(node, value) {
    if (value < node.value) {
        if (!node.left)
            node.left = new Node(value);
        else 
            insertBST(node.left, value);
        
    } else if (value > node.value) {
        if (!node.right) 
            node.right = new Node(value);
        else 
            insertBST(node.right, value);
    }
}
