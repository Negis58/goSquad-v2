import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../../actions/profile";

const initialState = {
    firstname: "",
    lastname: "",
    location: "",
    status: "",
    platform: "",
    bio: "",
    discord: "",
    youtube: "",
    steam: ""
};

const ProfileForm = ({profile: {profile, loading}, createProfile, getCurrentProfile, history,}) => {
    const [formData, setFormData] = useState(initialState);

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
        bio,
        discord,
        youtube,
        steam
    } = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, profile ? true : false);
    };

    return (
        <Fragment>
            <div className="profile">
                <div className="profile__top">
                    <h1 className="large text-primary">Редактирование профиля</h1>
                    <p className="lead">
                        <i className="fas fa-user"/> Добавьте некоторые изменения в свой профиль
                    </p>
                    <small>* = Обязательные поля</small>
                    <form className="profile__form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <select name="status" value={status} onChange={onChange}>
                                <option>* Выберете игровой статус</option>
                                <option value="Classic Gamer">Обычный игрок</option>
                                <option value="Casual Gamer">Задрот лола</option>
                                <option value="Hardcore Gamer">Нормальный человек</option>
                                <option value="Hardcore Gamer">Игрок в доту</option>
                                <option value="Hardcore Gamer">Игрок в хс</option>
                                <option value="Pro Gamer (Verified)" disabled>
                                    Шин (Нужно подтвердить личность)
                                </option>
                            </select>
                            <small className="form-text">
                                Если вы Шин, то напишите нам на почту gosquadtest@gmail.com
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Имя"
                                name="firstname"
                                value={firstname}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Could be a link to a discord server or gamer profile.
                            </small>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Фамилия"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                />
                            </div>
                            <small className="form-text">
                                Could be a link to a discord server or gamer profile.
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Место расположение"
                                name="location"
                                value={location}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                City & state suggested (eg. Los Angeles, CA)
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="* Игровые платформы, которые вы используете"
                                name="platform"
                                value={platform}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please use comma separated values (eg. PS4, Xbox One, PC, Mobile)
                            </small>
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Расскажите пару слов о себе"
                                name="bio"
                                value={bio}
                                onChange={onChange}
                            />
                            <small className="form-text">Tell us a little about yourself</small>
                        </div>
                        <div className="my-2">
                            <button
                                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                type="button"
                                className="btn btn-light"
                            >
                                Add Social Network Links
                            </button>
                            <span>Optional</span>
                        </div>

                        {displaySocialInputs && (
                            <Fragment>
                                <div className="form-group social-input">
                                    <i className="fab fa-twitter fa-2x"/>
                                    <input
                                        type="text"
                                        placeholder="Профиль discord"
                                        name="discord"
                                        value={discord}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"/>
                                    <input
                                        type="text"
                                        placeholder="Профиль youtube"
                                        name="youtube"
                                        value={youtube}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"/>
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
                        <input type="submit" className="btn btn-primary my-1"/>
                        <Link className="btn btn-light my-1" to="/dashboard">
                            Go Back
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
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(
    ProfileForm
);
