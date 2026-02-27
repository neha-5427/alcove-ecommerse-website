// displaying cart
//the following use of innerHTML was adapted from ChatGPT: https://chatgpt.com/share/69a171a1-6700-8013-a593-688bb50f12e7
const cartGrid = document.querySelector(".cart-grid");
let cartArr = JSON.parse(localStorage.cart || "[]");

for (let i = 0; i < cartArr.length; i++) {
  const item = document.createElement("div");
  item.classList.add("cart-item");

  item.innerHTML = `
  <div class="catalogue-item">
    <div class="book-flexbox">
      <a href="#">
      <img class="book-img" src="${cartArr[i].img}">
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
            data-price= "${cartArr[i].price}"
            data-author= "${cartArr[i].author}"
            style="display:inline">
                  Remove
          </button>
        </div>
      </div>
    </div>
  </div>
      
  
  `;

  cartGrid.appendChild(item);
}
