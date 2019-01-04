import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';


export default class NoteLabelChip extends Component {
   
    removeLabel = () =>{
        var labelData = {
            label_id:this.props.label.label_id,
            note_id:this.props.label.note_id
        }
        this.props.removeNoteLabel(labelData);
    }
    render() {
        return <Chip
            className='reminderDateTimeOnNote'
            label={this.props.label.label.label}
            onDelete={this.removeLabel}
        />
    }
}