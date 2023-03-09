import React from 'react';
import ReactMarkdown from 'react-markdown';



const NotePreview = ({ body }) => {
  let markdownBody = "";

  try {
    const jsonBody = JSON.parse(body);
    markdownBody = jsonBody.root.children[0].children[0].text;
  } catch (err) {
    // handle error
  }
  
  const allowedTypes = ["text", "paragraph", "emphasis", "strong", "u"];

  return (
    <div className="note-preview">
      <ReactMarkdown allowedTypes={allowedTypes}>
        {markdownBody.length > 0 ? markdownBody + "..." : "..."}
      </ReactMarkdown>
    </div>
  );
};


const Sidebar = ({ notes = [], onAddNote, onDeleteNote, activeNote, setActiveNote }) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => {
          return (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
              key={id}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button onClick={(e) => onDeleteNote(id)}>Delete</button>
              </div>
              <NotePreview body={body} />
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
