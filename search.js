// get the search input field
const searchField = document.getElementsByClassName('search-field')[0];

// searchField va attendre jusqua ce qu'il y ai un "input" event (user writes in the field)
searchField.addEventListener('input', function() {
    // get the search input
    const searchInput = searchField.value.toLowerCase();

    // get all the rows in the table
    const rows = document.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // skip the first row (the column titles thead)
      // get the cells in the current row
      const cells = rows[i].getElementsByTagName('td');
  
      let found = false;
  
      // loop through the cells in the row
      for (let j = 0; j < cells.length; j++) {
        // check if the search input is present in the cell's content
        if (cells[j].innerHTML.toLowerCase().indexOf(searchInput) > -1) {
          found = true;
          break;
        }
      }
  
      // si le search input was found, show row (hide sinon)
      if (found) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  });
