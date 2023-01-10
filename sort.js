var headerCells = document.querySelectorAll("th");
var arrows = document.getElementsByClassName("thead-arrow");

// on commence tjrs avec le sort order descending (choix personnel)
var sortOrder = "desc"; 
var lastClickedCell = 0


for (var i = 0; i < headerCells.length; i++) {
  headerCells[i].addEventListener("click", function() {
    // toggle the sort order variable
    sortOrder = sortOrder === "asc" ? "desc" : "asc";

    // index of clicked header cell
    var col = this.cellIndex;

    // check if the last clicked cell is the same as current clicked pr init les arrows et lordre
    if (lastClickedCell != col) {
        resetArrows(lastClickedCell)
    }

    whichArrowToToggle(col, sortOrder)

    // get the table element
    var table = this.closest("table");

    sortTable(table, col);

    // update last clicked cell
    lastClickedCell = col
  });
}

function whichArrowToToggle(index, order) {
    // explication: chaque colonne contains 2 arrows, arrowup etant la premiere et down la deuxieme
    //              depending on the order, on va hide la premiere ou la deuxieme
    //              "index" given by argument nous donne la colonne a sort
    if (order == "asc") {
        arrows[(2 * index)].classList.toggle("hide")
        arrows[(2 * index) + 1].classList.remove("hide")
    } else {
        arrows[(2 * index) + 1].classList.toggle("hide")
        arrows[(2 * index)].classList.remove("hide")
    }
}

function resetArrows(index) {
    // explication: given l'index de la colonne, on va reset les arrows pr que les 2 soient visible
    arrows[(2 * index)].classList.remove("hide")
    arrows[(2 * index) + 1].classList.remove("hide")
    sortOrder = "desc"
}

function sortTable(table, col) {
    var rows = table.rows;
    // get all the rows except the first one (the header row)
    var dataRows = [].slice.call(rows, 1);

    var sortedRows = dataRows.sort(function(a, b) {
        var cellA = a.cells[col].textContent;
        var cellB = b.cells[col].textContent;

        // compare the cell values and return 1, 0, or -1 depending on the sort order
        if (sortOrder === "asc") {
        if (cellA < cellB) return 1;
        if (cellA > cellB) return -1;
        return 0;
        } else {
        if (cellA < cellB) return -1;
        if (cellA > cellB) return 1;
        return 0;
        }
    });

    // replace the data rows in the table with the sorted rows
    for (var i = 0; i < sortedRows.length; i++) {
        table.appendChild(sortedRows[i]);
    }
}