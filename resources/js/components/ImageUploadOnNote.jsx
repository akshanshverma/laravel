import React, { Component } from "react";
import image from "../assets/icons/image-24px.svg"
import FormData from 'form-data';
const formdata = new FormData();

export default class ImageUploadOnNote extends Component {

    onClickImg = () =>{
        this.fileInput.click();
    }

    getImage = (event) => {
        formdata.append('image', event.target.files[0]);
        formdata.append('note_id', this.props.noteData.id);
        console.log('upload',formdata);
        
        this.props.addImageOnNote(formdata);
    }

    render() {
        return (
            <div>
                <div className='inNoteiconsclass' onClick={this.onClickImg}>
                    <img src={image} className="image" alt="image   " />
                </div>

                <input
                    ref={fileInput => this.fileInput = fileInput}
                    type="file" 
                    style={{ 'display': 'none' }}
                    onChange={this.getImage} name="image" />
            </div>
        );
    }
}