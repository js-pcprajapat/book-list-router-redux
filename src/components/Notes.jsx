import { useSelector, useDispatch } from 'react-redux';
import {selectNote, addNote, eraseNote } from '../store/notesSlice.js';
import { useRef } from 'react';
function Notes({bookId}) {
  const dispatch = useDispatch();
  function handleEraseNote(id){
    if(confirm('Are you sure want to remove this note?')){
      dispatch(eraseNote(id));
    }
  }

  const titleElem = useRef();
  const noteElem = useRef();

  function handleAddNote(e) {
    e.preventDefault();
    
    const newNote = {
      book_id: bookId,
      title: titleElem.current.value,
      text: noteElem.current.value
    }

    if(newNote.title && newNote.text){
      dispatch(addNote(newNote));
      alert('Note Created Successfully!');
      titleElem.current.value = '';
      noteElem.current.value = '';
    }else{
      alert('Title and note are required!');
      return;
    }
  }


  const notes  = useSelector(selectNote).filter(note => note.book_id == bookId);
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>
            {
              notes.length ?
                <div className="notes">
                    {notes.map(note => 
                        <div key={note.id} className="note">
                            <div className="erase-note" onClick={()=>handleEraseNote(note.id)}>Erase note</div>
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                        </div>
                        )}
                </div>
              :
              <p>No notes found for this book.</p>
            }
            

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" ref={titleElem} name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" ref={noteElem} name="note" placeholder="Add note" />
                    </div>
                    
                    <button className="btn btn-block" onClick={(e)=>handleAddNote(e)}>Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  