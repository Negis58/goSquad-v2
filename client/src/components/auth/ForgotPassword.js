import {React, Fragment} from 'react';

export const ForgotPassword = () => {
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
                        <h4 className="center-align grey-text darken-3">Восстановление пароля</h4>
                        <form className="card #212121 grey darken-4">
                            <div className="row">
                                <div className="input-field col s11">
                                    <i className="mdi-action-lock-outline prefix"></i>
                                    <input id="user_passw" type="email" className="validate"/>
                                    <label htmlFor="user_passw">email</label>
                                </div>
                            </div>
                            <div className="card-action center">
                                <i className="mdi-action-lock-outline prefix"></i>
                                <a className="green-text darken-4" href="/register">Отправить</a>
                                <a className="green-text darken-4" href="/login"> Войти</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
