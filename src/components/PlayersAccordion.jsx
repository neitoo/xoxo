import React, { useState } from "react";
import a_down from "../assets/arrow-down.svg";
import a_up from "../assets/arrow-up.svg";
import union from "../assets/union.svg";
import zero from "../assets/zero.svg";

export const PlayersAccordion = ({ players }) => {
    const [isCollapsed,setIscollapsed] = useState(false);

    const handleClick = () => {
        setIscollapsed(!isCollapsed);
    }

    return (
        <div className="players-block">
            <button className="head-players" onClick={handleClick}>
                <p className="title">Игроки</p>
                <img src={isCollapsed ? a_down : a_up} alt="Раскрыть" />
            </button>
            <div className={`players ${isCollapsed ? 'collapsed' : ''}`}>
                {players.map((player) => (
                    <div className="players-item" key={player.id}>
                        <img
                            src={player.side === "x" ? union : zero}
                            alt={`${player.side === "x" ? 'Крестик' : 'нолик'}`}
                        />
                        <div className="info-players">
                            <p className="name">{player.fullname}</p>
                            <p className="stats">{player.win}% побед</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
