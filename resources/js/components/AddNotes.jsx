import React, { Component } from 'react';
import { InputBase, Button } from "@material-ui/core";
import checkBox from "../assets/icons/check_box-24px.svg"
import brush from "../assets/icons/brush-24px.svg"
import image from "../assets/icons/image-24px.svg"
import alert from "../assets/icons/alert-24px.svg"
import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import pin from "../assets/icons/pin.svg"

export default class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteEdit: false,
            title: '',
            note: '',
        }
        this.openAddnote = this.openAddnote.bind(this);
        this.closeAddnote = this.closeAddnote.bind(this);
        this.getInput = this.getInput.bind(this);
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
        }


        if (this.state.title != '' && this.state.note != '') {
            this.props.noteData(data);
            this.setState({
                title: '',
                note: '',
            })
           
        }
    }

    getInput() {
        this.setState({
            [event.target.name]: event.target.value
        });

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
                <div className='iconClose'>
                    <div className='takeNoteIcons'>
                        <div className='iconsclass'>
                            <img src={alert} className="alert" alt="alert   " />
                        </div>
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