var table = document.getElementById('dataTable');
var columnCount = 2;
var rowCount = 2;

function addRow() {
    var existingRowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    var row = table.insertRow(existingRowCount);

    //first cell in row
    var cell = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "button";
    var btnName = "button_R" + (rowCount + 1);
    element1.name = btnName;
    element1.setAttribute('value', 'Remove');
    element1.onclick = function() {
        removeRow(btnName)
    }
    element1.className = "btnRemove";
    cell.appendChild(element1);

    //other cells
    for (var i = 1; i < exisitingColumnCount; i++) {
        var cell = row.insertCell(i);
        var element = document.createElement("input");
        element.placeholder = "";
        cell.appendChild(element);
    }
    rowCount++;
}

function removeRow(btnName) {
    var existingRowCount = table.rows.length;
    for (var i = 1; i < existingRowCount; i++) {
        var row = table.rows[i];
        var rowObj = row.cells[0].childNodes[0];
        if (rowObj.name == btnName) {
            table.deleteRow(i);
        }
    }

}

function addColumn() {
    var rowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    var cell = table.rows[0].insertCell(exisitingColumnCount);
    var element1 = document.createElement("input");
    element1.type = "button";
    var btnName = "button_C" + (columnCount + 1);
    element1.name = btnName;
    element1.setAttribute('value', 'Remove');
    element1.className = "btnRemove";
    cell.setAttribute('align', 'center');
    element1.onclick = function() {
        removeColumn(btnName);
    }
    cell.appendChild(element1)

    var cell = table.rows[1].insertCell(exisitingColumnCount);
    var element2 = document.createElement("input");
    element2.placeholder = "Column " + (columnCount + 1);
    element2.setAttribute('id', "Column_" + (columnCount + 1))
    element2.style = "border:none;";
    cell.appendChild(element2);

    for (var i = 2; i < rowCount; i++) {
        var cell = table.rows[i].insertCell(exisitingColumnCount);
        var element = document.createElement("input");
        element.placeholder = "";
        cell.appendChild(element);
    }
    columnCount++;
}

function removeColumn(btnName) {
    var rowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;
    for (var i = 1; i < exisitingColumnCount; i++) {
        var row = table.rows[0];
        var rowObj = row.cells[i].childNodes[0];
        if (rowObj.name == btnName) {
            for (var j = 0; j < rowCount; j++) {
                var row1 = table.rows[j];
                row1.deleteCell(i);
            }
        }
    }
}

function tableToCSV() {
    var csv = [];
    var existingRowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    for (let i = 1; i < existingRowCount; i++) {
        var rowDetails = [];
        for (let j = 1; j < exisitingColumnCount; j++) {
            var row = table.rows[i];
            var rowObj = row.cells[j].childNodes[0];;
            rowDetails.push(rowObj.value);
        }
        csv.push(rowDetails.join(","));
    }

    // Download CSV
    download_csv(csv.join("\n"), "Test Case Document.csv");


}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {
        type: "text/csv"
    }); // CSV FILE
    downloadLink = document.createElement("a"); // Download link
    downloadLink.download = filename; // File name
    downloadLink.href = window.URL.createObjectURL(csvFile); // We have to create a link to the file
    downloadLink.style.display = "none"; // Make sure that the link is not displayed
    document.body.appendChild(downloadLink); // Add the link to your DOM
    downloadLink.click(); // Lanzamos
}


function clearTable() {
    var table = document.getElementById('dataTable');
    var existingRowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    for (var i = existingRowCount - 1; i > 1; i--) {
        table.deleteRow(i);
    }
    for (var j = exisitingColumnCount - 1; j > 0; j--) {
        var row1 = table.rows[0];
        row1.deleteCell(j);
        var row2 = table.rows[1];
        row2.deleteCell(j)
    }
    columnCount = 0;
    rowCount = 0;
}

function processFile() {
    //get table element
    var table = document.getElementById('dataTable');
    //remove existing rows and columns
    clearTable();
    var fileSize = 0;
    //get file
    var theFile = document.getElementById("myFile");

    var regex = /^([a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -])+(.csv|.txt)$/;
    //check if file is CSV
    if (regex.test(theFile.value.toLowerCase())) {
        //check if browser support FileReader
        if (typeof(FileReader) != "undefined") {
            var headerLine = "";
            //create html5 file reader object
            var myReader = new FileReader();
            // call filereader. onload function
            myReader.onload = function(e) {
                var content = myReader.result;
                //split csv file using "\n" for new line ( each row)
                var lines = content.split("\n");
                //loop all rows
                for (var lineCount = 0; lineCount < lines.length; lineCount++) {
                    //split each row content
                    var rowContent = lines[lineCount].split(",");
                    //loop throw all columns of a row
                    for (var cellCount = 0; cellCount < rowContent.length; cellCount++) {
                        //insert column names row data
                        if (lineCount == 0) {
                            addColumn(); //add columns as it is needed
                            var colId = 'Column_' + (cellCount + 1);
                            document.getElementById(colId).value = rowContent[cellCount];
                        }
                    }
                    if (lineCount != 0) {
                        addRow();
                        var rowContent = lines[lineCount].split(",");

                        //loop throw all columns of a row
                        for (var cellCount = 0; cellCount < rowContent.length; cellCount++) {
                            var row = table.rows[lineCount + 1];
                            var rowObj = row.cells[cellCount + 1].childNodes[0];
                            rowObj.value = rowContent[cellCount];
                        }
                    }
                }
            }
            //call file reader onload
            myReader.readAsText(theFile.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }

}
function tableToTxt() {
    var model = [];
    var txt = "";
    var existingRowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    for (let i = 1; i < exisitingColumnCount; i++) {
        var colDetails = "";
        var childData = [];
        var row = table.rows[1];
        var colName = row.cells[i].childNodes[0];

        for (let j = 2; j < existingRowCount; j++) {
            var row = table.rows[j];
            var rowObj = row.cells[i].childNodes[0];
            childData.push(rowObj.value);
        }
        colDetails = colName.value + ": " + childData + "\n";
        txt = txt + colDetails;
    }
    txtFile = new Blob([txt], {
        type: "text/txt"
    });
    downloadLink = document.createElement("a"); // Download link
    downloadLink.download = "Model.txt"; // File name
    downloadLink.href = window.URL.createObjectURL(txtFile); // We have to create a link to the file
    downloadLink.style.display = "none"; // Make sure that the link is not displayed
    document.body.appendChild(downloadLink); // Add the link to your DOM
    downloadLink.click(); // Lanzamos

    setTimeout(alert("Test Case Document Generated Successfully"), 5000);

}
const baseURL = "http://localhost:8080/api/v1/";
function openNavigationWindow() {
    location.href = baseURL + "home/";
    return false;
}