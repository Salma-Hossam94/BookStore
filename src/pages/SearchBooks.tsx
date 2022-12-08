import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "../DataModels/Book";
import BookItem from "../components/BookItem";

const SearchBooks: React.FC = () => {
  const [books, setfilteredbooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchText.length);
      if (searchText.length > 0) {
        setIsloading(true);
        search(searchText, 20)
          .then((data) => {
            setIsloading(false);
            if (data.error) {
              setfilteredbooks([]);
            } else {
              console.log(books);
              setfilteredbooks(data as Book[]);
            }
          })
          .catch((error) => {
            setIsloading(false);
            setfilteredbooks([]);
          });
      } else {
        setfilteredbooks([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const HandleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.trim());
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={HandleSearch}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <ol className="books-grid">
            {books.map((book) => (
              <BookItem key={book.id} book={book}></BookItem>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
