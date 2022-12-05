import Book from "../DataModels/Book";
//import {useDrag} from "react-dnd";
import { ChangeEvent} from "react"
import { bookActions } from "../store/bookStore";
import { update } from "../BooksAPI";
import { useDispatch, useSelector } from "react-redux";


const BookItem: React.FC<{book: Book}> = (props) => {
  //const books = useSelector((state: any) => state.bookStore.books);
   const dispatch = useDispatch();

  const changeShelfHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    update(props.book, event.target.value).then(data => {
      dispatch(bookActions.updateBook({newShelf: event.target.value, book: props.book}))
    });
  }

  // const [{ isDragging }, dragRef] = useDrag(
  //   () => ({
  //     type: "book",
  //     //item: { text },
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     })
  //   }),
  //   []
  // )
  // ref={dragRef}
  return (
    <li id={props.book.title} data-testid="books">
      <div className="book">
        <div className="book-top">
          <div
          data-testid="background-image"
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url(${props.book?.imageLinks?.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={changeShelfHandler} defaultValue="none" data-testid={`select-option-${props.book.title}`}>
              <option value="none" disabled>
                Move to...
              </option>
              {props.book.shelf != "currentlyReading" && <option value="currentlyReading">Currently Reading</option>}
              {props.book.shelf != "wantToRead" && <option value="wantToRead">Want to Read</option>}
              {props.book.shelf != "read" && <option value="read">Read</option>}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book?.title}</div>
        {props.book.authors?.map(author => <div key={author} data-testid="author" className="book-authors">{author}</div>)}
        
      </div>
    </li>
  );
};

export default BookItem;
