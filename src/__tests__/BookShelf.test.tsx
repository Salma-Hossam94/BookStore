import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Book from "../DataModels/Book";
import store from "../store/store";
import Bookshelf from "../components/BookShelf";

const MockedBookShelf : React.FC<{books: Book[], shelf: string, shelfHeader: string}> = (props) => {
    return (
        <Provider store={store}>
            <Bookshelf books={props.books} shelfHeader={props.shelfHeader} shelf={props.shelf}></Bookshelf>
        </Provider>
    )
}

const customeBooks: Book[] = [
  {
    authors: ["Osama El Korashy", "Salma Hossam"],
    id: Math.random().toString(),
    shelf: "currentlyreading",
    title: "mock book 1",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
  {
    authors: ["Omar Hossam"],
    id: Math.random().toString(),
    shelf: "currentlyreading",
    title: "mock book 2",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
  {
    authors: ["Mariam Mahmoud"],
    id: Math.random().toString(),
    shelf: "currentlyreading",
    title: "mock book 3",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
];

describe("renders shelf correctly", () => {
    it("displayes shelf title", async () => {
        render(<MockedBookShelf books={customeBooks} shelf="currentlyreading" shelfHeader="currently reading"></MockedBookShelf>);
        const shelfilte = screen.getByRole("heading");
        expect(shelfilte).toHaveTextContent("currently reading");
      });

      it("doesn't display a different shelf title", async () => {
        render(<MockedBookShelf books={customeBooks} shelf="currentlyreading" shelfHeader="currently reading"></MockedBookShelf>);
        const shelfilte = screen.getByRole("heading")
        expect(shelfilte).not.toHaveTextContent(/Want to Read/i);
      });
})

describe("renders books correctly", () => {
    it("displayes books", async () => {
        render(<MockedBookShelf books={customeBooks} shelf="currentlyreading" shelfHeader="currently reading"></MockedBookShelf>);
        const books = screen.queryAllByTestId("books");
        expect(books.length).toBe(3);
      });
      it("displayes no books when get empty list", async () => {
        render(<MockedBookShelf books={[]} shelf="currentlyreading" shelfHeader="currently reading"></MockedBookShelf>);
        const books = screen.queryAllByTestId("books");
        expect(books.length).toBe(0);
      });
})


