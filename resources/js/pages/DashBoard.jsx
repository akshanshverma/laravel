import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import ManuDrawer from "../components/MenuDrawer";
import AddNotes from "../components/AddNotes";
import Note from "../components/Note";
import NoteService from '../services/NoteServices';
import UserServices from '../services/UserServices';
import LabelServices from '../services/LabelServices';
import SnackBar from "../components/SnackBar";
import FormData from 'form-data';
import moment from "moment";

var noteservices = new NoteService();
var userServices = new UserServices();
var labelServices = new LabelServices();
const formdata = new FormData();

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
            searchKey: '',
            dragKey: '',
            dragEndkey: '',
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

    // componentDidUpdate(){
    //     this.notePosition();
    // }


    /**
     * get all note data form database
     */
    getNoteData() {
        noteservices.getNote()
            .then(res => {
                var notesData = res.data;
                for (let i = 1; i < notesData.length; i++) {
                    var temp = notesData[i];
                    var k = i - 1;
                    while (k >= 0 && notesData[k].note_index > temp.note_index) {
                        notesData[k + 1] = notesData[k];
                        k--;
                    }
                    notesData[k + 1] = temp;
                }
                this.setState({
                    noteData: notesData
                })

            })
    }


    /**
     * side menu click handle 
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
     * @param {array} data data for new note 
     */
    createNewNote(data) {
        // this.setState({
        //     noteData: [...this.state.noteData, data]
        // })
        data['note_index'] = this.state.noteData.length;
        console.log(data);

        noteservices.createNote(data)
            .then(res => {
                if (res.status == 200) {
                    // console.log('data save');
                    this.SnackBarN.current.handleClick("new note: " + data.title);
                    this.getNoteData();
                } else if (res.status == 220) {
                    // console.log('unauthorised');
                }
            });
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

    /**
     * update note is to change note data and update it
     * @param {array} data for update note 
     */
    updateNoteData = (data) => {
        noteservices.updateNote(data)
            .then(res => {
                if (res.status === 200) {
                    this.getNoteData();
                }
            })
    }

    onClickMenu = (name) => {
        this.setState({
            noteState: name
        })
    }

    deleteNote = (id) => {
        noteservices.deleteNote(id)
            .then(res => {
                if (res.status === 200) {
                    this.getNoteData();
                    this.SnackBarN.current.handleClick("note deleted ");
                }
            })
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
                if (res.status === 200) {
                    this.getAllLabels();
                }
            })
    }

    removeLabel = (labelId) => {
        labelServices.removeLabel(labelId)
            .then(res => {
                if (res.status === 200) {
                    this.getAllLabels();
                }
            })
    }

    updateLabel = (labelData) => {
        labelServices.updateLabel(labelData)
            .then(res => {
                if (res.status === 200) {
                    this.getAllLabels();
                }
            })
    }

    addLabelsOnNotes = (labelData) => {
        labelServices.addLabelOnNote(labelData)
            .then(res => {
                if (res.status === 200) {
                    this.getAllLabels();
                }
            })
    }

    removeLabelFromNote = (labelMapData) => {
        labelServices.deleteLabelFromNote(labelMapData)
            .then(res => {
                if (res.status === 200) {
                    this.getAllLabels();
                }
            })
    }

    uploadProfilePic = (imageData) => {
        userServices.uploadImage(imageData)
            .then(res => {
                // console.log('status', res);
                if (res.status === 200) {
                    this.setState({
                        profileImage: res.data.success
                    })
                }
            })
    }

    setSearchValue = (value) => {
        this.setState({
            searchKey: value
        })
    }

    dragStart = (noteIndex) => {
        this.setState({
            dragKey: noteIndex
        })
    }
    dragEnd = (noteIndex) => {
        this.setState({
            dragEndkey: noteIndex
        })
    }

    moveNote = () => {
        var noteArr = [...this.state.noteData];
        var dragNote = noteArr[this.state.dragKey];
        if (this.state.dragEndkey > this.state.dragKey) {
            let i = this.state.dragKey;
            for (i; i < this.state.dragEndkey; i++) {
                noteArr[i] = noteArr[i + 1];
            }
            noteArr[i] = dragNote;
        } else if (this.state.dragEndkey < this.state.dragKey) {
            let i = this.state.dragKey;
            for (i; i > this.state.dragEndkey; i--) {
                noteArr[i] = noteArr[i - 1];
            }
            noteArr[i] = dragNote;
        }
        this.setState({
            noteData: noteArr
        })
    }

    addImageOnNote = (imageData) => {
        formdata.append('image', imageData['image']);
        formdata.append('note_id', imageData['note_id']);

        noteservices.noteImage(formdata)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    this.getNoteData();
                }
            })
    }

    deleteNoteImage = (imageData) => {
        var data = {
            id: imageData
        }
        noteservices.deleteImageFromNote(data)
            .then(res => {
                if (res.status === 200) {
                    this.getNoteData();
                }
            })
    }

    // moveNoteIndex = (note1 , note2) => {
         
    // }


    render() {

        if (localStorage.getItem('token') === null) {
            this.props.history.push("/login");
            return;
        }

        var notes = (this.state.noteData
            .filter(note => {
                if (note.title.indexOf(this.state.searchKey) >= 0) {
                    return true;
                } else if (note.note.indexOf(this.state.searchKey) >= 0) {
                    return true;
                }
                return false;
            })
            .map((note) => {
                if (note.pin === '0' && note.archive === '0' && note.trash === '0') {
                    return <Note
                        key={note.id}
                        noteIndex={this.state.noteData.indexOf(note)}
                        noteData={note}
                        view={this.state.listView}
                        editNote={this.openEditBox}
                        update={this.updateNoteData}
                        labels={this.state.labels}
                        addLabel={this.addLabelsOnNotes}
                        removeNoteLabel={this.removeLabelFromNote}
                        dragAndDrop={this.dragStart}
                        dropAction={this.moveNote}
                        dragEnd={this.dragEnd}
                        dragKey={this.state.dragKey}
                        dragEndkey={this.state.dragEndkey}
                        addImageOnNote={this.addImageOnNote}
                        deleteNoteImage={this.deleteNoteImage}
                        SnackBarN={this.SnackBarN}
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
                    addImageOnNote={this.addImageOnNote}
                    deleteNoteImage={this.deleteNoteImage}
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
                    addImageOnNote={this.addImageOnNote}
                    deleteNoteImage={this.deleteNoteImage}
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
                    addImageOnNote={this.addImageOnNote}
                    deleteNoteImage={this.deleteNoteImage}
                    SnackBarN={this.SnackBarN}
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
                    SnackBarN={this.SnackBarN}
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
                        addImageOnNote={this.addImageOnNote}
                        deleteNoteImage={this.deleteNoteImage}
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
                    searchNote={this.setSearchValue}
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
