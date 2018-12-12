import React, { Component } from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import noteIcon from "../assets/icons/noteIcon.svg"
import reminderIcon from "../assets/icons/reminderIcon.svg"
import editIcon from "../assets/icons/editIcon.svg"
import archive from "../assets/icons/archive-24px.svg"
import trash from "../assets/icons/trash.svg"


const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: 64,
                width: 270,
            }
        }
    },
})

export default class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.menuAction
        }
    }

    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}>
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={noteIcon} className="noteIcon" alt="noteIcon   " />
                                </ListItemIcon>
                                <ListItemText />
                            </ListItem>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={reminderIcon} className="reminderIcon" alt="reminderIcon   " />
                                </ListItemIcon>
                                <ListItemText />
                            </ListItem>
                            <Divider />
                            <span>LABELS</span>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={editIcon} className="editIcon" alt="editIcon   " />
                                </ListItemIcon>
                                <ListItemText />
                            </ListItem>
                            <Divider />

                            <ListItem >
                                <ListItemIcon>
                                    <img src={archive} className="archive" alt="archive   " />
                                </ListItemIcon>
                                <ListItemText />
                            </ListItem>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={trash} className="trash" alt="trash   " />
                                </ListItemIcon>
                                <ListItemText />
                            </ListItem>
                        </List>
                    </Drawer>
                </MuiThemeProvider>
            </div >
        )
    }
}
