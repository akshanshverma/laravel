import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';

export default class LoginWithFacebook extends Component {



    render() {
        const responseFacebook = (response) => {
            var userData = {
                'email':response.email,
                'username':response.name,
                'password':response.id,
                'profile_image':response.picture.data.url,
            }
            console.log(response);
            
            this.props.loginWithGoogle(userData);
        }
        return (
            <div className='googleLoginButtonDiv'>
                <FacebookLogin
                    appId="279356839396991"
                    autoLoad={false}
                    size='small'
                    icon="fa-facebook"
                    textButton='login'
                    fields="name,email,picture"
                    callback={responseFacebook} />
            </div>
        )
    }
}