import React, { Component, useRef } from 'react';
import { Card, CardContent, Typography, CardActions, Popper, Paper, Chip } from '@material-ui/core';
import image from "../assets/icons/image-24px.svg"


import collab from "../assets/icons/collab.svg"
import archive from "../assets/icons/archive-24px.svg"
import unarchive from "../assets/icons/unarchive.svg"
import pin from "../assets/icons/pin.svg"
import pined from "../assets/icons/pined.svg"
import ReminderTab from "./ReminderTab";
import AdditionalOptions from "./AdditionalOptions";
import AdditionalOptionsOnDel from "./AdditionalOptionsOnDel";
import SetColor from "./SetColor";
import EditNoteDialog from "./EditNoteDialog";



export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteData: this.props.noteData
        }
        this.editNoteDialog = React.createRef();
    }

    openEditBox = () => {
        this.editNoteDialog.current.handleDialog();
    }

    removeReminder = () => {
        var noteData = this.state.noteData;
        noteData.reminder = null;
        this.props.update(noteData);
    }

    setReminderDate = (date) => {
        var note = this.state.noteData;
        note.reminder = date;
        this.props.update(note);
    }

    updateNote = (data) => {
        this.props.update(data);
    }

    updateColor = (color) => {
        var notes = this.state.noteData;
        notes.color = color;
        this.props.update(notes);
    }

    pinAndUnpin = () => {
        var notes = this.state.noteData;
        if (this.state.noteData.pin === '0') {
            notes.pin = '1';
            this.setState({
                noteData: notes
            })
        } else {
            notes.pin = '0';
            this.setState({
                noteData: notes
            })
        }
        this.props.update(notes);
    }

    archiveAndUnarchive = () => {
        var notes = this.state.noteData;
        if (this.state.noteData.archive === '0') {
            notes.archive = '1';
            this.setState({
                noteData: notes
            })
        } else {
            notes.archive = '0';
            this.setState({
                noteData: notes
            })
        }
        this.props.update(notes);
    }

    deleteNote = () => {
        var notes = this.state.noteData;
        if (this.state.noteData.trash === '0') {
            notes.trash = '1';
        } else {
            notes.trash = '0';
        }
        this.props.update(notes);
    }

    deleteForeverNote = () => {
        console.log(this.state.noteData,'check');
        
        this.props.trashN(this.state.noteData);
    }
    render() {
        return (

            <div className={this.props.view ? ('divCardList') : ('divCardGrid')}>

                <Card style={{ backgroundColor: this.state.noteData.color }} className="noteCard">
                    <CardContent className='noteCardContent' >

                        <div className='cardTitlePin'>
                            <div className='inputTitle' onClick={this.openEditBox}>
                                {this.props.noteData.title}
                            </div>
                            <div className='inNoteiconsclass'>
                                <img src={this.state.noteData.pin === '1' ? pined : pin} className="pin" alt="pin" onClick={this.pinAndUnpin} />
                            </div>
                        </div>

                        <div className='inputnote' onClick={this.openEditBox}>
                            {this.props.noteData.note}
                        </div>

                        {this.state.noteData.reminder === null ? (<div />) : (
                            <Chip
                                className='reminderDateTimeOnNote'
                                label={this.state.noteData.reminder}
                                onDelete={this.removeReminder}
                            />
                        )}

                    </CardContent>
                    {this.state.noteData.trash === '1' ?
                        <div className='inNotetakeNoteIcons'>
                            <AdditionalOptionsOnDel deleteNote={this.deleteNote} deleteForever={this.deleteForeverNote} />
                        </div>
                        :
                        <div className='inNotetakeNoteIcons'>
                            <ReminderTab setDate={this.setReminderDate} />
                            <div className='inNoteiconsclass'>
                                <img src={collab} className="collab" alt="collab   " />
                            </div>
                            <SetColor changeColor={this.updateColor} />
                            <div className='inNoteiconsclass'>
                                <img src={image} className="image" alt="image   " />
                            </div>
                            <div className='inNoteiconsclass'>
                                <img src={this.state.noteData.archive === '1' ? unarchive : archive} className="archive" alt="archive   " onClick={this.archiveAndUnarchive} />
                            </div>
                            <AdditionalOptions deleteNote={this.deleteNote} />
                        </div>}
                </Card>
                <EditNoteDialog style={{ backgroundColor: this.state.noteData.color }} ref={this.editNoteDialog} update={this.updateNote} note={this.state.noteData} />
            </div>
        )
    }
}