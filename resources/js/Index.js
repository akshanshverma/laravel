import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import mainTheme from './components/Theme';

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
                        <Route path='/forget_password' component={ForgetPassword}></Route>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
