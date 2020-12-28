import React, { Fragment } from "react";
import PropTypes from "prop-types";
import './Profile.scss';

const ProfileAbout = ({
  profile: {
    about,
    platform,
    user: { username },
  },
}) => (
  <div className="profile-about  p-2">
    {about && (
      <Fragment>
        <h2 className="text-color">{username} о себе</h2>
        <p>{about}</p>
        <div className="line" />
      </Fragment>
    )}
    <h2 className="text-color">Платформы</h2>
    <div className="platform text-color-white">
      {platform.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check" /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
