

//Create players using factory function
const createPlayer = (name, piece) => {
    return {
        name,
        piece
    };
}

// Create gameboard module
const gameBoard = (() => {
    board = ['', '', '', '', '', '', '', '', '']

    const grid = document.getElementById('grid');
    //Array to hold gamesquares
    let allSquares = []

    //Create board
    const gameStart = () => {
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

    }

    gameStart()

    //Reset the board
    const render = () => {
        board = ['', '', '', '', '', '', '', '', '']
        for (i = 0; i < 9; i++) {
            allSquares[i].innerHTML = board[i]
        };

    }


    //Change Square content when clicking
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].addEventListener('click', () => {

            if (board[i] == '') {
                board[i] = gameControl.currentPlayer().piece;
                allSquares[i].innerHTML = board[i]
                gameControl.gameRound++
            }
            checkForWinner()


        })
    }

    function checkForWinner() {
        //Check columns
        function checkX() {
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
            
        }
        function checkO() {
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
        if (checkX() != undefined) {
            alert('Player 1 wins')
        }
        if (checkO() != undefined) {
            alert('Player 2 wins')
        }
        console.log(checkX());
        console.log(checkO());
    }





    return {
        board,
        render,
        allSquares,
        grid
    }
})()




//Control game module
const gameControl = (() => {

    //New Game Button
    const title = document.getElementById('title');
    const newGame = document.createElement('button');
    newGame.innerHTML = 'New Game'
    title.appendChild(newGame);
    newGame.addEventListener('click', () => {
        gameBoard.render()
        gameControl.gameRound = 0;

    })



    const player1 = createPlayer('Player 1', 'x')
    const player2 = createPlayer('Player 2', 'o')



    gameRound = 0;

    function currentPlayer() {
        if (gameControl.gameRound % 2 == 0) {
            return player1;
        } else {
            return player2;
        }
    }




    return {
        player1,
        player2,
        gameRound,
        currentPlayer
    }
})()

