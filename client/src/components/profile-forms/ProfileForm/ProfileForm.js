import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProfile, getCurrentProfile, uploadFile} from "../../../actions/profile";
import Discord from '../../../img/discord.jpg'
import Youtube from '../../../img/youtube.jpg'
import Steam from '../../../img/steam.jpg'
import './ProfileForm.scss';
import {setAlert} from "../../../actions/alert";

const initialState = {
    firstname: "",
    lastname: "",
    location: "",
    status: "",
    platform: "",
    about: "",
    discord: "",
    youtube: "",
    steam: "",
};

const ProfileForm = ({profile: {profile, loading}, createProfile, getCurrentProfile, history, uploadFile}) => {
    const [formData, setFormData] = useState(initialState);
    const [file, setFile] = useState();
    const [displaySocialInputs, toggleSocialInputs] = useState(false);


    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading && profile) {
            const profileData = {...initialState};
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }
            if (Array.isArray(profileData.platform))
                profileData.platform = profileData.platform.join(", ");
            setFormData(profileData);
        }
    }, [loading, getCurrentProfile, profile]);

    const {
        firstname,
        lastname,
        location,
        status,
        platform,
        about,
        discord,
        youtube,
        steam,
    } = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, profile ? true : false);
    };

    const send = event => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", file);
        uploadFile(data);
        alert('Изображение профиля изменено');
    };

    return (
        <Fragment>
            <div className="profile-form">
                <div className="profile__top">
                    <h1 className="large  text-color">Редактирование профиля</h1>
                    <p className="lead">
                        <i className="fas fa-user"/> Добавьте некоторые изменения в свой профиль
                    </p>
                    <small className="text-color">* = Обязательные поля</small>
                    <div className="form-group">
                        <small className="form-text form-color">
                            Загрузите изображение профиля
                        </small>
                        <form action="#">
                            <div className="form-group">
                                <input
                                    className="btn btn-gosquad my-1"
                                    type="file"
                                    id="file"
                                    accept=".jpg"
                                    onChange={event => {
                                        const file = event.target.files[0];
                                        setFile(file);
                                    }}
                                />
                            </div>
                        </form>
                        <button
                            className="btn btn-gosquad my-1"
                            onClick={send}>Отправить
                        </button>
                    </div>
                    <form className="profile__form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <select name="status" value={status} onChange={onChange}>
                                <option>* Выберете игровой статус</option>
                                <option value="Classic Gamer">Обычный игрок</option>
                                <option value="Задрот лол">Задрот лола</option>
                                <option value="Нормальный человек">Нормальный человек</option>
                                <option value="Игрок в доту">Игрок в доту</option>
                                <option value="Игрок в хс">Игрок в хс</option>
                                <option value="Pro Gamer (Verified)" disabled>
                                    Шин (Нужно подтвердить личность)
                                </option>
                            </select>
                            <small className="form-text form-color">
                                Если вы Шин, то напишите нам на почту gosquadtest@gmail.com
                            </small>
                        </div>
                        <div className="form-group">
                            <small className="form-text form-color">
                                Введите ваше имя
                            </small>
                            <input
                                type="text"
                                placeholder="Имя"
                                name="firstname"
                                value={firstname}
                                onChange={onChange}
                            />
                            <div className="form-group">
                                <small className="form-text form-color">
                                    Введите вашу фамилию.
                                </small>
                                <input
                                    type="text"
                                    placeholder="Фамилия"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <small className="form-text form-color">
                                Введите ваше место расположения
                            </small>
                            <input
                                type="text"
                                placeholder="Место расположение"
                                name="location"
                                value={location}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <small className="form-text form-color">
                                Пожалуйста, введите игровые платформы, которые вы используете (PS4, Xbox One, PC,
                                Mobile)
                            </small>
                            <input
                                type="text"
                                placeholder="* Игровые платформы, которые вы используете"
                                name="platform"
                                value={platform}
                                onChange={onChange}
                            />

                        </div>
                        <div className="form-group">
                            <small className="form-text form-color">Напишите что-нибудь о себе</small>
                            <textarea
                                cols="40"
                                rows="5"
                                placeholder="Расскажите пару слов о себе"
                                name="about"
                                value={about}
                                onChange={onChange}
                            />

                        </div>
                        <div className="my-2">
                            <button
                                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                type="button"
                                className="btn btn-light"
                            >
                                Добавить социальные сети
                            </button>
                            <span className="text-color">Дополнительно</span>
                        </div>

                        {displaySocialInputs && (
                            <Fragment>
                                <div className="form-group social-input">
                                    <img className="discord" src={Discord}/>
                                    <input
                                        type="text"
                                        placeholder="Профиль discord"
                                        name="discord"
                                        value={discord}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group social-input">
                                    <img className="youtube" src={Youtube}/>
                                    <input
                                        type="text"
                                        placeholder="Профиль youtube"
                                        name="youtube"
                                        value={youtube}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group social-input">
                                    <img className="steam" src={Steam}/>
                                    <input
                                        type="text"
                                        placeholder="Профиль steam"
                                        name="steam"
                                        value={steam}
                                        onChange={onChange}
                                    />
                                </div>
                            </Fragment>
                        )}
                        <input type="submit" className="btn btn-gosquad my-1"/>
                        <Link className="btn btn-gosquad my-1" to="/dashboard">
                            Вернуться назад
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

ProfileForm.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile, uploadFile})(
    ProfileForm
);
