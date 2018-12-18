import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";
import Note from "../components/Note";
import ReminderTab from "../components/ReminderTab";
import NoteService from '../services/NoteServices';
import UserServices from '../services/UserServices';
import SnackBar from "../components/SnackBar";


var noteservices = new NoteService();
var userServices = new UserServices();


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false,
            noteData: [],
            listView: false,
        }
        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.createNewNote = this.createNewNote.bind(this);
        this.getNoteData = this.getNoteData.bind(this);
    }
    componentDidMount() {
        this.getNoteData();
    }

    getNoteData() {
        noteservices.getNote()
            .then(res => {
                this.setState({
                    noteData: res.data
                })
            })
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
        userServices.logoutUser()
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push("/login");
                }
                if (res.status === 220) {

                }
            }).catch();
    }

    createNewNote(data) {
        // this.setState({
        //     noteData: [...this.state.noteData, data]
        // })
        noteservices.createNote(data)
            .then(res => {
                if (res.status == 200) {
                    console.log('data save');
                } else if (res.status == 220) {
                    console.log('unauthorised');
                }
            });

        this.getNoteData();
    }

    listGridView = () => {
        this.setState({
            listView: !this.state.listView
        })
    }

    render() {
        if (localStorage.getItem('token') === null) {
            this.props.history.push("/login");
        }
        console.log(this.state);

        var notes = (this.state.noteData.map((note) => {
            return <Note key={note.id} setTitle={note.title} setNote={note.note} setReminder={note.reminder} view={this.state.listView}></Note>
        }));

        return (
            <div>
                <NavBar
                    menuClick={this.menuClickHandle}
                    logoutClick={this.onClickLogout}
                    view={this.listGridView}
                    viewIcon={this.state.listView}
                />
                <ManuDrawer menuAction={this.state.menuBar} />
                <AddNotes noteData={this.createNewNote} />
                <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                    {notes}
                </div>
                
                <SnackBar/>
                
            </div>
        );
    }
}
