import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
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

const NoteEditorToolbar = () => (
  <ToolbarPlugin defaultFontSize="16px">
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
);
const NoteEditor = ({ activeNote, onEditField }) => (
  <Editor
    className="note-editor"
    value={activeNote.body}
    onChange={(value) => onEditField("body", value)}
    hashtagsEnabled={true}
  >
    <NoteEditorToolbar />
  </Editor>
);
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



const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setTitleInputValue(activeNote.title);
  };

  const handleTitleChange = (event) => {
    setTitleInputValue(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    onEditField("title", titleInputValue);
  };

  const handleDeleteClick = () => {
    onDeleteNote(activeNote.id);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {isEditingTitle ? (
          <>
            <input
              type="text"
              id="title"
              placeholder="Note Title"
              value={titleInputValue}
              onChange={handleTitleChange}
              autoFocus
              onBlur={handleTitleBlur}
            />
            <div>{formatDate(activeNote.lastModified)}</div>
            <button onClick={handleDeleteClick}>Delete</button>
          </>
        ) : (
          <div className="app-main-note-edit-title" onClick={handleTitleClick}>
            {activeNote.title}
            <div>{formatDate(activeNote.lastModified)}</div>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
        <EditorComposer>
          <NoteEditor activeNote={activeNote} onEditField={onEditField} />
        </EditorComposer>
      </div>
    </div>
  );
};


export default Main;

