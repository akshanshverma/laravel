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

    deleteNote(noteId){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/deleteNotes', noteId, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    noteImage(imageData){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/addImage', imageData, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }


    deleteImageFromNote(imageData){
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/removeImageFromNote', imageData, { headers: { Authorization: auth } })
            .then((response) => {
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }

    
}