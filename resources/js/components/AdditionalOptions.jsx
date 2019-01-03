import React, { Component } from "react";

import { MenuList, MenuItem, Paper, Grow, Popper, ClickAwayListener, Checkbox, TextField, Tooltip } from "@material-ui/core";
import more from "../assets/icons/more_vert-24px.svg"

export default class AdditionalOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            labelTab: false,
        }
    }


    handleClose = () => {
        this.setState(state => ({
            open: !state.open,
            anchorEl: null,
        }));
        // this.props.setDate(this.state.reminderDate);
    };

    handleClick = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
            labelTab: false
        }));
    };

    openLabelTab = () => {
        this.setState({
            labelTab: true
        })
    }


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
                                        {this.state.labelTab ?
                                            <MenuList>
                                                <div>Label note</div>
                                                {this.props.labels.map((label) => {
                                                    return <MenuItem key={label.id}>
                                                        <Checkbox
                                                            color='default'
                                                            // checked
                                                            disableRipple
                                                        />
                                                        <div>{label.label}</div>
                                                </MenuItem>
                                                })}
                                            </MenuList> :
                                            <MenuList>
                                                <MenuItem onClick={this.props.deleteNote}>Delete note</MenuItem>
                                                <MenuItem onClick={this.openLabelTab}>Add label</MenuItem>
                                            </MenuList>
                                        }
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