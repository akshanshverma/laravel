import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Popper, Paper } from '@material-ui/core';
import image from "../assets/icons/image-24px.svg"

import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import more from "../assets/icons/more_vert-24px.svg"
import pin from "../assets/icons/pin.svg"
import ReminderTab from "./ReminderTab";


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: '',
            reminder: '',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: this.props.setTitle,
            note: this.props.setNote
        })
    }

    handleClick(event) {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };


    render() {
        return (

            <div className='divCard'>
                <Card>
                    <CardContent id='CardContent'>
                        <div className='inputTitle'>
                            {this.props.setTitle}
                        </div>
                        <div className='inputnote'>
                            {this.props.setNote}
                        </div>
                    </CardContent>
                    <div className='inNotetakeNoteIcons'>
                        <ReminderTab/>
                        <div className='inNoteiconsclass'>
                            <img src={collab} className="collab" alt="collab   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={colorLens} className="colorLens" alt="colorLens   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={image} className="image" alt="image   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={archive} className="archive" alt="archive   " />
                        </div>
                        <div className='inNoteiconsclass'>
                            <img src={more} className="more" alt="more   " />
                        </div>
                    </div>
                </Card>

                {/* <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition>
                    {({ TransitionProps }) => (
                            <Paper>
                                <Typography>The content of the Popper.</Typography>
                            </Paper>
                       
                    )}
                </Popper> */}
            </div>
        )
    }
}