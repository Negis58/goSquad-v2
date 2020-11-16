import React from "react";
import PropTypes from "prop-types";

const ProfileRecent = ({ recent: { title, platform, hours } }) => (
  <div>
    <h3 className="text-dark">{title}</h3>
    <p>
      <strong>Platform: </strong> {platform}
    </p>
    <p>
      <strong>Hours Played: </strong> {hours}
    </p>
  </div>
);

ProfileRecent.propTypes = {
  recent: PropTypes.object.isRequired,
};

export default ProfileRecent;
