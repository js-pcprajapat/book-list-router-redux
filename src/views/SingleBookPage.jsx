import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { selectBook, eraseBook,toggleIsRead } from '../store/booksSlice.js';
import { eraseBookNotes } from '../store/notesSlice.js';

function SingleBookPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleEraseBook(id){
      if(confirm("Are you sure want to delete this book and related the notes also?")){
          dispatch(eraseBook(id));
          dispatch(eraseBookNotes(id));
          navigate('/');
      }
    }

    function handleIsRead(id){
      dispatch(toggleIsRead(id));
    }
    const {id} = useParams();
    const books = useSelector(selectBook);

    const book = books.filter(book=> book.id == id)[0];
    
    return (
      <>
        <div className="container">
                <NavLink to={'/'}>
                  <button className="btn">
                      ← Back to Books
                  </button>
                </NavLink>
            { 
            book ? 
              <div>
                <div className="single-book">
                  <div className="book-cover">
                      <img src={book.cover} />
                  </div>
                  <div className="book-details">
                      <h3 className="book-title">{ book.title }</h3>
                      <h4 className="book-author">{ book.author }</h4>
                      <p>{book.synopsis}</p>
                      <div className="read-checkbox">
                          <input type="checkbox" onClick={()=>handleIsRead(book.id)} defaultChecked={book.isRead} />
                          <label>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</label>
                      </div>
                      <div className="erase-book" onClick={()=>handleEraseBook(book.id)}>
                          Erase book
                      </div>
                  </div>
                </div>
                <Notes bookId={id} /> 
              </div>
            :
            <p>Book is not found please click on go back book button to see books.</p>
          }

        </div>

        
      </>
    )
  }
  
  export default SingleBookPage
  