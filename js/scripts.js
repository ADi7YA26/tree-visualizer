import { insertBST } from './bst.js'
import { insertAVL } from './avl.js';
import { createMaxHeap } from './maxHeap.js';
import { createMinHeap } from './minHeap.js';
import { insertBT } from './binaryTree.js';


// Function to create a BST or AVL tree from an array of values
function createStructure(values, structureType) {
  if (structureType === 'visualizeBST' || structureType === 'visualizeAVL') {
    let root = new Node(values[0]);
    for (let i = 1; i < values.length; i++) {
      if (structureType === 'visualizeAVL') {
        root = insertAVL(root, values[i]);
      } 
      else if (structureType === 'visualizeBST') {
        insertBST(root, values[i]);
      }
    }
    return root;
  } 
  else if (structureType === 'visualizeBT') {
    return insertBT(values);
  }
  else if (structureType === 'visualizeMaxHeap') {
    const heap =  createMaxHeap(values);
    changeInputArray(heap);
    return insertBT(heap);
  }
  else if (structureType === 'visualizeMinHeap') {
    const heap =  createMinHeap(values);
    changeInputArray(heap);
    return insertBT(heap);
  }
  return null;
}

// Set the dimensions and margins of the diagram
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
width = 1560 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Declare a tree layout and assign the size
const treemap = d3.tree().size([width, height]);

// Create a structure (BST, AVL, Max Heap, Min Heap) from the input values
function visualizeStructure(structureType) {
    const inputValues = document.getElementById('inputValues').value.split(',').map(val => parseInt(val.trim()));
    const treeData = createStructure(inputValues, structureType);

    // Clear any existing SVG content
    d3.select('svg').remove();

    // Append the svg object to the body of the page
    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Assign the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, d => [d.left, d.right].filter(Boolean));

    // Map the node data to the tree layout
    treemap(nodes);

    // Adds the links between the nodes
    const link = g.selectAll(".link")
        .data(nodes.links())
        .enter().append("path")
        .attr("class", "link")
        .style("stroke", d => d.target.data.level)
        .attr("d", d => `
          M${d.source.x},${d.source.y}
          L${d.target.x},${d.target.y}
        `);

    // Adds each node as a group
    const node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => `translate(${d.x},${d.y})`);
        
    // Adds the circle to the node
    node.append("circle")
        .attr("r", 20) // Fixed radius
        .style("stroke", d => d.data.type)
        .style("fill", d => d.data.level);

    // Adds the text to the node
    node.append("text")
    .text(d => d.data ? (d.data === null ? "Null" : d.data.value) : "")
    .style("font-size", "14px");


}


const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
      btn.classList.remove('activeBtn');
    });
    button.classList.add('activeBtn');

    visualizeStructure(button.id)

    const tree = button.innerHTML.replace('Visualize ', '');
    viewTree.innerText = tree.toUpperCase();
    changeInputArray(inputValues.value);
  });
});


window.onload = function(){
  let input = [50,30,31,70,20,60,80,15,25,55,65,75,85];
  let inputTest = document.getElementById("inputValues")
  changeInputArray(input)
  inputTest.value = input;
  visualizeStructure('visualizeBT');
}