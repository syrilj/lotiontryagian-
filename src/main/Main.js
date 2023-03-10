
import { useState, useEffect, useRef } from "react";
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Main ({ activeNote, getActiveNote, onUpdateNote, onDeleteNote, note })  {
 const [date, setDate] = useState(Date.now());
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [editing, setEditing] = useState(false);
 const [toggleFields, setToggleFields] = useState(false);


 useEffect(() => {
  setContent(activeNote && activeNote.body ? activeNote.body : "");

 }, [activeNote]);


 useEffect(() => {
   localStorage.setItem("content", content);
 }, [content]);

 const editingFields = (key,value) => {
  onUpdateNote({
    ...activeNote,
    [key]:value,
  })
 }

 const handleTitle = (event) => {
   setTitle(event.target.value);
 };


 const handleContentChange = (value) => {
  setContent(value);
 };


 const handleEditContent = () => {
   setEditing(false);
 };


 const handleSaveContent = () => {

   editingFields("title", title);
   editingFields("body", content);
   setEditing(true);
  localStorage.setItem('content', activeNote.body)


 };


 if (!activeNote) {
   return <div className="no-active-note">Select a note, or create a new one. </div>;
 }

 return (
   <div id="main-notes" className="main-notes">
     <div className="main-notes-heading">
       <div className="main-notes-titles">
         {!editing ? (
           <input
             type="text"
             id="title"
             placeholder="Untitled"
             value={title}
             onChange={handleTitle}
             autoFocus
           ></input>
     ) : (
       <input
       type="text"
       id="title"
       placeholder="Untitled"
       value={title}
       onChange={handleTitle}
       autoFocus
       readOnly
     ></input>
     )}
         <input
           type="datetime-local"
           step="1"
           className="datetime-header"
           onChange={(e) => setDate(Date.parse(e.target.value))}
         />
       </div>
       <div className="main-notes-buttons">
       {editing ? (
             <button onClick={handleEditContent} class="edit-note">
               Edit
             </button>
           ) : (
             <button onClick={handleSaveContent}  id="save-note">
               Save
             </button>
       
           )}
         <button onClick={() => onDeleteNote(activeNote.id)}> Delete </button>
       </div>
     </div>

      {!editing ? (
         <div id="noteEdit" >
           <ReactQuill id = "ReactQuill"
             placeholder="Your Note Here"
             value={content}
             onChange={handleContentChange}
           ></ReactQuill>
         </div>
       ) : (<div id="newNoteContent" dangerouslySetInnerHTML={{__html: content}}></div>)}
 
   </div>
 );
};


export default Main;
