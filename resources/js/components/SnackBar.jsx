import React, { Component } from "react";
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default class SnackBar extends Component {

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open// ={this.state.open}
                    autoHideDuration={6000}
                    // onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Note archived</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small"
                            // onClick={this.handleClose}
                        >
                            UNDO
                </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                        // className={classes.close}
                        // onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }

}