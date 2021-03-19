import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteNavList.css'
import PropTypes from 'prop-types';


export default function NoteNavList(props) {

  return (
    <div className='NoteNavList'>
      <ul className='NoteNavList__list'>
        {/* folder list */}
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteNavList__folder-link'
              to={`/folder/${folder.id}`}
            >
              {folder.name}
              <span className='NoteNavList__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
            </NavLink>
          </li>
        )}
      </ul>

      {/* the button */}
      < div className='NoteNavList__button-wrapper' >
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteNavList__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div >

    </div >
  )
}

NoteNavList.defaultProps = {
  note: [],
  folders: [],
}

NoteNavList.propTypes = {
  notes: PropTypes.array,
  folders: PropTypes.array,
}




