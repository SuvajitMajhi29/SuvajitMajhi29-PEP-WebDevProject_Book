// // add variable references and event listeners here!

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const bookList = document.getElementById('book-list');
const selectedBook = document.getElementById('selected-book');
const sortRatingButton = document.getElementById('sort-rating');
const ebookFilterCheckbox = document.getElementById('ebook-filter');

let currentBooks = [];

// Event listeners
searchForm.addEventListener('submit', handleSearch);
sortRatingButton.addEventListener('click', handleSort);
ebookFilterCheckbox.addEventListener('change', handleFilter);

// /**
//  * Searches for books using the Google Books API based on the given query and type.
//  *
//  * @async
//  * @param {string} query - The search term (title, ISBN, or author name).
//  * @param {string} type - The type of search to perform (e.g., 'title', 'isbn', 'author').
//  * @returns {Promise<Array>} A promise that resolves to an array of book objects.
//  *
//  * @description
//  * This function allows users to search for books using the Google Books API.
//  * It performs the following actions:
//  * 1. Uses the query and type parameters to construct the API request. Make sure to include a query parameter to limit the results to a maximum of 10 books.
//  * 2. Fetches data from the Google Books API.
//  * 3. Processes the API response to extract relevant book information.
//  * 4. Returns an array of book objects with the following properties:
//  *    - title: The book's title
//  *    - author_name: The name of the author(s)
//  *    - isbn: The book's ISBN
//  *    - cover_i: Cover image
//  *    - ebook_access: Information about ebook availability
//  *    - first_publish_year: Year of first publication
//  *    - ratings_sortable: Book ratings information
//  * 
//  * Hint: Regarding steps 3 and 4, consider using the Array object's map() method and assign the above properties as keys. Extract the correct values from the JSON using dot notation. Print your results often for debugging!
//  * 
//  */
async function searchBooks(query, type) {
    const searchTypeMap = {
        title: `intitle:${query}`,
        author: `inauthor:${query}`,
        isbn: `isbn:${query}`
    };

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTypeMap[type]}&maxResults=10`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items) return []; 

        return data.items.map(item => {
            const info = item.volumeInfo;
            return {
                title: info.title || 'Unknown Title',
                author_name: info.authors ? info.authors.join(', ') : 'Unknown Author',
                isbn: info.industryIdentifiers ? info.industryIdentifiers[0].identifier : 'N/A',
                cover_i: info.imageLinks ? info.imageLinks.thumbnail : '',
                ebook_access: item.accessInfo && item.accessInfo.epub && item.accessInfo.epub.isAvailable ? 'Available' : 'Not Available',
                first_publish_year: info.publishedDate ? info.publishedDate.split('-')[0] : 'Unknown Year',
                ratings_sortable: info.averageRating || '0'
            };
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// /**
// * Takes in a list of books and updates the UI accordingly.
// *
// * @param {Array} books - An array of book objects to be displayed.
// *
// * @description
// * This function takes an array of book objects and creates a visual representation
// * of each book as a list item (<li>) within an unordered list (<ul>). 
// * It performs the following actions:
// * 
// * 1. Targets the unordered list with the id 'book-list'.
// * 2. Clears the inner HTML of the list.
// * 3. For each book in the 'books' array, creates an <li> element containing:
// *    - The book's title within an element that has a class of `title-element`
// *    - The book's author within an element that has a class of `author-element`
// *    - The book's cover image within an element that has a class of `cover-element`
// *    - The book’s rating within an element that has a class of `rating-element`
// *    - The book’s e-book access value within an element that has a class of `ebook-element`
// *    Note: The order and specific layout of this information is flexible 
// *    and determined by the developer.
// * 4. Appends each created <li> element to the 'book-list' <ul>.
// * 5. Ensures that the 'selected-book' element is not visible.
// */
function displayBookList(books) {
    bookList.innerHTML = ''; 
    selectedBook.style.display = 'none';
    bookList.style.display = 'grid'; 

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'book-item';

        li.innerHTML = `
            <img src="${book.cover_i}" alt="Book Cover" class="cover-element">
            <div class="book-info">
                <h2 class="title-element">${book.title}</h2>
                <p class="author-element">Author: ${book.author_name}</p>
                <p class="rating-element">Rating: ${book.ratings_sortable}</p>
                <p class="ebook-element">eBook Access: ${book.ebook_access}</p>
            </div>
        `;

        li.addEventListener('click', () => displaySingleBook(book)); 
        bookList.appendChild(li);
    });
    currentBooks = books;
  
}

// /**
//  * Handles the search form submission and updates the UI with search results.
//  * 
//  * @async
//  * @param {Event} event - The form submission event.
//  * 
//  * @description
//  * This function is triggered when the user submits the search form with id 'search-form'.
//  *
//  * It performs the following actions:
//  * 1. Prevents the default form submission behavior.
//  * 2. Retrieves the search query from the textbox input.
//  * 3. Gets the selected search type (title, ISBN, or author) from the 'search-type' select element.
//  * 4. Calls the searchBooks() function with the query and search type.
//  * 5. Waits for the searchBooks() function to return results from the Google Books API.
//  * 6. Passes the returned book data to the displayBookList() function to update the UI.
//  * 7. Handles any errors that may occur during the search process.
//  */
 async function handleSearch(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    const type = searchType.value;
    if (!query) return;
    const books = await searchBooks(query, type);
    displayBookList(books);

 }


// /**
//  * Displays detailed information about a single book when it's clicked.
//  * 
//  * @param {Object} book - The book object containing detailed information.
//  * 
//  * @description
//  * This function is triggered when a user clicks on a book in the list.
//  * It updates the UI to show detailed information about the selected book.
//  * 
//  * The function performs the following actions:
//  * 1. Hides the unordered list element with id 'book-list'.
//  * 2. Makes the element with id 'selected-book' visible.
//  * 3. Populates the 'selected-book' element with the following book details:
//  *    - Title
//  *    - Author
//  *    - First publish year
//  *    - Cover image
//  *    - ISBN
//  *    - Ebook access value
//  *    - Rating
//  * 
//  * Note: The order and specific layout of the book information within the
//  * 'selected-book' element is flexible and determined by the developer.
//  * 
//  */
function displaySingleBook(book) {
    bookList.style.display = 'none';
    selectedBook.style.display = 'block';

    selectedBook.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author_name}</p>
        <p><strong>First Published:</strong> ${book.first_publish_year}</p>
        <img src="${book.cover_i}" alt="Book Cover" class="cover-element">
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>eBook Access:</strong> ${book.ebook_access}</p>
        <p><strong>Rating:</strong> ${book.ratings_sortable}</p>
    `;

}

