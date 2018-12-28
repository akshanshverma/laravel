import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";
import Note from "../components/Note";
import ReminderTab from "../components/ReminderTab";
import NoteService from '../services/NoteServices';
import UserServices from '../services/UserServices';
import SnackBar from "../components/SnackBar";
import moment from "moment";

var noteservices = new NoteService();
var userServices = new UserServices();


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false,
            noteData: [],
            listView: false,
            noteState: "Notes",
        }
        this.SnackBarN = React.createRef();

        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.createNewNote = this.createNewNote.bind(this);
        this.getNoteData = this.getNoteData.bind(this);
    }
    componentDidMount() {
        this.getNoteData();
        this.checkReminder();
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
        this.SnackBarN.current.handleClick("new note: " + data.title);
        this.getNoteData();
    }

    listGridView = () => {
        this.setState({
            listView: !this.state.listView
        })
    }

    checkReminder = () => {

        setInterval(() => {
            this.state.noteData.map(note => {
                if (moment().format('MM/DD/YYYY, h:mm A') === note.reminder) {
                    this.SnackBarN.current.handleClick("Reminder: " + note.title);
                }
            });
        }, (1000 * 60));
    }

    updateNoteData = (data) => {
        noteservices.updateNote(data)
            .then(res => {

            })
        this.getNoteData();
    }

    onClickMenu = (name) => {
        console.log('das', name);

        this.setState({
            noteState: name
        })
    }



    render() {
        if (localStorage.getItem('token') === null) {
            this.props.history.push("/login");
        }
        console.log('dashstate', this.state);

        var notes = (this.state.noteData.map((note) => {
            if (note.pin === '0' && (note.archive === '0' || note.archive === null)) {
                return <Note
                    key={note.id}
                    setId={note.id}
                    setTitle={note.title}
                    setNote={note.note}
                    setReminder={note.reminder}
                    setColor={note.color}
                    setPin={note.pin}
                    setArchive={note.archive}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                ></Note>
            }
           return;
        }));

        var reminderNote = (this.state.noteData.map((note) => {
            if (note.reminder !== null) {
                return <Note
                    key={note.id}
                    setId={note.id}
                    setTitle={note.title}
                    setNote={note.note}
                    setReminder={note.reminder}
                    setColor={note.color}
                    setPin={note.pin}
                    setArchive={note.archive}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                ></Note>
            }
            return;
        }));

        var pined = (this.state.noteData.map((note) => {
            if (note.pin === '1') {
                return <Note
                    key={note.id}
                    setId={note.id}
                    setTitle={note.title}
                    setNote={note.note}
                    setReminder={note.reminder}
                    setColor={note.color}
                    setPin={note.pin}
                    setArchive={note.archive}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                ></Note>
            }
            return;
        }));

        var archived = (this.state.noteData.map((note) => {
            if (note.archive === '1') {
                return <Note
                    key={note.id}
                    setId={note.id}
                    setTitle={note.title}
                    setNote={note.note}
                    setReminder={note.reminder}
                    setColor={note.color}
                    setPin={note.pin}
                    setArchive={note.archive}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                ></Note>
            }
            return;
        }));

        return (
            <div>
                <NavBar
                    menuClick={this.menuClickHandle}
                    logoutClick={this.onClickLogout}
                    userData={this.state.userData}
                    view={this.listGridView}
                    viewIcon={this.state.listView}
                    menuName = {this.state.noteState}
                />
                <ManuDrawer menuAction={this.state.menuBar} noteState={this.onClickMenu} />
                <AddNotes noteData={this.createNewNote} />
                {(() => {
                    switch (this.state.noteState) {
                        case 'Notes':
                            return <div>
                                <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                    {pined}
                                </div>
                                <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                    {notes}
                                </div>
                            </div>
                        case 'Reminders':
                            return <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                {reminderNote}
                            </div>;
                        case 'Archive':
                            return<div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                            {archived}
                        </div>;
                        default:
                            return null;
                    }
                })()}


                <SnackBar ref={this.SnackBarN} />

            </div>
        );
    }
}
