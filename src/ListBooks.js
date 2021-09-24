import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import WantRead from './WantRead';
import CurrentlyReading from './CurrentlyReading';
import Read from './Read';

class ListBooks extends Component {
  static propTypes= {
    books: PropTypes.array.isRequired,
  }


  render(){
    const {books, updateList} = this.props;
    return(
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books">
          <div className="list-books-content">

          {/*TODO: Divide books into 3 shelfs*/}

            <CurrentlyReading
            books= {
            books.filter((b) => b.shelf === 'currentlyReading')}
            updateList= {updateList}/>

            <WantRead
            books= {books.filter((b) => b.shelf === 'wantToRead')}
            updateList= {updateList}/>

            <Read
            books= {books.filter((b) => b.shelf === 'read')}
            updateList= {updateList}/>

          </div>
        </div>
        <div className="open-search">
          <Link to= '/search'>
          <button>
            Add a book
          </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
