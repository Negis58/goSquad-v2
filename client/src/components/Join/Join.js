import React, {useState} from 'react';
import {Link} from "react-router-dom";

import './Join.css';

export default function SignIn() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Присоединиться к чату</h1>
                <div>
                    <input placeholder="Введите ваш игровой никнейм" className="joinInput" type="text"
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <input placeholder="Введите желаемую комнату чата" className="joinInput mt-20" type="text"
                           onChange={(event) => setRoom(event.target.value)}/>
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                      to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button btn btn-gosquad mt-20'} type="submit">Войти в чат</button>
                </Link>
            </div>
        </div>
    );
}
