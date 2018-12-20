import React, { Component } from "react";

import { MenuList, MenuItem, Paper, Grow, Popper, ClickAwayListener, Divider, TextField } from "@material-ui/core";
import alert from "../assets/icons/alert-24px.svg"
import moment from "moment";


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

    datePicker = () => {
        var date = event.target.value
        var newDate = moment(date).format('MM/DD/YYYY, h:mm A');
        this.setState({
            reminderDate:newDate
        }) 
    }

    nextWeek = () => {
        var date =moment().add(7, 'days');  
        var time = moment().format('LT'); 
        this.setState({
            reminderDate:date+", "+time
        })
    }

    tomorrow = () => {
        var date =moment().add(1, 'days').format('MM/DD/YYYY, h:mm A');  
        // var time = moment().format('LT'); 
        this.setState({
            reminderDate:date
        })
    }

    laterToday = () => {
        var date  = moment().format('MM/DD/YYYY, 8:00')
        this.setState({
            reminderDate:date+" PM"
        })
    }



    render() {
        return (
            <div>
                <div className='inNoteiconsclass'>
                    <img src={alert} className="alert" alt="alert" onClick={this.handleClick} />
                    {/* <span className="alertHint">Remind me</span> */}
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
                                            <div className='remindeMenuHead'>Reminder:</div>
                                            <MenuItem onClick={this.laterToday}>Later today</MenuItem>
                                            <MenuItem onClick={this.tomorrow}>Tomorrow</MenuItem>
                                            <MenuItem onClick={this.nextWeek}>Next week</MenuItem>
                                            <MenuItem >
                                                <form noValidate>
                                                    <TextField
                                                        onChange={this.datePicker}
                                                        id="datetime-local"
                                                        label="Select date"
                                                        type="datetime-local"
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