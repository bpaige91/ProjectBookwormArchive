var log = document.getElementById("searchBar");
var responseHeader = document.getElementById("responseText");
var bookInfoDiv = document.getElementById("info-about-book");
const searchAPI = 'http://openlibrary.org/search.json?title=the+lord+of+the+rings'

// fetch function to retrieve data about a book from OpenLibrary API. Returns data as a multidimensional array, see docs for properties etc.
function getDetails(request) {
    var searchNumber = document.getElementById("searchBar").value;
    var searchString = 'http://openlibrary.org/api/books?bibkeys=ISBN:' + searchNumber + '&jscmd=data&format=json'
    var arrayIndex = 'ISBN:' + document.getElementById("searchBar").value;
    console.log(searchString);
    fetch(searchString)
      .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var dataArray = data[arrayIndex];
        // variable declaration and for loop to pull all authors names from the array
        var authorsList = "";
        for (let i = 0; i < dataArray.authors.length; i++) {
          var author = dataArray.authors[i].name;
          if(i == 0) authorsList += author;
          else authorsList += ", " + author;
        }
        // modifying the existing HTML with the information requested by the user
        bookInfoDiv.innerHTML = 
          "Title: " + dataArray.title +
          "<br> Author(s): " + authorsList +
          "<br> Publisher: " + dataArray.publishers[0].name +
          "<br> Publish Date: " + dataArray.publish_date +
          "<br> Number of Pages: " + dataArray.number_of_pages +
          "<br> OpenLibrary Link: <a href='" + dataArray.url + "'>" + dataArray.url + " </a>";
      });
  }

// fetch function to search a book by title instead of ISBN on OpenLibrary API
function bookSearch(request) {
  var searchString = document.getElementById("searchBar").value;
  var searchQuery = encodeURIComponent(searchString);
  var apiString = 'http://openlibrary.org/search.json?q=' + searchQuery + '&fields=*';
  console.log(apiString);

  fetch(searchAPI)
  .then(function (response) {
    console.log(response.status);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
}

//  event listener function for the search bar submit button
  $("#submit").on("click", function(event) {
    var searchInput = $("#searchBar").val();
    event.preventDefault();
    getDetails();
});

console.log(book);
storedBooks = JSON.parse(localStorage.getItem("books"));

if (storedBooka !== null) {
book = storedBooks[0].name;
window.onload = currentCall(books);
};
console.log(storedBooks);

function renderList() {
Object.values(storedBooks).forEach((value) => {
  const $cityLi = $("<li>", { "class": "list-group-item" });
  $bookLi.text(value.name);
  $(".list-group").prepend($bookLi);
  $("#refresh").hide();  
}
) 
}
if (storedBooks !== null) {
renderList();
}
      //make an array to save in local storage and appear in list
      const $bookLi = $("<li>", { "class": "list-group-item" });
// turns the saved book array into a string
      bookArray = JSON.parse(localStorage.getItem("books"));
      if (bookArray === null) {
          localStorage.setItem("books", JSON.stringify([bookObject]));
      }
