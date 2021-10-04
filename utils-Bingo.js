function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function shuffle(items) {
  var randIdx, keep, i
  for (var i = items.length - 1; i > 0; i--) {
      randIdx = Math.floor(Math.random() * (items.length - 1))
      keep = items[i]
      items[i] = items[randIdx]
      items[randIdx] = keep
  }
  return items
}

function getRandomNum(maxNum) {
  var nums = []
  for (var i = 1; i <= maxNum; i++) {
      nums.push(i)
  }
  shuffle(nums)
  return nums
}

function checkRowComplets(bord) {
  for (var i = 0; i < bord.length; i++) {
      var rowCount = 0
      for (var j = 0; j < bord.length; j++) {
          if (bord[i][j].isHit)
              rowCount++
      }
      if (rowCount === 5) return rowCount
  }
}

function checkMainDiagonalComplets(bord) {
  var rowCount = 0
  for (var i = 0; i < bord.length; i++) {
      if (bord[i][i].isHit) rowCount++
  }
  return rowCount
}

function checkSecondaryDiagonalComplets(bord) {
  var rowCount = 0
  for (var i = 0; i < bord.length; i++) {
      if (bord[i][bord.length - 1 - i].isHit) rowCount++
  }
  return rowCount
}
