// Products
let products = [
    { name: "Laptop", price: 50000 },
    { name: "Mobile", price: 20000 },
    { name: "Headphones", price: 2000 }
];

showProducts(products);

// Load cart from storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
let count = cart.length;

// Show products
function showProducts(list) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach((product, index) => {
        container.innerHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${index})">Add</button>
        </div>
        `;
    });
}

showProducts(products);

// Load cart UI
function loadCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>

        <div class="qty-controls">
            <button onclick="decreaseQty(${index})">➖</button>
            <span>${item.qty || 1}</span>
            <button onclick="increaseQty(${index})">➕</button>
        </div>
        
        <button class="remove-btn" onclick="removeItem(${index})">❌</button>
        `;

        cartList.appendChild(li);
        total += item.price * (item.qty || 1);
    });

    document.getElementById("total").innerText = total;
    document.getElementById("count").innerText = cart.length;

    // Empty message
    if (cart.length === 0) {
        document.getElementById("emptyMsg").style.display = "block";
    } else {
        document.getElementById("emptyMsg").style.display = "none";
    }
}

loadCart();

// Add to cart
function addToCart(index) {
    let item = products[index];

    let existing = cart.find(p => p.name=== item.name);

    if (existing) {
        existing.qty = (existing.qty || 1) + 1;

    } else {
    cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// Search
document.getElementById("search").addEventListener("input", function () {
    let value = this.value.toLowerCase();

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    showProducts(filtered);
});

// Dark mode
function toggleMode() {
    document.body.classList.toggle("dark");
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully! 🎉");

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function increaseQty(index) {
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}