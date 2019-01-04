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


    updateLabel(labelData){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/updateLabel', labelData, { headers: { Authorization: auth } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
    }

    addLabelOnNote(labelData) {
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/addLabelOnNote', labelData, { headers: { Authorization: auth } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
    }

    deleteLabelFromNote(labelData){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/removeLabelFromNote', labelData, { headers: { Authorization: auth } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
    }
}