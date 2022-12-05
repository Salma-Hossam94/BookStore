import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Book from "../DataModels/Book";
import store from "../store/store";
import BookItem from "../components/BookItem";

const MockedBookItem: React.FC<{ book: Book }> = (props) => {
  return (
    <Provider store={store}>
      <BookItem book={props.book}></BookItem>
    </Provider>
  );
};
describe("renders full book item correctly", () => {
  const customBook: Book = {
    authors: ["Osama El Korashy", "Salma Hossam"],
    id: Math.random().toString(),
    shelf: "currentlyreading",
    title: "mock book",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  };

  it("displayes book title", async () => {
    render(<MockedBookItem book={customBook}></MockedBookItem>);

    const bookTilte = screen.getByText(customBook.title);
    expect(bookTilte).toBeInTheDocument();
  });
  it("displayes book author", async () => {
    render(<MockedBookItem book={customBook}></MockedBookItem>);
    const bookFirstauthor = screen.getByText(customBook.authors![0]);
    expect(bookFirstauthor).toBeInTheDocument();
  });
  it("displayes book authors", async () => {
    render(<MockedBookItem book={customBook}></MockedBookItem>);
    const bookFirstauthors = screen.getAllByTestId("author");
    expect(bookFirstauthors.length).toBe(2);
  });
});
describe("check options rendering", () => {
  const customBook: Book = {
    authors: ["Osama El Korashy", "Salma Hossam"],
    id: Math.random().toString(),
    title: "mock book",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  };
  
  it("displayes all options when a book is without a shelf", async () => {
    render(<MockedBookItem book={customBook}></MockedBookItem>);
    const bookShelfOptions = screen.getAllByRole("option");
    expect(bookShelfOptions.length).toBe(5);
  });

  it("displayes options without the book shelf options", async () => {
    customBook.shelf = "currentlyReading";
    render(<MockedBookItem book={customBook}></MockedBookItem>);
    const bookShelfOption = screen.getByTestId(/select-option/!);
    expect(bookShelfOption).not.toHaveTextContent(/Currently Reading/!);
    const bookShelfOptions = screen.getAllByRole("option");
    expect(bookShelfOptions.length).toBe(4);
  });
});

describe("renders book item with missing values corretly", () => {
  it("renders book item without authors correctly", async () => {
    const customBook: Book = {
      id: Math.random().toString(),
      shelf: "currentlyreading",
      title: "mock book",
      categories: [],
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      },
    };

    render(<MockedBookItem book={customBook}></MockedBookItem>);
    const bookFirstauthors = screen.queryAllByTestId("author");
    expect(bookFirstauthors.length).toBe(0);
  });
});
