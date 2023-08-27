// Function to insert a value into the AVL tree
export function insertAVL(node, value) {
    if (!node) {
        return { value, left: null, right: null, height: 1 };
    }

    if (value < node.value) {
        node.left = insertAVL(node.left, value);
    } else if (value > node.value) {
        node.right = insertAVL(node.right, value);
    }

    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

    const balance = getBalance(node);

    if (balance > 1 && value < node.left.value) {
        return rotateRight(node);
    }

    if (balance < -1 && value > node.right.value) {
        return rotateLeft(node);
    }

    if (balance > 1 && value > node.left.value) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }

    return node;
}

// Get the height of a node
function getHeight(node) {
    return node ? node.height : 0;
}

// Get the balance factor of a node
function getBalance(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

// Rotate a subtree to the right
function rotateRight(node) {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    newRoot.height = 1 + Math.max(getHeight(newRoot.left), getHeight(newRoot.right));
    return newRoot;
}

// Rotate a subtree to the left
function rotateLeft(node) {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    newRoot.height = 1 + Math.max(getHeight(newRoot.left), getHeight(newRoot.right));
    return newRoot;
}