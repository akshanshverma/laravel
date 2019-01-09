import React, { Component } from "react";
import FormData from 'form-data';
const formdata = new FormData();

export default class ImgUpload extends Component {
    constructor(props) {
        super(props);
    }

    getImage = (event) => {
        formdata.append('profile_image', event.target.files[0]);
        // console.log('upload',event.target.files[0]);
        
        this.props.uploadImage(formdata);
    }

    render() {
        // console.log(this.state);

        return (
            <div>
                <input onChange={this.getImage} type='file' name='file' ></input>
            </div>
        )
    }
}