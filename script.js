"use strict";

// Restaurant food menu
const menu = [
    {
        id: 1,
        name: "Veg Burger",
        description: "Fresh vegetable burger",
        price: 99,
        emoji: "🍔"
    },
    {
        id: 2,
        name: "Pizza",
        description: "Cheesy Margherita pizza",
        price: 199,
        emoji: "🍕"
    },
    {
        id: 3,
        name: "Biryani",
        description: "Delicious vegetable biryani",
        price: 159,
        emoji: "🍛"
    },
    {
        id: 4,
        name: "French Fries",
        description: "Crispy golden fries",
        price: 79,
        emoji: "🍟"
    },
    {
        id: 5,
        name: "Sandwich",
        description: "Fresh grilled sandwich",
        price: 89,
        emoji: "🥪"
    },
    {
        id: 6,
        name: "Cold Coffee",
        description: "Chilled creamy coffee",
        price: 69,
        emoji: "☕"
    },
    {
        id: 7,
        name: "Ice Cream",
        description: "Vanilla ice cream",
        price: 59,
        emoji: "🍨"
    },
    {
        id: 8,
        name: "Pasta",
        description: "Creamy Italian pasta",
        price: 149,
        emoji: "🍝"
    },
    {
        id: 9,
        name: "Fresh Juice",
        description: "Fresh orange juice",
        price: 49,
        emoji: "🧃"
    }
];

// Shopping cart
let cart = [];

// HTML elements
const menuList = document.getElementById("menu-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const tableNumber = document.getElementById("table-number");
const orderMessage = document.getElementById("order-message");
const placeOrderButton = document.getElementById("place-order");

// Display menu items
function displayMenu() {
    menuList.innerHTML = menu.map(item => `
        <article class="food-card">
            <div class="food-image">${item.emoji}</div>

            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>

                <span class="price">
                    ₹${item.price.toFixed(2)}
                </span>

                <button
                    type="button"
                    class="add-btn"
                    data-id="${item.id}">
                    + Add to Cart
                </button>
            </div>
        </article>
    `).join("");
}

// Add food to cart
menuList.addEventListener("click", function(event) {
    const button = event.target.closest(".add-btn");

    if (!button) return;

    const id = Number(button.dataset.id);
    const food = menu.find(item => item.id === id);

    if (!food) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    orderMessage.textContent = "";
    updateCart();
});

// Increase or decrease item quantity
cartItems.addEventListener("click", function(event) {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    const item = cart.find(food => food.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart = cart.filter(food => food.id !== id);
        }
    }

    orderMessage.textContent = "";
    updateCart();
});

// Update cart, item count, and bill
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-details">
                    <strong>${item.emoji} ${item.name}</strong>
                    <br>
                    <small>₹${item.price.toFixed(2)} each</small>
                </div>

                <div class="quantity-controls">
                    <button
                        type="button"
                        data-action="decrease"
                        data-id="${item.id}"
                        aria-label="Decrease ${item.name}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        data-action="increase"
                        data-id="${item.id}"
                        aria-label="Increase ${item.name}">
                        +
                    </button>
                </div>

                <strong>
                    ₹${(item.price * item.quantity).toFixed(2)}
                </strong>
            </div>
        `).join("");
    }

    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = count;
    totalPrice.textContent = total.toFixed(2);
}

// Place an order
placeOrderButton.addEventListener("click", function() {
    const selectedTable = tableNumber.value;

    if (!selectedTable) {
        orderMessage.textContent =
            "Please select a table number first.";
        tableNumber.focus();
        return;
    }

    if (cart.length === 0) {
        orderMessage.textContent =
            "Please add at least one food item.";
        return;
    }

    const orderId = "ORD" +
        Date.now().toString().slice(-6);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const orderSummary = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join(", ");

    // Show confirmation on the page
    orderMessage.textContent =
        `Order placed successfully! Order ID: ${orderId}. ` +
        `Table: ${selectedTable}. ` +
        `Items: ${orderSummary}. ` +
        `Total: ₹${total.toFixed(2)}.`;

    // Show order confirmation
    alert(
        "ORDER CONFIRMED!\n\n" +
        "Order ID: " + orderId + "\n" +
        "Table Number: " + selectedTable + "\n" +
        "Items: " + orderSummary + "\n" +
        "Total Bill: ₹" + total.toFixed(2)
    );

    // Clear the cart after placing the order
    cart = [];
    updateCart();
});

// Initialize application
displayMenu();
updateCart();
