# Project: Book Finder Full-Stack Application



## Background



When building a full-stack application, we're typically concerned with both a front end, that displays information to the user and takes in input, and a backend, that manages persisted information.



For this project, you will develop a book finder application that allows users to search for books by title, author, or ISBN. This project will use the Google Books API to fetch book data and display it interactively.



## Requirements



### 1: The user should be able to search for books.



Use the provided `searchBooks` function to allow the user to search for a book based on a title, isbn, or author. When this function is successfully implemented:



* The function should use its parameters to identify what value to search for and what type of search to perform.

* The function returns the books from the result of querying the Google Books API.

* The function’s returned data should be at most 10 books.

* Each book returned should include the following properties:

  * title

  * author_name

  * isbn

  * cover_i

  * ebook_access

  * first_publish_year

  * ratings_sortable



### 2: Our application should be able to display book search results.



Given an array of book objects, the `displayBookList` function should be used to dynamically create `<li>` elements representing books. When this function is successfully implemented:



* Each `<li>` element should be within the unordered list that has an id of `book-list`. 

* Each `<li>` element should present the following data visually on the webpage:

  * the book’s title within an element that has a class of `title-element`

  * the book’s author within an element that has a class of `author-element`

  * The book’s cover within an element that has a class of `cover-element`

  * The book’s rating within an element that has a class of `rating-element`

  * The book’s e-book access value within an element that has a class of `ebook-element`

  * Note: the order or how the information is displayed is up to the developer.



### 3: The application should handle the event of the user performing a book search.



The HTML should include a `<form>` element with an id of `search-form` that includes, at minimum, the following:



* A textbox for the user to enter the value they are searching for that has an id of `search-input`

* A select element with an id of `search-type` for the user to choose the type of search

  * The types should be title, isbn, or author

* A submit button with an id of `submit-button`



In the `script.js` file, there should be a corresponding `handleSearch` function that is triggered when a user submits the above form. This function should ensure the Google Books API is queried, meaning it should call the `searchBooks` function, and the application’s UI is updated accordingly, meaning it should call the `displayBookList` function.



### 4: The application should handle the event of the user clicking on a book returned from a  search result.



Once a user clicks on a book, there should be detailed book information displayed to the user about that specific book. This information should be contained in an HTML element of the developer’s choice, but it’s id must be `selected-book`. The following book data should be visually present within this element:



  * the book’s title

  * the book’s author 

  * The book’s first publish year

  * The book’s cover

  * The book’s ebook access value

  * The book’s rating

  * The book’s ISBN

  * Note: the order or how the information is displayed is up to the developer.



In the `script.js` file, there should be the `displaySingleBook` function that is triggered when a book is clicked on by the user. This function is successfully implemented when:



* The HTML unordered list element with an id of `book-list` is hidden

* The HTML element with an id of `selected-book` should be visible



### 5:  Our application’s search results should be sortable by rating.



In your HTML page, you should include a button element with an id of `sort-rating`. This element, when clicked after a book search is made, should trigger the `handleSort` function so that books are displayed by rating in descending order (highest to lowest).



*  If any rating is non-numeric, such as undefined or unknown, the book's rating must be changed to "0" instead.



### 6: Our application’s search results should be filterable by whether or not the results are available as ebooks.



In your HTML page, you should include a checkbox element with an id of `ebook-filter`. This element, when checked after a book search is made, should trigger the `handleFilter` function so that only the books in the list of search results that are borrowable as e-books should be displayed.



When it is unchecked, any book, whether it is borrowable as an e-book or not, should be displayed.



### 7: Semantic elements should be included in HTML for web accessibility.



Any three of the following semantic elements should be included within the HTML webpage:



  * `<article>`

  * `<aside>`

  * `<details>`

  * `<figcaption>`

  * `<figure>`

  * `<footer>`

  * `<header>`

  * `<main>`

  * `<nav>`

  * `<section>`



### 8: CSS styling should be used to create a responsive web application.



In the `styles.css` file, any one of the following should be used:



* CSS grid

* media queries

* CSS Flexbox



---



# Using the Google Books API



### Basic Query Example



A basic query is as follows:



`https://www.googleapis.com/books/v1/volumes?q=searchterm`



Where `q` is a query parameter that represents the key “query” and the associated value is the search term you want to use. 



Below is the data format returned from a query:

```bash

{

{

  "kind": "books#volumes",

  "totalItems": 1014,

  "items": []

}

}



``` 



`items` will contain any books returned.





For example, if I want to search for “Harry Potter”, I can use the following URL:



`https://www.googleapis.com/books/v1/volumes?q=harry%20potter`



Note that the characters %20 represent a space.



The data returned is as follows:

```bash

{

  "kind": "books#volumes",

  "totalItems": 1014,

  "items": [

    {

      "kind": "books#volume",

      "id": "5iTebBW-w7QC",

      "etag": "ysd6Wvcn7NQ",

      "selfLink": "https://www.googleapis.com/books/v1/volumes/5iTebBW-w7QC",

      "volumeInfo": {

      "title": "Harry Potter and the Chamber of Secrets",

      "authors": [],

      "publisher": "Pottermore Publishing",

      "publishedDate": "2015-12-08",

      "description": "'There is a plot, Harry Potter. A plot to make most terrible things happen at Hogwarts School of Witchcraft and Wizardry this year.' Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true. Having become classics of our time, the Harry Potter eBooks never fail to bring comfort and escapism. With their message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",

      "industryIdentifiers": [],

      "readingModes": {},

      "pageCount": 344,

      "printType": "BOOK",

      "categories": [],

      "averageRating": 4.5,

      "ratingsCount": 116,

      "maturityRating": "NOT_MATURE",

      "allowAnonLogging": true,

      "contentVersion": "3.27.24.0.preview.3",

      "panelizationSummary": {},

      "imageLinks": {},

      "language": "en",

      "previewLink": "http://books.google.com/books?id=5iTebBW-w7QC&printsec=frontcover&dq=harry+potter&hl=&cd=1&source=gbs_api",

      "infoLink": "https://play.google.com/store/books/details?id=5iTebBW-w7QC&source=gbs_api",

      "canonicalVolumeLink": "https://play.google.com/store/books/details?id=5iTebBW-w7QC"

      },

      "saleInfo": {},

      "accessInfo": {},

      "searchInfo": {}

    },

    // ... other books omitted

  ]

}

```



### Searching By Title, Author, or ISBN

In order to search by an author, you can use the following syntax:

```

https://www.googleapis.com/books/v1/volumes?q=key:value

```

Where key would be either `intitle`, `inauthor`, or `isbn`, and the `value` would be your search term. Examples are:



```

https://www.googleapis.com/books/v1/volumes?q=intitle:harry%20potter

https://www.googleapis.com/books/v1/volumes?q=isbn:1781100500

https://www.googleapis.com/books/v1/volumes?q=inauthor:Peter%20Loewer

```



### Limiting Search Results



In order to limit our search results, we can use the “&” character followed by the key-value pair `maxResults=x` where x is a number representing the limit. Below is an example:



```bash

https://www.googleapis.com/books/v1/volumes?q=harry%20potter&maxResults=5

```



Good luck!
