import React, { Component } from "react";

import { MenuList, MenuItem, Paper, Grow, Popper, ClickAwayListener, Divider, TextField } from "@material-ui/core";
import alert from "../assets/icons/alert-24px.svg"


export default class ReminderTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            pickDate: false,
            reminderDate:'',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    handleClose() {
        this.setState(state => ({
            open: !state.open,
            anchorEl: null,
        }));
        console.log(this.state);
        
       this.props.setDate(this.state.reminderDate);
    };

    handleClick(event) {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

    datePicket = () => {
        var date = event.target.value
        this.setState({
            reminderDate:date
        }) 
    }

    nextWeek = () => {
    
    }



    render() {
        return (
            <div>
                <div className='inNoteiconsclass'>
                    <img src={alert} className="alert" alt="alert" onClick={this.handleClick} />
                    {/* <span className="alertHint">Remind me</span> */}
                </div>
                <div className='ReminderMenu'>
                    <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose} >
                                        <MenuList>
                                            <div className='remindeMenuHead'>Reminder:</div>
                                            <MenuItem onClick={this.props.today}>Later today</MenuItem>
                                            <MenuItem >Tomorrow</MenuItem>
                                            <MenuItem >Next week</MenuItem>
                                            <MenuItem >
                                                <form noValidate>
                                                    <TextField
                                                        onChange={this.datePicket}
                                                        id="datetime-local"
                                                        label="Select date"
                                                        type="datetime-local"
                                                        defaultValue="yyyy-mm-ddT00:00"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </form>
                                            </MenuItem>
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