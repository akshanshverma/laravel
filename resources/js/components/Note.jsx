import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import image from "../assets/icons/image-24px.svg"
import alert from "../assets/icons/alert-24px.svg"
import collab from "../assets/icons/collab.svg"
import colorLens from "../assets/icons/color_lens-24px.svg"
import archive from "../assets/icons/archive-24px.svg"
import more from "../assets/icons/more_vert-24px.svg"
import pin from "../assets/icons/pin.svg"


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: '',
            reminder:'',
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.setTitle,
            note: this.props.setNote
        })
    }


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
                        <div bu className='inNoteiconsclass'>
                            <img src={alert} className="alert" alt="alert   " />
                        </div>
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
            </div>
        )
    }
}