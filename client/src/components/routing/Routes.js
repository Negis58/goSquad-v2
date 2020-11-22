import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import ProfileForm from "../profile-forms/ProfileForm/ProfileForm";
import AddRecent from "../profile-forms/AddRecent";
import AddFavorite from "../profile-forms/AddFavorite";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import PrivateRoute from "../routing/PrivateRoute";
import Navbar from "../layout/Navbar/Navbar";

const Routes = (props) => {
    return (
        <Fragment>
            <Alert/>
            <Navbar/>
            <Switch>
                <section className="container">
                <Route exact path="/profiles" component={Profiles}/>
                <Route exact path="/profile/:id" component={Profile}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/create-profile" component={ProfileForm}/>
                <PrivateRoute exact path="/edit-profile" component={ProfileForm}/>
                <PrivateRoute exact path="/add-experience" component={AddRecent}/>
                <PrivateRoute exact path="/add-education" component={AddFavorite}/>
                <PrivateRoute exact path="/posts" component={Posts}/>
                <PrivateRoute exact path="/posts/:id" component={Post}/>
                </section>
            </Switch>
        </Fragment>
    );
};

export default Routes;
