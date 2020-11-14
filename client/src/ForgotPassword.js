import {React, Fragment} from 'react';
import {Link} from "react-router-dom";

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
            <div className="bg-dark">
                <div className="container h-100">
                    <div className="card-group justify-content-center">
                        <div className="col-sm-5">
                            <h1 className="text-center">Вспомнить пароль</h1>
                            <p>
                                <i /> Восстановить пароль
                            </p>
                            <form>
                                <div className="form-group">
                                    <label for="inputEmail">Email address</label>
                                    <input type="email" className="form-control"/>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
