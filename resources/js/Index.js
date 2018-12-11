import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import SetPassword from './pages/SetPassword';
import verifyAccount from './pages/EmailVerify';
import test from './pages/DashBoard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import mainTheme from './components/Theme';
import "../css/main.css";

const theme = createMuiTheme(mainTheme);

export default class Index extends Component {
    render() {
        return (

            <Router>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/forgetpassword' component={ForgetPassword}></Route>
                        <Route path='/setpassword/:token' component={SetPassword}></Route>
                        <Route path='/verifyaccount/:token' component={verifyAccount}></Route>
                        <Route path='/test' component={test}></Route>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
