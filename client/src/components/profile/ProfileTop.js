import React from "react";
import PropTypes from "prop-types";
import './Profile.scss';

const ProfileTop = ({
  profile: {
      firstname,
      lastname,
    status,
    company,
    location,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top  p-2">
      <img className="round-img " src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <h1 className="large">{firstname} {lastname}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p className="location">{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
