import { products } from "./products.js";
import { renderCartItems, renderProducts, handleProductsInteraction } from "./utils.js";
import { toggleCart } from "./utils.js";

const OpenCartBtn = document.getElementById("open-cart-btn");
const closeCartbtn = document.getElementById("close-cart-btn");

OpenCartBtn.addEventListener("click", toggleCart);
closeCartbtn.addEventListener("click", toggleCart);

let cart = JSON.parse(localStorage.getItem("cartItem")) || []

renderProducts(products); //making use of the render functions to render the list of products || also making sure product has been rendered befor accessing the product interaction buttons

  const productDecrementButtons = document.querySelectorAll(".decrement-btn");
  const productIncrementButtons = document.querySelectorAll(".increment-btn");
  const addToCartBtn = document.querySelectorAll(".add-to-cart-btn")
  

handleProductsInteraction(productIncrementButtons, productDecrementButtons, addToCartBtn, products, cart )  // calls the product interaction function for the rendered products

renderCartItems(cart) // cartItems rendered befor accessing the product interaction buttons that comes with it
const cartIncrementButtons = document.querySelectorAll(".cart-increment-btn");
const cartDecrementButtons  = document.querySelectorAll(".cart-decrement-btn");

// handleCartButtonsInteraction(cartIncrementButtons, cartDecrementButtons, cart)

function handleCartButtonsInteraction(){
  if(cart.length >0){
    console.log(cartIncrementButtons)
  }
  cartIncrementButtons.forEach(btn => {
    btn.addEventListener("click", (e)=> {
      console.log(e.target.dataset.productId)
      console.log("hi")
       const found = cart.find(item => item.id === +e.target.dataset.productId )
      if(found){
          found.qty++
           document.getElementById(found.id).textContent = found.qty
           console.log( document.getElementById(found.id))
      }
    })
  })

  cartDecrementButtons?.forEach(btn => {
    btn.addEventListener("click", (e)=> {
      const found = cart.find(item => item.id === +e.target.dataset.productId )
      if(found && found.qty > 0 ){
          found.qty--
           document.getElementById(found.id).textContent = found.qty
      }
    })
  })

}
handleCartButtonsInteraction()

localStorage.clear()