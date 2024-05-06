import React, { Component } from "react";
import "../../styles/PlayArea.scss";
import "../../styles/Chat.scss";
import zeroImg from "../../assets/zero.svg";
import unionImg from "../../assets/union.svg";
import gold_trophy from "../../assets/casual-life-3d-gold-trophy-in-air 1.svg";
import Board from "../../components/Board";
import timeOut from "../../assets/time-out.svg"
import { PlayersAccordion } from "../../components/PlayersAccordion";
import { MessageForm } from "../../components/chat/MessageForm"
import MessageList from "../../components/chat/MessageList";
import { AuthC } from "../../context/AuthC";


export default class PlayArea extends Component {
    static contextType = AuthC;

    state = {
        playerList: [],
        hasUpdatedPlayerList: false,
        squares: Array(9).fill(null),
        xIsNext: true,
        lastPlayer: "",
        isWinnerModalOpen: true,
        timeLeft: 180,
        isTimeOutModalOpen: false,
        gameIsStarted: false,
        messages: [],
    };

    componentDidMount = () => {
        const { userData } = this.context;
        this.updatePlayerList(userData);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { userData } = this.context;
        if (userData.hasOwnProperty('fullname') && !this.state.hasUpdatedPlayerList) {
            this.updatePlayerList(userData);
            this.setState({ hasUpdatedPlayerList: true });
        }
    }

    updatePlayerList = (userData) => {
        const winrate = userData.dataWin + userData.dataLoose > 0
            ? (userData.dataWin / (userData.dataWin + userData.dataLoose)) * 100
            : 0;
        const newPlayerList = [
            {
                id: userData.id,
                side: "x",
                fullname: userData.fullname,
                win: winrate,
                index: 0,
            },
            {
                id: 1,
                side: "o",
                fullname: "Игрок #2",
                win: 0,
                index: 1
            },
        ];
    
        const lastPlayer = this.state.xIsNext ? newPlayerList[0].fullname : newPlayerList[1].fullname;
    
        this.setState({
            playerList: newPlayerList,
            lastPlayer: lastPlayer
        });
    }

    componentWillUnmount = () => {
        clearInterval(this.timerInterval);
    }

    tick = () => {
        this.setState((prevState) => ({timeLeft: prevState.timeLeft - 1}), () => {
            if(this.state.timeLeft === 0){
                this.handleTimeOut();
            }
        });
    }

    handleStartGame = () => {
        this.setState({ gameIsStarted: true })
        this.timerInterval = setInterval(this.tick, 1000);
    }

    handleRestartGame = () => {
        const firstPlayerName = this.state.playerList[0] ? this.state.playerList[0].fullname : "Игрок #1";
        const secondPlayerName = this.state.playerList[1] ? this.state.playerList[1].fullname : "Игрок #2";
        this.setState(
            {
                squares: Array(9).fill(null),
                xIsNext: true,
                lastPlayer: this.xIsNext ? firstPlayerName : secondPlayerName,
                isWinnerModalOpen: true,
                timeLeft: 180,
                isTimeOutModalOpen: false,
                gameIsStarted: false,
            }
        );
    }

    handleClick = (i) => {
        if (!this.state.isWinnerModalOpen || this.state.isTimeOutModalOpen || !this.state.gameIsStarted) {
            return;
        }
        const squares = this.state.squares.slice();
        if(calculatingWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? unionImg : zeroImg;
        this.setState({
            squares: squares,
            lastPlayer: this.state.xIsNext ? this.state.playerList[0].fullname : this.state.playerList[1].fullname,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleCloseModal = () => {
        this.setState({ isWinnerModalOpen: false });
    }

    handleTimeOut = () => {
        clearInterval(this.timerInterval);
        this.setState({isTimeOutModalOpen: true});
    }

    handleSendMessage = (message, namePlayer, isCurrentPlayer) => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const newMessage = {
            name: namePlayer,
            curPlayer: isCurrentPlayer,
            text: message,
            time: `${hours}:${minutes}`,
        };
        this.setState(prevState => ({
        messages: [...prevState.messages, newMessage]
        }));
    }

    formatTime = (seconds) => {
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    render() {
        const winner = calculatingWinner(this.state.squares);
        const noWinner = !winner && !this.state.squares.includes(null);
        if(winner || noWinner) clearInterval(this.timerInterval);
        return (
            <div className="wrap-container">
                <aside className="players-container">
                    <PlayersAccordion players={this.state.playerList} />
                </aside>
                {(winner || noWinner || this.state.isTimeOutModalOpen) &&
                    (
                        <div className={"modal-winner" + (this.state.isWinnerModalOpen ? "" : " closed")}>
                            <div className="modal">
                                <img src={this.state.isTimeOutModalOpen ? timeOut : gold_trophy} alt="Золотой трофей" />
                                <p className="win-text">{winner
                                        ? `${this.state.xIsNext ? this.state.playerList[1].fullname : this.state.playerList[0].fullname} победил!`
                                        : (this.state.isTimeOutModalOpen ? `${this.state.lastPlayer} победил!` : "Ничья!")}</p>
                                <div className="buttons">
                                    <button className="new-game" onClick={this.handleRestartGame}>Новая игра</button>
                                    <button className="close" onClick={this.handleCloseModal}>Закрыть</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                <main className="container-board">
                    {this.state.gameIsStarted ? (
                        <div className="timer">
                            <p>{this.formatTime(this.state.timeLeft)}</p>
                        </div>
                    ) : (
                        <div className="start-game" onClick={this.handleStartGame}>
                            <p>Начать игру</p>
                        </div>
                    )}
                    <Board
                        squares={this.state.squares}
                        xIsNext={this.state.xIsNext}
                        onClick={this.handleClick}
                    />
                </main>
                <aside className="chat">
                    <MessageList messages={this.state.messages}/>
                    <MessageForm playerList={this.state.playerList} onMessage={this.handleSendMessage}/>
                </aside>
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