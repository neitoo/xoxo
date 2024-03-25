import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Home.scss';

export default class Home extends Component{
    render(){
        return(
            <div className='wrap-home'>
                <h1>
                    Добро пожаловать на сайт <span className='name-site'>XOXO</span> <span className='title-site'>Tic-Tac-Toe</span>!
                </h1>
                <div className='content-instruction'>
                    <p>
                        Выберите вкладку <NavLink to="/play">Игровое поле</NavLink>, чтобы начать игру. 
                        Здесь вы можете сыграть в крестики-нолики офлайн, просто кликнув на свободной ячейке.
                    </p>
                    <p>
                        Перейдите в раздел <NavLink to="/active-player">Активные игроки</NavLink>, чтобы пригласить кого-то в свое лобби. 
                        К сожалению, этот функционал пока не доступен, но скоро он будет добавлен.
                    </p>
                </div>
            </div>
        )
    }
}