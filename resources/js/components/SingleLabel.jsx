import React, { Component } from "react";
import InputBase from '@material-ui/core/InputBase';
import labelFill from "../assets/icons/labelFill.svg";
import editIconfill from "../assets/icons/editIconfill.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import saveButton from "../assets/icons/saveButton.svg";

export default class SingleLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delIcon: false,
            labelId: this.props.label.id,
            label: this.props.label.label,
        }
    }

    delIconAction = () => {
        this.setState({
            delIcon: !this.state.delIcon
        })
    }

    removeLabel = () => {
        console.log(this.state.labelId);
        var labelID = {
            id: this.state.labelId
        }
        this.props.removeLabel(labelID);
    }
    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    update = () => {
        var labelData = {
            id:this.state.labelId,
            label:this.state.label,
        }
        this.props.updateLabel(labelData)
    }



    render() {
        
        
        return (
            <div className='labelEdit' style={{ display: 'flex' }} onMouseOver={this.delIconAction} onMouseLeave={this.delIconAction}>
                {this.state.delIcon ?
                    <img src={deleteIcon} className="image" alt="deleteIcon" onClick={this.removeLabel} />
                    :
                    <img src={labelFill} className="image" alt="labelFill" />}
                <InputBase 
                    className='labelInput'
                    placeholder="Create new label"
                    name='label'
                    fullWidth
                    defaultValue={this.state.label}
                    onChange={this.onChangeInput}>
                </InputBase>
                <img src={saveButton} className="image" alt="saveButton   " onClick={this.update}/>
            </div>
        );
    }
}