import React, { Component } from 'react';
import Note from '../Note/Note'
import NotefulContext from '../App/NotefulContext';
import { findNote } from '../notes-helpers'
import './NoteMainPage.css'
import PropTypes from 'prop-types';

export default class NoteMainPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {

    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }


    return (
      <section className='NoteMainPage' >
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />

        <div className='NoteMainPage__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NoteMainPage.propTypes = {
  params: PropTypes.object
}
