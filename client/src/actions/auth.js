import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT, FORGOT_FAIL, FORGOT_PASSWORD, REFRESH_PASSWORD, REFRESH_PASSWORD_FAIL
} from './types';

// Аутентификация пользователяи по и получение его данных
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/login');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Регистрация пользователя
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/register', formData);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.tokens
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      console.log(errors)
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Аутентификация пользователя
export const login = (username, password) => async dispatch => {
  const body = { username, password };

  try {
    const res = await api.post('/login', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.tokens
    });

    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error.message, 'danger'));
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
      console.log(errors)
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Выход из аккаунта
export const logout = () => ({ type: LOGOUT });

// Восстановление пароля
export const forgotPassword = formData => async dispatch => {
  try {
    const res = await api.post('/forgot-password', formData);
    console.log(res, '123');
    dispatch({
      type: FORGOT_PASSWORD,
      payload: res.data
    });
    dispatch(setAlert('На вашу почту отправлено письмо с дальнейшими указаниями'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: FORGOT_FAIL
    });
  }
};

// Новый пароль
export const refreshPassword = (refreshToken, password) => async dispatch => {
  try {
    const formData = {refreshToken, password}
    console.log(formData);
    const res = await api.post('/reset-password', formData);
    console.log(res, '123');
    dispatch({
      type: REFRESH_PASSWORD,
      payload: res.data
    });
    dispatch(setAlert('Пароль изменен'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: REFRESH_PASSWORD_FAIL
    });
  }
};