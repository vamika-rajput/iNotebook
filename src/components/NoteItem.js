import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import noteContext from "../context/notes/noteContext"; // Import the context

const NoteItem = (props) => {
    const { note, updateNote } = props; // Destructure note and updateNote from props
    const { deleteNote } = useContext(noteContext); // Get deleteNote from context

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            deleteNote(note._id); // Proceed with deletion if confirmed
        }
        // deleteNote(note._id); // Call deleteNote with the note ID
    };

    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* Delete and Edit icons */}
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-2 icon-pointer"
                        onClick={handleDelete}
                    />
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="mx-2 icon-pointer"
                        onClick={() => {
                            const confirmUpdate = window.confirm("Are you sure you want to update this note?");
                            if (confirmUpdate) {
                                updateNote(note); // Proceed with the update and show the success message
                            }
                            
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
