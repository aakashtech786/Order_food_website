var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let productList = [
  {
    id: 1,
    name: " Beef Burger",
    Price: "₹80.50",
    image: "images/burger.png",
  },
  {
    id: 2,
    name: "Veggie Pizza",
    Price: "₹71.99",
    image: "images/pizza.png",
  },
  {
    id: 3,
    name: "fried chicken",
    Price: "₹150.45",
    image: "images/fried-chicken.png",
  },
  {
    id: 4,
    name: "Chicken Roll",
    Price: "₹100.50",
    image: "images/chicken-roll.png",
  },
  {
    id: 5,
    name: "sub sandwich",
    Price: "₹85.99",
    image: "images/sandwich.png",
  },
  {
    id: 6,
    name: "chicken Lasagna",
    Price: "₹255.45",
    image: "images/lasagna.png",
  },
  {
    id: 7,
    name: "Itallian spaghetti",
    Price: "₹85.65",
    image: "images/spaghetti.png",
  },
  {
    id: 8,
    name: "Spring Roll",
    Price: "₹88.50",
    image: "images/spring-roll.png",
  },
];

cardproduct = [];

let cartIcon = document.querySelector(".cart-icon");
let cartTab = document.querySelector(".cart-tab");
let close_btn = document.querySelector(".cart_close_btn");
let container = document.querySelector(".dish-container");
let cartList = document.querySelector(".cart-list");
let cartTotal = document.querySelector('.cart_total');
let cartvalue = document.querySelector('.cart-value');
let hamburger = document.querySelector('.hamburger');
let moblist = document.querySelector('.mobile-list');

hamburger.addEventListener("click",
  function(){
    moblist.classList.toggle("mobile-menu");
  }
)




function openCart() {
  cartTab.classList.add("cart-tab-active");
}

function closecart(e) {
  e.preventDefault();
  cartTab.classList.remove("cart-tab-active");
}

const updateTotal = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  document.querySelectorAll('.item').forEach(item =>{
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('₹',''));
    totalPrice += price;
    totalQuantity += quantity;
  });
  cartTotal.textContent = `₹${totalPrice.toFixed(2)}`
  cartvalue.textContent = totalQuantity;
}



function showCards() {
  container.innerHTML = "";

  productList.forEach(function (product) {
    const card = document.createElement("div");
    card.classList.add("dish-card");

    card.innerHTML = `
      <div class="menu-card">
        <img src="${product.image}" />
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.Price}</h4>
      <div class="menu-btn">
        <a href="#">Add to Cart</a>
      </div>
    `;

    const button = card.querySelector(".menu-btn");

    button.addEventListener("click", function (e) {
      e.preventDefault();
      addTocart(product);
    });

    container.appendChild(card);
  });
}

const addTocart = (product) => {
  // Check if product already exists
  const existingProduct = cardproduct.find(function (item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    alert("Item already added to the cart!");
    return;
  }

  // Push product into cart array
  cardproduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.Price.replace("₹", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `
    <div class="cart_image_container">
      <img src="${product.image}" />
    </div>
    <div>
      <h4>${product.name}</h4>
      <h4 class="item-total">${product.Price}</h4>
    </div>
    <div class="cart_arrow">
      <div>
        <a href="#" class="quantity-btn minus ">
          <i class="fa-solid fa-minus"></i>
        </a>
      </div>

      <h4 class="quantity-value">${quantity}</h4>

      <div>
        <a href="#" class="quantity-btn plus ">
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
    </div>
  `;

  cartList.appendChild(cartItem);
  updateTotal()
 

  const plusBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");
  const minusBtn = cartItem.querySelector(".minus");


  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    quantity++;

    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
    updateTotal()
     
     
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
      updateTotal()
      
    }
    else{
      cartItem.remove();

    }
     
  });
  
};

showCards();

cartIcon.addEventListener("click", openCart);
close_btn.addEventListener("click", closecart);
