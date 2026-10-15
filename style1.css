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
        description: "Delicious vanilla ice cream",
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

let cart = [];

const menuList = document.getElementById("menu-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const tableNumber = document.getElementById("table-number");
const orderMessage = document.getElementById("order-message");
const placeOrderButton = document.getElementById("place-order");

// Display all food items
function displayMenu() {
    menuList.innerHTML = menu.map(item => `
        <div class="food-card">
            <div class="food-image">${item.emoji}</div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">₹${item.price.toFixed(2)}</span>
                <button class="add-btn" data-id="${item.id}">
                    + Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Add food to cart
menuList.addEventListener("click", function(event) {
    const button = event.target.closest(".add-btn");

    if (!button) return;

    const id = Number(button.dataset.id);
    const food = menu.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    orderMessage.textContent = "";
    updateCart();
});

// Change item quantity or remove it
cartItems.addEventListener("click", function(event) {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    const item = cart.find(food => food.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    } else if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(food => food.id !== id);
        }
    }

    orderMessage.textContent = "";
    updateCart();
});

// Calculate total and display cart
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">
                    <strong>${item.emoji} ${item.name}</strong>
                    <div>₹${item.price.toFixed(2)} each</div>
                </div>

                <div class="quantity-controls">
                    <button data-action="decrease"
                            data-id="${item.id}"
                            aria-label="Decrease ${item.name}">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                            data-id="${item.id}"
                            aria-label="Increase ${item.name}">+</button>
                </div>

                <strong>
                    ₹${(item.price * item.quantity).toFixed(2)}
                </strong>
            </div>
        `).join("");
    }

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalItems;
    totalPrice.textContent = total.toFixed(2);
}

// Place restaurant order
placeOrderButton.addEventListener("click", function() {
    const selectedTable = tableNumber.value;

    if (!selectedTable) {
        orderMessage.textContent = "Please select your table number.";
        tableNumber.focus();
        return;
    }

    if (cart.length === 0) {
        orderMessage.textContent = "Please add food to your cart first.";
        return;
    }

    const orderId = "ORD" + Date.now().toString().slice(-6);
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const summary = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join(", ");

    orderMessage.textContent =
        `Order placed successfully! ${orderId} | ` +
        `Table ${selectedTable} | ${summary} | ` +
        `Total: ₹${total.toFixed(2)}`;

    alert(
        `Thank you for your order!\n\n` +
        `Order ID: ${orderId}\n` +
        `Table: ${selectedTable}\n` +
        `Items: ${summary}\n` +
        `Total: ₹${total.toFixed(2)}`
    );

    cart = [];
    updateCart();
});

// Start the application
displayMenu();
updateCart();
