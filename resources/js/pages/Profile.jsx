import React, { Component } from 'react';
import { Button, Card, Typography } from '@material-ui/core';
// import  from '@material-ui/core';
import "../../css/main.css";
import userService from '../services/UserServices';


var services = new userService();

export default class Profile extends Component {

    constructor(props) {

        super(props);
        this.state = {
            username: '',
            email: '',
        }
        // this.getUserData = this.getUserData.bind(this);
        this.onClickbtn = this.onClickbtn.bind(this);

    }

    componentDidMount() {
        services.getUsrData()
            .then(res => {

                if (res.status === 200) {
                    this.setState({
                        'username': res.data.userData.username,
                        'email': res.data.userData.email,
                    });

                }
                if (res.status === 220) {

                }

            }).catch();
    }

    onClickbtn() {
        services.logoutUser()
            .then(res => {

                if (res.status === 200) {
                    this.setState({
                        'username': "",
                        'email': "",
                    });
                    this.props.history.push("/login");
                }
                if (res.status === 220) {

                }
            }).catch();
    }


    render() {
        if (localStorage.getItem('token') === null) {
            this.props.history.push("/login");
        }
        return (
            <div className='maindiv'>
                <Card id='card'>

                    <div className='userData'>
                        <div className='username'>username: {this.state.username}</div>
                        <div className='email'>email: {this.state.email}</div>
                    </div>

                    <div className='logoutButton'>
                        <Button id='logout' type='Submit' variant="contained" color='primary' onClick={this.onClickbtn}>logout</Button>
                    </div>
                </Card>
            </div>

        );
    }
}
