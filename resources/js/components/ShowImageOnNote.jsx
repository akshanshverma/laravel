import React, { Component } from "react";
import deleteImage from "../assets/icons/deleteImage.svg";

export default class ShowImageOnNote extends Component {
    deleteImg = () => {
        this.props.deleteNoteImage(this.props.image.id);
    }
    render() {
        return (
            <div className='divImageAndDelIcon' onClick={this.props.openEditBox}>
                <img src={this.props.image.image} className="imageOnNote" alt="image   " />
                <div className='delIconOnImage' onClick={this.deleteImg}>
                    <img src={deleteImage} className="deleteImage" alt="deleteImage   " />
                </div>
            </div >
        );
    }
}