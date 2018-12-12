import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false
        }
        
    }
    render() {
        return (
            <div>
                <div className='navBAr'><NavBar/></div>
                <div className='menuDrawer'><ManuDrawer menuAction={this.state.menuBar}/></div> 
            </div>
        );
    }
}
