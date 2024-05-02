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

let playerList = [
    {
        id: 0,
        side: "x",
        fullname: "Игрок #1",
        win: 0,
    },
    {
        id: 1,
        side: "o",
        fullname: "Игрок #2",
        win: 0,
    },
];

export default class PlayArea extends Component {
    static contextType = AuthC;

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            lastPlayer: this.xIsNext ? playerList[0].fullname : playerList[1].fullname,
            isWinnerModalOpen: true,
            timeLeft: 180,
            isTimeOutModalOpen: false,
            gameIsStarted: false,
            messages: [],
        };
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
    }

    componentDidMount(){
        const {userData,handleProtect} = this.context;

        if(userData.id){
            handleProtect(userData.id);
            
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userData } = this.context;
        console.log(userData);
    }

    componentWillUnmount(){
        clearInterval(this.timerInterval);
    }

    tick = () => {
        this.setState((prevState) => ({timeLeft: prevState.timeLeft - 1}), () => {
            if(this.state.timeLeft === 0){
                this.handleTimeOut();
            }
        });
    }

    handleStartGame(){
        this.setState({ gameIsStarted: true })
        this.timerInterval = setInterval(this.tick, 1000);
    }

    handleRestartGame(){
        this.setState(
            {
                squares: Array(9).fill(null),
                xIsNext: true,
                lastPlayer: this.xIsNext ? playerList[0].fullname : playerList[1].fullname,
                isWinnerModalOpen: true,
                timeLeft: 180,
                isTimeOutModalOpen: false,
                gameIsStarted: false,
            }
        );
    }

    handleClick(i) {
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
            lastPlayer: this.state.xIsNext ? playerList[0].fullname : playerList[1].fullname,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleCloseModal() {
        this.setState({ isWinnerModalOpen: false });
    }

    handleTimeOut(){
        clearInterval(this.timerInterval);
        this.setState({isTimeOutModalOpen: true});
    }

    handleSendMessage = (message,namePlayer,isCurrentPlayer) => {
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

    formatTime(seconds) {
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
                    <PlayersAccordion players={playerList} />
                </aside>
                {(winner || noWinner || this.state.isTimeOutModalOpen) &&
                    (
                        <div className={"modal-winner" + (this.state.isWinnerModalOpen ? "" : " closed")}>
                            <div className="modal">
                                <img src={this.state.isTimeOutModalOpen ? timeOut : gold_trophy} alt="Золотой трофей" />
                                <p className="win-text">{winner
                                        ? `${this.state.xIsNext ? playerList[1].fullname : playerList[0].fullname} победил!`
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
                    <MessageForm playerList={playerList} onMessage={this.handleSendMessage}/>
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