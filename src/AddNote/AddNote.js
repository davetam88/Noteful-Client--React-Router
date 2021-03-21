import React, { Component } from 'react';
import NotefulContext from '../App/NotefulContext';
import './AddNote.css'
import ValidationError from '../App/ValidationError';
import config from '../App/config';
// import AddNoteError from './AddNoteError';
import PropTypes from 'prop-types';

class AddNote extends Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false,
      },
      content: {
        value: "",
      },
      folder: {
        value: "",
      },
    };
  }

  static defaultProps = {
    history: {
      push: () => { },
    },
  };


  updateNoteNameCB(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content } });
  }

  updateFolder(folder) {
    this.setState({ folder: { value: folder } }, () => {
    });
  }

  handleCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = (e) => {

    e.preventDefault();
    const { name, content, folder } = this.state;


    const addNote = {
      name: name.value,
      content: content.value,
      folder_id: Number(folder.value),
      modified: new Date(),
    };



    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.rejected(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folder_id}`);
      })
      .catch((error) => {
      });
  };


  validateName() {
    const name = this.state.name.value.trim();
    if (!this.state.name.touched) return true;
    if (name.length === 0 && this.state.name.touched)
    {
      return "Folder Name Cannot be Blank, Please Try Again";
    }
    return null;
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();

    return (
      <form className="Noteful-form"
        onSubmit={this.handleSubmit}
      >
        <h1>Add Node</h1>

        <label htmlFor="NoteName">Note Name</label>
        <input type="text" name="NoteName" id="NoteName" placeholder="Note Name"
          onChange={(e) => this.updateNoteNameCB(e.target.value)}
        />
        <ValidationError message={nameError} />

        <label htmlFor="content">Note Content</label>
        <textarea id="content" name="content" rows="4" cols="50"
          onChange={(e) => this.updateContent(e.target.value)}
        ></textarea>

        <label htmlFor="content">Folder</label>
        <select
          required
          id="AddNote-folder"
          name="AddNote-folder"
          onChange={(e) => this.updateFolder(e.target.value)}
        >
          <option value={""}>Choose a folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>

        <div className="addNote-form-buttons-wrapper">
          <button type="submit" disabled={this.validateName()}>
            Add
          </button>
          <button type='button' onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </form>

    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object
}

export default AddNote;

