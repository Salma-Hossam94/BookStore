import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Book from "../DataModels/Book";
import store from "../store/store";
import BookListing from "../pages/BookListing";
import { act } from "react-dom/test-utils";

const MockedBookListing: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <BookListing />
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

describe("displayes all tiitles (main title + shelf title", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({json: async () => {return {books:customBooks}}});

    it("displayes all main title", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByRole("heading", {name: /MyReads/!});
        expect(shelf).toBeInTheDocument();
      });

      it("displayes Currently Reading shelf tiitl)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByRole("heading", {name: "Currently Reading"});
        expect(shelf).toBeInTheDocument();        
      });

      it("displayes Want to Read shelf tiitl)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByRole("heading", {name: "Want to Read"});
        expect(shelf).toBeInTheDocument();        
      });
      
      it("displayes Read shelf title)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByRole("heading", {name: "Read"});
        expect(shelf).toBeInTheDocument();        
      });
})

describe("distributing books in shelfs correctly", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({json: async () => {return {books:customBooks}}});
    it("displayes currentlyReading books in their right shelf)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByTestId("shelfbooks-currentlyReading");
        expect(shelf).toHaveTextContent(/mock book 1/!)
      });

      it("displayes Want to Read books in their right shelf)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByTestId("shelfbooks-wantToRead");
        expect(shelf).toHaveTextContent(/mock book 2/!)
      });

      it("displayes Read books in their right shelf)", async () => {
        render(<MockedBookListing></MockedBookListing>);
        const shelf = await screen.findByTestId("shelfbooks-read");
        expect(shelf).toHaveTextContent(/mock book 3/!)
        expect(shelf).toHaveTextContent(/mock book 4/!)
      });
})

describe("interacting with changing shelfs", () => {
    global.fetch = jest.fn().mockResolvedValue({json: async () => {return {books:customBooks}}});
        it("add to the new shelf", async ()=> {
        render(<MockedBookListing></MockedBookListing>);
        const bookSelectMenu = await screen.findByTestId("select-option-mock book 4");
        fireEvent.change(bookSelectMenu, {target:{ value:"wantToRead"}});
        
        const shelf = await screen.findByTestId("shelfbooks-wantToRead");
        await waitFor(() => {
          expect(shelf).toHaveTextContent(/mock book 2/!)
          expect(shelf).toHaveTextContent(/mock book 4/!)
        });
    } )
    it("removes from the old shelf", async ()=> {
        render(<MockedBookListing></MockedBookListing>);
        const bookSelectMenu = await screen.findByTestId("select-option-mock book 4");
        fireEvent.change(bookSelectMenu, {target:{ value:"wantToRead"}});
        
        const shelf = await screen.findByTestId("shelfbooks-read");
        expect(shelf).not.toHaveTextContent(/mock book 4/!)
    })
    it("add a lonely book to a new shelf", async ()=> {
        render(<MockedBookListing></MockedBookListing>);
        const bookSelectMenu = await screen.findByTestId("select-option-mock book 2");
        fireEvent.change(bookSelectMenu, {target:{ value:"currentlyReading"}});
        
        const shelf = await screen.findByTestId("shelfbooks-currentlyReading");
        expect(shelf).toHaveTextContent(/mock book 1/!);
        await waitFor(() => expect(shelf).toHaveTextContent(/mock book 2/!))
    } )
    it("removes a lonely book from the old shelf to leave it empty", async ()=> {
        render(<MockedBookListing></MockedBookListing>);
        const bookSelectMenu = await screen.findByTestId("select-option-mock book 2");
        fireEvent.change(bookSelectMenu, {target:{ value:"currentlyReading"}});
        
        const shelf = await screen.findByTestId("shelfbooks-wantToRead");
        expect(shelf).not.toHaveTextContent(/mock book/!)
    })
    it("removes the book with selected value none from the screen", async ()=> {
        render(<MockedBookListing></MockedBookListing>);
        const bookSelectMenu = await screen.findByTestId("select-option-mock book 3");
        fireEvent.change(bookSelectMenu, {target:{ value:"none"}});
        
        const shelf = await screen.findByTestId("shelfbooks-read");
        await waitFor(() =>{
            expect(shelf).not.toHaveTextContent(/mock book 3/!)
            expect(shelf).toHaveTextContent(/mock book 4/!)
        })
        
    })
})


