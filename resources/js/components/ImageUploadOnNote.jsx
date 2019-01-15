import React, { Component } from "react";
import image from "../assets/icons/image-24px.svg"



export default class ImageUploadOnNote extends Component {

    onClickImg = () =>{
        this.fileInput.click();
    }

    getImage = (event) => {
        var imageData = {
            image:event.target.files[0],
            note_id:this.props.noteData.id,
        }
        this.props.addImageOnNote(imageData);
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