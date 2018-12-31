import React, { Component } from "react";

import { MenuList, MenuItem, Paper, Grow, Popper, ClickAwayListener, Divider, TextField, Tooltip } from "@material-ui/core";
import more from "../assets/icons/more_vert-24px.svg"

export default class AdditionalOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        }
    }


    handleClose = () =>{
        this.setState(state => ({
            open: !state.open,
            anchorEl: null,
        }));
        // this.props.setDate(this.state.reminderDate);
    };

    handleClick=(event)=> {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

        
        
    render() {
        return (
            <div>
                <div className='inNoteiconsclass'>
                    <Tooltip title='More'>
                        <img src={more} className="more" alt="more" onClick={this.handleClick} />
                    </Tooltip>
                </div>
                <div className='ReminderMenu'>
                    <Popper className='reminderPopper' open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose} >
                                        <MenuList>
                                            <MenuItem onClick = {this.props.deleteNote}>Delete note</MenuItem>
                                            <MenuItem>Add label</MenuItem>
                                            <MenuItem>Make Copy</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}

                    </Popper>
                </div>
            </div>
        )
    }
}