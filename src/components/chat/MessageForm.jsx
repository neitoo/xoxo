import React, { useEffect, useState } from 'react';
import send from '../../assets/Send.svg'

export const MessageForm = ({playerList, onMessage}) => {

    const [message, setMessage] = useState('');
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);
    const [selectedPlayerName, setSelectedPlayerName] = useState('');

    useEffect(() => {
        if (playerList.length > 0) {
            setSelectedPlayerName(playerList[0].fullname);
        }
    }, [playerList]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handlePlayerChange = (event) => {
        const selectedIndex = event.target.selectedIndex;
        setSelectedPlayerIndex(selectedIndex);
        const selectedPlayer = event.target.options[selectedIndex];
        setSelectedPlayerName(selectedPlayer.text);
    }

    const handleSend = () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;
        
        const currentPlayerIndex = selectedPlayerIndex;
        const isCurrentPlayer = currentPlayerIndex === 0;
        const namePlayer = selectedPlayerName;
        onMessage(message,namePlayer, isCurrentPlayer);
        setMessage('');
    }

    return (
        <div className="chat-controls">
            <select onChange={handlePlayerChange}>
                {playerList.map((player) => (
                    <option key={player.index} value={player.index}>{player.fullname}</option>
                ))}
            </select>
            <input 
                type="text" 
                placeholder='Сообщение...'
                value={message}
                onChange={handleInputChange}
            />
            <button onClick={handleSend}><img src={send} alt="Отправить"/></button>
        </div>
    );
}