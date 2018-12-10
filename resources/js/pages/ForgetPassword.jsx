import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
import "../../css/main.css";
import userService from '../services/UserServices';
//import { Redirect } from "react-router-dom";


var services = new userService();

export default class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {},
            success: '',
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
        }

        services.forgetPassword(userData)
            .then(res => {
                if (res.status === 200) {
                   this.setState({
                       success:'reset password link sent to your email'
                   });
                }
                if (res.status === 205) {
                    this.setState({
                        errors: {
                            email: 'cant find user',
                        }
                    });
                }


            }).catch();
    }

    render() {
       
        // if (localStorage.getItem('token') !==null) {
            
        // }
        return (
            <div className='maindiv'>
                <Card id='card'>
                    <Typography id='loginT' color='primary'>Forget Password</Typography>
                    <div className='hold'>
                        <div className='inputRsP'>
                            <Input name={'email'} type={'text'} placeholder={'enter email'} label={'email'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["email"]}</div>
                        </div>
                        
                        <div className='button'>
                            <Button type='Submit' variant="contained" color='primary' onClick={this.onClickBtn}>submit</Button>
                        </div>
                        <div className='resetLinkMsg' >
                            {this.state.success}
                        </div>
                        <div id='spanDiv'>
                            <span className="goLogin"><a href="/login">Login?</a></span>
                        </div>                       
                    </div>
                </Card>
            </div>
        );
    }
}
