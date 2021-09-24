import React from 'react';
import Book from './Book';

function WantRead(props){

    const {books, updateList} = props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
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

export default WantRead;