// /**
//  * Filters the displayed book list to show only e-books when the checkbox is checked.
//  * 
//  * @description
//  * This function ensures that when the checkbox with id 'ebook-filter' is checked, the related search results only display books that are available as e-books.
//  * 
//  * The function performs the following actions:
//  * 1. Checks the state of the 'ebook-filter' checkbox.
//  * 2. If checked:
//  *    - Filters the current list of books to include only those that are borrowable as e-books.
//  *    - Updates the displayed book list with the filtered results.
//  * 3. If unchecked:
//  *    - Displays the full list of search results without filtering.
//  * 
//  */
function handleFilter() {
    const onlyEbooks = ebookFilterCheckbox.checked;
    const filteredBooks = onlyEbooks ? currentBooks.filter(book => book.ebook_access === 'Available') : currentBooks;
    displayBookList(filteredBooks);

}

// /**
//  * Sorts the displayed book list by rating in descending order when the button is clicked.
//  * 
//  * 
//  * @description
//  * This function is triggered when the user clicks on the button with the id 'sort-rating'.
//  * It sorts the currently displayed list of books based on their ratings.
//  * 
//  * The function performs the following actions:
//  * 1. Sorts the current list of books by their ratings in descending order (highest to lowest).
//  * 2. If any rating is non-numeric, such as "undefined" or "unknown", the book's rating must be changed to "0" instead.
//  * 3. Updates the displayed book list with the sorted results.
//  * 
//  */
 function handleSort() {
    const sortedBooks = [...currentBooks].sort((a, b) => {
        const ratingA = parseFloat(a.ratings_sortable) || 0;
        const ratingB = parseFloat(b.ratings_sortable) || 0;
        return ratingB - ratingA;
    });
    displayBookList(sortedBooks);

 }




