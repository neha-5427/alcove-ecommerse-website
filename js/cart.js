const cartButtons = document.getElementsByClassName("add-to-cart-button");

let cartArr;

if (localStorage.cart) {
  cartArr = JSON.parse(localStorage.cart);
} else {
  cartArr = [];
}

for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", buyBook);
}

function buyBook() {
  const book = {
    id: this.dataset.id,
    name: this.dataset.name,
    img: this.dataset.img,
  };

  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i].id === book.id) {
      cartArr.splice(i, 1);
      localStorage.cart = JSON.stringify(cartArr);
    }
  }

  cartArr.push(book);

  localStorage.cart = JSON.stringify(cartArr);
}
