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
                <Link to="/dashboard">
                    <i/>{" "}
                    <span>Профиль</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i/>{" "}
                    <span>Выйти</span>
                </a>
            </li>
        </ul>
    );


    return (
        <nav className="navbar ">
            <h1>
                <Link to="/">
                    <i className="fas fa-gamepad"/> GOSQUAD
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
