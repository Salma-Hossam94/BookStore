import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Book from "../DataModels/Book";
import store from "../store/store";
import SearchBooks from "../components/SearchBooks";

const MockedSearchBooks: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SearchBooks/>
      </Provider>
    </BrowserRouter>
  );
};

const customBooks: Book[] = [
  {
    authors: ["Osama El Korashy", "Salma Hossam"],
    id: Math.random().toString(),
    shelf: "currentlyReading",
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
    shelf: "wantToRead",
    title: "mock book 2",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
  {
    authors: ["Mariam"],
    id: Math.random().toString(),
    shelf: "read",
    title: "mock book 3",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
  {
    authors: ["Mahmoud"],
    id: Math.random().toString(),
    shelf: "read",
    title: "mock book 4",
    categories: [],
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=zTtnV7J0lPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
  },
];

describe("search page at beginning", () => {

  it("contains search input", async () => {
    render(<MockedSearchBooks></MockedSearchBooks>);
    const searchinput =  screen.getByPlaceholderText("Search by title, author, or ISBN");
    expect(searchinput).toBeInTheDocument();
  })

  it("contains no books at the beginning", async () => {
    render(<MockedSearchBooks></MockedSearchBooks>);
    const booksResult =  screen.queryAllByTestId("books");
    expect(booksResult.length).toBe(0);
  })
})

describe("interact with search", () => {
  global.fetch = jest.fn().mockResolvedValueOnce({json: async () => {return {books:customBooks}}});

  it("get result books", async () => {
    render(<MockedSearchBooks></MockedSearchBooks>);
    const searchinput =  screen.getByPlaceholderText("Search by title, author, or ISBN");
    fireEvent.change(searchinput, { target : {value : 'search'}})
    const booksResult = await screen.findAllByTestId("books");
    await waitFor(() => {
      expect(booksResult.length).toBe(4);
    });
  })

  it("empty result books when search input value deleted", async () => {
    render(<MockedSearchBooks></MockedSearchBooks>);
    const searchinput =  screen.getByPlaceholderText("Search by title, author, or ISBN");
    fireEvent.change(searchinput, { target : {value : ''}})
    await waitFor(() => {
      const booksResult = screen.queryAllByTestId("books");
      expect(booksResult.length).toBe(0);
    });
  })

  // it("contains no books at the beginning", async () => {
  //   render(<MockedSearchBooks></MockedSearchBooks>);
  //   const booksResult =  screen.queryAllByTestId("books");
  //   expect(booksResult.length).toBe(0);
  // })
})
