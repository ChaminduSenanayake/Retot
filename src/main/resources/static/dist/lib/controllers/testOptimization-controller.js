var table = document.getElementById('dataTable');
var columnCount = 2;
var rowCount = 2;
$(document).ready(function () {
    $('#selectedItem').css('font-weight','bold')
});

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
    element1.onclick = function () {
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
    element1.onclick = function () {
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

function tableToCSV(table) {
    var csv = [];
    var existingRowCount = table.rows.length;
    var exisitingColumnCount = table.rows[0].cells.length;

    for (let i = 1; i < existingRowCount; i++) {
        var rowDetails = [];
        for (let j = 1; j < exisitingColumnCount; j++) {
            var row = table.rows[i];
            var rowObj = row.cells[j].childNodes[0];
            ;
            rowDetails.push(rowObj.value);
        }
        csv.push(rowDetails.join(","));
    }

    csvFile = new Blob([csv.join("\n")], {
        type: "text/csv"
    });
    return csvFile;
}

function downloadCSV() {
    event.preventDefault();
    let csvFile = tableToCSV(table);
    let downloadLink;
    let filename = $('#txtFileName').val();
    downloadLink = document.createElement("a"); // Download link
    downloadLink.download = filename; // File name
    downloadLink.href = window.URL.createObjectURL(csvFile); // We have to create a link to the file
    downloadLink.style.display = "none"; // Make sure that the link is not displayed
    document.body.appendChild(downloadLink); // Add the link to your DOM
    downloadLink.click(); // Lanzamos
}


function clearTable() {
    let table = document.getElementById('dataTable');
    let existingRowCount = table.rows.length;
    let exisitingColumnCount = table.rows[0].cells.length;

    for (let i = existingRowCount - 1; i > 1; i--) {
        table.deleteRow(i);
    }
    for (let j = exisitingColumnCount - 1; j > 0; j--) {
        let row1 = table.rows[0];
        row1.deleteCell(j);
        let row2 = table.rows[1];
        row2.deleteCell(j)
    }
    columnCount = 0;
    rowCount = 0;
}

function processCSVFile() {
    //get table element
    var table = document.getElementById('dataTable');

    var fileSize = 0;
    //get file
    var theFile = document.getElementById('myFile');

    var regex = /^([a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -])+(.csv|.txt)$/;
    //check if file is CSV
    if (regex.test(theFile.value.toLowerCase())) {
        //remove existing rows and columns
        clearTable();
        //check if browser support FileReader
        if (typeof (FileReader) != "undefined") {
            var headerLine = "";
            //create html5 file reader object
            var myReader = new FileReader();
            // call filereader. onload function
            myReader.onload = function (e) {
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
            if(rowObj.value){
                childData.push(rowObj.value);
            }

        }
        colDetails = colName.value + ": " + childData + "\n";
        txt = txt + colDetails;
    }
    txtFile = new Blob([txt], {
        type: "text/txt"
    });
    return txtFile;
    // downloadLink = document.createElement("a"); // Download link
    // downloadLink.download = "Model.txt"; // File name
    // downloadLink.href = window.URL.createObjectURL(txtFile); // We have to create a link to the file
    // downloadLink.style.display = "none"; // Make sure that the link is not displayed
    // document.body.appendChild(downloadLink); // Add the link to your DOM
    // downloadLink.click(); // Lanzamos

    //setTimeout(alert("Test Case Document Generated Successfully"), 5000);
}

function openNavigationWindow() {
    location.href = baseURL + "home/";
    return false;
}

function openDownloadCSVModal() {
    let downloadTableModal = new bootstrap.Modal(document.getElementById('downloadTableModal'));
    $('#downloadTableModal').on('show.bs.modal', function (event) {
        let modal = $(this);
    })
    downloadTableModal.show();
}

function saveDataTable() {
    let formData = new FormData();
    formData.append('testTableCSV', tableToCSV(table));
    formData.append('fileName', $('#txtFileName').val());

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: baseURL + "testOptimization/saveDataTable",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                swal("Good job!", response.message, "success");
            } else {
                swal("OOps!", response.message, "error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
    event.preventDefault();
}

function generateTestCaseDocument() {
    let formData = new FormData();
    formData.append('testTxt', tableToTxt());
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: baseURL + "testOptimization/optimize",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if(response.success){
                let testCaseModal = new bootstrap.Modal(document.getElementById('generaedTestCasesModal'));
                $('#generaedTestCasesModal').on('show.bs.modal', function (event) {
                    let modal = $(this);
                    modal.find('#generatedTestCasesMsg').text(response.message);
                    modal.find('#downloadDocBtn').attr("href",response.fileDownloadUri);
                    if(!response.success){
                        modal.find('#downloadDocBtn').css("display","none");
                    }
                })
                testCaseModal.show();
            }else{
                swal("OOps!","Unable to Generate Pairwise Testcase Document", "error");
            }
        },
        error: function (error) {
            swal("OOps!","Unable to Generate Pairwise Testcase Document", "error");
        }
    })
    event.preventDefault();
}
function logOut(){
    location.href = baseURL+"user/logout"
}
function openDocumentWindow() {
    swal("OOps!","This page is under construction", "error");
}