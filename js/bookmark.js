// 1. access all bookmark icons by class name

const bookmarkIcons = document.getElementsByClassName("bookmark-icon");

// 2. define array to store

let bookmarkArr;

// 3. to ensure that saved books can be retrived

if (localStorage.bookmarks) {
  bookmarkArr = JSON.parse(localStorage.bookmarks);
} else {
  bookmarkArr = [];
  // if there are none bookmarked, then the array starts as empty
}

// 4. when clicked change the src to bookmark_filled for all of the bookmark icons (loop)

for (let i = 0; i < bookmarkIcons.length; i++) {
  for (let j = 0; j < bookmarkArr.length; j++) {
    if (bookmarkIcons[i].dataset.id === bookmarkArr[j].id) {
      bookmarkIcons[i].src = "img/icons/bookmark_filled.svg";
    }
  }
}

// 5. add event listeners to each icon (loop)

for (let i = 0; i < bookmarkIcons.length; i++) {
  bookmarkIcons[i].addEventListener("click", saveBook);
}

// define function

function saveBook() {
  const bookmark = {
    id: this.dataset.id,
    name: this.dataset.name,
    img: this.dataset.img,
  };

  //prevent multiple bookmarking the same book for all icons (loop)
  for (let i = 0; i < bookmarkArr.length; i++) {
    if (bookmarkArr[i].id === bookmark.id) {
      bookmarkArr.splice(i, 1);
      this.src = "img/icons/bookmark_outline.svg";
      localStorage.bookmarks = JSON.stringify(bookmarkArr);
      return; // return the value to prevent adding
    }
  }

  // otherwise add it
  this.src = "img/icons/bookmark_filled.svg";
  bookmarkArr.push(bookmark);

  localStorage.bookmarks = JSON.stringify(bookmarkArr);
}
