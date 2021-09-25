import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateList: PropTypes.func.isRequired,
    shelfsStatus: PropTypes.object
  }

  state= {
        //If in ListBooks view, use shelf state depending on getAll API
        shelf: this.props.book.shelf,
        //If in SearchBook view, use status state depending on update API
        status: 'none'
    }

  // TODO: Change book's shelf|status
  handleChange= (newShelf) => {
    this.setState({shelf: newShelf,
    status: newShelf}, () => {
      console.log(this.state.shelf);
      this.props.updateList(newShelf, this.props.book, this.state.shelf);
    });
  }

  // TODO: Keep the value of book select as the user had choosen

  /*componentDidUpdate () {

  console.log(this.props.shelfsStatus);
  console.log(this.props.shelfsStatus.currentlyReading);

    /*if(this.props.shelfsStatus.currentlyReading!== [] && this.props.shelfsStatus.currentlyReading
      .filter((bookID) => bookID === this.props.book.ID)){
        console.log(`Book id is ${this.props.book.ID}`)
        this.setState({status: 'currentlyReading'});
    }else if (this.props.shelfsStatus.wantToRead!== [] && this.props.shelfsStatus.wantToRead
      .filter((bookID) => bookID === this.props.book.ID)){
        this.setState({status: 'wantToRead'});
    }else if (this.props.shelfsStatus.read!== [] && this.props.shelfsStatus.read
      .filter((bookID) => bookID === this.props.book.ID)){
        this.setState({status: 'read'});
      }else{
        this.setState({status: 'none'});
      }
  }*/

  render(){
    const {book} = this.props;
    const {shelf, status} = this.state;

    return(
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,
              backgroundImage: `url(${book.imageLinks
                ?book.imageLinks.thumbnail
                :"http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"})` }}></div>
            <div className="book-shelf-changer">

              <select value= {
                book.shelf !== undefined
                //If in ListBooks view, use shelf state depending on getAll API
                ?shelf
                //If in SearchBook view, use status state depending on update API
                :status}
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
            //loop into authors array & put comma(,) after everyone except the last
            //?book.authors.map((a, index) => (index? ', ':'') + a)
            ?book.authors.join(", ")
            :book.authors}</div>
        </div>
    )
  }
}

export default Book;
