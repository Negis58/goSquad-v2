import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Main.scss';

const Main = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <div className="main">
        <div className="main__top">
          <h1>GOSQUAD</h1>
          <p>Присоединяйтесь к ведущей платформе для встреч <br/> с товарищами по команде для
            игр</p>
          <Link className="main__top__login" to="/login">
            <button className="btn btn-login ">Войти</button>
          </Link>
          <Link className="main__top__register" to="/register">
            <button className="btn">Регистрация</button>
          </Link>
        </div>
      </div>
  );
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Main);
