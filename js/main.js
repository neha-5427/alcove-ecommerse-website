// displaying cart 

const cartGrid = document.querySelector(".cart-grid");

let cartArr = JSON.parse(localStorage.cart);

for (let i = 0; i < cartArr.length; i++) {
  let cartBook = document.createElement("img");
  cartBook.src = cartArr[i].img;
  cartBook.style.width = "100%";
  cartGrid.appendChild(cartBook);
}
