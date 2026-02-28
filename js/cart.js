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
  // the use of .closest is adapted from ChatGPT: https://chatgpt.com/share/69a2d97c-de04-8013-a5f5-1f3f6e3432e0
  const cartItem = this.closest(".cart-item");
  if (cartItem) {
    cartItem.remove();
  }
}

// displaying cart
//the following use of innerHTML was adapted from ChatGPT: https://chatgpt.com/share/69a171a1-6700-8013-a593-688bb50f12e7

const cartGrid = document.querySelector(".cart-grid");

for (let i = 0; i < cartArr.length; i++) {
  const item = document.createElement("div");
  item.classList.add("cart-item");

  item.innerHTML = `
  <div class="catalogue-item">
    <div class="book-flexbox">
      <a href="#">
      <img 
        class="book-img"
        data-id="${cartArr[i].id}"
        data-name="${cartArr[i].name}"
        data-img="${cartArr[i].img}"
        data-price= "${cartArr[i].price}"
        data-author= "${cartArr[i].author}"
        src="${cartArr[i].img}">
      </a>
      <div class="book-details-flexbox">
          <a href="#">
           <h5 class="book-name">${cartArr[i].name}</h5>
           <p>${cartArr[i].author}</p>
           <p>${cartArr[i].price}</p>
         </a>

        <div class= "action-flexbox">
          <button
            class="remove-button"
            data-id="${cartArr[i].id}"
            data-name="${cartArr[i].name}"
            data-img="${cartArr[i].img}"
            style="display:inline">
                  Remove
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  cartGrid.appendChild(item);

  // attach remove listeners AFTER items exist
  const cartRemoveButtons = document.getElementsByClassName("remove-button");

  for (let i = 0; i < cartRemoveButtons.length; i++) {
    cartRemoveButtons[i].addEventListener("click", removeBook);
  }
}
