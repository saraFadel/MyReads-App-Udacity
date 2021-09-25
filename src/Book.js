import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateList: PropTypes.func.isRequired,
  }

  state= {
        //If in ListBooks view, use shelf state depending on getAll API
        shelf: this.props.book.shelf,
  }

  // TODO: Change book's shelf
  handleChange= (newShelf) => {
    this.setState({shelf: newShelf}, () => {
      console.log(this.state.shelf);
      this.props.updateList(newShelf, this.props.book, this.state.shelf);
    });
  }

  render(){
    const {book} = this.props;

    return(
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,
              backgroundImage: `url(${book.imageLinks
                ?book.imageLinks.thumbnail
                :"http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"})` }}></div>
            <div className="book-shelf-changer">

              <select value= {book.shelf}
                 onChange= {(event) => this.handleChange(event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{
            //Check if there authors for the book
            book.authors
            //Join array elements & put comma(,) after everyone except the last
            ?book.authors.join(", ")
            :book.authors}</div>
        </div>
    )
  }
}

export default Book;
