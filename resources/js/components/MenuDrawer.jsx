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

    menuButtonAction = () => {
        console.log(event.target.textContent);
        
        this.props.noteState(event.target.textContent);
    }

    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer
                      
                        variant="persistent"
                        anchor="left"
                        open={this.props.menuAction}>

                        <List className='menuDrawerList'>
                            <ListItem className='menuListItem' button onClick={this.menuButtonAction} value='Notes'>
                                <ListItemIcon>
                                    <img src={noteIcon} className="menuBarIcon" alt="noteIcon   " />
                                </ListItemIcon>
                                <ListItemText>Notes</ListItemText>
                            </ListItem>
                            <ListItem className='menuListItem' button onClick={this.menuButtonAction} value='Reminders'>
                                <ListItemIcon>
                                    <img src={reminderIcon} className="menuBarIcon" alt="reminderIcon   " />
                                </ListItemIcon>
                                <ListItemText>Reminders</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem > <span className='menuLabelsSpan'>LABELS</span></ListItem>
                           
                            <ListItem className='menuListItem'>
                                <ListItemIcon>
                                    <img src={editIcon} className="menuBarIcon" alt="editIcon   " />
                                </ListItemIcon>
                                <ListItemText>Edit labels</ListItemText>
                            </ListItem>
                            <Divider />

                            <ListItem className='menuListItem' button onClick={this.menuButtonAction} value='Archive'>
                                <ListItemIcon>
                                    <img src={archive} className="menuBarIcon" alt="archive   " />
                                </ListItemIcon>
                                <ListItemText>Archive</ListItemText>
                            </ListItem>
                            <ListItem className='menuListItem'  button onClick={this.menuButtonAction} >
                                <ListItemIcon>
                                    <img src={trash} className="menuBarIcon" alt="trash   " />
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
