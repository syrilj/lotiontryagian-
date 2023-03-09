import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  
  const onDeleteNote = (noteIdDelete) => {
    const answer = window.confirm("Are you sure?");
    localStorage.removeItem(activeNote.id);
    if (answer) {
      setNotes((notes) => notes.filter((note) => note.id !== noteIdDelete));
    }
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
  
  function getActiveNote () {
    return notes.find((note) => note.id === activeNote);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <div className="header__menu-icon" onClick={toggleSidebar}>
            &#9776;
          </div>
          <div className="header__title-subtitle">
            <h1 className="header__title">Lotion</h1>
            <h2 className="header__subtitle">Notion But Worse</h2>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div className={`main-wrapper ${!showSidebar ? 'full-screen' : ''}`}>
                {showSidebar && (
                  <Sidebar
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                  />
                )}
                <Main
                  className={showSidebar ? '' : 'full-screen'} 
                  activeNote={getActiveNote()} 
                  onUpdateNote={onUpdateNote} 
                  onDeleteNote={onDeleteNote} 
                  getActiveNote={getActiveNote}
                />
              </div>
            }
          />
          <Route
            path="/note/:id"
            element={
              <div className={`main-wrapper ${!showSidebar ? 'full-screen' : ''}`}>
                {showSidebar && (
                  <Sidebar
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                  />
                )}
                <Main
                  className={showSidebar ? '' : 'full-screen'} 
                  activeNote={getActiveNote()} 
                  onUpdateNote={onUpdateNote} 
                  onDeleteNote={onDeleteNote} 
                  getActiveNote={getActiveNote}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;