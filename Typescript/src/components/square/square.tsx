import * as React from 'react';
import { Component } from 'react';
import { MouseEvent } from 'react';
import '../../index.css';

interface ISquareProps {
    value?: string
    onClick(e: MouseEvent<HTMLElement>): void;
}

export class Square extends Component<ISquareProps, {}> {
    public render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>);
    }
}

// TypeScript function component
// export const Square = (props: ISquareProps) => <button className="square" onClick={props.onClick}>{props.value}</button>;