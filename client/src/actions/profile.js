import api from "../utils/api";
import {setAlert} from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED, UPLOAD_FILE,
} from "./types";

// Получение текущего пользователя
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get("/users/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Получить все профили
export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE});

    try {
        const res = await api.get("/users");
        console.log(res, '123')
        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Получение профиля по id
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await api.get(`/users/${userId}`);
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Создание или обновление профиля
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const res = await api.post("/users", formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert(edit ? "Профиль обновлен" : "Профиль создан", "success"));

        if (!edit) {
            history.push("/dashboard");
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Добалвение последних игр
export const addRecent = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put("/users/recent", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Игра добавлена", "success"));

        history.push("/dashboard");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Добавление любимых игр
export const addFavorite = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put("/users/favorite", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Любимая игра добавлена", "success"));

        history.push("/dashboard");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Удаление последних игр
export const deleteRecent = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/users/recent/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Игра удалена", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Удаление любимых игр
export const deleteFavorite = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/users/favorite/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Любимая игра удалена", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};

// Удаление аккаунта и профиля
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Вы уверены ? Аккаунт восставновить невозможно!")) {
        try {
            await api.delete("/users");

            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert("Your account has been permanently deleted"));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    }
}

// Загрузка изображения пользователя
export const uploadFile = (data) => async (dispatch) => {
    try {
        console.log(data);
        const res = await api.post("/upload", data);
        console.log(res);

        dispatch({
            type: UPLOAD_FILE,
            payload: res.data,
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status},
        });
    }
};
