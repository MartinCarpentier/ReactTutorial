import { Component, MouseEvent } from 'react';
import * as React from 'react';
import '../../index.css';
import { Board } from '../board/board';

interface IGameState {
    history: IHistoryArray[];
    stepNumber: number;
    xIsNext: boolean;
}

interface IHistoryArray {
    squares: string[];
}

const initialState: IGameState = {
    history: [
        {
            squares: Array(9).fill("")
        }
    ],
    stepNumber: 0,
    xIsNext: true
};

export class Game extends Component<{}, Partial<IGameState>> {
    public state: IGameState = initialState;

    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    private calculateWinner(squares: string[]) {
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
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    
    private handleClick = (i: number) => (e: MouseEvent<HTMLElement>) => {
        // tslint:disable-next-line:no-console
        console.log("Square is clicked");
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        // tslint:disable-next-line:no-shadowed-variable
        this.setState((state) => ({
            history: history.concat([
                {
                    squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !(state).xIsNext
        }));
    }

    private jumpTo = (step: number) => (e: MouseEvent<HTMLElement>) => {
        // tslint:disable-next-line:no-console
        console.log("jumpto is clicked");
        this.setState((current) => ({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        }));
    }
}