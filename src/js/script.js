{
  'use strict';
  /*[DONE]Prepare a reference to the template and the .books-list*/
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list'
    },
  };
  class MyBooks {
    constructor(){
      this.render();
    }
    /*[DONE]Add a new render function*/
    render(){
      /*[START LOOP:][DONE]Iterate through all elements of dataSource*/
      for(let book of dataSource.books) {      
        const thisBook = this;
        /*[DONE]Compile the template and assign it to a variable*/
        const templates = {
          menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
        };
        //console.log('templates', templates);
        /*[DONE]Generating HTML code based on the template*/
        const generatedHTML = templates.menuProduct(book);
        /*[DONE]Generating an DOM element from HTML*/
        thisBook.book = utils.createDOMFromHTML(generatedHTML);
        /*[DONE]Search for list items*/
        const bookShelf = document.querySelector(select.containerOf.bookList);
        //console.log('bookShelf:', bookShelf);
        /*[DONE]Append the generated DOM element as a new DOM child to the .books-list*/
        bookShelf.appendChild(thisBook.book);
        //console.log('book:', book);
      } /*[END LOOP][DONE]*/   
    }

  
  
  }
  new MyBooks();
}