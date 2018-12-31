import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { InputBase, Chip } from "@material-ui/core";
import image from "../assets/icons/image-24px.svg"
import collab from "../assets/icons/collab.svg"
import archive from "../assets/icons/archive-24px.svg"
import unarchive from "../assets/icons/unarchive.svg"
import pin from "../assets/icons/pin.svg"
import pined from "../assets/icons/pined.svg"
import ReminderTab from "./ReminderTab";
import SetColor from "./SetColor";
import AdditionalOptions from "./AdditionalOptions";


export default class EditNoteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            noteData: this.props.note
        }
        this.handleDialog = this.handleDialog.bind(this);
    }

    handleDialog() {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        var data = this.state.noteData;
        this.props.update(data);
        this.setState({
            open: false,
        });
    };

    getInput = () => {
        var note = this.state.noteData;
        note[event.target.name] = event.target.value;
        this.setState({
            noteData: note,
        })

    }


    setReminderDate = (date) => {
        var note = this.state.noteData;
        note.reminder = date;
        this.setState({
            noteData: note,
        })

    }
    removeReminder = () => {
        var note = this.state.noteData;
        note.reminder = null;
        this.setState({
            noteData: note,
        })
    }

    updateColor = (color) => {
        var notes = this.state.noteData;
        notes.color = color;
        this.props.update(notes);
    }
    archiveAndUnarchive = () =>{
        var notes = this.state.noteData;
        if (this.state.noteData.archive === '0') {
            notes.archive = '1';
            this.setState({
                noteData:notes,
                open:false
            })
        }else{
            notes.archive = '0';
            this.setState({
                noteData:notes,
                open:false
            })
        }
        this.props.update(notes);
    }


    pinAndUnpin = () =>{
        var notes = this.state.noteData;
        if (this.state.noteData.pin === '0') {
            notes.pin = '1';
            this.setState({
                noteData:notes
            })
        }else{
            notes.pin = '0';
            this.setState({
                noteData:notes
            })
        }
    }

    render() {

        // console.log('ch', this.state);


        const { fullScreen } = this.props;
        return (
            <div className='dilogBoxMainDv'  >
                <Dialog

                    fullWidth
                    className='editNoteDialogBox'
                    fullScreen={fullScreen}
                    open={this.state.open}

                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    {/* <div className={this.state.noteData.reminder===null?<div/>:'reminderBarDialog' }><span className='reminderBarDialogSpan' >{this.state.noteData.reminder}</span></div> */}
                    <div style={{backgroundColor: this.state.noteData.color}}>
                        <DialogContent className='editNoteContent'>
                            <div className='addTitlEdit' >
                                <InputBase multiline name='title' fullWidth onChange={this.getInput} defaultValue={this.state.noteData.title}></InputBase>
                                <img src={this.state.noteData.pin === '1'?pined:pin} onClick={this.pinAndUnpin} className="pin" alt="pin   " />
                            </div>
                            <div className='addNotesInputEdit'>
                                <InputBase multiline name='note' id='noteInput' fullWidth onChange={this.getInput} defaultValue={this.state.noteData.note} />
                            </div>
                            {this.state.noteData.reminder === null ? (<div />) : (
                                <div> <Chip
                                    className='reminderDateTime'
                                    label={this.state.noteData.reminder}
                                    onDelete={this.removeReminder}
                                /></div>
                            )}
                        </DialogContent>
                        <DialogActions >
                            <div className='iconClose'>
                                <div style={{ position: 'fixed' }} className='takeNoteIcons'>
                                    <div >
                                        <ReminderTab className='editBoxReminderTab' setDate={this.setReminderDate} />
                                    </div>

                                    <div className='iconsclass'>
                                        <img src={collab} className="collab" alt="collab   " />
                                    </div>
                                    <SetColor changeColor={this.updateColor} />
                                    <div className='iconsclass'>
                                        <img src={image} className="image" alt="image   " />
                                    </div>
                                    <div className='iconsclass'>
                                        <img src={this.state.noteData.archive === '1'?unarchive:archive} className="archive" alt="archive   " onClick={this.archiveAndUnarchive} />
                                    </div>
                                    <AdditionalOptions/>
                                </div>

                                <div className='divCloseButton'>
                                    <Button className='noteCloseButton' onClick={this.handleClose}>Close</Button>
                                </div>
                            </div>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

// EditNoteDialog.propTypes = {
//     fullScreen: PropTypes.bool.isRequired,
// };

// export default withMobileDialog()(EditNoteDialog);
