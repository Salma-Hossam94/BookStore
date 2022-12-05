import {createSlice, current} from '@reduxjs/toolkit'
import { getAll } from '../BooksAPI';

const bookState = {books: [], responseResult: null};
const bookSlice = createSlice({
    initialState: bookState,
    name: 'Books',
    reducers: {
        getAll(state, action) {
            state.books = action.payload.books;
        },
        updateBook(state, action) {
            console.log(action.payload.newShelf);
            const filteredbook = state.books.find(b => b.id == action.payload.book.id);
            if (action.payload.newShelf != "none") {
                if (filteredbook) {
                    filteredbook.shelf = action.payload.newShelf;
                } else {
                    state.books.push(action.payload.book)
                }
            }
            else {
                if (filteredbook) {
                    state.books = state.books.filter(b => b.id != action.payload.book.id);
                }
            }
            
        },
        raiseError(state) {
            state.responseResult = false
        }
    }
})

export const bookActions = bookSlice.actions;
export default bookSlice;
