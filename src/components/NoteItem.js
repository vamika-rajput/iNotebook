import React, { useContext , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import noteContext from "../context/notes/noteContext"; // Import the context

const NoteItem = (props) => {
    const { note, updateNote } = props; // Destructure note and updateNote from props
    const { deleteNote } = useContext(noteContext); // Get deleteNote from context
    const [expanded, setExpanded] = useState(false); // State for expanding text


    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            deleteNote(note._id); // Proceed with deletion if confirmed
        }
        // deleteNote(note._id); // Call deleteNote with the note ID
    };

    return (
        
        <div className="col-md-3 col-sm-6 d-flex">
            <div className="card flex-fill">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text d-inline">
                    {expanded || note.description.length <= 100 
                            ? note.description 
                            : `${note.description.substring(0, 100)}...`}
                    </p>
                    {/* Show Read More / Read Less only when text is long */}
                    {note.description.length > 100 && (
                        <span
                            className="btn btn-link p-0 ms-1" 
                            onClick={() => setExpanded(!expanded)}
                            style={{ textDecoration: "none", fontSize: "14px" }}
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </span>
                    )}
                    </div>
                           
                    {/* Delete and Edit icons */}
                    <div className="position-absolute bottom-0 end-0 p-2">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-2 icon-pointer"
                        onClick={handleDelete}
                    />
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="mx-2 icon-pointer"
                        onClick={() => {
                            // const confirmUpdate = window.confirm("Are you sure you want to update this note?");
                            // if (confirmUpdate) {
                                updateNote(note); // Proceed with the update and show the success message
                            // }
                            
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
