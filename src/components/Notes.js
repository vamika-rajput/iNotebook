import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = ({ showAlert }) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
    const modalRef = useRef(null);
    const closeModalRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }
    }, [getNotes, navigate]);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag,
        });
        modalRef.current.click(); // Trigger the modal
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        console.log("fffffffffff")
        editNote(note.id, note.title, note.description, note.tag);
        closeModalRef.current.click(); // Close the modal
        showAlert("Note updated successfully", "success");
        alert("Note updated successfully");
    };

    return (
        <>
            <AddNote showAlert={showAlert} />

            {/* Hidden Button to Open Modal */}
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={modalRef}
            >
                Launch modal
            </button>

            {/* Modal for Editing Note */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeModalRef}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={note.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={note.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tag"
                                        name="tag"
                                        value={note.tag}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={closeModalRef}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="row my-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {notes.length > 0 ? (
                        notes.map((note) => (
                            
                            
                            <NoteItem key={note._id} style={{ flex: '1 1 calc(33.333% - 20px)', boxSizing: 'border-box' }} updateNote={updateNote} note={note} />
                        ))
                    ) : (
                        <p>No notes available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notes;
