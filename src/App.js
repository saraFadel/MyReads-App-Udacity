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
      //Keep the result of update book's shelf
      shelfsStatus: {},
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
  updateList = (newShelf, book, shelf) => {
    if(book.shelf !== newShelf){
      BooksAPI.update(book, newShelf)
      .then((shelfsStatus) => {
        this.setState((currentState) => ({
          shelfsStatus: shelfsStatus,
          books: currentState.books.map((b) => {
            if(book.id === b.id){
              b.shelf= newShelf;
            }
            return b;
          })
        }))
        console.log(this.state.shelfsStatus);
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
            this.setState(() => ({
              searchedBooks: result
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
            updateList= {this.updateList}
            shelfsStatus= {this.state.shelfsStatus}/>
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
