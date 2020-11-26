import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './Profiles.scss';
import Discord from '../../img/discord.jpg';
import Youtube from '../../img/youtube.jpg';
import Steam from '../../img/steam.jpg';

const ProfileItem = ({
                         profile: {
                             user: {_id, username, avatar},
                             status,
                             location,
                             platform,
                             firstname,
                             lastname,
                             bio,
                             social: {discord, youtube, steam}
                         },
                     }) => {
    return (
        <div className="profile">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>Никнейм: {username}</h2>
                <h2>Имя: {firstname}</h2>
                <h2>Фамилия: {lastname}</h2>
                <p>Игровой статус: {status}</p>
                <p className="my-6">Место расположения: {location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-gosquad">
                    Открыть профиль
                </Link>
            </div>

            <ul>
                <div className="fz"> Социальные сети:
                    <div className="text-platform"><img className="discord" src={Discord}/> - {discord}</div>
                    <div className="text-platform"><img className="youtube" src={Youtube}/> - {youtube}</div>
                    <div className="text-platform"><img className="steam" src={Steam}/> - {steam}</div>
                </div>
                <li className="fz"> Игровые платформы: {platform.slice(0, 4).map((skill, index) => (
                    <div key={index} className="text-platform">
                        <i className="fas fa-check"/> {skill}
                    </div>
                ))}
                </li>
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
