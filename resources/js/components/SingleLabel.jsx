import React, { Component } from "react";
import InputBase from '@material-ui/core/InputBase';
import labelFill from "../assets/icons/labelFill.svg";
import editIconfill from "../assets/icons/editIconfill.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";

export default class SingleLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delIcon: false,
            labelId:this.props.label.id
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
            id:this.state.labelId
        }
        this.props.removeLabel(labelID);
    }

    render() {
        return (
            <div style={{ display: 'flex' }} onMouseOver={this.delIconAction} onMouseLeave={this.delIconAction}>
                {this.state.delIcon ?
                    <img src={deleteIcon} className="image" alt="deleteIcon" onClick={this.removeLabel}/>
                    :
                    <img src={labelFill} className="image" alt="labelFill" />}
                <InputBase placeholder="Create new label" name='label' fullWidth value={this.props.label.label}></InputBase>
                <img src={editIconfill} className="image" alt="editIconfill   " />
            </div>
        );
    }
}