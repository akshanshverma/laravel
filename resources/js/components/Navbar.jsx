import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import menu from "../assets/icons/menu-24px.svg"
import search from "../assets/icons/search-24px.svg"
import close from "../assets/icons/close-24px.svg"
import appIcon from "../assets/icons/AppIcon.svg"


export default class Navbar extends Component {

    render() {
        return (
            <div >

                <AppBar style={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <div className="iconBtn">
                            <IconButton>
                                <img src={menu} className="menu" alt="menu" />
                            </IconButton>
                        </div>
                        <img src={appIcon} className="appIcon" alt="appIcon" />
                        <div>
                            <Typography variant='title'>
                                FundooNotes
                            </Typography>
                        </div>
                        <form className='searchBar' >
                            <div className="iconBtn">
                                <IconButton>
                                    <img src={search} className="search" alt="search" />
                                </IconButton>
                                <InputBase className='searchInput' />
                                <IconButton>
                                    <img src={close} className="close" alt="close" />
                                </IconButton>
                            </div>
                        </form>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

