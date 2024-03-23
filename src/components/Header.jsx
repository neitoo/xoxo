import React, {useState} from "react";
import logo from '../assets/logo.svg'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'
import exit_button from '../assets/icon-button.svg'
import { NavLink } from "react-router-dom";
import '../styles/Header.scss';


export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="head">
            <nav className="navigation">
                <div className="logo-menu">
                    <img src={logo} alt="XOXO"/>
                    <div className="menu" onClick={toggleMenu}>
                        <img src={menuOpen ? close : menu} alt="Menu"/>
                    </div>
                </div>
                
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to="/play">Игровое поле</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rating">Рейтинг</NavLink>
                    </li>
                    <li>
                        <NavLink to="/active-player">Активные игроки</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game-history">История игр</NavLink>
                    </li>
                    <li>
                        <NavLink to="/player-list">Список игроков</NavLink>
                    </li>
                </ul>
                <a href="#" className={menuOpen ? "exit-btn open" : "exit-btn"}>
                    <p>Выйти</p>
                    <img src={exit_button} alt="Exit"/>
                </a>
            </nav>
        </header>
    );
};
