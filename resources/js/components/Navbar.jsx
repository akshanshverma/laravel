import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Avatar, ClickAwayListener, MenuList, MenuItem, Paper, Grow, Popper, Divider } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import menuicon from "../assets/icons/menu-24px.svg"
import search from "../assets/icons/search-24px.svg"
import close from "../assets/icons/close-24px.svg"
import appIcon from "../assets/icons/AppIcon.svg"
import refresh from "../assets/icons/refresh-24px.svg"
import agenda from "../assets/icons/agenda-24px.svg"
import setting from "../assets/icons/settings-24px.svg"
import gridView from "../assets/icons/gridView.svg"

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logoutmenu: false,
            anchorEl: null,
            email: localStorage.getItem('email'),
            username: localStorage.getItem('username')
        }
        this.logoutMenuOpen = this.logoutMenuOpen.bind(this);
        this.logoutMenuClose = this.logoutMenuClose.bind(this);
    }

    logoutMenuOpen(event) {
        const { currentTarget } = event;
        this.setState({
            anchorEl: currentTarget,
            logoutmenu: true
        })
    }
    logoutMenuClose() {
        this.setState({
            logoutmenu: false
        })
    }

    render() {

        return (
            <div >
                <AppBar id='tb' style={{ backgroundColor: 'white' }}>
                    <Toolbar >
                        <div className='menulogo'>
                            <div className="iconBtn">
                                <IconButton onClick={this.props.menuClick}>
                                    <img src={menuicon} className="menuicon" alt="menuicon" />
                                </IconButton>
                            </div>
                            <img src={appIcon} className="appIcon" alt="appIcon" />
                            <div className='appName'>
                                <Typography variant='h5'>
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
                            <InputBase placeholder='Search' id='inputSearch' fullWidth />
                            <div className="iconBtn">
                                <IconButton>
                                    <img src={close} className="close" alt="close" />
                                </IconButton>
                            </div>
                        </form>
                        <div className='endBar'>
                            <div className='endIcon'>
                                <div className="iconBtnEnd">
                                    <IconButton className="searchEnd">
                                        <img src={search} className="searchEnd" alt="search" />
                                    </IconButton>
                                </div>
                                <div className="iconBtnEnd">
                                    <IconButton>
                                        <img src={refresh} className="refresh" alt="refresh" />
                                    </IconButton>
                                    <span className="sHint">Refresh</span>
                                </div>
                                <div className="iconBtnEnd">
                                    <IconButton className='noteView' onClick={this.props.view}>
                                        {this.props.viewIcon ?
                                            (<img src={agenda} className="agenda" alt="agenda" />)
                                            :
                                            (<img src={gridView} className="gridView" alt="gridView" />)}
                                    </IconButton>

                                </div>
                                <div className="iconBtnEnd">
                                    <IconButton>
                                        <img src={setting} className="setting" alt="setting" />
                                    </IconButton>

                                </div>
                            </div>
                            <div className='avatarIcon'>
                                <IconButton onClick={this.logoutMenuOpen}>
                                    <Avatar >{this.state.username.substr(0, 1)}</Avatar>
                                </IconButton>
                            </div>
                        </div>
                    </Toolbar>
                    <Divider />
                </AppBar>

                <div className='logoutMenu'>
                    <Popper className='logoutMenuPopper' anchorEl={this.state.anchorEl} open={this.state.logoutmenu} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.logoutMenuClose}>
                                        <MenuList>
                                            <div className='divAvatarMenu'>
                                                <Avatar className='MenuAvtar' >{this.state.username.substr(0, 1)}</Avatar>
                                                <div className='userData'>
                                                    <span className='usernameSpan'>{this.state.username}</span>
                                                    <span>{this.state.email}</span>
                                                </div>
                                            </div>
                                            <Divider />
                                            <MenuItem onClick={this.props.logoutClick}>Logout</MenuItem>
                                            <div className='logoutDiv'></div>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        )
    }
}
