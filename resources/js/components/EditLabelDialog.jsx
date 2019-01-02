import React from 'react';
import { Button, ListItem, ListItemIcon, ListItemText, InputBase, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import editIconfill from "../assets/icons/editIconfill.svg";
import editIcon from "../assets/icons/editIcon.svg";
import closeIcon from "../assets/icons/close-24px.svg";
import saveButton from "../assets/icons/saveButton.svg";
import labelFill from "../assets/icons/labelFill.svg";



export default class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullScreen } = this.props;
        console.log('edLb', this.props.labelEditAction);

        return (
            <div>
                <ListItem className='menuListItem' button onClick={this.handleClickOpen}>
                    <ListItemIcon>
                        <img src={editIcon} className="menuBarIcon" alt="editIcon   " />
                    </ListItemIcon>
                    <ListItemText>Edit labels</ListItemText>
                </ListItem>

                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div>
                            <samp>Edit label</samp>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img src={closeIcon} className="image" alt="closeIcon   " />
                            <InputBase placeholder="Create new label" name='title' fullWidth ></InputBase>
                            <img src={saveButton} className="image" alt="saveButton   " />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <img src={labelFill} className="image" alt="labelFill   " />
                            <InputBase fullWidth defaultValue='akku' ></InputBase>
                            <img src={editIconfill} className="image" alt="editIconfill   " />
                        </div>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <div className='divCloseButton'>
                            <Button className='noteCloseButton' onClick={this.handleClose}>Done</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

