import { useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from 'react';
function Sidebar (
  {notes,
   onAddNote,
   activeNote,
   setActiveNote,
   }) {
 
   
 
    if(!activeNote && notes.length === 0){
      return(
        <div id = "sb-empty" className="sb-empty">
          <div className="sb-empty-heading">
              <h2>Notes</h2>
              <button onClick={onAddNote}>&#43;</button>
          </div>
          <div className="empty">Empty Please Add Note</div>
        </div>
      )
    }
     if (notes.length === 0) {
      return (
        <div id = "sb-empty" className="sb-empty">
          <div className="sb-empty-heading">
              <h2>Notes</h2>
              <button onClick={onAddNote}>&#43;</button>
          </div>
          <div className="empty">Empty Please Add Note</div>
        </div>
      
      );
    }
 
 
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
   
    const formatDate = (when) => {
      const formatted = new Date(when).toLocaleString("en-US", options);
      if (formatted === "Invalid Date") {
          return "";
      }
      return formatted;
    };
 
 
    return (
    <div id = "sidebar" className="sidebar">
    <div className="sidebar-heading">
    <h2> Notes </h2>
    <button onClick = {onAddNote}> &#x2b;</button>
    </div>
   
    <div className="sidebar-notes">
    {notes.map((note) => (
  <div key={note.id} className={`sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}  >
    <div className="sidebar-note-title">
      <strong>{note.title} </strong>
    </div>
    <small id="note-modification-info">{new Date(note.date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12:true
    })}
    </small>
    <div dangerouslySetInnerHTML={{__html: note.body && note.body.substr(0,30) + "..."}}></div>
  </div>
 ))}
 
 
    </div>
 </div>
 );
 };
 
 export default Sidebar;
 
 
 