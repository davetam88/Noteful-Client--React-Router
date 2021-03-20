import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NoteNavList from '../NoteNavList/NoteNavList';
import NoteNavPage from '../NoteNavPage/NoteNavPage';
import NoteMainList from '../NoteMainList/NoteMainList';
import NoteMainPage from '../NoteMainPage/NoteMainPage';
import NotefulContext from './NotefulContext';
import config from './config';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';


class App extends Component {
    state = {
        folders: [],
        notes: [],
        currentFolder: 1,
    };

    addNote = note => {
        this.setState({
            notes: [...this.state.notes, note],
        })
    }

    addFolder = folder => {
        this.setState({
            folders: [...this.state.folders, folder],
        })
    }

    deleteNote = NoteId => {
        const newNotes = this.state.notes.filter(NoteObj =>
            NoteObj.id !== NoteId
        )
        this.setState({
            notes: newNotes
        })
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(res.status)
                return res.json()
            })
            .then(folders => {
                this.setState({ folders, currentFolder: 1 });
            })
            .catch(error => this.setState({ error }))

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok)
                {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(notes => {
                this.setState({ notes });
            })
            .catch(error => this.setState({ error }))

    }

    renderNavRoutes() {
        const { notes, folders } = this.state;

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    < Route exact key={path} path={path}
                        render={routeProps => (
                            <NoteNavList folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))
                }

                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folder_id);
                        return <NoteNavPage routeNum={3} {...routeProps} folder={folder} />;
                    }}
                />

                < Route
                    // key={path}
                    path="/add-folder"
                    render={routeProps => (
                        <NoteNavList
                            folders={folders}
                            notes={notes}
                            {...routeProps}
                        />
                    )}
                />
                <Route path="/add-note" component={NoteNavPage} />
            </>
        );
    }

    renderMainRoutes() {
        const { notes, currentFolder } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (

                    <Route exact key={path} path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId,
                            );

                            return (
                                <NoteMainList
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}

                <Route path="/note/:noteId" component={NoteMainPage} />

                < Route path="/add-folder" component={AddFolder} />

                < Route path="/add-note" component={AddNote} />

                )
            </>
        );
    }

    render() {

        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            addFolder: this.addFolder,
            addNote: this.addNote,
            deleteNote: this.deleteNote,
        }
        return (
            <div className="App">
                <NotefulContext.Provider value={contextValue}>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>

                    <header className="App__header">
                        <h1>
                            <FontAwesomeIcon icon="check-double" />
                            {' '}
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />

                        </h1>
                    </header>

                    <main className="App__main">{this.renderMainRoutes()}</main>

                </NotefulContext.Provider>
            </div >


        );
    }
}

export default App;


