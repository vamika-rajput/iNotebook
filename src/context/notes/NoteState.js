import React, { useState, useEffect } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      if (response.ok) {
        setNotes(json); // Update state only if the fetch is successful
      } else {
        console.error('Failed to fetch notes:', json);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    getNotes(); // Call getNotes only once when the component mounts
  }, []); // Empty dependency array ensures it runs once

  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      const json = await response.json();
      console.log('API Response:', json);

      if (response.ok) {
        // Add the new note to the state
        setNotes((prevNotes) => [...prevNotes, json]);
        console.log('Note added successfully');
      } else {
        console.error('Failed to add note:', json);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a note by its id
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        console.log('Note deleted successfully:', json);
      } else {
        console.error('Failed to delete note:', json);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit a note by its id
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("Updated note:", json);

      if (response.ok) {
        // Update the state locally to reflect the changes
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
          )
        );

        console.log(response)
      } else {
        console.error('Failed to update note:', json);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
