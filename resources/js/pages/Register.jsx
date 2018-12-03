import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
// import  from '@material-ui/core';
import "../../css/main.css";
import axios from 'axios';
import userService from '../services/UserServices';

var services = new userService();

export default class Register extends Component {

    constructor(props) {

        super(props);
        this.state = {

            username: '',
            email: '',
            password: '',
            rpassword: '',
            errors: {}

        }
        this.getInputData = this.getInputData.bind(this);
        this.onClickbtn = this.onClickbtn.bind(this);
        this.dataValidation = this.dataValidation.bind(this);

    }

    getInputData(data) {

        this.setState({
            [event.target.name]: data
        });

    }


    dataValidation() {

        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        } else {
            if (fields["username"].length < 5) {
                formIsValid = false;
                errors["username"] = "minimum 5 character";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        if (!fields["rpassword"]) {
            formIsValid = false;
            errors["rpassword"] = "Cannot be empty";
        } else {
            if (fields["password"] !== fields["rpassword"]) {
                formIsValid = false;
                errors["rpassword"] = "not match";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;

    }


    onClickbtn(e) {
        e.preventDefault();

        if (this.dataValidation()) {
            const userData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                rpassword: this.state.rpassword,
            }
            services.registerUser(userData)
            .then(res => {
                console.log(res);
                if (res.status === 210) {
                    this.setState({
                        errors: {
                            email: res.data.error.email[0],
                        }
                    });
                }
                if (res.status === 200){
                    
                }
                
            }).catch();
        } else {
            return;
        }

    }


    render() {
        console.log(this.state);

        return (

            <div className='maindiv'>
                <Card id='card'>
                    <Typography id='registerT' color='primary'>Register</Typography>
                    <div className='hold'>
                        <div className='input'>
                            <Input name={'username'} type={'text'} placeholder={'username'} label={'username'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["username"]}</div>
                        </div>
                        <div className='input'>
                            <Input name={'email'} type={'text'} placeholder={'enter email'} label={'email'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["email"]}</div>
                        </div>
                        <div className='input'>
                            <Input name={'password'} type={'password'} placeholder={'enter password'} label={'password'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["password"]}</div>
                        </div>
                        <div className='input'>
                            <Input name={'rpassword'} type={'password'} placeholder={'confirm password'} label={'confirm password'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["rpassword"]}</div>
                        </div>
                        <div className='button'>
                            <Button variant="contained" color='primary' onClick={this.onClickbtn}>Submit</Button>
                        </div>
                    </div>
                </Card>
            </div>

        );
    }
}
