/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  /*[DONE]Prepare a reference to the template and the .books-list*/
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      filter: '.filters',
      booksPanel: '.books-panel',
      booksList: '.books-list',
    },
    /*[DONE]Prepare a reference*/
    product: {
      header: '.book__header',
      name: '.book__name',
      price: '.product__base-price',
      imageWrapper: 'book__image',
      bookRatingWrapper: '.book__rating',
      bookRating: '.book__rating__fill',
    },
  };

  const classNames = {
    favorite: 'favorite',
    hidden: 'hidden',
  };
  /*[DONE]Compile the template and assign it to a variable*/
  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
    /*[DONE]Add a new initData function*/
    initData(){
      const thisBooksList = this;  
      this.data = dataSource.books;
      /*[DONE]add empty array*/
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }
    /*[DONE]Add a new getElements function*/
    getElements(){
      const thisBooksList = this;    
      thisBooksList.dom = {};
      /*[DONE]DOM element references*/
      thisBooksList.dom.booksList = document.querySelector(select.containerOf.booksList);
      thisBooksList.dom.filters = document.querySelector(select.containerOf.filter);
    }
    /*[DONE]Add a new render function*/
    render(){
      const thisBooksList = this;
      /*[START LOOP:][DONE]Iterate through all elements of dataSource*/
      for(let bookData in this.data){
        const bookObject = this.data[bookData];
        const ratingBgc = thisBooksList.determineRatingBgc(bookObject.rating);
        bookObject.ratingBgc = ratingBgc;
        const ratingWidth = bookObject.rating * 10;
        bookObject.ratingWidth = ratingWidth;
        /*[DONE]Generating HTML code based on the template*/
        const generatedHTML = templates.booksList(bookObject);
        /*[DONE]Generating an DOM element from HTML*/
        const domElement = utils.createDOMFromHTML(generatedHTML);
        /*[DONE]Add created element to booksList container*/  
        const bookListContainer = thisBooksList.dom.booksList;
        /*[DONE]Append the generated DOM element as a new DOM child to the .books-list*/ 
        bookListContainer.appendChild(domElement);
      } /*[END LOOP][DONE]Iterate through all elements of dataSource*/ 
    }
    /*[DONE]Add a new filterBooks function*/
    filterBooks(){
      const thisBooksList = this;
      /*[START LOOP:][DONE]Iterate through all elements of dataSource*/
      for(let book of this.data){
        const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        /*[DONE]Create a variable shouldBeHidden that defaults to false*/
        let shouldBeHidden = false;
        /*[START LOOP:][DONE]Iterate through filters array*/
        for(let filter of thisBooksList.filters){
              
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        /*[DONE]Check the value of shouldBeHidden and add or remove class*/
        if(!shouldBeHidden){
          filteredBook.classList.remove(classNames.hidden);
        } else {
          filteredBook.classList.add(classNames.hidden);
        }    
      }
    }

    /*[DONE]Add a new initActions function*/
    initActions(){
      const thisBooksList = this;
      /*[DONE]Add addEventListener*/
      thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
        /*[DONE]prevent default action for this event*/
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        /*[DONE]Get data-id*/
        const bookId = clickedElement.getAttribute('data-id');
        /*[DONE]Add class favorite for this book*/
        if(!thisBooksList.favoriteBooks.includes(bookId)){
          clickedElement.classList.add(classNames.favorite);
          thisBooksList.favoriteBooks.push(bookId);
          /*[DONE]Remove class favorite for this book*/
        } else if(thisBooksList.favoriteBooks.includes(bookId)) {
          clickedElement.classList.remove(classNames.favorite);                   
          thisBooksList.favoriteBooks = thisBooksList.favoriteBooks.filter(x => x !== bookId);   
        }                
      }); 
      /*[DONE]Add addEventListener*/
      thisBooksList.dom.filters.addEventListener('click', function(event){
        const target = event.target;   
        const formName = target.getAttribute('name');
        const formType = target.getAttribute('type');
        const formValue = target.getAttribute('value');
        if(formName == 'filter' || formType == 'checkbox'){ 
          const filterIndex = thisBooksList.filters.indexOf(formValue);
          if(target.checked){
            thisBooksList.filters.push(formValue);
          } else {
            thisBooksList.filters.splice(filterIndex, 1);
          }
          thisBooksList.filterBooks();
        }
      });
    }

    determineRatingBgc(rating){          
      let ratingGradient = '';
      if(rating < 6){
        ratingGradient = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        ratingGradient = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        ratingGradient = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        ratingGradient = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingGradient;
    }
  }
  
  new BooksList();

}