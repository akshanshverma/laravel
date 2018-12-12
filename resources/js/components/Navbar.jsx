import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Avatar, Divider} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import menu from "../assets/icons/menu-24px.svg"
import search from "../assets/icons/search-24px.svg"
import close from "../assets/icons/close-24px.svg"
import appIcon from "../assets/icons/AppIcon.svg"
import refresh from "../assets/icons/refresh-24px.svg"
import agenda from "../assets/icons/agenda-24px.svg"
import setting from "../assets/icons/settings-24px.svg"

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuBar: true
        }
    }



    render() {
        const { open } = this.state;
        return (
            <div >
                <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <div className='menulogo'>
                            <div className="iconBtn">
                                <IconButton onClick={this.handleDrawerOpen}>
                                    <img src={menu} className="menu" alt="menu" />
                                </IconButton>
                            </div>
                            <img src={appIcon} className="appIcon" alt="appIcon" />
                            <div className='appName'>
                                <Typography variant='title'>
                                    FundooNotes
                                </Typography>
                            </div>
                        </div>
                        <form className='searchBar' >
                            <div className="iconBtn">
                                <IconButton>
                                    <img src={search} className="search" alt="search" />
                                </IconButton>
                            </div>
                            <InputBase id='inputSearch' fullWidth/>
                            <div className="iconBtn">
                                <IconButton>
                                    <img src={close} className="close" alt="close" />
                                </IconButton>
                            </div>
                        </form>
                        <div className='endBar'>
                            <div className='endIcon'>
                                <div className="iconBtnEnd">
                                    <IconButton>
                                        <img src={refresh} className="refresh" alt="refresh" />
                                    </IconButton>
                                </div>
                                <div className="iconBtnEnd">
                                    <IconButton>
                                        <img src={agenda} className="agenda" alt="agenda" />
                                    </IconButton>
                                </div>
                                <div className="iconBtnEnd">
                                    <IconButton>
                                        <img src={setting} className="setting" alt="setting" />
                                    </IconButton>
                                </div>
                            </div>
                            <div className='avatarIcon'>
                                <IconButton>
                                    <Avatar />
                                </IconButton>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

