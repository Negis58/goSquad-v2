import React, { useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {refreshPassword} from '../../../actions/auth';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {setAlert} from "../../../actions/alert";


const RefreshPassword = ({refreshPassword, isAuthenticated, location}) => {
    const [formData, setFormData] = useState({
        password: '',
        password2: ''
    });

    const {refreshToken} = queryString.parse(location.search);
    console.log('refresh-tokensdsafsdfsd', refreshToken);

    const {password, password2} = formData;



    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert('Пароли должны совпадать');
        } else {
            refreshPassword(refreshToken, password);
            alert('Пароль изменен');
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>;
    }

    return (
        <div className="register">
            <div className="register__top">
               <Link to="/login"> <h1>GOSQUAD</h1></Link>
                <h2>Зарегистрируйте аккаунт</h2>
                <h6>Пожалуйста, введите данные</h6>
                <form className="register__form" onSubmit={onSubmit}>
                    <div className="register__form__group">
                        <input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="register__form__group">
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="register__form__group">
                        <input type="submit" className="btn btn-primary" value="Отправить"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

RefreshPassword.propTypes = {
    refreshPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {refreshPassword})(RefreshPassword);
