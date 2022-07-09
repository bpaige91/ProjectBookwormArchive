const libraryAPI = 'http://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&jscmd=data&format=json'
var log = document.getElementById("searchBar");
var responseHeader = document.getElementById("responseText");
var bookInfoDiv = document.getElementById("info-about-book");

// fetch function to retrieve data about a book from OpenLibrary API. Returns data as a multidimensional array, see docs for properties etc.
function getApi(request) {
    var searchString = 'http://openlibrary.org/api/books?bibkeys=ISBN:' + document.getElementById("searchBar").value + '&jscmd=data'
    console.log(searchString);
    fetch(libraryAPI)
      .then(function (response) {
        // Check the console first to see the response.status
        console.log(response.status);
        // return API data as a json object
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data["ISBN:0201558025"].cover.large);
        console.log(data["ISBN:0201558025"].cover.medium);
        console.log(data["ISBN:0201558025"].cover.small);
        var dataArray = data["ISBN:0201558025"];
        bookInfoDiv.innerHTML = 
          "Author(s): " + dataArray.by_statement +
          "<br> Publisher: " + dataArray.publishers[0].name +
          "<br> Publish Date: " + dataArray.publish_date;
      });
  }

///  event listener function for the search bar submit button
  $("#submit").on("click", function(event) {
    var searchInput = $("#searchBar").val();
    event.preventDefault();
    getApi();
});

//Local storage to save previously searched books
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