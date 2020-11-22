import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Landing from './components/layout/Landing/Main';
import Routes from './components/routing/Routes';
import {LOGOUT} from './actions/types';
import './App.css';
import './styles/index.scss'
// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";


const App = () => {
    useEffect(() => {
        // check for token in LS and load user
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            store.dispatch(loadUser());
        }

        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({type: LOGOUT});
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route component={<Navbar/> && Routes}/>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
