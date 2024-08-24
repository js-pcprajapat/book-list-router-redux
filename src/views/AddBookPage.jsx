import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router';
import { addBook } from '../store/booksSlice.js';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
function AddBookPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let titleElem = useRef();
    let coverElem = useRef();
    let authorElem = useRef();
    let synopsisElem = useRef();

    function handleAddBook(e){
        e.preventDefault();
        const newBook = {
            title: titleElem.current.value,
            cover: coverElem.current.value,
            author: authorElem.current.value,
            synopsis: synopsisElem.current.value,
            isRead: false
        }

        if(newBook.title && newBook.cover && newBook.author){
            dispatch(addBook(newBook));
            alert('Book Created Successfully!');
            navigate("/");
        }else{
            alert('All fields are required!');
            return;
        }  
    }
    
    const pageTitle = "Add Book";

    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />

            <form className="add-form">
                <div className="form-control">
                    <label>Title *</label>
                    <input type="text" ref={titleElem} name="title" placeholder="Add Book Title" />
                </div>
                <div className="form-control">
                    <label>Book Cover *</label>
                    <input type="text" ref={coverElem} name="cover" placeholder="Add Cover" />
                </div>

                <div className="form-control">
                <label>Author *</label>
                <input
                    type="text" ref={authorElem} name="author" placeholder="Add Author" />
                </div>

                <div className="form-control">
                <label>Synopsis *</label>
                <textarea ref={synopsisElem}
                    type="text" name="synopsis" placeholder="Add a synopsis..." />
                </div>
                
                <button className="btn btn-block" onClick={(e)=> handleAddBook(e)}>Save Book</button>
            </form>

        </div>

        
      </>
    )
  }
  
  export default AddBookPage
  