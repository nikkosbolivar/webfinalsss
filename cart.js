let cart = [];
let registeredUsername = "";

function addToCart(productName, productImage, price) {

    const product = { name: productName, image: productImage, price: price };
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - P${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (registeredUsername === "") {
        alert("Please register before checking out.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        let totalPrice = 0;
        let receiptContent = `Receipt for ${registeredUsername}:\n\n`;

        cart.forEach(item => {
            receiptContent += `${item.name} Price: P${item.price.toFixed(2)}\n`;
            totalPrice += item.price;
        });

        receiptContent += `\nTotal price: P${totalPrice.toFixed(2)}\n\nThank you for your purchase, ${registeredUsername}!`;

        alert(receiptContent);

        cart = [];
        updateCartDisplay();
    }
}

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    registeredUsername = document.getElementById("username").value;
    document.getElementById("usernameDisplay").textContent = "Welcome, " + registeredUsername + "!";
    document.getElementById("cart-heading").textContent = registeredUsername + "'s Shopping Cart";

    closeModal();
});

function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    const yOffset = -80;
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}
