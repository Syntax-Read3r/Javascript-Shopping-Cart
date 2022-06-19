"use strict";
//The following code is used to run the ready function no matter what
// [x]
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

function ready() {
	//The following code is used to remove the rows from the table when the user clicks the remove button
	let removeCartItemButtons = document.getElementsByClassName("btn-danger");
	console.log(removeCartItemButtons);
	for (let a = 0; a < removeCartItemButtons.length; a++) {
		console.log("i am here 1");
		let button = removeCartItemButtons[a];
		button.addEventListener("click", removeCartItem);
	}

	// the following code prevents the user from entering a number that a less that 1
	let quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (let a = 0; a < quantityInputs.length; a++) {
		let input = quantityInputs[a];
		input.addEventListener("change", quantityChanged);
	}

	//The following code is used to add items into the cart
	let addToCartButtons = document.getElementsByClassName("shop-item-button");
	for (let a = 0; a < addToCartButtons.length; a++) {
		let button = addToCartButtons[a];
		button.addEventListener("click", addToCartClicked);
	}

	//The following code is get the purchase button removed all the items form our cart
	let purchaseButton = document.getElementsByClassName("btn-purchase")[0];
	purchaseButton.addEventListener("click", purchaseClicked);
}

function purchaseClicked(event) {
	alert("Thank you for your purchase!");
	//Now I would like to delete all the items in the cart and to do that I need to get the cart items
	let cartItems = document.getElementsByClassName("cart-items")[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal();
}

function addToCartClicked(event) {
	//when adding to cart, there are elements that must also be added to the cart. These are the following:
	//1. The image of the item
	//2. The name of the item
	//3. The price of the item
	//4. The quantity of the item
	//5. The remove button
	//6. The total price of the item
	//7. The total price of the cart
	//8. The total quantity of the cart

	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	//Next, we need to get the name of the shop item
	let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
	//next, we need to get the price of the shop item
	let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
	//next, we need to get the image of the shop item
	let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
	//FIXME: next, we need to add the row to the cart
	addItemToCart(title, price, imageSrc);
	updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
	//first we need to create a div element
	let cartRow = document.createElement("div");
	cartRow.classList.add("cart-row");
	//nextm we need to locate where we want to add the div element
	let cartItems = document.getElementsByClassName("cart-items")[0];
	//In order to check if an item has already been added to cart, we need to get all the cartItems names.
	let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
	//We need to loop through the cartItemNames array to check if the item has already been added to cart.
	for (let a = 0; a < cartItemNames.length; a++) {
		//If the item has already been added to cart, we need to stop the function.
		if (cartItemNames[a].innerText == title) {
			alert("This item has already been added to cart");
			//We need to return to stop the function.
			return;
		}
	}

	//instead of manually creating a cartRow contents, we can use html to create the contents
	let cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100" alt="shirt">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input"title placeholder="1" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>
    `;
	cartRow.innerHTML = cartRowContents;
	//next we need to append the div element to the cartItems element
	cartItems.appendChild(cartRow);
	//next we need to add the event listener to the remove button
	let cartRowRemoveButton = cartRow.getElementsByClassName("btn-danger")[0];
	cartRowRemoveButton.addEventListener("click", removeCartItem);
	//next, we need to add the event listener to the quantity input
	let cartRowQuantityInput = cartRow.getElementsByClassName(
		"cart-quantity-input"
	)[0];
	cartRowQuantityInput.addEventListener("change", quantityChanged);
}

//To make  my code more readable, I created a function call removeCartItem outside of the event listener.
function removeCartItem(event) {
	let buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	console.log("i am here 2");
	updateCartTotal();
}

function quantityChanged(event) {
	let input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

//The following code is used to update the cart total
function updateCartTotal() {
	//The following code is used to get the cart container, and since the getElementsByClassName method returns an array, we need to use the [0] index to get the first element in the array
	let cartItemContainer = document.getElementsByClassName("cart-items")[0];
	//Inside the cart container, we need to get all of the rows that have the class "cart-row"
	//Using the getElementsByClassName method on an actual object will only get the elements that are inside of that object
	//Using the getElementsByClassName method on a string will get all of the elements that have that class
	let cartRows = cartItemContainer.getElementsByClassName("cart-row");
	let total = 0;
	//COMMENT: Why do I need to get through this process instead of just accessing the cart-row class directly?
	for (let a = 0; a < cartRows.length; a++) {
		console.log("i am here 3");
		let cartRow = cartRows[a];
		let priceElement = cartRow.getElementsByClassName("cart-price")[0];
		let quantityElement = cartRow.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		//In order to math on this element, we need to convert the string to a number and parseFloat will do into a decimal number.
		console.log("i am here 4");
		let price = parseFloat(priceElement.innerText.replace("$", ""));
		//We need to get value of the quantityElement element and convert it to a number
		let quantity = quantityElement.value;
		//Every time we loop through the cart, we need to update the total
		console.log("i am here 5");
		total = total + price * quantity;
	}
	// We need to get the totalElement and update it with the total
	console.log("i am here 6");
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName(
		"cart-total-price"
	)[0].innerText = `$${total}`;
}

//I need to add to cart
