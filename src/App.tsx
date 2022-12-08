import "./App.css";
import BookListing from "./pages/BookListing";
import SearchBooks from "./pages/SearchBooks";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BookListing/>}></Route>
        <Route path="/search" element={<SearchBooks/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

