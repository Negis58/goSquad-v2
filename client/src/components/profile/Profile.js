import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileRecent from "./ProfileRecent";
import ProfileFavorite from "./ProfileFavorite";
import { getProfileById } from "../../actions/profile";
import './Profile.scss';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-gosquad mt-3">Назад к профилю</Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-gosquad mt-3">
                Редактировать профиль
              </Link>
            )}
          <div className="profile-grid my-1 mt-2">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp p-2">
              <h2 className="text-color">Недавно сыгранные игры</h2>
              {profile.recent.length > 0 ? (
                <Fragment>
                  {profile.recent.map((recent) => (
                    <ProfileRecent key={recent._id} recent={recent} />
                  ))}
                </Fragment>
              ) : (
                <h4 className="text-white">Нет недавно сыгранных игр</h4>
              )}
            </div>

            <div className="profile-edu  p-2">
              <h2 className="text-color">Любимые игры</h2>
              {profile.favorite.length > 0 ? (
                <Fragment>
                  {profile.favorite.map((favorite) => (
                    <ProfileFavorite key={favorite._id} favorite={favorite} />
                  ))}
                </Fragment>
              ) : (
                <h4 className="text-white">Нет любимых игр</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
