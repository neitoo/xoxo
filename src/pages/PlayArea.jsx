import React, { Component } from "react";
import "../styles/PlayArea.scss";
import zeroImg from "../assets/zero.svg";
import unionImg from "../assets/union.svg";
import Board from "../components/Board";
import { PlayersAccordion } from "../components/PlayersAccordion";

let playerList = [
    {
        side: "x",
        fullname: "Прохоренков Никита Валерьевич",
    },
];

export default class PlayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(calculatingWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? unionImg : zeroImg;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        return (
            <div className="wrap-container">
                <aside className="players-container">
                    <PlayersAccordion players={playerList} />
                </aside>
                <main className="container-board">
                    <div className="timer">
                        <p>6:00</p>
                    </div>
                    <Board
                        squares={this.state.squares}
                        xIsNext={this.state.xIsNext}
                        onClick={this.handleClick}
                    />
                </main>
                <aside className="chat"></aside>
                <div className="walks-player">
                    <p>Ходит</p>
                    <img
                        src={this.state.xIsNext ? unionImg : zeroImg}
                        alt="Сторона игрока"
                    ></img>
                    <p>игрок</p>
                </div>
            </div>
        );
    }
}

function calculatingWinner(squares){
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
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
        
    }

    return null;
}
