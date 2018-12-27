import React, { Component } from "react";

import { MenuList, Paper, Grow, Popper, ClickAwayListener, Avatar, Grid } from "@material-ui/core";
import colorLens from "../assets/icons/color_lens-24px.svg"


export default class SetColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            colors: ['#ffffff','#f28b82','#d7bc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']
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

        var showColor = (this.state.colors.map((color) =>{
            return  <Avatar key={color} onClick={() => this.props.changeColor(color)} style={{ backgroundColor: color }} className='colorAvatar' ></Avatar>
        }));

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
                                                {showColor}
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