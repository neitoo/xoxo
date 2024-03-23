import React, {Component} from 'react';
import '../styles/PlayArea.scss';
import zeroImg from '../assets/zero.svg';
import unionImg from '../assets/union.svg';
import Board from '../components/Board';

export default class PlayArea extends Component{
    render(){
        return(
            <div className='wrap-container'>

                <div className='container'>
                    <aside className='players'>

                    </aside>
                    <main className='container-board'>
                        <div className='timer'>
                            <p>6:00</p>
                        </div>
                        <Board/>
                    </main>
                    <aside className='chat'>

                    </aside>
                </div>
                <div className='walks-player'>
                    <p>Ходит</p>
                    <img src={zeroImg}></img> 
                    <p>игрок</p>
                </div>
            </div>
        )
    }
}