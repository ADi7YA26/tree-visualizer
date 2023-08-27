const viewTree = document.getElementById("viewTree");
const inputValues = document.getElementById('inputValues')
const inputArray = document.getElementById("inputArray");

function changeInputArray(elements){
    inputArray.innerHTML = ''; // clear all the elements before filling it
    try{
        elements = elements.split(',').map(val => parseInt(val.trim()))
    }
    catch(e){
    }
    finally{
        elements.forEach(element => {
            const div = document.createElement('div');
            div.textContent = element;
            inputArray.appendChild(div);
        });
    }

    return;
}
