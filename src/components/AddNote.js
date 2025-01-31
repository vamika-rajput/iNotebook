import React, { useState } from "react";

const AddNote = ({ showAlert }) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [errors, setErrors] = useState({}); // State for error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });

        // Validation
        let newErrors = { ...errors };

        if (name === "title") {
            if (!value.trim()) newErrors.title = "Title is required.";
            else if (value.length < 3) newErrors.title = "Title must be at least 3 characters long.";
            else delete newErrors.title;
        }

        if (name === "description") {
            if (!value.trim()) newErrors.description = "Description is required.";
            else if (value.length < 10) newErrors.description = "Description must be at least 10 characters long.";
            else delete newErrors.description;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!note.title.trim()) newErrors.title = "Title is required.";
        if (!note.description.trim()) newErrors.description = "Description is required.";
        if (note.title.length < 3) newErrors.title = "Title must be at least 3 characters long.";
        if (note.description.length < 10) newErrors.description = "Description must be at least 10 characters long.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        // API Call (Proceed only if no errors)
        const token = localStorage.getItem("token");
        if (!token) {
            showAlert("You are not logged in!", "danger");
            return;
        }

        const response = await fetch("http://localhost:5000/api/notes/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify(note),
        });

        const data = await response.json();
        if (response.ok) {
            showAlert("Note added successfully!", "success");
            setNote({ title: "", description: "", tag: "" });
            setErrors({});
        } else {
            showAlert("Error adding note: " + data.error, "danger");
        }
    };

    return (
        <div>
            <h2>Add a New Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={note.title} onChange={handleChange} />
                    {errors.title && <small className="text-danger">{errors.title}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={note.description} onChange={handleChange} />
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" value={note.tag} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
