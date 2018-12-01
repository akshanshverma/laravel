import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
// import  from '@material-ui/core';
import "../../css/main.css";


export default class Register extends Component {

    constructor(props) {

        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            rpassword: ''
        }
        this.getInputData = this.getInputData.bind(this);
        this.onClickbtn = this.onClickbtn.bind(this);
    }

    getInputData(data) {
        this.setState({ [event.target.name]: data });
    }

    onClickbtn() {
        let a = this.state;
        console.log(a);
    }


    render() {

        return (

            <div className='maindiv'>
                <Card id='card'>
                    <Typography id='registerT' color='primary'>Register</Typography>
                    <div className='hold'>
                        <div className='input'>
                            <Input name={'username'} type={'text'} placeholder={'username'} label={'username'} onChange={this.getInputData} />
                        </div>
                        <div className='input'>
                            <Input name={'email'} type={'text'} placeholder={'enter email'} label={'email'} onChange={this.getInputData} />
                        </div>
                        <div className='input'>
                            <Input name={'password'} type={'password'} placeholder={'enter password'} label={'password'} onChange={this.getInputData} />
                        </div>
                        <div className='input'>
                            <Input name={'rpassword'} type={'password'} placeholder={'confirm password'} label={'confirm password'} onChange={this.getInputData} />
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
