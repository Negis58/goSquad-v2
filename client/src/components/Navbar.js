import React from 'react';

export const Navbar = () => {
    return(
        <nav className="nav-extended black">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">GOSQUAD</a>
                <ul className="right hide-on-med-and-down">
                    <li><a>Пользователи</a></li>
                    <li><a>Посты</a></li>
                    <li><a>Мой профиль</a></li>
                    <li><a>Выйти</a></li>
                </ul>
            </div>
            <div className="nav-content">
            </div>
        </nav>
    );
}