import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false
        }
        this.menuClickHandle = this.menuClickHandle.bind(this);
    }

    menuClickHandle(){
        if (this.state.menuBar === false) {
            this.setState({
                menuBar:true
            })
        }else{
            this.setState({
                menuBar:false
            })
        }
    }


    render() {
        return (
            <div>
                <div className='navBAr'><NavBar menuClick ={this.menuClickHandle}/></div>
                <div className='menuDrawer'><ManuDrawer menuAction={this.state.menuBar}/></div> 
                <div><AddNotes/></div>
            </div>
        );
    }
}
