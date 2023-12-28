
// JavaScript-код для управления корзиной товаров

// Получаем все кнопки "Добавить в корзину"
let addToCartButtons = document.getElementsByClassName('add-to-cart');
// Получаем все кнопки "Удалить из корзины"
let removeFromCartButtons = document.getElementsByClassName('remove-from-cart-btn');
// Инициализируем счетчик корзины
let cartCounter = 0;

var cartTotal = 0;

// Добавляем обработчик события при нажатии на кнопку "Добавить в корзину"
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function () {
        // Получаем родительский элемент (товар)
        let product = this.parentNode;
        // Получаем название товара
        let productName = product.getElementsByClassName('product_name')[0].textContent;
        var quantityInput = product.getElementsByClassName('quantity-input')[0];
        var quantity = parseInt(quantityInput.value, 10);
        var priceElement = product.getElementsByClassName('product_price')[0];
        var price = parseFloat(priceElement.textContent);

        for (var j = 0; j < quantity; j++) {
            addToCart(productName, price);
        }
        updateCartCounter();
        updateCartTotal();

        // Скрываем кнопку "Добавить в корзину" и отображаем кнопку "Удалить из корзины"
        this.style.display = 'none';
        product.getElementsByClassName('remove-from-cart-btn')[0].style.display = 'inline-block';
    });
}

// Добавляем обработчик события при нажатии на кнопку "Удалить из корзины"
for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', function () {
        // Получаем родительский элемент (товар)
        let product = this.parentNode;
        // Получаем название товара
        let productName = product.getElementsByClassName('product_name')[0].textContent;
        var quantityInput = product.getElementsByClassName('quantity-input')[0];
        var quantity = parseInt(quantityInput.value, 10);

        removeFromCart(productName, quantity);
        // Обновляем счетчик корзины
        updateCartCounter();

        // Скрываем кнопку "Удалить из корзины" и отображаем кнопку "Добавить в корзину"
        this.style.display = 'none';
        product.getElementsByClassName('add-to-cart')[0].style.display = 'inline-block';
    });
}



function addToCart(productName, price) {
    var cartItems = document.getElementById('cart-items');
    var listItem = document.createElement('li');
    listItem.textContent = productName;
    cartItems.appendChild(listItem);

    cartTotal += price;
}
// Функция для добавления товара в корзину
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
    cartTotalElement.textContent = cartTotal.toFixed(2);
}


// Функция для удаления товара из корзины
function removeFromCart(productName, quantity) {
    // Получаем родительский элемент списка товаров
    let cartItems = document.getElementById('cart-items');
    // Получаем элемент списка
    let items = cartItems.getElementsByTagName('li');

    var removedCount = 0;

    // Удаляем товар совпадающий по названию 

    for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].textContent === productName) {
            cartItems.removeChild(items[i]);
            removedCount++;
            if (removedCount === quantity) {
                break;
            }
        }
    }
}

// Функция для обновления счетчика корзины
function updateCartCounter() {
    // Получаем родительский элемент списка товаров
    let cartItems = document.getElementById('cart-items');
    // Получаем элемент списка
    let items = cartItems.getElementsByTagName('li');
    // Обновляем значение счетчика корзины
    cartCounter = items.length;

    let cartCounterElement = document.getElementsByClassName('cart-count')[0];
    // Обновляем отображение счетчика корзины
    cartCounterElement.textContent = cartCounter;
}

// Обработчик события при нажатии на кнопку "Очистить корзину"
let clearCartButton = document.getElementById('clear-cart-btn');
clearCartButton.addEventListener('click', function () {
    let cartItems = document.getElementById('cart-items');
    // Очищаем содержимое корзины
    cartItems.innerHTML = '';
    // Сбрасываем счетчик корзины
    cartCounter = 0;
    // Обновляем отображение счетчика корзины
    updateCartCounter();

    // При очистке корзины, скрываем кнопку "Удалить из корзины" и отображаем кнопку "Добавить в корзину"
    for (let i = 0; i < removeFromCartButtons.length; i++) {
        removeFromCartButtons[i].style.display = 'none';
        addToCartButtons[i].style.display = 'inline-block';
    }
});