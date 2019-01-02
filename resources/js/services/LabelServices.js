import axios from 'axios';

export default class LabelServices {
    getLabels() {
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

    createNewLabel(labelName) {
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/createLabel', labelName, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            })
    }

    removeLabel(labelId){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/removeLabel', labelId, { headers: { Authorization: auth } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
    }
}