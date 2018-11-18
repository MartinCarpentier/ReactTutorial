import {
    Component,
    MouseEvent
} from 'react';
import * as React from 'react';
import '../../index.css';
import { Square } from '../square/square';

interface IBoardProps {
    squares: string[];
    onClick(ID: number): void;
}

interface IBoardState {
    squares: Array<string | undefined>;
    xIsNext?: boolean
}

const initialState = { squares: Array<string>(9).fill(""), xIsNext: true }

export class Board extends Component<IBoardProps, IBoardState> {
    public readonly state: IBoardState = initialState;

    public render() {
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

    private renderSquare(i: number) {
        return <Square
            value={this.props.squares[i]}
            onClick={this.handleClick(i)}
        />;
    }

    private handleClick = (i: number) => (e: MouseEvent<HTMLElement>) => {
        this.props.onClick(i);
    }
}