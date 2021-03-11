

//Create players using factory function
const createPlayer = (name, piece) => {
    return {
        name,
        piece
    };
}

// Create gameboard module
const gameBoard = (() => {

    let board = ['', '', '', '', '', '', '', '', '']

    const grid = document.getElementById('grid');
    //Array to hold gamesquares
    let allSquares = []

    //Create board
    function gameStart() {
        board = ['', '', '', '', '', '', '', '', '']
        allSquares = []
        for (i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.setAttribute('id', 's' + [i]);
            newSquare.setAttribute('class', 'square');
            newSquare.innerHTML = board[i];
            grid.appendChild(newSquare);
            allSquares.push(newSquare);
        };
        placePiece();
        gameControl.gameDisplay();
    }

    //Reset the board
    const render = () => {
        board = ['', '', '', '', '', '', '', '', '']
        for (i = 0; i < 9; i++) {
            allSquares[i].innerHTML = board[i]
        };
        gameControl.gameRound = 0;
    }


    //Change Square content when clicking
    function placePiece() {
        for (let i = 0; i < allSquares.length; i++) {
            allSquares[i].addEventListener('click', () => {
                if (board[i] == '') {
                    board[i] = gameControl.currentPlayer().piece;
                    allSquares[i].innerHTML = board[i];
                    gameControl.gameRound++;
                }
                checkForWinner();
                gameControl.gameDisplay();
            })
        }
    }

    //check for winner when adding piece to board
    function checkForWinner() {
        //Check columns
        if (allSquares[0].innerHTML === 'x' && allSquares[3].innerHTML === 'x' && allSquares[6].innerHTML === 'x') {
            return gameControl.player1;
        }
        if (allSquares[1].innerHTML === 'x' && allSquares[4].innerHTML === 'x' && allSquares[7].innerHTML === 'x') {
            return gameControl.player1;
        }
        if (allSquares[2].innerHTML === 'x' && allSquares[5].innerHTML === 'x' && allSquares[8].innerHTML === 'x') {
            return gameControl.player1;
        }

        //Check rows
        if (allSquares[0].innerHTML === 'x' && allSquares[1].innerHTML === 'x' && allSquares[2].innerHTML === 'x') {
            return gameControl.player1;
        }
        if (allSquares[3].innerHTML === 'x' && allSquares[4].innerHTML === 'x' && allSquares[5].innerHTML === 'x') {
            return gameControl.player1;
        }
        if (allSquares[6].innerHTML === 'x' && allSquares[7].innerHTML === 'x' && allSquares[8].innerHTML === 'x') {
            return gameControl.player1;
        }

        //Check diagonal
        if (allSquares[0].innerHTML === 'x' && allSquares[4].innerHTML === 'x' && allSquares[8].innerHTML === 'x') {
            return gameControl.player1;
        }
        if (allSquares[2].innerHTML === 'x' && allSquares[4].innerHTML === 'x' && allSquares[6].innerHTML === 'x') {
            return gameControl.player1;
        }



        //Check columns
        if (allSquares[0].innerHTML === 'o' && allSquares[3].innerHTML === 'o' && allSquares[6].innerHTML === 'o') {
            return gameControl.player2;
        }
        if (allSquares[1].innerHTML === 'o' && allSquares[4].innerHTML === 'o' && allSquares[7].innerHTML === 'o') {
            return gameControl.player2;
        }
        if (allSquares[2].innerHTML === 'o' && allSquares[5].innerHTML === 'o' && allSquares[8].innerHTML === 'o') {
            return gameControl.player2;
        }

        //Check rows
        if (allSquares[0].innerHTML === 'o' && allSquares[1].innerHTML === 'o' && allSquares[2].innerHTML === 'o') {
            return gameControl.player2;
        }
        if (allSquares[3].innerHTML === 'o' && allSquares[4].innerHTML === 'o' && allSquares[5].innerHTML === 'o') {
            return gameControl.player2;
        }
        if (allSquares[6].innerHTML === 'o' && allSquares[7].innerHTML === 'o' && allSquares[8].innerHTML === 'o') {
            return gameControl.player2;
        }

        //Check diagonal
        if (allSquares[0].innerHTML === 'o' && allSquares[4].innerHTML === 'o' && allSquares[8].innerHTML === 'o') {
            return gameControl.player2;
        }
        if (allSquares[2].innerHTML === 'o' && allSquares[4].innerHTML === 'o' && allSquares[6].innerHTML === 'o') {
            return gameControl.player2;
        }

    }

    //Clear board
    function resetBoard() {
        render()
        gameControl.gameDisplay();
    }


    //Reset board button
    const resetButton = document.getElementById('resetButton')
    resetButton.addEventListener('click', () => {
        render()
        gameControl.gameDisplay();
        grid.classList.add('active');
        gameControl.endGameOptions.classList.add('hide');
        grid.classList.remove('blur')
    })


    //Change players after game complete
    const changePlayerBtn = document.getElementById('changePlayer')

    changePlayerBtn.addEventListener('click', () => {
        gameControl.pickPlayer.classList.remove('hide');
        grid.innerHTML = '';
        gameControl.gameRound = 0;
        grid.classList.remove('active');
        gameControl.endGameOptions.classList.add('hide');
        display.textContent = 'Select player names';
        grid.classList.remove('blur');
    })

    //Hide or show end game options
    function endPlate() {
        gameControl.endGameOptions.classList.remove('hide');
        grid.classList.add('blur')
    };

    return {
        board,
        render,
        allSquares,
        grid,
        gameStart,
        checkForWinner,
        resetBoard,
        endPlate
    }
})()


//Control game module
const gameControl = (() => {

    //Selecting players and starting game
    const display = document.getElementById('display');
    const p1Name = document.getElementById('p1name');
    const p2Name = document.getElementById('p2name');
    const pickPlayer = document.getElementById('pick-player');
    const endGameOptions = document.getElementById('endGame');


    display.textContent = 'Select player names';

    //Display current game status
    function gameDisplay() {
        if (gameControl.gameRound == 9 && gameBoard.checkForWinner() == undefined) {
            display.textContent = 'It\'s a draw!';
            gameBoard.endPlate();
        } else if (gameBoard.checkForWinner() === gameControl.player1) {
            display.textContent = gameControl.player1.name + ' Wins!';
            gameBoard.endPlate();
        } else if (gameBoard.checkForWinner() === gameControl.player2) {
            display.textContent = gameControl.player2.name + ' Wins!';
            gameBoard.endPlate();
        } else {
            display.textContent = currentPlayer().name + '\'s turn'
        }
    }


    //submit names and start game
    const startGame = document.getElementById('nameSubmit')
    startGame.classList.add('button', 'start')
    startGame.addEventListener('click', () => {
        gameBoard.grid.innerHTML = '';
        if (p1Name.value == '') {
            gameControl.player1 = createPlayer('Player 1', 'x')
        } else {
            gameControl.player1 = createPlayer(p1Name.value, 'x');
        }
        if (p2Name.value == '') {
            gameControl.player2 = createPlayer('Player 2', 'o')
        } else {
            gameControl.player2 = createPlayer(p2Name.value, 'o');
        }
        gameBoard.gameStart();
        gameBoard.grid.classList.add('active');
        pickPlayer.classList.add('hide');
    });


    gameRound = 0;

    function currentPlayer() {
        if (gameControl.gameRound % 2 == 0) {
            return gameControl.player1;
        } else {
            return gameControl.player2;
        }
    }

    return {
        gameRound,
        currentPlayer,
        gameDisplay,
        endGameOptions
    }
})()

