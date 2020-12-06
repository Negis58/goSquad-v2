import React, { useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {forgotPassword} from '../../../actions/auth';
import PropTypes from 'prop-types';
import {setAlert} from "../../../actions/alert";

const ForgotPassword = ({forgotPassword, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});
    setAlert('На вашу почту отправлено письмо с дальнейшими указаниями', 'success');

    const onSubmit = async (e) => {
        e.preventDefault();
            forgotPassword({email});
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>;
    }

    return (
        <div className="register">
            <div className="register__top">
                <h1>GOSQUAD</h1>
                <h2>Восстановление пароля</h2>
                <h6>Пожалуйста, введите адрес электронной почты</h6>
                <form className="register__form" onSubmit={onSubmit}>
                    <div className="register__form__group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="register__form__group">
                        <input type="submit" className="btn btn-primary" value="Вспомнить пароль"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {forgotPassword})(ForgotPassword);
