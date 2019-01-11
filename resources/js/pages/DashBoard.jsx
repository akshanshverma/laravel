import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";
import Note from "../components/Note";
import NoteService from '../services/NoteServices';
import UserServices from '../services/UserServices';
import LabelServices from '../services/LabelServices';
import SnackBar from "../components/SnackBar";

import moment from "moment";

var noteservices = new NoteService();
var userServices = new UserServices();
var labelServices = new LabelServices();


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBar: false,
            noteData: [],
            labels: [],
            listView: false,
            noteState: "Notes",
            profileImage: localStorage.getItem('profile_image'),
            searchKey:''
        }
        this.SnackBarN = React.createRef();

        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.createNewNote = this.createNewNote.bind(this);
        this.getNoteData = this.getNoteData.bind(this);
    }

    /**
     * mount data after render 
     * noteData 
     * checek Reminder
     * and get labels
     */
    componentDidMount() {
        this.getNoteData();
        this.checkReminder();
        this.getAllLabels();
    }


    /**
     * get all note data form database
     */
    getNoteData() {

        noteservices.getNote()
            .then(res => {
                this.setState({
                    noteData: res.data
                })
            })
    }


    /**
     * side menu click
     */
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

    /**
     * action on click logout
     */
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

    /**
     * function to create new note and send to backend 
     * @param {array} data 
     */
    createNewNote(data) {
        // this.setState({
        //     noteData: [...this.state.noteData, data]
        // })
        noteservices.createNote(data)
            .then(res => {
                if (res.status == 200) {
                    // console.log('data save');
                } else if (res.status == 220) {
                    // console.log('unauthorised');
                }
            });
        this.SnackBarN.current.handleClick("new note: " + data.title);
        this.getNoteData();
    }


    /**
     * function to control list and grid view 
     */
    listGridView = () => {
        this.setState({
            listView: !this.state.listView
        })
    }

    /**
     * check reminder of every note in every 60s
     */
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
        this.setState({
            noteState: name
        })
    }

    deleteNote = (id) => {
        noteservices.deleteNote(id)
            .then(res => {

            })
        this.getNoteData();
    }

    getAllLabels = () => {
        labelServices.getLabels()
            .then(res => {
                this.setState({
                    labels: res.data
                })
            })
    }

    createLabel = (labelName) => {

        labelServices.createNewLabel(labelName)
            .then(res => {

            })
        this.getAllLabels();
    }

    removeLabel = (labelId) => {
        labelServices.removeLabel(labelId)
            .then(res => {

            })
        this.getAllLabels();
    }

    updateLabel = (labelData) => {
        labelServices.updateLabel(labelData)
            .then(res => {

            })
        this.getAllLabels();
    }

    addLabelsOnNotes = (labelData) => {
        labelServices.addLabelOnNote(labelData)
            .then(res => {

            })

        this.getNoteData();

    }

    removeLabelFromNote = (labelMapData) => {
        labelServices.deleteLabelFromNote(labelMapData)
            .then(res => {

            })
        this.getNoteData();
    }

    uploadProfilePic = (imageData) => {

        userServices.uploadImage(imageData)
            .then(res => {
                console.log('status', res);
                if (res.status === 200) {
                    this.setState({
                        profileImage: res.data.success
                    })
                }
            })
    }

    setSearchValue = (value) => {
        this.setState({
            searchKey:value
        })
    }

    render() {
        // console.log('dash', this.state.noteState);
        if (localStorage.getItem('token') === null) {
            this.props.history.push("/login");
            return;
        }

        var notes = (this.state.noteData
            .filter(note=>{
                if (note.title.indexOf(this.state.searchKey)>=0 ) {
                    return true;
                }else if (note.note.indexOf(this.state.searchKey)>=0 ) {
                    return true;
                }
                return false; 
            })
            .map((note) => {
            if (note.pin === '0' && note.archive === '0' && note.trash === '0') {
                return <Note
                    key={note.id}
                    noteData={note}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                    labels={this.state.labels}
                    addLabel={this.addLabelsOnNotes}
                    removeNoteLabel={this.removeLabelFromNote}
                ></Note>
            }
            return;
        }));

        var reminderNote = (this.state.noteData.map((note) => {
            if (note.reminder !== null && note.trash === '0') {
                return <Note
                    key={note.id}
                    noteData={note}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                    labels={this.state.labels}
                    addLabel={this.addLabelsOnNotes}
                    removeNoteLabel={this.removeLabelFromNote}
                ></Note>
            }
            return;
        }));

        var pined = (this.state.noteData.map((note) => {
            if (note.pin === '1' && note.trash === '0') {
                return <Note
                    key={note.id}
                    noteData={note}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                    labels={this.state.labels}
                    addLabel={this.addLabelsOnNotes}
                    removeNoteLabel={this.removeLabelFromNote}
                ></Note>
            }
            return;
        }));

        var archived = (this.state.noteData.map((note) => {
            if (note.archive === '1' && note.trash === '0') {
                return <Note
                    key={note.id}
                    noteData={note}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                    labels={this.state.labels}
                    addLabel={this.addLabelsOnNotes}
                    removeNoteLabel={this.removeLabelFromNote}
                ></Note>
            }
            return;
        }));

        var trashNotes = (this.state.noteData.map((note) => {
            if (note.trash === '1') {
                return <Note
                    key={note.id}
                    noteData={note}
                    view={this.state.listView}
                    editNote={this.openEditBox}
                    update={this.updateNoteData}
                    trashN={this.deleteNote}
                ></Note>
            }
            return;
        }));


        var noteWithLabel = this.state.noteData.map((note) => {
            for (let i = 0; i < note.labels.length; i++) {
                const label = note.labels[i];
                if (label.label.label === this.state.noteState) {
                    return <Note
                        key={note.id}
                        noteData={note}
                        view={this.state.listView}
                        editNote={this.openEditBox}
                        update={this.updateNoteData}
                        labels={this.state.labels}
                        addLabel={this.addLabelsOnNotes}
                        removeNoteLabel={this.removeLabelFromNote}
                    ></Note>
                }
            }
        })


        return (
            <div className={this.state.menuBar ? 'mainDivMenuBarOpen' : 'mainDivMenuBar'}>
                <NavBar
                    menuClick={this.menuClickHandle}
                    logoutClick={this.onClickLogout}
                    userData={this.state.userData}
                    view={this.listGridView}
                    viewIcon={this.state.listView}
                    menuName={this.state.noteState}
                    uploadImage={this.uploadProfilePic}
                    profilePic={this.state.profileImage}
                    searchNote = {this.setSearchValue}
                />
                <ManuDrawer
                    menuAction={this.state.menuBar}
                    noteState={this.onClickMenu}
                    labels={this.state.labels}
                    newLabel={this.createLabel}
                    removeLabel={this.removeLabel}
                    updateLabel={this.updateLabel}
                    menuState={this.state.noteState}
                />

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
                            return <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                {archived}
                            </div>;
                        case 'Trash':
                            return <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                {trashNotes}
                            </div>;
                        default:
                            return <div className={this.state.listView ? ("cardListView") : ("cardGridView")}>
                                {noteWithLabel}
                            </div>;
                        // return null;
                    }
                })()}

                <SnackBar ref={this.SnackBarN} />

            </div>
        );
    }
}
