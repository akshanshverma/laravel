import React, { Component } from 'react';
import { InputBase, Button, Chip } from "@material-ui/core";
import checkBox from "../assets/icons/check_box-24px.svg"
import brush from "../assets/icons/brush-24px.svg"
import image from "../assets/icons/image-24px.svg"
import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import pin from "../assets/icons/pin.svg"
import ReminderTab from "./ReminderTab";


export default class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteEdit: false,
            title: '',
            note: '',
            reminder: '',
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
            reminder:this.state.reminder,
        }
        

        if (this.state.reminder !== '' || (this.state.title !== '' && this.state.note !== '')) {
            
            this.props.noteData(data);
            this.setState({
                title: '',
                note: '',
                reminder:'',
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
    removeReminder(){
        this.setState({
            reminder: ''
        })
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
            <div className='addNoteBox'>
                <div className='addTitle'>
                    <InputBase multiline name='title' placeholder='Title' fullWidth onChange={this.getInput} />
                    <img src={pin} className="pin" alt="pin   " />
                </div>
                <div className='addNotesInput'>
                    <InputBase multiline name='note' id='noteInput' placeholder='Take a note...' fullWidth onChange={this.getInput} />
                </div>
                
                {this.state.reminder==='' ? (<div/>) : (
                   <div> <Chip
                   className='reminderDateTime'
                   label={this.state.reminder}
                   onDelete={this.removeReminder}
                   /></div>
                )}
               


                <div className='iconClose'>
                    <div className='takeNoteIcons'>
                        <ReminderTab setDate={this.setReminderDate} />
                        <div className='iconsclass'>
                            <img src={collab} className="collab" alt="collab   " />
                        </div>
                        <div className='iconsclass'>
                            <img src={colorLens} className="colorLens" alt="colorLens   " />
                        </div>
                        <div className='iconsclass'>
                            <img src={image} className="image" alt="image   " />
                        </div>
                        <div className='iconsclass'>
                            <img src={archive} className="archive" alt="archive   " />
                        </div>
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