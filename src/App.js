import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import {Route} from 'react-router-dom';

class BooksApp extends Component {
  constructor(props){
    super(props);
    this.state= {
      books: [],
      //Keep the result of query's search
      searchedBooks: [],
    };
  }
  //TODO: Call the getAll API once the app is opened
  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    }).catch(error => alert(error));
  }

  //TODO: Update books select value depending in user chosen(state)
  updateList = (newShelf, book) => {
    if(book.shelf !== newShelf){
      BooksAPI.update(book, newShelf)
      .then(() => {
        this.setState((currentState) => ({
          books: currentState.books.map((b) => {
            if(book.id === b.id){
              b.shelf= newShelf;
            }
            return b;
          })
        }))
        //console.log(this.state.shelfsStatus);
        BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
        }).catch(error => alert(error));
    }).catch(error => alert(error));
    }else{
      console.log('Nothing');
    }
  }

  //TODO: Use search API to get relevant books
  searchBooks = (query) => {
    //Make search request only if query isn't empty
    if(query !== ''){
      BooksAPI.search(query)
      .then((result) => {
        //Handle 'not found' error
        if(result){
          if(result.error === "empty query"){
            this.setState({searchedBooks: []})
          }else{
            this.setState((currentState) => ({
              //Loop over the result to update book's select value
              searchedBooks: result.map((bookSearch) => {

                let shelfCheck = currentState.books.filter((bookList) =>
                bookList.id === bookSearch.id);

                bookSearch.shelf= shelfCheck[0]? shelfCheck[0].shelf :'none';

                return bookSearch;
            })
          }))
          }
        }
      });
    }
  }

  render() {
    //Handle if the API is broken or no internet
    if(this.state.books){
      return (

        <div className="app">
          {/*TODO: Route :)*/}
          <Route exact path= '/' render= {() => (
            <ListBooks
            books= {this.state.books}
            updateList= {this.updateList}/>
          )}/>

          <Route path= '/search' render= {() => (
            <SearchBook
            searchedBooks= {this.state.searchedBooks}
            searchBooks= {this.searchBooks}
            updateList= {this.updateList}/>
          )}/>
        </div>
      )
    }else{
      console.log('No data');
      return (
        <div className="app">
          <div>No data </div>
        </div>
      )
    }
  }
}

export default BooksApp
