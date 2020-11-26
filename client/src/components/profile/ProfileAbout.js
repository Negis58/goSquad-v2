import React, { Fragment } from "react";
import PropTypes from "prop-types";
import './Profile.scss';

const ProfileAbout = ({
  profile: {
    bio,
    platform,
    user: { name },
  },
}) => (
  <div className="profile-about  p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(" ")[0]}&#39;s Bio</h2>
        <p>{bio}</p>
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
