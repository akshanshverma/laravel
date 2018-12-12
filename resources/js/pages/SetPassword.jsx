import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
// import  from '@material-ui/core';
import "../../css/main.css";
import userService from '../services/UserServices';

var services = new userService();

export default class SetPassword extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: '',
            password: '',
            rpassword: '',
            token: '',
            status:true,
            errors: {}

        }
        this.getInputData = this.getInputData.bind(this);
        this.dataValidation = this.dataValidation.bind(this);
        this.onClickbtn = this.onClickbtn.bind(this);
    }

    componentDidMount() {
        let token = (window.location.pathname).substring(13);
        services.getTokenData(token)
            .then(res => {

                if (res.status === 200) {

                    this.setState({
                        'email': res.data.email,
                        'token': res.data.token,
                    });
                }
                if (res.status === 220) {
                   this.setState({
                       status:false
                   })
                }

            }).catch();
    }

    getInputData(data) {
        this.setState({
            [event.target.name]: data
        });
    }

    dataValidation() {
        debugger;
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

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
                email: this.state.email,
                password: this.state.password,
                token: this.state.token,
            }
            services.changePassword(userData)
                .then(res => {
                    if (res.status === 200) {
                        this.props.history.push("/login");
                    }
                    if (res.status === 205) {
                        console.log('error');
                    }

                }).catch();
        } else {
            return;
        }

    }

    render() {
        return (
            <div className='maindiv'>
                <Card id='card'>
                {this.state.status ? (
                <div>
                    <Typography id='registerT' color='primary'>Set Password</Typography>
                    <div className='hold'>

                        <div className='input'>
                            <Input name={'password'} type={'password'} placeholder={'enter password'} label={'password'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["password"]}</div>
                        </div>
                        <div className='input'>
                            <Input name={'rpassword'} type={'password'} placeholder={'confirm password'} label={'confirm password'} onChange={this.getInputData} />
                            <div className='msg' >{this.state.errors["rpassword"]}</div>
                        </div>
                        <div className='button'>
                            <Button variant="contained" color='primary' onClick={this.onClickbtn}>save</Button>
                        </div>
                        <div className='errMsg' >
                            {this.state.errors["linkError"]}
                        </div>
                    </div>
                </div>)
                :
                (
                <div className = 'divVarText'>
                    <Typography id='loginT' className='loginT' color='primary'>Password link Expire</Typography>
                    <Typography align='center'><span className="spanGoLogin">please go to <a href="/login">login</a> page</span></Typography> 
                </div>
                )}
                    
                </Card>
            </div>

        );
    }
}
