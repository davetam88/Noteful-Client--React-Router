export const findFolder = (folders = [], folderId) => {
    return (
        folders.find(folder => folder.id === folderId)
    )
}

export const findNote = (notes = [], noteId) => {
    return (
        notes.find(note => note.id === noteId)
    )
}


export const getNotesForFolder = (notes = [], folderId) => {
    return (
        (!folderId)
            ? notes
            : notes.filter(note => note.folderId === folderId)
    )
}

export const countNotesForFolder = (notes = [], folderId) => {
    return (
        notes.filter(note => note.folderId === folderId).length
    )
}
