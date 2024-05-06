import React from 'react';

const MessageList = ({messages}) => {
    return (
        <div className="scroll">
            <div className="messages-list">
               {messages.map((message,index) =>(
                    <div key={index} className={`wrap-message ${message.curPlayer ? "green" : "red"}`}>
                        <div className={`message ${message.curPlayer ? "green" : "red"}`}>
                            <div className="head-message">
                                <p className={`name ${message.curPlayer ? "green" : "red"}`}>{message.name}</p>
                                <span className="time">{message.time}</span>
                            </div>
                            <p className="message-text">{message.text}</p>
                        </div>    
                    </div>
                ))} 
            </div>
            
        </div>
    );
}

export default MessageList;