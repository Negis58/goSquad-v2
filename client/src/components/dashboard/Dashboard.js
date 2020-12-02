import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "./DashboardActions";
import Recent from "./Recent";
import Favorite from "./Favorite";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import './Dashboard.scss';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className="large text">Профиль</h1>
      <p className="lead">
        <i className="fas fa-user" /> {/*Добро пожаловать {user && user.name}*/}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Recent recent={profile.recent} />
          <Favorite favorite={profile.favorite} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Удалить аккаунт
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Вы еще не настроили профиль, пожалуйста, добавьте информацию</p>
          <Link to="/create-profile" className="btn btn-gosquad my-1">
            Создать профиль
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
