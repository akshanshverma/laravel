import axios from 'axios';

export default class UserServices {
    /**
     * 
     * 
     * @param {array} userData 
     */
    registerUser(userData) {
        return axios.post('/api/register', userData)
            .then((response) => {
                //console.log('check',response);
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    loginUser(userData) {
        return axios.post('/api/login', userData)
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('token', response.data.success.token);
                }
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    getUsrData() {

        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.get('/api/getDetails', { headers: { Authorization: auth } })
            .then((response) => {

                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    logoutUser() {
    
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.get('/api/logout', { headers: { Authorization: auth } })
            .then((response) => {
                if (response.status == 200) {
                    localStorage.removeItem('token');
                }
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }
}