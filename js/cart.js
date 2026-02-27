//adding to cart
const cartButtons = document.getElementsByClassName("add-to-cart-button");
const removeButtons = document.getElementsByClassName("remove-button");

let cartArr;

if (localStorage.cart) {
  cartArr = JSON.parse(localStorage.cart);
} else {
  cartArr = [];
}

for (let i = 0; i < cartButtons.length; i++) {
  for (let j = 0; j < cartArr.length; j++) {
    if (cartButtons[i].dataset.id === cartArr[j].id) {
      cartButtons[i].style.display = "none";
      removeButtons[i].style.display = "inline-block";
    }
  }
}

for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", buyBook);
}

function buyBook() {
  const book = {
    id: this.dataset.id,
    name: this.dataset.name,
    img: this.dataset.img,
    author: this.dataset.author,
    price: this.dataset.price,
  };

  // prevent multiple copies of the same book (not possible since it is second hand bookstore)
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i].id === book.id) {
      cartArr.splice(i, 1);
      localStorage.cart = JSON.stringify(cartArr);
    }
  }

  cartArr.push(book);

  localStorage.cart = JSON.stringify(cartArr);

  // hide this button
  this.style.display = "none";

  // access and show remove button
  const removeButtons = document.getElementsByClassName("remove-button");
  for (let i = 0; i < removeButtons.length; i++) {
    if (removeButtons[i].dataset.id === book.id) {
      removeButtons[i].style.display = "inline-block";
    }
  }
}

// remove from cart

for (let i = 0; i < removeButtons.length; i++) {
  removeButtons[i].addEventListener("click", removeBook);
}

function removeBook() {
  const id = this.dataset.id;

  // remove from array
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i].id === id) {
      cartArr.splice(i, 1);
      break;
    }
  }

  localStorage.cart = JSON.stringify(cartArr);

  // hide this button
  this.style.display = "none";

  //access and show add to cart button
  const cartButtons = document.getElementsByClassName("add-to-cart-button");
  for (let i = 0; i < cartButtons.length; i++) {
    if (cartButtons[i].dataset.id === id) {
      cartButtons[i].style.display = "inline-block";
    }
  }
}
