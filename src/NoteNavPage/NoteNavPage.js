import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NoteNavPage.css'
import PropTypes from 'prop-types';


export default function NoteNavPage(props) {

  return (
    < div className='NoteNavPage' >
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NoteNavPage__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {
        props.folder && (
          <h3 className='NoteNavPage__folder-name'>
            {props.folder.name}

          </h3>

        )
      }
    </div >
  )
}

NoteNavPage.defaultProps = {
  history: {
    goBack: () => { }
  },
  folder: {},
}

NoteNavPage.propTypes = {
  goBack: PropTypes.func,
  folder: PropTypes.object,
}
