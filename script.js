var responseHeader = document.getElementById("responseText");
var bookInfoDiv = document.getElementById("book-info-div");
var bookList = [];
var titleList =[];

//Local storage to save previously searched books
function storeBooks() {
  localStorage.setItem("titles", JSON.stringify(titleList));
}

function loadHistory() {
  var storedTitles = JSON.parse(localStorage.getItem("titles"));

  if (storedTitles !== null) {
      titleList = storedTitles;
  }

  // adds last searched book to list-group as button for user to select book
function createSearchHistory(){
  $(".titleList").empty();
  titleList.forEach(function(book) {
      $(".titleList").prepend($(`<p data-book="${book}">${book}</p>`));
  })
}
  createSearchHistory();
}

// load search history when the page is accessed
loadHistory();

// fetch function to retrieve data about a book from OpenLibrary API. Returns data as a multidimensional array, see docs for properties etc.
function getDetails(request) {

  var searchNumber = document.getElementById("searchBar").value;
  var searchString = 'http://openlibrary.org/api/books?bibkeys=ISBN:' + searchNumber + '&jscmd=data&format=json'
  var arrayIndex = 'ISBN:' + document.getElementById("searchBar").value;
  var bookInfoText = document.getElementById("book-info-text");
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
      bookInfoText.innerHTML =
      '<br> <h1 class="title is-3">Info about books</h1>' +
      "<br> Title: " + dataArray.title +
      "<br> Author(s): " + authorsList +
      "<br> Publisher: " + dataArray.publishers[0].name +
      "<br> Publish Date: " + dataArray.publish_date +
      "<br> Number of Pages: " + dataArray.number_of_pages +
      "<br> OpenLibrary Link: <a href='" + dataArray.url + "'>" + dataArray.url + " </a>";

      // adding the search info to the array used by localstorage
      var storageInfo = dataArray.title + ", ISBN: " + document.getElementById("searchBar").value
      titleList.push(storageInfo);
      console.log(titleList);
      storeBooks();
    });
    // fetch function using googleAPI to get picture and preview text
  var googleSearchString = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + searchNumber;
  fetch(googleSearchString)
  .then(function (response) {
    console.log(response.status);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // adding a 'p' element with summary text, and an 'img' element with a thumbnail picture
    var desc = document.createElement("p");
    var descText = data.items[0].volumeInfo.description.split(".")
    desc.innerHTML = "<br>" + descText[0] + ".";
    bookInfoDiv.append(desc);
    var coverImg = document.createElement("img")
    var coverImgLink = data.items[0].volumeInfo.imageLinks.thumbnail
    coverImg.setAttribute("src", coverImgLink);
    coverImg.setAttribute("alt","Book cover Thumbnail");
    coverImg.setAttribute("id","cover-image")
    bookInfoDiv.prepend(coverImg);
  });
  getReview();
}

// function to search for a review from the NYTimes
function getReview (request) {
  let searchNumber = document.getElementById("searchBar").value;
  let url = "https://api.nytimes.com/svc/books/v3/reviews.json?isbn="+searchNumber+"&api-key=2pNGPGjw90mnBUF0kNd6zkEjG7aEY2bq";
  let bookReview = document.getElementById("reviews");
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.num_results);

    if (data.num_results == 0){
      console.log("work");
      let a = document.createElement("a");        
      a.innerHTML = "No NYT Review Found";
      bookReview.appendChild(a);
    } else{
      data.results.map(review => {
      console.log(review.url);

      let a = document.createElement("a");
      a.setAttribute('href', review.url);        
      a.innerHTML = review.url;
      bookReview.appendChild(a);
        
    
    })

    }
  })
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
  event.preventDefault();
  bookInfoDiv.innerHTML = '<p id="book-info-text"></p>'
  getDetails();
  loadHistory();
});

