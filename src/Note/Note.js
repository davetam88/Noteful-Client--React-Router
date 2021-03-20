import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import config from '../App/config';
import PropTypes from 'prop-types';
import NotefulContext from '../App/NotefulContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default class Note extends Component {


  static defaultProps = {
    onDeleteNote: () => { },
  }

  static contextType = NotefulContext;

  handleClickDelete = event => {
    event.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {

        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>

        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>

        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
                     {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>

      </div>

    )
  }
}

Note.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string
}

