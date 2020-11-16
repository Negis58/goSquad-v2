import React from "react";
import PropTypes from "prop-types";

const ProfileFavorite = ({ favorite: { title, platform, hours } }) => (
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

ProfileFavorite.propTypes = {
  favorite: PropTypes.object.isRequired,
};

export default ProfileFavorite;
