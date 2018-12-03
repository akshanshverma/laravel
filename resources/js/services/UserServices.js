import axios from 'axios';

export default class UserServices{

    registerUser(userData) {
        return axios.post('/api/register', userData)
        .then((response )=> {
            //console.log('check',response);
            return response;
        }
        )
        .catch((error)=>{
            return error;
        });
    }

    loginUser(userData){
        return axios.post('/api/login', userData)
        .then((response )=> {
            return response;
        }
        )
        .catch((error)=>{
            return error;
        });
    }
}