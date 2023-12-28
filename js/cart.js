var addToCartButtons = document.getElementsByClassName('add-to-cart');
var removeFromCartButtons = document.getElementsByClassName('remove-from-cart-btn');
var plusButtons = document.getElementsByClassName('plus-btn');
var minusButtons = document.getElementsByClassName('minus-btn');
var cartCounter = 0;
var cartTotal = 0;

for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function () {
        var product = this.parentNode;
        var productName = product.getElementsByClassName('product_name')[0].textContent;
        var quantityInput = product.getElementsByClassName('quantity-input')[0];
        var quantity = parseInt(quantityInput.value, 10);
        var priceElement = product.getElementsByClassName('product_price')[0];
        var price = parseFloat(priceElement.textContent);


        addToCart(productName, quantity, price);

        updateCartCounter();
        updateCartTotal();
    });
}

for (var i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', function () {
        var product = this.parentNode;
        var productName = product.getElementsByTagName('h3')[0].textContent;
        var quantityInput = product.getElementsByClassName('quantity-input')[0];
        var quantity = parseInt(quantityInput.value, 10);
        var priceElement = product.getElementsByClassName('product-price')[0];
        var price = parseFloat(priceElement.textContent);

        removeFromCart(productName, quantity, price);

        updateCartCounter();
        updateCartTotal();

        // Remove the item from the cart visually
        this.parentNode.parentNode.removeChild(this.parentNode);
    });
}


for (var i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener('click', function () {
        var quantityInput = this.parentNode.querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
    });
}

for (var i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener('click', function () {
        var quantityInput = this.parentNode.querySelector('.quantity-input');
        var currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
}

function addToCart(productName, quantity, price) {
    var cartItems = document.getElementById('cart-items');
    var listItem = document.createElement('li');
    //     listItem.textContent = productName + ' x1'; // Indicate the quantity
    //     cartItems.appendChild(listItem);

    //     cartTotal += price;
    // }

    // Create a container for the item in the cart with a delete button
    var itemContainer = document.createElement('div');
    itemContainer.innerHTML = `${productName} x ${quantity} - ${price * quantity} руб. <button class="delete-from-cart-btn">Удалить</button>`;
    listItem.appendChild(itemContainer);

    // Add the item to the cart
    cartItems.appendChild(listItem);

    // Add an event listener for the delete button
    var deleteButton = listItem.querySelector('.delete-from-cart-btn');
    deleteButton.addEventListener('click', function () {
        removeFromCart(productName, quantity, price);
        updateCartCounter();
        updateCartTotal();
        cartItems.removeChild(listItem);
    });

    // Update the total price
    cartTotal += price * quantity;
}


function removeFromCart(productName, quantity, price) {
    var cartItems = document.getElementById('cart-items');
    var items = cartItems.getElementsByTagName('li');
    var removedCount = 0;

    for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].textContent === productName) {
            cartItems.removeChild(items[i]);
            removedCount++;
            if (removedCount === quantity) {
                break;
            }
        }
    }

    cartTotal -= price * quantity;
}



function updateCartTotal() {
    var cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = cartTotal;
}

function updateCartCounter() {
    var cartItems = document.getElementById('cart-items');
    var items = cartItems.getElementsByTagName('li');
    cartCounter = items.length;

    var cartCounterElements = document.getElementsByClassName('cart-counter');
    for (let i = 0; i < cartCounterElements.length; i++) {
        cartCounterElements[i].textContent = cartCounter;
    }
}

var clearCartButton = document.getElementById('clear-cart-btn');
clearCartButton.addEventListener('click', function () {
    var cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cartCounter = 0;
    cartTotal = 0;
    updateCartCounter();
    updateCartTotal();


});
