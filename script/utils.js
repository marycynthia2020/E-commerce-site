const shoppingCart = document.getElementById("cart")
const productContainer = document.getElementById("products-container")
const cartContainer = document.querySelector(".cart-items-container")
const showTotalCost = document.getElementById("total")

export function toggleCart() {
    shoppingCart.classList.toggle("hidden")
}

export function renderProducts (items) {
    items.forEach(item => {
        productContainer.innerHTML += `
        <div
            class="p-4 flex flex-col gap-2 border-2 justify-between"
          >
            <div class="self-center w-[200px]">
              <img src=${item.image} alt="product" class="w-full aspect-square object-contain"/>
            </div>
            <p class="text-xl">${item.category}</p>
            <div class="flex gap-1 items-center">
              <span>In stock</span>
            </div>
            <p class="text-[#1246AB]">
              ${item.price} <span class="text-[#333333B3]">/ each</span>
            </p>
            <div class="flex items-center bg-[#1246AB] text-white justify-between p-3">
            <div class="flex items-center gap-2 place-self-center">
            <button data-product-id="${item.id}" class="decrement-btn">-</button>
            <span id=${item.id}>${item.qty}</span>
            <button data-product-id=${item.id} class="increment-btn">+</button>
            </div>
            <button data-product-id=${item.id} class="add-to-cart-btn">ADD TO CART</button>
            </div>
        </div>
        `
    })
}

export function renderCartItems(items) {
   cartContainer.innerHTML = ""
    items.forEach(item => {
      cartContainer.innerHTML += `
        <div class="flex gap-4 items-center mb-6 p-4">
            <div class="flex gap-8 items-center  ">
              <div class="w-[100px] h-[100px]">
                <img src=${item.image} alt="" class="w-full h-full" />
              </div>
              <div class="flex flex-col gap-4">
                <p class="text-xl">${item.category}</p>
                <div class="flex items-center gap-2  p-3 bg-[#1246AB] text-white justify-between">
                <button data-product-id=${item.id} class="cart-decrement-btn">-</button>
                <span id="cart ${item.id}">${item.qty}</span>
                <button data-product-id=${item.id} class="cart-increment-btn">+</button>
                </div>
                <p>
                  ${item.qty} * <span class="text-[#1246AB]">${item.price}</span> / each
                </p>
              </div>
            </div>
             <button id = ${item.id} class= "remove-item">X</button>
          </div>
      `
    })
}

export function handleProductsInteraction(increaseQtyBtn, reduceQtyBtn, addItemToCartBtn, arrayofProducts, cart) {
  // Adding Event to the incremmenet buttons of the displayed product
  increaseQtyBtn.forEach(btn => {
    btn.addEventListener("click", (e)=> {
      console.log(e.target.dataset.productId)
       const found = arrayofProducts.find(item => item.id === +e.target.dataset.productId )
      if(found){
          found.qty++
           document.getElementById(found.id).textContent = found.qty
      }
    })
  })
   reduceQtyBtn.forEach(btn => {
    btn.addEventListener("click", (e)=> {
      const found = arrayofProducts.find(item => item.id === +e.target.dataset.productId )
      if(found && found.qty > 0 ){
          found.qty--
           document.getElementById(found.id).textContent = found.qty
      }
    })
  })

  // Adding event to the add to the add to cart buttons
  addItemToCartBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const found = arrayofProducts.find(item => item.id ===  +e.target.dataset.productId)
      let foundInCart = cart.find(item => item.id === found.id)
      if(foundInCart) {
        foundInCart.qty = found.qty 
        localStorage.setItem("cartItem", JSON.stringify(cart))
        calculatePrice(cart)
          renderCartItems(cart)
        return
       } cart.push(found)
       console.log(document.getElementById("cart-length"))
       document.getElementById("cart-length").textContent = cart.length
        localStorage.setItem("cartItem", JSON.stringify(cart))
         renderCartItems(cart)
         calculatePrice(cart)
    })
   
  })
}

export function calculatePrice(items){
  let totalCost = 0
   items.forEach(item => {
   let perCost = item.price * item.qty
    totalCost += perCost
    showTotalCost.textContent = `$${totalCost.toLocaleString()}`
     console.log(totalCost.toLocaleString())
  })
}
