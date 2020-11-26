import React from "react";
import PropTypes from "prop-types";

const ProfileRecent = ({ recent: { title, platform, hours } }) => (
  <div>
    <h3 className="text-white">{title}</h3>
    <p className="text-color">
      <strong className="text-color-black">Платформы: </strong> {platform}
    </p>
    <p className="text-color">
      <strong className="text-color-black">Часы проведенные в игре: </strong> {hours}
    </p>
  </div>
);

ProfileRecent.propTypes = {
  recent: PropTypes.object.isRequired,
};

export default ProfileRecent;
