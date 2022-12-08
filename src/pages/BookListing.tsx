import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import Book from "../DataModels/Book";
import Bookshelf from "../components/BookShelf";
import { useSelector, useDispatch } from "react-redux";
import { bookActions } from "../store/bookStore";



const BookListing: React.FC = () => {
  const dispatch = useDispatch();  
  let books: Book[] =  useSelector((state: any) => state.bookStore.books);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    try {
      setIsloading(true)
      const temp = () => {
        getAll().then((data) => {
          console.log(data);
          dispatch(bookActions.getAll({ books: data }));
          setIsloading(false);
        }).catch(error => {throw error});
      };
      temp();
    } catch (error) {
      setIsloading(false)
      console.warn(error);
    }
  }, [dispatch]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {isLoading && books.length ==0 ?  <div className="loader"></div> : 
        <div>
          <Bookshelf
            key={"currentlyReading"}
            shelf="currentlyReading"
            shelfHeader="Currently Reading"
            books={books.filter((b) => b.shelf === "currentlyReading")}
          ></Bookshelf>
          <Bookshelf
            key={"wantToRead"}
            shelf="wantToRead"
            shelfHeader="Want to Read"
            books={books.filter((b) => b.shelf === "wantToRead")}
          ></Bookshelf>
          <Bookshelf
            key={"read"}
            shelf="read"
            shelfHeader="Read"
            books={books.filter((b) => b.shelf === "read")}
          ></Bookshelf>
        </div>}
        
      </div>
      <div className="open-search">
        <Link to={"search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default BookListing;
