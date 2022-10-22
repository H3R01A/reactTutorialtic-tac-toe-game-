import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


/** Original class method for Square component
 * 
 * 
 class Square extends React.Component {

    // onClick={() => this.props.onClick()}
    //did this because the anonymous function definition removes the issue with "this" binding. Also remember you are passing a function definition so when you select the button you are going to invoke the onClick function that was passed from the board.



    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}
 * 
 */

function Square(props) {

    return (

        <button className='square' onClick={props.onClick}>{props.value}</button>

    )
}


class Board extends React.Component {
    //Removed to implement Time Travel
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //         squares: Array(9).fill(null),
    //         xIsNext: true
    //     };
    // }

    //this is moved to the Game Component to implement time travel
    // handleClick(i) {
    //     //creates a shallow copy of the squares array defined in state above
    //     const squares = this.state.squares.slice();

    //     //return early if someone has won
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }

    //     //reassign at the specific index to 'X' or 'O' depending on the boolean value of xIsNext. If xIsNext is true, then X will be assigned. Otherwise O is assigned
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     //use setState to re-render the enter board and thus squares
    //     this.setState({

    //         squares: squares,
    //         //reassigning the xIsNext to to be the opposite boolean value
    //         xIsNext: !this.state.xIsNext

    //     });
    // }

    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        //The below line was originally in the return, but we don't need it because we create a status in the Game Component
        //<div className="status">{status}</div>
        return (
            <div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{

                squares: Array(9).fill(null)
            }],
            xIsNext: true
        };
    }


    handleClick(i) {

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            //concat returns a new array. Better than push. Push actually mutates the original array
            //we are combining an array of an object [ { squares } ] with the current history array of an object [ { } ]
            history: history.concat([{
                squares: squares
            }]),

            xIsNext: !this.state.xIsNext

        });

    }
    render() {

        const history = this.state.history;
        //this accesses the most recent "object" with a "state" property of a squares array
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);


        const moves = history.map((step, move) => {

            const desc = move ?
                'Go to move #' + move :
                'Go to game start';


            return (

                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

