//Resources utilized along side w3School:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/insertCell
// https://www.w3schools.com/jsref/dom_obj_table.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
const form = document.getElementById('inputform');
const inputErrorMsg = document.getElementById('inputErrorMsg');
const jsTable = document.getElementById('dynTable');
const submit = document.getElementById('submit');

submit.addEventListener('click', errorCheck);

//error checks inputs BEFORE proccessing them to prevent slowdowns
function errorCheck() {
    //clear previous errors
    inputErrorMsg.innerHTML = '';
    document.getElementById('xStart').classList.remove('error');
    document.getElementById('xEnd').classList.remove('error');
    document.getElementById('yStart').classList.remove('error');
    document.getElementById('yEnd').classList.remove('error');

    //parseInt required to keep values as numbers despire being passed as a number from html
    const xStart = parseInt(document.getElementById('xStart').value);
    const xEnd = parseInt(document.getElementById('xEnd').value);
    const yStart = parseInt(document.getElementById('yStart').value);
    const yEnd = parseInt(document.getElementById('yEnd').value);
    console.log("values recieved: " + xStart, xEnd, yStart, yEnd);

    //error checking
    //input is not a number
    if (isNaN(xStart)) {
        inputErrorMsg.innerHTML += 'Error: Start value of X is not a number<br>';
        document.getElementById('xStart').classList.add('error');
    }
    if (isNaN(xEnd)) {
        inputErrorMsg.innerHTML += 'Error: End value of X is not a number<br>';
        document.getElementById('xEnd').classList.add('error');
    }
    if (isNaN(yStart)) {
        inputErrorMsg.innerHTML += 'Error: Start value of Y is not a number<br>';
        document.getElementById('yStart').classList.add('error');
    }
    if (isNaN(yEnd)) {
        inputErrorMsg.innerHTML += 'Error: End value of Y is not a number<br>';
        document.getElementById('yEnd').classList.add('error');
    }



    //flipped start and end values
    if (xStart > xEnd) {
        inputErrorMsg.innerHTML += 'Error: Start value of X is greater than its end value<br>';
        document.getElementById('xStart').classList.add('error');
        document.getElementById('xEnd').classList.add('error');
    }
    if (yStart > yEnd) {
        inputErrorMsg.innerHTML += 'Error: Start value of Y is greater than its end value<br>';
        document.getElementById('yStart').classList.add("error");
        document.getElementById('yEnd').classList.add("error");
    }
    //huge numbers
    if (xStart > 1000000000) {
        inputErrorMsg.innerHTML += 'Error: Start value of X is too large. Max value of 1000000000 <br>';
        document.getElementById('xStart').classList.add('error');
    }
    if (xEnd > 1000000000) {
        inputErrorMsg.innerHTML += 'Error: End value of X is too large. Max value of 1000000000 <br>';
        document.getElementById('xEnd').classList.add('error');
    }
    if (yStart > 1000000000) {
        inputErrorMsg.innerHTML += 'Error: Start value of Y is too large. Max value of 1000000000 <br>';
        document.getElementById('yStart').classList.add('error');
    }
    if (yEnd > 1000000000) {
        inputErrorMsg.innerHTML += 'Error: End value of Y is too large. Max value of 1000000000 <br>';
        document.getElementById('yEnd').classList.add('error');
    }
    if (Math.abs(xStart - xEnd) > 100) {
        inputErrorMsg.innerHTML += 'Error: Range of X is too large. Max range of 100 allowed <br>';
        document.getElementById('xStart').classList.add('error');
        document.getElementById('xEnd').classList.add('error');
    }
    if (Math.abs(yStart - yEnd) > 100) {
        inputErrorMsg.innerHTML += 'Error: Range of Y is too large. Max range of 100 allowed <br>';
        document.getElementById('yStart').classList.add('error');
        document.getElementById('yEnd').classList.add('error');
    }

    console.log("State of error message: " + inputErrorMsg.innerHTML);
    if (inputErrorMsg.innerHTML == '') {
        fillTable(xStart, xEnd, yStart, yEnd);
    }

}

//this function adds colums from xStart to xEnd and rows from yStart to yEnd. Each cell is the product of the row and column. The first cell is blank
function fillTable(xStart, xEnd, yStart, yEnd) {
    console.log("values recieved for the table: " + xStart, xEnd, yStart, yEnd);
    console.log("creating table now");
    const table = document.getElementById('dynTable');
    console.log("cleaning old table if it exists");
    table.innerHTML = ''; //clear past table

    //create first row and a blank cell in top left corner so numbers align correctly
    table.insertRow();//adds a row
    //.insertCell() is not capable of making <th> cells, so this is used
    injectHeader(table, 0, " ");

    //fills top row with values from xStart and xEnd
    for (let i = xStart; i <= xEnd; i++) {
        injectHeader(table, 0, i);
    }

    //populates proceding row values from yStart to yEnd, and finds products along the way
    for (let i = yStart, rowCount = 1; i <= yEnd; i++, rowCount++) {
        table.insertRow(); //creates currnt new row
        injectHeader(table, rowCount, i); //inject the y number as header
        for (let j = xStart; j <= xEnd; j++) {
            table.rows[rowCount].insertCell().innerHTML = i * j;//same application of rowCount
        }
    }
}

//Injects a header into the next possition given the
//table, the row depth, and the value wanted in the cell
function injectHeader(table, rowDepth, value) {
    let Headers = document.createElement("th");
    headerRow = table.rows[rowDepth];
    Headers.innerHTML = value;
    headerRow.appendChild(Headers);
}