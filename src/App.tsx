import "./App.css";
import BookListing from "./components/BookListing";
import SearchBooks from "./pages/SearchBooks";
import { Route, Routes } from "react-router-dom";


function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);

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

