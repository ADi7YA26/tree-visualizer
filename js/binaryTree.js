// Function to insert a value into the Binary Tree
export function insertBT(levelOrderValues){
    if (!levelOrderValues.length) {
        return null;
    }

    let root = new Node(levelOrderValues.shift());
    let queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        const leftValue = levelOrderValues.shift();
        const rightValue = levelOrderValues.shift();

        if (leftValue !== undefined && leftValue !== null) {
            node.left = new Node(leftValue);
            queue.push(node.left);
        }

        if (rightValue !== undefined && rightValue !== null) {
            node.right = new Node(rightValue);
            queue.push(node.right);
        }
    }
    return root;
}
