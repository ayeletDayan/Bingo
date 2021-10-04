'use strict'
var maxNum = +prompt('Insert max number?')
var gNums = getRandomNum(maxNum)
var gPlayers = [
    { name: 'Muki', hitsCount: 0, board: createBingoBoard(5, maxNum), isRowComplets: false, isMainDiagonalComplets: false, isSecondaryDiagonalComplets: false },
    { name: 'Puki', hitsCount: 0, board: createBingoBoard(5, maxNum), isRowComplets: false, isMainDiagonalComplets: false, isSecondaryDiagonalComplets: false }
]

function init(){
    var intervalId = setInterval(function () {
        var randomNum = gNums[gNums.length - 1]
        gNums.pop()
        // console.log(randomNum)
        var isBoardFull = bingo(gPlayers, randomNum)
        if (isBoardFull)
            clearInterval(intervalId)
    }, 1000)
}

function createBingoBoard(size, maxNum) {
    var nums = getRandomNum(maxNum)
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                value: nums.pop(),
                isHit: false
            }
        }
    }
    return board
}

function printBingoBoard(player) {
    var printBoard = []
    for (var j = 0; j < player.board.length; j++) {
        printBoard[j] = []
        for (var k = 0; k < player.board.length; k++) {
            printBoard[j][k] = player.board[j][k].value
        }
    }
    return printBoard
}

function bingo(players, randomNum) {

    printMat(printBingoBoard(players[0]), '.board1');
    printMat(printBingoBoard(players[1]), '.board2');
    // for (var i = 0; i < gPlayers.length; i++) {
    //     printMat(printBingoBoard(players[i]), '.board')       
    // }
    
    for (var i = 0; i < players.length; i++) {
        var currPlayer = players[i]
        var currBoard = currPlayer.board
        for (var j = 0; j < currBoard.length; j++) {
            for (var k = 0; k < currBoard.length; k++) {
                if (currBoard[j][k].value === randomNum) {
                    currBoard[j][k].isHit = true
                    currBoard[j][k].value += 'V'
                    currPlayer.hitsCount++
                }
            }
        }
    }
    for (var i = 0; i < players.length; i++) {
        var currPlayer = players[i]
        var rowCount = checkRowComplets(currPlayer.board)
        if (!currPlayer.isRowComplets && rowCount === 5) {
            alert(currPlayer.name + ' has completed a row!')
            currPlayer.isRowComplets = true
        }
    }
    for (var i = 0; i < players.length; i++) {
        var currPlayer = players[i]
        var mainDiagonalCount = checkMainDiagonalComplets(currPlayer.board)
        if (!currPlayer.isMainDiagonalComplets && mainDiagonalCount === 5) {
            alert(currPlayer.name + ' has completed the main diagonal!')
            currPlayer.isMainDiagonalComplets = true
        }
    }
    for (var i = 0; i < players.length; i++) {
        var currPlayer = players[i]
        var secondaryDiagonalCount = checkSecondaryDiagonalComplets(currPlayer.board)
        if (!currPlayer.isSecondaryDiagonalComplets && secondaryDiagonalCount === 5) {
            alert(currPlayer.name  + ' has completed the Secondary diagonal!')
            currPlayer.isSecondaryDiagonalComplets = true
        }
    }
    // console.table(printBingoBoard(players[0]))
    // console.table(printBingoBoard(players[1]))
    var winners = []
    for (var i = 0; i < players.length; i++) {
        var currPlayer = players[i]
        if (currPlayer.hitsCount === 25) {
            winners.push(currPlayer.name)
            var gameEnd = true
        }
    }
    if (gameEnd) {
        alert('The winner is ' + winners)
        return true
    }
    return false
}