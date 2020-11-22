import React, { useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../../actions/alert';
import {register} from '../../../actions/auth';
import PropTypes from 'prop-types';
import './Register.scss';

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const {username, email, password, password2} = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({username, email, password});
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>;
    }

    return (
        <div className="register">
            <div className="register__top">
                <h1>GOSQUAD</h1>
                <h2>Зарегистрируйте аккаунт</h2>
                <h6>Пожалуйста, введите данные</h6>
                <form className="register__form" onSubmit={onSubmit}>
                    <div className="register__form__group">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChange}
                        />
                    </div>
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
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="register__form__group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="register__form__group">
                        <input type="submit" className="btn btn-primary" value="Register"/>
                    </div>
                </form>
                <p>
                    Уже имеете аккаунт? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
