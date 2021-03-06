import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import './Navbar.scss';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Игроки</Link>
            </li>
            <li>
                <Link to="/posts">Посты</Link>
            </li>
            <li>
                <Link to="/dashboard">Профиль</Link>
            </li>
            <li>
                <Link to="/chat-join">Чат</Link>
            </li>
            <li>
                <a onClick={logout} href="/">
                    <i/>{" "}
                    <span>Выйти</span>
                </a>
            </li>
        </ul>
    );


    return (
        <nav className="navbar">
            <h1 className="navbar__text">
                <Link className="navbar__logo" to="/">
                    GOSQUAD
                </Link>
            </h1>
            {authLinks}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
