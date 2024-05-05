import React, {Component} from 'react';
import { AuthC } from '../../context/AuthC';
import "../../styles/MainContent.scss";

export default class PlayerList extends Component{
    static contextType = AuthC;

    state = {
        users: [],
    };

    componentDidMount = () => {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const { handleGetUsers } = this.context;
        handleGetUsers()
            .then((data) => {
                console.log(data);
                this.setState({users: data});
            })
            .catch((e) => {
                console.error(e);
            });
    }

    render(){
        const { users } = this.state;

        const headers = [
            { label: 'ФИО', key: 'user_fullname' },
            { label: 'Возраст', key: 'user_age' },
            { label: 'Пол', key: 'user_gender' },
            { label: 'Создан', key: 'registration_date' },
        ];

        return(
            <div className='wrapper'>
                <div className="main-container">
                    <div className="head-container">
                        <h1>Список игроков</h1>
                        <button>Добавить игроков</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                            {headers.map((header) => (
                                <th key={header.key}>{header.label}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    {headers.map((header) => (
                                        <td key={`${user.id}-${header.key}`}>{user[header.key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}