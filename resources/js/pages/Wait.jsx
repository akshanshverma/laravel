import React, { Component } from 'react';
import userService from '../services/UserServices';

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

    onClickBtn() {
        const userData = {
            email: this.state.email,
        }

        services.forgetPassword(userData)
            .then(res => {
                if (res.status === 200) {
                   console.log('send');
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
            <div className='divWait'>
               wait.....
            </div>
        );
    }
}
