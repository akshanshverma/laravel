import React, { Component } from "react";

import { MenuList, Paper, Grow, Popper, ClickAwayListener, Avatar, Grid } from "@material-ui/core";
import colorLens from "../assets/icons/color_lens-24px.svg"
import deepPurple from '@material-ui/core/colors/deepPurple';
import deepOrange from '@material-ui/core/colors/deepOrange';


export default class SetColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    handleClose() {
        this.setState(state => ({
            open: !state.open,
            anchorEl: null,
        }));
    };

    handleClick(event) {
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
                    <img src={colorLens} className="colorLens" alt="colorLens" onClick={this.handleClick} />
                    {/* <span className="alertHint">Remind me</span> */}
                </div>
                <div className='colorMenu'>
                    <Popper className='colorPopper' open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose} >
                                        <MenuList className='colorMenuList'>
                                            <Grid className='grid' container justify="center" alignItems="center">
                                                <Avatar onClick={() => this.props.changeColor('#ffffff')} style={{ backgroundColor: '#ffffff' }} className='colorAvatar' ></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#f28b82')} style={{ backgroundColor: '#f28b82' }} className='colorAvatar'></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#d7bc04')} style={{ backgroundColor: '#d7bc04' }} className='colorAvatar' ></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#fff475')} style={{ backgroundColor: '#fff475' }} className='colorAvatar' ></Avatar>

                                                <Avatar onClick={() => this.props.changeColor('#ccff90')} style={{ backgroundColor: '#ccff90' }} className='colorAvatar'></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#a7ffeb')} style={{ backgroundColor: '#a7ffeb' }} className='colorAvatar'></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#cbf0f8')} style={{ backgroundColor: '#cbf0f8' }} className='colorAvatar' ></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#aecbfa')} style={{ backgroundColor: '#aecbfa' }} className='colorAvatar' ></Avatar>

                                                <Avatar onClick={() => this.props.changeColor('#d7aefb')} style={{ backgroundColor: '#d7aefb' }} className='colorAvatar' ></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#fdcfe8')} style={{ backgroundColor: '#fdcfe8' }} className='colorAvatar'></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#e6c9a8')} style={{ backgroundColor: '#e6c9a8' }} className='colorAvatar' ></Avatar>
                                                <Avatar onClick={() => this.props.changeColor('#e8eaed')} style={{ backgroundColor: '#e8eaed' }} className='colorAvatar' ></Avatar>
                                            </Grid>
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