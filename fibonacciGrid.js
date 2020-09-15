function clickableGrid(callback) {
  let grid = document.createElement('table');
  grid.className = 'grid';
  for (let r = 0; r < 50; ++r) {
    let tr = grid.appendChild(document.createElement('tr'));
    tr.title = 'row' + r;
    for (let c = 0; c < 50; ++c) {
      let cell = tr.appendChild(document.createElement('td'));
      cell.title = 'column' + c;
      cell.innerHTML = '';
      cell.addEventListener(
        'click',
        (function (el, r, c) {
          return function () {
            callback(el, r, c);
          };
        })(cell, r, c),
        false
      );
    }
  }
  return grid;
}

let grid = clickableGrid(function (el, row, col) {
  let columnId = 'column' + col;
  let columnCells = document.querySelectorAll(`[title=${columnId}]`);
  let rowId = 'row' + row;
  let rowCells = document.querySelector(`[title=${rowId}]`).childNodes;

  [columnCells, rowCells].forEach((cellList) =>
    flashAndAction(cellList, 'yellow')
  );
  // The orignally clicked cell will get 1 added twice
  // Correcting this by subtracting 1
  el.innerHTML = parseInt(el.innerHTML) - 1;

  let cellsInRowOrder = Array.from(document.querySelectorAll('td'));
  let cellsInColumnOrder = [];
  for (let i = 0; i < 50; ++i) {
    cellsInColumnOrder = cellsInColumnOrder.concat(
      Array.from(document.querySelectorAll(`[title=column${i}]`))
    );
  }
  allCells = cellsInRowOrder.concat(cellsInColumnOrder);
  checkFib(allCells);
});

document.body.appendChild(grid);

let checkFib = (allCells) => {
  let fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  // get all the subsets of 5 successive cells
  allCells.forEach(function (cell, i) {
    let nextFive = [];
    for (j = 0; j < 5; j++) {
      nextFive.push(allCells[i + j]);
    }
    let values = nextFive.map((c) => parseInt(c.innerHTML));
    // trying to improve efficiency, return early where possible
    // return if the values are all the same (eg all the zeros at initial state)
    if (values.every((v) => v === values[0])) {
      return;
    }
    // return if any of the values are not in fibonacci
    if (values.some((v) => !fib.includes(v))) {
      return;
    }
    if (sequenceMatch(fib, values)) {
      flashAndAction(nextFive, 'green');
    }
  });
};

let flashAndAction = (cellList, colour) => {
  cellList.forEach(function (cell) {
    cell.className = colour;
    // yellow means we are incrementing, otherwise clear
    colour === 'yellow'
      ? (cell.innerHTML = addOne(cell.innerHTML))
      : (cell.innerHTML = '');
    setTimeout(function () {
      cell.className = '';
    }, 500);
  });
};

let sequenceMatch = (fib, values) => {
  return (
    fib.join().includes(values.join()) ||
    fib.join().includes(values.reverse().join())
  );
};

// this is needed to handle the cells initial empty state
let addOne = (string) => {
  return string === '' ? string + 1 : parseInt(string) + 1;
};
