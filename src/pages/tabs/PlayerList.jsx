import React, {Component} from 'react';
import { AuthC } from '../../context/AuthC';
import "../../styles/MainContent.scss";
import {formatDate} from '../../services/DateService';
import Table from '../../components/Table';
import close from '../../assets/close.svg';


export default class PlayerList extends Component{
    static contextType = AuthC;

    state = {
        users: [],
        userData: null,
        hasUpdatedData: false,
        isAdmin: false,
        modalOpen: false,
    };

    componentDidMount = () => {
        this.fetchUsers();
        
    }

    componentDidUpdate = (prevState) => {
        const {userData} = this.context;
        if(userData.hasOwnProperty('admin') && !this.state.hasUpdatedData){
            this.setState({ userData });
            this.setState({ isAdmin: userData.admin})
            this.setState({ hasUpdatedData: true });
        }
    }

    fetchUsers = () => {
        const { handleGetUsers } = this.context;
        handleGetUsers()
            .then((data) => {
                const formatData = data.map((user) => {
                    const { id, user_fullname, user_age, user_gender, registration_date } = user;
                    let gender = (user_gender === "m" ? "&#128113;" : "&#128105;");

                    return {
                        id,
                        name: user_fullname,
                        age: user_age,
                        gender,
                        registrationDate: formatDate(registration_date),
                    };
                })
                this.setState({users: formatData});
            })
            .catch((e) => {
                console.error(e);
            });
    }

    handleDeleteClick = (user) => {
        console.log("Удален юзер:", user);
    }

    handleModalOpen = () => {
        this.setState({modalOpen: true});
    }

    handleModalClose = () => {
        this.setState({modalOpen: false});
    }

    render(){
        const { users } = this.state;

        const headers = [
            { label: 'ФИО', key: 'name' },
            { label: 'Возраст', key: 'age' },
            { label: 'Пол', key: 'gender' },
            { label: 'Создан', key: 'registrationDate' },
            ...(this.state.isAdmin ? [{ label: '', key: 'actions' }] : []),
        ];

        return(
            <div className='wrapper'>
                {this.state.modalOpen && (
                    <div className={"modal-wrap" + (this.state.modalOpen ? "" : "closed")}>
                        <div className="modal">
                            <div className="close-menu">
                                <img src={close} alt="Закрыть" onClick={this.handleModalClose}/>
                            </div>
                            <h1>Добавить игрока</h1>
                        </div>
                    </div>
                )}
                <div className="main-container">
                    <div className="head-container">
                        <h1>Список игроков</h1>
                        {this.state.isAdmin && (
                            <button onClick={this.handleModalOpen}>Добавить игроков</button>
                        )}
                    </div>
                    <Table data={users} isAdmin={this.state.isAdmin} headers={headers} textActions='Удалить' onDataClick={this.handleDeleteClick}/>
                </div>
            </div>
        )
    }
}