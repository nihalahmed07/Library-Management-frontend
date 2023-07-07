var booksData = []; 
var cartItems = []; 


function logout() {

    window.location.href = 'index.html';
}

function searchBooks() {
  var searchQuery = document.getElementById('searchInput').value;

  fetch('https://www.googleapis.com/books/v1/volumes?q=' + searchQuery)
    .then(response => response.json())
    .then(data => {
      booksData = data.items;
      displayResults(booksData);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function searchWithGoogle() {
  var searchQuery = document.getElementById('searchInput').value;
  var filterValue = document.getElementById('filterInput').value;
  var googleSearchQuery = searchQuery;

  if (filterValue) {
    googleSearchQuery += ' ' + filterValue;
  }

  var googleSearchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(googleSearchQuery);
  window.open(googleSearchUrl, '_blank');
}

function searchWithYouTube() {
  var searchQuery = document.getElementById('searchInput').value;
  var filterValue = document.getElementById('filterInput').value;
  var youtubeSearchQuery = searchQuery;

  if (filterValue) {
    youtubeSearchQuery += ' ' + filterValue;
  }

  var youtubeSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(youtubeSearchQuery);
  window.open(youtubeSearchUrl, '_blank');
}

function sortBooks() {
  var sortValue = document.getElementById('sortSelect').value;

  if (sortValue === 'newest') {
    booksData.sort((a, b) => new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate));
  } else if (sortValue === 'oldest') {
    booksData.sort((a, b) => new Date(a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate));
  }

  displayResults(booksData);
}

function filterBooks() {
  var filterValue = document.getElementById('filterInput').value;
  var filterSelect = document.getElementById('filterSelect').value;

  var filteredBooks = [];

  if (filterSelect === 'all') {
    filteredBooks = booksData;
  } else if (filterSelect === 'year') {
    filteredBooks = booksData.filter(book => book.volumeInfo.publishedDate && book.volumeInfo.publishedDate.includes(filterValue));
  } else if (filterSelect === 'genre') {
    filteredBooks = booksData.filter(book => book.volumeInfo.categories && book.volumeInfo.categories.includes(filterValue));
  } else if (filterSelect === 'author') {
    filteredBooks = booksData.filter(book => book.volumeInfo.authors && book.volumeInfo.authors.some(author => author.toLowerCase().includes(filterValue.toLowerCase())));
  }

  displayResults(filteredBooks);
}

function displayResults(books) {
  var countContainer = document.getElementById('count');
  var resultsContainer = document.getElementById('results');
  countContainer.textContent = 'Total Books: ' + books.length;
  resultsContainer.innerHTML = '';

  books.forEach(book => {
    var title = book.volumeInfo.title;
    var author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author';
    var publishedYear = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'Unknown Year';
    var genre = book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Unknown Genre';
    var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
    var availability = book.volumeInfo.industryIdentifiers ? 'Available' : 'Not Available';
    var copies = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.length : 0;

    var bookElement = document.createElement('div');
    bookElement.classList.add('book');

    var imageElement = document.createElement('img');
    imageElement.src = thumbnail;

    var titleElement = document.createElement('h2');
    titleElement.textContent = title;

    var authorElement = document.createElement('p');
    authorElement.textContent = 'Author: ' + author;

    var yearElement = document.createElement('p');
    yearElement.textContent = 'Year: ' + publishedYear;

    var genreElement = document.createElement('p');
    genreElement.textContent = 'Genre: ' + genre;

    var availabilityElement = document.createElement('p');
    availabilityElement.textContent = 'Availability: ' + availability;

    var copiesElement = document.createElement('p');
    copiesElement.textContent = 'Number of Copies: ' + copies;

    var addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    addToCartButton.addEventListener('click', function() {
      addToCart(book);
    });

    var removeFromCartButton = document.createElement('button');
    removeFromCartButton.innerHTML = '<i class="fas fa-cart-arrow-down"></i> Remove from Cart';
    removeFromCartButton.addEventListener('click', function() {
      removeFromCart(book);
    });
    var cartButtonContainer = document.createElement('div');
    cartButtonContainer.appendChild(addToCartButton);
    cartButtonContainer.appendChild(removeFromCartButton);
    bookElement.appendChild(imageElement);
    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(yearElement);
    bookElement.appendChild(genreElement);
    bookElement.appendChild(availabilityElement);
    bookElement.appendChild(copiesElement);
    bookElement.appendChild(cartButtonContainer);

    resultsContainer.appendChild(bookElement);
  });
}

function addToCart(book) {
  var bookId = book.id;
  if (cartItems.some(item => item.id === bookId)) {
    alert('This book is already in the cart!');
    return;
  }
  if (!book.volumeInfo.industryIdentifiers) {
    alert('This book is not available!');
    return;
  }
  book.volumeInfo.industryIdentifiers.pop();
  cartItems.push({
    id: bookId,
    book: book
  });
  displayResults(booksData);
  updateCartUI();
}

function removeFromCart(book) {
  var bookId = book.id;
  var bookIndex = cartItems.findIndex(item => item.id === bookId);
  if (bookIndex === -1) {
    alert('This book is not in the cart!');
    return;
  }
  book.volumeInfo.industryIdentifiers.push('');
  cartItems.splice(bookIndex, 1);
  displayResults(booksData);
  updateCartUI();
}

function updateCartUI() {
  var cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  cartItems.forEach(cartItem => {
    var book = cartItem.book;
    var title = book.volumeInfo.title;
    var author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author';
    var cartItemElement = document.createElement('li');
    cartItemElement.textContent = title + ' by ' + author;
    cartItemsContainer.appendChild(cartItemElement);
  });
}

function checkout() {
  if (cartItems.length === 0) {
    alert('The cart is empty!');
    return;
  }
  cartItems = [];
  displayResults(booksData);
  updateCartUI();
  window.location.href = 'success.html';
}

function goToHome() {
  window.location.href = 'index.html';
}