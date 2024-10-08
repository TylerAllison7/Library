const books = [];

const process = (objects) => {
    console.log("Objects:" + objects);
    objects.forEach((book) => {
        books.push({
            title: `${book.docs[3].title}`,
            author: `${book.docs[3].author_name[0]}`
        });
        // let nextBook = `${book.docs[3].title}`;
        // allBooks += nextBook;
    });
    setupPage();
};

const setupPage = () => {
    let bookList = ``;
    books.forEach((book) => {
        let bookInfo = `<p class="book"> ${book.title}, by ${book.author} </p>`
        bookList += bookInfo;
    });
    $(".bookList").html(bookList);
};

const getBooks = () => {
    let book = $(".bookName").val();
    console.log(book);
    //I added the .replace code to make sure the format of my url is correct. My api uses the "+" symbol in place of spaces
    book = book.replace(/\s+/g, '+');
    console.log(book);
    $.ajax({
        type: "GET",
        url: "https://openlibrary.org/search.json?q=" + book,
        dataType: "json",
        success: function (result, status, xhr) {
            console.log(status);
            console.log(xhr);
            let allBooksAsMarkup = process(result);
            console.log(result);
            $(".bookList").html(allBooksAsMarkup);
        },
        error: function (xhr, status, error) {
            alert(
              "Result: " +
                status +
                " " +
                error +
                " " +
                xhr.status +
                " " +
                xhr.statusText
            );
        },
    });
};

const createBook = ()=> {
    let bookTitle = prompt("Please enter the title of the book you'd like to create: ");
    let bookAuthor = prompt("Please enter the author of " + bookTitle + ": ");

    books.push({
        title: bookTitle,
        author: bookAuthor
    });
    setupPage();

    let alert = `<p class="${bookTitle}">${bookTitle} has been added to the library list!</p>`;
    $(".recentUpdate").append(alert);
    $(`.${bookTitle}`)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1);
};

const readBook = () => {
    let bookTitle = prompt("Please enter the title of the book you'd like to find: ");
    let bookAuthor = prompt("Please enter the author of " + bookTitle + ": ");
    let bookInfo = ``;

    books.find((book) => {
        if (bookTitle == book.title) {
            bookInfo += `<p class="${bookTitle + bookAuthor}">HERE IS ${bookTitle} by ${bookAuthor}</p>`;
        }
    });
    $(".recentUpdate").append(bookInfo);
    $(`.${bookTitle + bookAuthor}`)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1);
};

const updateBook = () => {
    let bookTitle = prompt("Please enter the title of the book you'd like to update: ");
    let bookAuthor = prompt("Please enter the author of " + bookTitle + ": ");

    books.find((book) => {
        if (bookTitle == book.title && bookAuthor == book.author) {
            let newTitle = prompt("Enter the new title: ");
            book.title = newTitle;
            console.log(newTitle);

            let bookInfo = `<p class="${bookTitle}Update">${bookTitle} updated to ${newTitle}</p>`;
            $(".recentUpdate").append(bookInfo);
        }



    });
    
    setupPage();


};

const deleteBook = () => {
    let bookTitle = prompt("Please enter the title of the book you'd like to delete: ");
    let bookAuthor = prompt("Please enter the author of " + bookTitle + ": ");
    index = 0;
    for (let i = 0; i < books.length; i++) {
        if (books[index].name == bookTitle && books[index].author == bookAuthor){
            books.splice(index, 1);
        }
        index += 1;
    }

    console.log(books);
    
    setupPage();

    let bookInfo = `<p class="${bookTitle}Delete">${bookTitle} HAS BEEN DELETED</p>`;
    $(".recentUpdate").append(bookInfo);

    $(`.${bookTitle}Delete`)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1)
        .fadeTo(200, 0.2)
        .fadeTo(200, 1);

};
$(document).ready(setupPage);