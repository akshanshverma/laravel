import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
import "../../css/main.css";
import userService from '../services/UserServices';
//import { Redirect } from "react-router-dom";


var services = new userService();

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        }
        this.getInputData = this.getInputData.bind(this);
        this.onClickBtn = this.onClickBtn.bind(this);
    }

    getInputData(data) {
        this.setState({
            [event.target.name]: data
        });
    }

    onClickBtn() {
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        services.loginUser(userData)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.props.history.push("/home");
                }
                if(res.status === 220) {
                    this.setState({
                        errors: {
                            msg: 'invalid email or password',
                        }
                    });
                }
                if(res.status === 221) {
                    this.setState({
                        errors: {
                            msg: 'email is not verified',
                        }
                    });
                }


            }).catch();
    }

    render() {
       
        if (localStorage.getItem('token') !==null) {
            this.props.history.push("/profile");
        }
        return (
            <div className='maindiv'>
                <Card id='card'>
                    <Typography id='loginT' color='primary'>Login</Typography>
                    <div className='hold'>
                        <div className='input'>
                            <Input name={'email'} type={'text'} placeholder={'enter email'} label={'email'} onChange={this.getInputData} />
                        </div>
                        <div className='input'>
                            <Input name={'password'} type={'password'} placeholder={'enter password'} label={'password'} onChange={this.getInputData} />
                        </div>
                        <div className='button'>
                            <Button type='Submit' variant="contained" color='primary' onClick={this.onClickBtn}>login</Button>
                        </div>
                        <div className='errMsg' >
                            {this.state.errors["msg"]}
                        </div>
                        <div id='spanDiv'>

                            <span className="reg">New User? <a href="/register">register</a></span>
                            <span className="psw">Forgot <a href="/forgetpassword">password?</a></span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
