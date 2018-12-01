import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
import "../../css/main.css";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.getInputData = this.getInputData.bind(this);
        this.onClickBtn = this.onClickBtn.bind(this);
    }

    getInputData(data) {
        this.setState({ [event.target.name]: data });
    }

    onClickBtn(){
        console.log('hiiiiii'); 
    }

    render() {
        return (
            <div className='maindiv'>
                <Card id='card'>
                    <Typography id='loginT' color='primary'>Login</Typography>
                    <div className='hold'>
                        <div className='input'>
                            <Input name={'email'} type={'text'} placeholder={'enter email'} label={'email'} onClick={this.getInputData} />
                        </div>
                        <div className='input'>
                            <Input name={'password'} type={'password'} placeholder={'enter password'} label={'password'} onClick={this.getInputData} />
                        </div>
                        <div className='button'>
                            <Button type='Submit' variant="contained" color='primary' onClick={this.onClickBtn()}>login</Button>
                        </div>
                        <div className='errMsg'>
                            akshansh
                        </div>
                        <div id='spanDiv'>

                            <span className="reg">New User? <a href="#">register</a></span>
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
