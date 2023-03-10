
import React from 'react';

function lotionTop() {
    return (
      <header>
        <div className="lotion-header">
        <button onClick = {fullScreen}>&#9776;</button>
    <div className="lotion-text">  
        <h1>Lotion</h1>
        <h3>Like Notion, but worse.</h3>
        </div>
    </div>
      </header>
    );
  }

  function fullScreen() {
    const sidebar = document.querySelector('.sidebar');
    const mainNotes = document.getElementById('main-notes');
    const noActiveNote = document.getElementById('no-active-note');
    
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'block';
      if (noActiveNote) {
        noActiveNote.style.width = '100%';
      }
    } else {
      sidebar.style.display = 'none';
      if (mainNotes) {
        mainNotes.style.width = '100%';
      }
    }
  }
  
  export default lotionTop;
  