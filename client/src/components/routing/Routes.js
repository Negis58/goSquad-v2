import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {DashboardPage} from "../../pages/DashboardPage";
import {PostPage} from "../../pages/PostPage";
import {ProfilesPage} from "../../pages/ProfilesPage";
import {MainPage} from "../MainPage";
import {RegisterPage} from "../auth/Register";
import {LoginPage} from "../auth/Login";
import {ForgotPassword} from "../auth/ForgotPassword";
import {Navbar} from "../layout/Navbar";


export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return(
            <Switch>
                <Route path="/dashboard" exact>
                    <DashboardPage/>
                </Route>
                <Route path="/posts" exact>
                    <PostPage/>
                </Route>
                <Route path="/profiles" exact>
                    <ProfilesPage/>
                </Route>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/register" exact>
                    <RegisterPage/>
                </Route>
                <Route path="/login" exact>
                    <LoginPage/>
                </Route>
                <Route path="/forgot-password" exact>
                    <ForgotPassword/>
                </Route>
            </Switch>
        );
    }
    return(
        <Switch>
            <Route path="/" exact>
               <MainPage/>
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}