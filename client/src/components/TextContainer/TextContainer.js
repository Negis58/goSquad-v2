import React from 'react';

import onlineIcon from '../../img/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
    <div className="textContainer">

        {
            users
                ? (
                    <div>
                        <h1 className="text-online">Пользователи находящие в чате:</h1>
                        <div className="activeContainer">
                            <h2 className="text-online mt-1">
                                {users.map(({ name }) => (
                                    <div key={name} className="activeItem">
                                        {name}
                                        <img alt="Online Icon" src={onlineIcon} />
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;
