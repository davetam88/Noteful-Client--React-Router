import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  error: null,
  addNote: () => { },
  addFolder: () => { },
  deleteNote: () => { },
})

export default NotefulContext

