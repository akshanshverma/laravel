import React, { Component } from "react";
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default class SnackBar extends Component {
    notificationMeg = [];
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            messageInfo: {},
        }

    }

    

    handleClick = message => {
        this.notificationMeg.push({
            message,
            key: new Date().getTime(),
        });

        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    };

    processQueue = () => {
        if (this.notificationMeg.length > 0) {
            this.setState({
                messageInfo: this.notificationMeg.shift(),
                open: true,
            });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    handleExited = () => {
        this.processQueue();
    };


    render() {

        return (
            <div>
                <Snackbar
                    key={this.state.messageInfo.key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.messageInfo.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            // className={se}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }

}