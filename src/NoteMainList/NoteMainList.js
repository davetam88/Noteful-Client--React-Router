import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteMainList.css'
import PropTypes from 'prop-types';

NoteMainList.defaultProps = {
  notes: [],
}

export default function NoteMainList(props) {

  return (
    <section className='NoteMainList'>
      <ul>
        {props.notes.map(note =>
          // comp note
          < li key={note.id} >
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>

      <div className='NoteMainList__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteMainList__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section >
  )
}

NoteMainList.propTypes = {
  notes: PropTypes.array,
}

