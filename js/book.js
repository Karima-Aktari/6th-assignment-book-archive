const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const showData = document.getElementById('show-data');
const errorMessage = document.getElementById('error-message');
const displayLength = document.getElementById('length');

// Add click handler
searchButton.addEventListener('click', function () {
    loadData();
    searchInput.value = "";
    displayLength.innerText = "";

});

// Loading data
const loadData = () => {
    const searchText = searchInput.value;
    showData.innerHTML = "";
    errorMessage.innerText = "";
    if (searchText === "") {
        errorMessage.innerText = "Search Field Can't Be Empty.";
        return;
    }
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showGetData(data.docs))
}

// Showing data
const showGetData = (books) => {
    if (books.length === 0) {
        errorMessage.innerText = "NO Result Found";
        displayLength.innerText = `Length: ${books.length}`;
    } else {
        displayLength.innerText = `Length: ${books.length}`;
    }

    const booksData = (books.splice(0, 20));
    booksData.forEach((book) => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card mx-auto rounded-3 h-100 p-1">
                <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 p-4" alt="...">
                <div class="card-body overflow-hidden">
                    <h2 class="card-title text-success">Book: ${book.title}</h2>
                    <h3 class="text-secondary">Author: ${book.author_name ? book.author_name : "Not Available"}</h3>
                    <h4 class="text-secondary">Publisher: ${book.publisher ? book.publisher : "Not Available"}</h4>
                    <h4 class="text-secondary">First published: ${book.first_publish_year}</h4>
                </div>
            </div>`
        showData.appendChild(div);
    })
}
