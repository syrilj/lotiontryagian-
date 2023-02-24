import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import * as React from 'react';
function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header__menu-icon" onClick={toggleSidebar}>
          &#9776;
        </div>
        <h1 className="header__title">Lotion</h1>
      </header>
      <div className="main-wrapper">
        {showSidebar && (
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        )}
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </div>
  );
}

export default App;

