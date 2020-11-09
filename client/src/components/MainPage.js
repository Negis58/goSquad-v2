import React from 'react';

export const MainPage = () => {
    const centerLogin = {
        'position': 'fixed',
        'top': '50%',
        'left': '45%',
        'margin-top': '-100px',
        'margin-left': '-200px'
    };

    return (
        <div className="container" style={centerLogin}>
            <div className="row ">
                <div className="col s12 m6">
                    <div className="card #212121 grey darken-4">
                        <div className="card-content white-text">
                            <span className="card-title center-align grey-text darken-3">GOSQUAD</span>
                            <p className="center-align grey-text darken-3">
                                Присоединяйтесь к ведущей платформе для встреч с товарищами по команде для игр.</p>
                        </div>
                        <div className="card-action center">
                            <a className="green-text darken-4" href="/login">Войти</a>
                            <a className="green-text darken-4" href="/register">Регистрация</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}