import React, { Component } from 'react';
import { InputBase, Button, Chip } from "@material-ui/core";
import checkBox from "../assets/icons/check_box-24px.svg"
import brush from "../assets/icons/brush-24px.svg"
import image from "../assets/icons/image-24px.svg"
import collab from "../assets/icons/collab.svg"
import archive from "../assets/icons/archive-24px.svg"
import unarchive from "../assets/icons/unarchive.svg"
import pin from "../assets/icons/pin.svg"
import pined from "../assets/icons/pined.svg"
import ReminderTab from "./ReminderTab";
import SetColor from "./SetColor";
import AdditionalOptions from "./AdditionalOptions";
import ImageUploadOnNote from "./ImageUploadOnNote";

export default class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteEdit: false,
            title: '',
            note: '',
            reminder: null,
            color: null,
            pin: false,
            archive: false,
        }
        this.openAddnote = this.openAddnote.bind(this);
        this.closeAddnote = this.closeAddnote.bind(this);
        this.getInput = this.getInput.bind(this);
        this.removeReminder = this.removeReminder.bind(this);
    }

    openAddnote() {
        this.setState({
            noteEdit: true
        })
    }

    closeAddnote() {
        this.setState({
            noteEdit: false
        })

        var data = {
            title: this.state.title,
            note: this.state.note,
            reminder: this.state.reminder,
            color: this.state.color,
            pin: this.state.pin,
            archive: this.state.archive,
            trash: false,
        }


        if (this.state.reminder !== null || (this.state.title !== '' && this.state.note !== '')) {

            this.props.noteData(data);
            this.setState({
                title: '',
                note: '',
                reminder: null,
                color: null,
                pin: false,
                archive: false,
            })

        }
    }

    getInput() {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    setReminderDate = (date) => {
        this.setState({
            reminder: date
        })
    }
    removeReminder() {
        this.setState({
            reminder: null
        })
    }

    changeColor = (color) => {
        this.setState({
            color: color
        })
    }

    pinAndUnpin = () => {
        this.setState({
            pin: !this.state.pin
        })
    }

    archiveAndUnarchive = () => {
        this.setState({
            noteEdit: false
        })
        var data = {
            title: this.state.title,
            note: this.state.note,
            reminder: this.state.reminder,
            color: this.state.color,
            pin: this.state.pin,
            archive: '1',
            trash: false,
        }

        if (this.state.reminder !== null || (this.state.title !== '' && this.state.note !== '')) {

            this.props.noteData(data);
            this.setState({
                title: '',
                note: '',
                reminder: null,
                color: null,
                pin: false,
                archive: false,

            })

        }


    }

    render() {
        var close = (
            <div onClick={this.openAddnote} className='NotesBox'>
                <div className='takeNote'>Take a note...</div>

                <div className='titleIcon '>
                    <img src={checkBox} className="addNoteEndIcons" alt="checkBox   " />
                    <img src={brush} className="addNoteEndIcons" alt="brush   " />
                    <img src={image} className="addNoteEndIcons" alt="image   " />
                </div>
            </div>
        );

        var edit = (
            <div style={{ backgroundColor: this.state.color }} className='addNoteBox' >
                <div className='addTitle'>
                    <InputBase multiline name='title' placeholder='Title' fullWidth onChange={this.getInput} />
                    <img src={this.state.pin ? pined : pin} className="pin" alt="pin" onClick={this.pinAndUnpin} />
                </div>
                <div className='addNotesInput'>
                    <InputBase multiline name='note' id='noteInput' placeholder='Take a note...' fullWidth onChange={this.getInput} />
                </div>

                {this.state.reminder === null ? (<div />) : (
                    <div> <Chip
                        className='reminderDateTime'
                        label={this.state.reminder}
                        onDelete={this.removeReminder}
                    /></div>
                )}



                <div className='iconClose'>
                    <div className='takeNoteIcons'>
                        <div  className='iconsclass'>
                            <ReminderTab setDate={this.setReminderDate} />
                        </div>

                        <div className='iconsclass'>
                            <img src={collab} className="collab" alt="collab   " />
                        </div>
                        <div className='iconsclass'><SetColor changeColor={this.changeColor} /></div>
                        <div className='iconsclass'>
                            <ImageUploadOnNote addImageOnNote={this.props.addImageOnNote} noteData={this.props.noteData} />
                        </div>


                        <div className='iconsclass'>
                            <img src={archive} onClick={this.archiveAndUnarchive} className="archive" alt="archive   " />
                        </div>
                        <AdditionalOptions />
                    </div>

                    <div className='divCloseButton'>
                        <Button className='noteCloseButton' onClick={this.closeAddnote}>Close</Button>
                    </div>
                </div>
            </div>
        );


        return (
            <div className='divMamin'>
                {this.state.noteEdit ? (edit) : (close)}
            </div>
        )
    }
}