import React from "react";
import PropTypes from "prop-types";

const ProfileFavorite = ({ favorite: { title, platform, hours } }) => (
  <div>
    <h3 className="text-white">{title}</h3>
    <p className="text-color">
      <strong className="text-white">Платформы: </strong> {platform}
    </p>
    <p className="text-color">
      <strong className="text-white">Проведенные часы в игре: </strong> {hours}
    </p>
  </div>
);

ProfileFavorite.propTypes = {
  favorite: PropTypes.object.isRequired,
};

export default ProfileFavorite;
