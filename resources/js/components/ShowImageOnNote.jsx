import React, { Component } from "react";

export default class ShowImageOnNote extends Component {
    render() {
        return (
            <div>
                <img src={this.props.image.image} className="image" alt="image   " />
            </div>
        );
    }
}