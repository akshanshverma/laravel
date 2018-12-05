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

        services.resetPassword(userData)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                   
                }
                if (res.status === 220) {
                    this.setState({
                        errors: {
                            msg: 'invalid email',
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
                        </div>
                        
                        <div className='button'>
                            <Button type='Submit' variant="contained" color='primary' onClick={this.onClickBtn}>submit</Button>
                        </div>
                        <div className='errMsg' >
                            {this.state.errors["msg"]}
                        </div>
                       
                    </div>
                </Card>
            </div>
        );
    }
}
