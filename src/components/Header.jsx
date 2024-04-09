import React, {useContext, useState} from "react";
import logo from '../assets/logo.svg'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'
import exit_button from '../assets/icon-button.svg'
import { NavLink } from "react-router-dom";
import '../styles/Header.scss';
import { AuthC } from "../context/AuthC";


export const Header = () => {
    const {handleLogOut} = useContext(AuthC);

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
                        <NavLink to="/m/play">Игровое поле</NavLink>
                    </li>
                    <li>
                        <NavLink to="/m/rating">Рейтинг</NavLink>
                    </li>
                    <li>
                        <NavLink to="/m/active-player">Активные игроки</NavLink>
                    </li>
                    <li>
                        <NavLink to="/m/game-history">История игр</NavLink>
                    </li>
                    <li>
                        <NavLink to="/m/player-list">Список игроков</NavLink>
                    </li>
                </ul>
                <button href="#" className={menuOpen ? "exit-btn open" : "exit-btn"} onClick={handleLogOut}>
                    <p>Выйти</p>
                    <img src={exit_button} alt="Exit"/>
                </button>
            </nav>
        </header>
    );
};
