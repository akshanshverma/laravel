import React, { Component, useRef } from 'react';
import { Card, CardContent, Typography, CardActions, Popper, Paper, Chip } from '@material-ui/core';
import image from "../assets/icons/image-24px.svg"


import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import more from "../assets/icons/more_vert-24px.svg"
import pin from "../assets/icons/pin.svg"
import ReminderTab from "./ReminderTab";
import SetColor from "./SetColor";
import EditNoteDialog from "./EditNoteDialog";



export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.setId,
            title: this.props.setTitle,
            note: this.props.setNote,
            reminder: this.props.setReminder,
            color:this.props.setColor,
        }
        this.editNoteDialog = React.createRef();
    }


    onClickCard = () => {

    }

    openEditBox = () => {
        this.editNoteDialog.current.handleDialog();
    }

    removeReminder = () => {
        var noteData = this.state;
        noteData.reminder = null;
        this.props.update(noteData);
    }

    setReminderDate = (date) => {
        var noteData = this.state;
        noteData.reminder = date;
        this.props.update(noteData);
    }

    updateNote = (data) =>{
        this.props.update(data);
    }

    updateColor = (color) =>{
        var noteData = this.state;
        noteData.color = color;
        this.props.update(noteData);
    }

    render() {


        return (

            <div className={this.props.view ? ('divCardList') : ('divCardGrid')}>

                <Card style={{backgroundColor: this.state.color}} className="noteCard">
                    <CardContent className='noteCardContent' >
                        <div className='cardTitlePin'>
                            <div className='inputTitle' onClick={this.openEditBox}>
                                {this.props.setTitle}
                            </div>
                            <div className='inNoteiconsclass'>
                                <img src={pin} className="pin" alt="pin" />
                            </div>
                        </div>
                        <div className='inputnote' onClick={this.openEditBox}>
                            {this.props.setNote}
                        </div>

                        {this.state.reminder === null ? (<div />) : (
                            <Chip
                                className='reminderDateTimeOnNote'
                                label={this.state.reminder}
                                onDelete={this.removeReminder}
                            />
                        )}

                    </CardContent>
                    <div className='inNotetakeNoteIcons'>
                        <ReminderTab  setDate={this.setReminderDate} />
                        <div className='inNoteiconsclass'>
                            <img src={collab} className="collab" alt="collab   " />
                        </div>
                        <SetColor changeColor={this.updateColor}/>
                        <div className='inNoteiconsclass'>
                            <img src={image} className="image" alt="image   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={archive} className="archive" alt="archive   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={more} className="more" alt="more   " />
                        </div>
                    </div>
                </Card>
                {/* <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition>
                    {({ TransitionProps }) => (
                            <Paper>
                                <Typography>The content of the Popper.</Typography>
                            </Paper>
                       
                    )}
                </Popper> */}
                <EditNoteDialog ref={this.editNoteDialog} update={this.updateNote} note={this.state} />
            </div>
        )
    }
}