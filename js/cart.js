let addToCartButtons = document.getElementsByClassName('add-to-cart');
let removeFromCartButtons = document.getElementsByClassName('remove-from-cart-btn');
let cartCounter = 0;
let cartTotal = 0;
let quantity = 1;



//навешиваем обработчики событий на кнопки добавления товаров в корзину
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function () {
        let product = this.parentNode;
        let productName = product.getElementsByClassName('product_name')[0].textContent;

        let priceElement = product.getElementsByClassName('product_price')[0];
        let price = parseFloat(priceElement.textContent);


        addToCart(productName, price);
        updateCartCounter();

        updateCartTotal();

        this.style.display = 'none';
        product.getElementsByClassName('remove-from-cart-btn')[0].style.display = 'inline-block';
    });
}

//навешиваем обработчики событий на кнопки удаления товаров в корзину
for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', function () {
        let product = this.parentNode;
        let productName = product.getElementsByClassName('product_name')[0].textContent;
        let priceElement = product.getElementsByClassName('product_price')[0];
        let price = parseFloat(priceElement.textContent);

        removeFromCart(productName, price);
        updateCartCounter();
        updateCartTotal();

        this.style.display = 'none';
        product.getElementsByClassName('add-to-cart')[0].style.display = 'inline-block';
    });
}

// Функция добавления товаров в корзину 
function addToCart(productName, price) {
    let cartItems = document.getElementById('cart-items');
    let listItem = document.createElement('li');
    let itemContainer = document.createElement('div');
    itemContainer.innerHTML = `${productName} x ${quantity} - ${price * quantity} руб. <span class="remove-from-cart-btn close-danger">&times;</span>`;
    listItem.appendChild(itemContainer);

    // Add the item to the cart
    cartItems.appendChild(listItem);

    // Обработчик событий для кнопки удаления товаров в корзие (рядом с товарами)
    let deleteButton = listItem.querySelector('.remove-from-cart-btn');
    deleteButton.addEventListener('click', function () {

        if (confirm('Удалить?')) {
            removeFromCart(productName, price);

            updateCartCounter();
            updateCartTotal();

            updateProductCardButtons(productName, true);
        }


    });

    // обновление цены
    cartTotal += price;
}



//удаление товаров в корзине
function removeFromCart(productName, price) {
    let cartItems = document.getElementById('cart-items');
    let items = cartItems.getElementsByTagName('li');

    for (let i = items.length - 1; i >= 0; i--) {
        let itemText = items[i].textContent;
        if (itemText.includes(productName)) {
            cartItems.removeChild(items[i]);

            break; // Останавливается после удаления первого совпалающего элемента
        }
    }

    cartTotal -= price;
}


//обновление значения счетчика товаров на сайте 
function updateCartCounter() {
    let cartItems = document.getElementById('cart-items');
    let items = cartItems.getElementsByTagName('li');
    cartCounter = items.length;

    let cartCounterElement = document.getElementById('cart-counter');
    cartCounterElement.textContent = cartCounter;
}

//обработчик для кнопки очистки корзины

let clearCartButton = document.getElementById('clear-cart-btn');
clearCartButton.addEventListener('click', function () {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cartCounter = 0;
    cartTotal = 0;
    updateCartCounter();
    updateCartTotal();

    //смена кнопок "удалить" на "в корзину" в карточках товаров при очистке корзины
    for (let i = 0; i < removeFromCartButtons.length; i++) {
        removeFromCartButtons[i].style.display = 'none';
        addToCartButtons[i].style.display = 'inline-block';
    }
});

//Функция для показа итоговой суммы за товары в корзине
function updateCartTotal() {
    let cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = cartTotal;
}

//Функция для смены кнопок на основной странице при удалении товаров из корзины

function updateProductCardButtons(productName, showAddButton) {
    let productCards = document.getElementsByClassName('product');
    for (let i = 0; i < productCards.length; i++) {
        let cardProductName = productCards[i].getElementsByClassName('product_name')[0].textContent;

        if (cardProductName === productName) {
            let addToCartButton = productCards[i].getElementsByClassName('add-to-cart')[0];
            let removeFromCartButton = productCards[i].getElementsByClassName('remove-from-cart-btn')[0];

            if (showAddButton) {
                addToCartButton.style.display = 'inline-block';
                removeFromCartButton.style.display = 'none';
            } else {
                addToCartButton.style.display = 'none';
                removeFromCartButton.style.display = 'inline-block';
            }

            break;
        }
    }
}