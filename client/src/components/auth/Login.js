import {React, Fragment} from 'react';

export const LoginPage = () => {
    const centerLogin = {
        'position': 'fixed',
        'top': '35%',
        'left': '45%',
        'margin-top': '-100px',
        'margin-left': '-200px'
    };
    return (
        <Fragment>
            <div className="container" style={centerLogin}>
                <div id="register-page" className="row">
                    <div className="col s12 m6">
                        <h2 className="center-align grey-text darken-3">Логин</h2>
                        <form className="card #212121 grey darken-4">
                            <div className="row">
                                <div className="input-field col s11">
                                    <i className="mdi-social-person-outline prefix"></i>
                                    <input id="user_name" type="text" className="validate"/>
                                    <label htmlFor="user_name" className="center-align">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s11">
                                    <i className="mdi-action-lock-outline prefix"></i>
                                    <input id="user_passw" type="password" className="validate"/>
                                    <label htmlFor="user_passw">Password</label>
                                </div>
                            </div>
                            <div className="card-action center">
                                <a className="green-text darken-4" href="/register">Регистрация</a>
                                <a className="green-text darken-4" href="/forgot-password"> Забыли пароль ?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}