import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {DashboardPage} from "./pages/DashboardPage";
import {PostPage} from "./pages/PostPage";
import {ProfilesPage} from "./pages/ProfilesPage";
import {AuthPage} from "./pages/AuthPage";
import {MainPage} from "./pages/main/MainPage";

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
            </Switch>
        );
    }
    return(
        <Switch>
            <Route path="/" exact>
               <MainPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}