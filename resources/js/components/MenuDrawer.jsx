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
    }, typography: {
        useNextVariants: true,
    },
})

export default class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        open={this.props.menuAction}>

                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={noteIcon} className="noteIcon" alt="noteIcon   " />
                                </ListItemIcon>
                                <ListItemText>Notes</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <img src={reminderIcon} className="reminderIcon" alt="reminderIcon   " />
                                </ListItemIcon>
                                <ListItemText>Reminders</ListItemText>
                            </ListItem>
                            <Divider />
                            <span>LABELS</span>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={editIcon} className="editIcon" alt="editIcon   " />
                                </ListItemIcon>
                                <ListItemText>Edit labels</ListItemText>
                            </ListItem>
                            <Divider />

                            <ListItem >
                                <ListItemIcon>
                                    <img src={archive} className="archive" alt="archive   " />
                                </ListItemIcon>
                                <ListItemText>Archive</ListItemText>
                            </ListItem>
                            <ListItem >
                                <ListItemIcon>
                                    <img src={trash} className="trash" alt="trash   " />
                                </ListItemIcon>
                                <ListItemText>Trash</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                </MuiThemeProvider>
            </div >
        )
    }
}
