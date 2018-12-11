import React, { Component } from 'react';
import Input from '../components/Input';
import { Button, Card, Typography } from '@material-ui/core';
import "../../css/main.css";
import userService from '../services/UserServices';

var services = new userService();

export default class EmailVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            status: true,
            error: '',
        }

        this.onClickBtn = this.onClickBtn.bind(this);
    }

    componentDidMount() {
        let token = (window.location.pathname).substring(15);
        services.ckeckVerify(token)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    this.setState({
                        status:false
                    })
                }
            }).catch();


        this.setState({
            'token': token,
        });
    }

    onClickBtn() {

        let token = this.state.token;

        services.verifyToken(token)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    this.props.history.push("/login");
                }
                if (res.status === 221) {
                    this.setState({
                        errors: {
                            msg: 'not a valid link',
                        }
                    });
                }
                if (res.status === 222) {
                    this.props.history.push("/login");
                }


            }).catch();
    }

    render() {


        return (
            <div className='maindiv'>
                <Card id='card'>
                    {this.state.status ? (
                    <div>
                        <Typography id='loginT' color='primary'>Account Verification</Typography>
                        <div className='hold'>

                            <div className='button'>
                                <Button type='Submit' variant="contained" color='primary' onClick={this.onClickBtn}>Activate Account</Button>
                            </div>
                            <div className='errMsg' >
                                {this.state.error.msg}
                            </div>
                        </div>
                    </div>) 
                    : 
                    (<div className = 'divVarText'>
                        <Typography id='loginT' className='loginT' color='primary'>Verification Is done</Typography>
                        <span className="spanGoLogin">please go to <a href="/login">login</a> page</span>
                    </div>)}

                </Card>
            </div>
        );
    }
}
