import React, { Component } from 'react';
import NotefulContext from '../App/NotefulContext';
import './AddFolder.css'
import ValidationError from '../App/ValidationError';
import config from '../App/config';
import PropTypes from 'prop-types';


class AddFolder extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameTouched: false,
    }
  }

  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  updateFolderName(name) {
    this.setState({
      name: name,
      nameTouched: true,
    });
  }

  // update cb when typing
  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;

    const folder = {
      name,
    };


    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json()
          .then((e) => Promise.rejected(e));
        return res.json();
      })
      .then((folder) => {

        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  validateName() {
    const name = this.state.name.trim();
    if (!this.state.nameTouched) return true;
    if (name.length === 0 && this.state.nameTouched)
    {
      return "Folder Name Cannot be Blank, Please Try Again";
    }
    return null;
  }

  render() {
    const nameError = this.validateName();

    return (
      <form
        className="Noteful-form"
        onSubmit={(e) => this.handleSubmit(e)}
        action="#"
      >
        <label htmlFor="name">Folder Name: </label>
        <input
          type="text"
          id="name"
          className="AddFolder_name"
          name="name"
          onChange={(e) => this.updateFolderName(e.target.value)}
          aria-label="Folder name"
        />
        <br /><br />

        <ValidationError message={nameError} />


        < div className="Noteful-form-buttons-wrapper">
          <button type="submit" disabled={this.validateName()}>
            Add
          </button>
          <button type='button' onClick={this.handleClickCancel}>
            Cancel
          </button>
        </div>
      </form >
    );
  }
}
AddFolder.propTypes = {
  history: PropTypes.object
}


export default AddFolder;
