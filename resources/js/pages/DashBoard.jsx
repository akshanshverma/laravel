import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";
import Note from "../components/Note";
import userService from '../services/UserServices';


var services = new userService();


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false,
            noteData: [],
        }
        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.getNoteData = this.getNoteData.bind(this);
    }

    menuClickHandle() {
        if (this.state.menuBar === false) {
            this.setState({
                menuBar: true
            })
        } else {
            this.setState({
                menuBar: false
            })
        }
    }

    onClickLogout() {
        services.logoutUser()
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push("/login");
                }
                if (res.status === 220) {

                }
            }).catch();
    }

    getNoteData(data) {
        this.setState({
            noteData: [...this.state.noteData, data]
        })
    }

    render() {
        
        var notes=(this.state.noteData.map((note,index)=>{
            return <Note key={index} setTitle={note.title} setNote={note.note}></Note>
        }));

        return (
            <div>
                <div className='navBAr'><NavBar menuClick={this.menuClickHandle} logoutClick={this.onClickLogout} /></div>
                <div className='menuDrawer'><ManuDrawer menuAction={this.state.menuBar} /></div>
                <div><AddNotes noteData={this.getNoteData} /></div>
                <div className='cradHolder'>
                    {notes}
                    {/* <Note setTitle={this.state.noteData.title} setNote={this.state.noteData.note}/>  */}
                </div>
            </div>
        );
    }
}
