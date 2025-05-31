import { products } from "./products.js";
import { renderCartItems, renderProducts, handleProductsInteraction } from "./utils.js";
import { toggleCart } from "./utils.js";

let cart = JSON.parse(localStorage.getItem("cartItem")) || []
renderCartItems(cart) // render cart Items on page load
renderProducts(products); // render products on page load. Also making sure product has been rendered befor accessing the product interaction buttons

const productDecrementButtons = document.querySelectorAll(".decrement-btn");
const productIncrementButtons = document.querySelectorAll(".increment-btn");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn")
const OpenCartBtn = document.getElementById("open-cart-btn");
const closeCartbtn = document.getElementById("close-cart-btn");

OpenCartBtn.addEventListener("click", toggleCart);
closeCartbtn.addEventListener("click", toggleCart);
  
handleProductsInteraction(productIncrementButtons, productDecrementButtons, addToCartBtn, products, cart )  // calls the product interaction function for the rendered products

// cart buttons ineraction
document.addEventListener("click", (e)=>{
  const productId = +e.target.dataset.productId 
  const element  = e.target
  if(element.classList.contains("cart-increment-btn")){
      cart.find(item => {
        if(item.id === productId) {
            item.qty++
            localStorage.setItem("cartItem", JSON.stringify(cart))
            renderCartItems(cart)
        }
      } )    
  }

  if(element.classList.contains("cart-decrement-btn")){
      cart.find(item => {
        if(item.id === productId && item.qty >0) {
            item.qty--
            localStorage.setItem("cartItem", JSON.stringify(cart))
            renderCartItems(cart)
        }
      } )    
  }

  if(element.classList.contains("remove-item")){
    let remainingItems = cart.filter(item => item.id !== +e.target.id)
    cart = remainingItems
    document.getElementById("cart-length").textContent = cart.length
    localStorage.setItem("cartItem", JSON.stringify(cart))
    renderCartItems(cart)
  }
})
