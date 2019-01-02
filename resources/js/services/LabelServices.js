import axios from 'axios';

export default class LabelServices {
    getLabels(){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.get('/api/getAllLabel', { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }
}