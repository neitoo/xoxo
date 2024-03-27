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
                    <Board />
                </main>
                <aside className="chat"></aside>
                <div className="walks-player">
                    <p>Ходит</p>
                    <img src={zeroImg} alt="Сторона игрока"></img>
                    <p>игрок</p>
                </div>
            </div>
        );
    }
}
