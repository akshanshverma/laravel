import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { InputBase, Chip } from "@material-ui/core";
import checkBox from "../assets/icons/check_box-24px.svg"
import brush from "../assets/icons/brush-24px.svg"
import image from "../assets/icons/image-24px.svg"
import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import pin from "../assets/icons/pin.svg"
import ReminderTab from "./ReminderTab";


export default class EditNoteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteData: null,
            open: false,
            id: this.props.note.id,
            title: this.props.note.title,
            note: this.props.note.note,
            reminder: this.props.note.reminder,
            color: this.props.note.color,
            pin: this.props.note.pin,
            archive: this.props.note.archive
        }
        this.handleDialog = this.handleDialog.bind(this);
    }

    handleDialog() {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        var data = {
            id: this.state.id,
            title: this.state.title,
            note: this.state.note,
            reminder: this.state.reminder,
            color: this.state.color,
            pin: this.state.pin,
            archive: this.state.archive,
        }
        this.props.update(data);
        this.setState({
            open: false,
            // id: null,
            // title: null,
            // note: null,
            // reminder: null,
            // color: null,
            // pin: null,
            // archive: null,
        });
    };

    removeReminder = () => {

    }

    getInput = () => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    setReminderDate = (date) => {
        this.setState({
            reminder: date
        })
    }
    removeReminder = () => {
        this.setState({
            reminder: null
        })
    }


    render() {

        console.log('ch', this.state);


        const { fullScreen } = this.props;
        return (
            <div className='dilogBoxMainDv'>

                <Dialog
                    fullWidth
                    className='editNoteDialogBox'
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    <DialogContent className='editNoteContent'>
                        <div className='addTitlEdit'>
                            <InputBase multiline name='title' fullWidth onChange={this.getInput} defaultValue={this.props.note.title}></InputBase>
                            <img src={pin} className="pin" alt="pin   " />
                        </div>
                        <div className='addNotesInputEdit'>
                            <InputBase multiline name='note' id='noteInput' fullWidth onChange={this.getInput} defaultValue={this.props.note.note} />
                        </div>
                        {this.state.reminder === null ? (<div />) : (
                            <div> <Chip
                                className='reminderDateTime'
                                label={this.state.reminder}
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
                                <Button className='noteCloseButton' onClick={this.handleClose}>Close</Button>
                            </div>
                        </div>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

// EditNoteDialog.propTypes = {
//     fullScreen: PropTypes.bool.isRequired,
// };

// export default withMobileDialog()(EditNoteDialog);
