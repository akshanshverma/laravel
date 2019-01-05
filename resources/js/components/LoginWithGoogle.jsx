import React, { Component } from "react";
import GoogleLogin from 'react-google-login';

export default class LoginWithGoogle extends Component {



    render() {
        const responseGoogle = (response) => {
            if (response.error === 'popup_closed_by_user') {
                
            }else{
                var userData = {
                    'email':response.w3.U3,
                    'username':response.w3.ig,
                    'password':response.w3.Eea,
                }
                this.props.loginWithGoogle(userData);
            }
            
        } 
        return (
            <div className='googleLoginButtonDiv'>
                <GoogleLogin
                    clientId="371364819023-m1q7d9l56s51d0j773pab4f13900044m.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
        )
    }
}