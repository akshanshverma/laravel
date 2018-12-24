import axios from 'axios';

export default class UserServices {
    createNote(noteData) {
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/createnote', noteData, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    getNote(){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.get('/api/getAllNotes', { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    updateNote(noteData){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/updateNote', noteData, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }
}