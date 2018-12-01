import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
export default class Input extends Component {
    constructor(props) {
        super(props);
        {
            this.state = {
                data:''
            }
        }
        this.sendDataToParent = this.sendDataToParent.bind(this);
    }

    sendDataToParent(){
        this.setState({data: event.target.value})
        this.props.onClick(this.state.data)
    }

    render(){
        return(
            <TextField
            className='textBox'
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            label={this.props.label}
            onChange={this.sendDataToParent}
            fullWidth
            />
        )
    }
}
