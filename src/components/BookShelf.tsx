import Book from "../DataModels/Book"
import BookItem from "./BookItem"
import {useDrop} from "react-dnd"
import { useState } from "react"


const Bookshelf: React.FC<{books: Book[], shelf: string, shelfHeader: string}> = (props) => {


    // const [{isOver}, dropRef] = useDrop(() => ({
    //     accept: "book",
    //     drop: (book: Book) => changeBookstate(book),
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     })
    // }))

    // const changeBookstate = (book: Book) => {
    //     setbooks(props.books);
    //     console.log(testBooks);
    //     book.shelf = props.shelfTitle;
    //     console.log(book.shelf);
    //     if (!testBooks.includes(book)) {
    //         setbooks(prev => prev.concat(book))
    //     }
    // }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{props.shelfHeader}</h2>
                <div className="bookshelf-books" data-testid={`shelfbooks-${props.shelf}`}>
                    {props.books && (<ol className="books-grid">
                    {props.books.map(book =>
                        <BookItem key={book.id} book={book}></BookItem>
                         )}
                   </ol>)}
                </div>
              </div>
        )
}
export default Bookshelf