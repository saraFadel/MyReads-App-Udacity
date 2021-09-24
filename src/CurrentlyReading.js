import React from 'react';
import Book from './Book';

function CurrentlyReading(props){

    const {books, updateList} = props;

    return(
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {books.map((book) => {
              return(
                <li key= {book.id}>
                  <Book book= {book}
                  updateList= {updateList}/>
                </li>
              )
              })}
            </ol>
          </div>
        </div>
    )
}

export default CurrentlyReading;
