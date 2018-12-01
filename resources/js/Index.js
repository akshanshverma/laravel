import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register.jsx';
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
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
