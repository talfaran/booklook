var fetch = function () {
    var isbnInput = $('#isbn').val();
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnInput,
      success: function(data) {
        appendBookInfo(data);
        console.log(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          $('.form-group').append('<p>' + textStatus +'</p>')
        console.log(textStatus);
      }
    }); 
  };

  var appendBookInfo = function(data){
      console.log(data);
    var source = $('#book-display').html();
    var template = Handlebars.compile(source);
    // data fetched from the JSON request about a specific book:
    var bookTitle = data.items[0].volumeInfo.title
  var bookAuthors = data.items[0].volumeInfo.authors
  var bookDescription = data.items[0].volumeInfo.description
  var bookImg = data.items[0].volumeInfo.imageLinks.thumbnail
  console.log("im here")
    // putting it all into an object for the Handlebar platfrom to recieve.
var currentBook = {
    bookAuthors: bookAuthors,
    bookImg: bookImg,
    bookTitle: bookTitle,
    bookDescription: bookDescription   
}
var newHTML = template(currentBook);
$('.form-group').append(newHTML);











    // append our new html to the page
    $('.menu').append(newHTML);
  }



$('.search-book').on('click', function(){
    fetch();
});