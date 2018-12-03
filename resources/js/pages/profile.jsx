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
        this.dataValidation = this.dataValidation.bind(this);
    }

    getInputData(data) {
        this.setState({ [event.target.name]: data });
        
    }

    dataValidation(e){
        if (this.state['username'].length<1) {
            
        } else {
            
        }
    }
    

    onClickbtn(e) {
        
        e.preventDefault();
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            rpassword: this.state.rpassword,
        }

        //axios.post('http://localhost:8000/api/register', userData).then(res => console.log(res.data));
    }


    render() {
        console.log(this.state);

        return (

            <div className='maindiv'>
                <Card id='card'>
                    
                </Card>
            </div>

        );
    }
}
