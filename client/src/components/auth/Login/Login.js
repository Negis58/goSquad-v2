import React, { useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../actions/auth';
import './Login.scss';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>;
    }


    return (
        <div className="login">
            <div className="login__top">
                <Link to="/"><h1>GOSQUAD</h1></Link>
                <h2>Войти в аккаунт</h2>
                <h6>Пожалуйста, войдите в свой аккаунт</h6>
                <form className="login__form" onSubmit={onSubmit}>
                    <div className="login__form__group">
                        <input
                            type="text"
                            placeholder="Имя пользователя"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="login__form__group">
                        <input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="8"
                        />
                    </div>
                    <div className="login__form__group">
                        <Link to="/forgot-password"><p className="form__forgot-password">Забыли пароль?</p></Link>
                        <input type="submit" className="btn btn-primary" value="Войти"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
