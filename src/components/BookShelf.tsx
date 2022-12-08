import Book from "../DataModels/Book"
import BookItem from "./BookItem"


const Bookshelf: React.FC<{books: Book[], shelf: string, shelfHeader: string}> = (props) => {

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