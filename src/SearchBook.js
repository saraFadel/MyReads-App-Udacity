import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from './Book';

class SearchBook extends Component {

  static propTypes= {
    searchedBooks: PropTypes.array.isRequired,
    searchBooks: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired,
  }

  state= {
    query: ''
  }
  //TODO: Use query to search books by calling the search API
  updateQuery= (query) => {
    this.setState(() => ({
      query: query
    }), this.props.searchBooks(query));

  }
  //TODO: clear query to use it when return to the ListBooks view after search
  clearQuery= () => {
    this.setState(() => ({
      query: ''
    }))
  }

  render(){
    const {query}= this.state;
    const {searchedBooks}= this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to= '/' onClick= {() => {this.clearQuery()}}>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type= "text"
             placeholder= "Search by title or author"
             value= {query}
             onChange= {(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
                {
                  //TODO: Handle search cases
                  query === ''
                  //case1: User doesn't write a query
                  ?<li>
                    Search about anybook
                  </li>
                  :(searchedBooks.length !== 0
                    //case2: User write a valid query
                    ?searchedBooks.map((book) => {
                      //console.log(`From search: ${book.shelf}`);
                      return(
                        <li key= {book.id}>
                          <Book book= {book}
                          updateList= {this.props.updateList}/>
                        </li>
                      )})
                      //case3: User write an invalid query
                    :<li>
                      <h1>No book with this keyword :( </h1>
                      <div>
                        <h3>Try one of those keywords</h3>
                          'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
                          'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
                          'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
                          'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama',
                          'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance',
                          'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror',
                          'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
                          'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
                          'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
                          'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
                          'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                          'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                      </div>
                    </li>
                  )}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBook;
