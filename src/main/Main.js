import React, { useState,useRef ,useEffect,FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from "verbum";

const NoteViewer: FC = () => {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
          <FontFamilyDropdown />
          <FontSizeDropdown />
          <Divider />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <CodeFormatButton />
          <InsertLinkButton />
          <TextColorPicker />
          <BackgroundColorPicker />
          <TextFormatDropdown />
          <Divider />
          <InsertDropdown enablePoll={true} />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};
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



const EditorDate = ({ selectedDate, handleDateChange }) => {
  return (
    <div className="calendar-dropdown">
      <button onClick={() => selectedDate(new Date())}>&#128197;</button>
      {selectedDate && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        />
      )}
    </div>
  );
      }

  function Main ({ activeNote, getActiveNote, onUpdateNote, onDeleteNote, note })  {
    const [date, setDate] = useState(Date.now());
    const [title, setTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const reference = useRef();
   
  
    useEffect(() => {
      if (activeNote){
        setNoteContent(getActiveNote().body);
        setTitle(getActiveNote().title);
      }
      
    }, [activeNote]);
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleChange = (content) => {
    setNoteContent(content);
  };
  
  const handleEdit = () => {
    setEditing(true);
    setShowFields(false);
  };

  const handleSaveNote = () => {
    const note = {
      id: activeNote.id,
      title: title,
      modifiedDate: date,
      body: noteContent,
    };
    onUpdateNote(note);
    setEditing(false);
    setShowFields(false);
  };
  
    const toggleFields = () => {
      setShowFields(!editing);
    };
  
    if (!activeNote) {
      return <div className="no-active-note">Select a note, or create a new one. </div>;
    }
    return (
      <div id="main-notes" className={`main-notes${editing ? '' : ' read-only'}`}>
        <div className="main-notes-heading border">
          {editing ? (
            <div>
              <input
                type="text"
                id="title"
                placeholder="Untitled"
                value={title}
                onChange={handleTitleChange}
                autoFocus
              />
              <input
                type="datetime-local"
                id="date"
                step="1"
                className="datetime-header"
                value={new Date(date).toISOString().slice(0, -8)}
                onChange={(e) => setDate(Date.parse(e.target.value))}
              />
              
            </div>
          ) : (
            <div onClick={toggleFields}>
              <h2>{title || "Untitled"}</h2>
              <p>{new Date(date).toLocaleString()}</p>
            </div>
          )}
    
          <div className="main-notes-buttons">
            {!editing ? (
              <button onClick={handleEdit} className="edit-note">
                Edit
              </button>
            ) : null}
            {editing ? (
              <>
                <button onClick={handleSaveNote} id="save-note">
                  Save
                </button>
              </>
            ) : null}
            <button onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
          </div>
        </div>
    
        {!editing ? (
          <div id="newNoteContent">
            <textarea
              id="noteEditor"
              className="textarea"
              value={noteContent}
              onChange={handleChange}
              readOnly={!editing}
              autoFocus
            ></textarea>
          </div>
        ) : (
          <div id="noteEdit" className="border" onClick={toggleFields}>
            <NoteViewer content={noteContent} onUpdate={handleChange} />
          </div>
        )}
      </div>
    );
        };    
  
  export default Main;