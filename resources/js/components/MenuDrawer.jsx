import React, { Component } from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import noteIcon from "../assets/icons/noteIcon.svg"
import reminderIcon from "../assets/icons/reminderIcon.svg"

import archive from "../assets/icons/archive-24px.svg"
import trash from "../assets/icons/trash.svg"
import labelicon from "../assets/icons/label.svg"

import EditLabelDialog from "./EditLabelDialog";


const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: 66,
                width: 270,
               
            },
            paperAnchorDockedLeft:{
               borderRight:'0px solid rgba(0, 0, 0, 0.12)' 
            }
        }
    }, typography: {
        useNextVariants: true,
    },
})
//.MuiDrawer-paperAnchorDockedLeft-117

export default class MenuDrawer extends Component {
    constructor(props) {
        super(props);
    }

    menuButtonAction = () => {
        this.props.noteState(event.target.textContent);
    }



    render() {
        var labelsName = this.props.labels.map((label) => { 
            return <ListItem className='menuListItem' button style ={this.props.menuState===label['label']?{backgroundColor:'#feefc3'}:{backgroundColor:'#ffffff'}} key={label.id} onClick={this.menuButtonAction}>
                <ListItemIcon>
                    <img src={labelicon} className="menuBarIcon" alt="label   " />
                </ListItemIcon>
                <ListItemText>{label.label}</ListItemText>
            </ListItem>
        })


        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer

                        variant="persistent"
                        anchor="left"
                        open={this.props.menuAction}>

                        <List className='menuDrawerList'>
                            <ListItem className='menuListItem' style ={this.props.menuState==='Notes'?{backgroundColor:'#feefc3'}:{backgroundColor:'#ffffff'}} button onClick={this.menuButtonAction} value='Notes'>
                                <ListItemIcon>
                                    <img src={noteIcon} className="menuBarIcon" alt="noteIcon   " />
                                </ListItemIcon>
                                <ListItemText>Notes</ListItemText>
                            </ListItem>
                            <ListItem className='menuListItem' style ={this.props.menuState==='Reminders'?{backgroundColor:'#feefc3'}:{backgroundColor:'#ffffff'}} button onClick={this.menuButtonAction} value='Reminders'>
                                <ListItemIcon>
                                    <img src={reminderIcon} className="menuBarIcon" alt="reminderIcon   " />
                                </ListItemIcon>
                                <ListItemText>Reminders</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem > <span className='menuLabelsSpan'>LABELS</span></ListItem>
                            {labelsName}
                            <EditLabelDialog
                                labelsName={this.props.labels}
                                newLabel={this.props.newLabel}
                                removeLabel={this.props.removeLabel}
                                updateLabel={this.props.updateLabel}
                                menuState= {this.props.menuState}
                                noteState = { this.props.noteState}
                            />
                            <Divider />

                            <ListItem className='menuListItem' style ={this.props.menuState==='Archive'?{backgroundColor:'#feefc3'}:{backgroundColor:'#ffffff'}} button onClick={this.menuButtonAction} value='Archive'>
                                <ListItemIcon>
                                    <img src={archive} className="menuBarIcon" alt="archive   " />
                                </ListItemIcon>
                                <ListItemText>Archive</ListItemText>
                            </ListItem>
                            <ListItem className='menuListItem' style ={this.props.menuState==='Trash'?{backgroundColor:'#feefc3'}:{backgroundColor:'#ffffff'}} button onClick={this.menuButtonAction} >
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
