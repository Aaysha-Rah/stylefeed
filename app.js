// app.js only handles the page: reading inputs, showing results, and wiring buttons.
// The rules live in catalog.js and cart.js, and the real browser storage is passed in here.
const cartStore = createCartStore(window.localStorage);
const savedList = createSavedList(window.localStorage);

function renderFeed(feed, list) {
    feed.innerHTML = "";
    list.forEach(function (product) {
        const post = document.createElement("div");
        post.className = "post";
        post.innerHTML =
            '<a href="product.html?id=' + product.id + '">' +
            '<img src="' + product.image + '" alt="' + product.name + '">' +
            '<div class="post-info">' +
            '<h3>' + product.name + '</h3>' +
            '<p>$' + product.price + '</p>' +
            '</div>' +
            '</a>';
        feed.appendChild(post);
    });
}

function showFeed() {
    const feed = document.getElementById("feed");
    if (!feed) return;

    const search = document.getElementById("search");
    const category = document.getElementById("category");
    const sort = document.getElementById("sort");
    const message = document.getElementById("feed-message");

    getCategories(products).forEach(function (name) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        category.appendChild(option);
    });

    function update() {
        const results = applyFeedOptions(products, {
            query: search.value,
            category: category.value,
            sort: sort.value
        });
        renderFeed(feed, results);
        message.textContent = results.length === 0 ? "No products match your search." : "";
    }

    search.addEventListener("input", update);
    category.addEventListener("change", update);
    sort.addEventListener("change", update);
    update();
}

function showProduct() {
    const container = document.getElementById("product");
    if (!container) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const product = products.find(function (p) { return p.id === id; });

    if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    const sizeOptions = product.sizes.map(function (s) {
        return '<option value="' + s + '">' + s + '</option>';
    }).join("");

    const colorOptions = product.colors.map(function (c) {
        return '<option value="' + c + '">' + c + '</option>';
    }).join("");

    container.innerHTML =
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<div class="product-info">' +
        '<h2>' + product.name + '</h2>' +
        '<p class="price">$' + product.price + '</p>' +
        '<p>' + product.description + '</p>' +
        '<label>Size</label>' +
        '<select id="size"><option value="">Choose a size</option>' + sizeOptions + '</select>' +
        '<label>Color</label>' +
        '<select id="color"><option value="">Choose a color</option>' + colorOptions + '</select>' +
        '<p id="message" class="message"></p>' +
        '<button id="add-btn">Add to Cart</button>' +
        '<button id="save-btn" class="save-btn"></button>' +
        '</div>';
}

function setupAddToCart() {
    const button = document.getElementById("add-btn");
    if (!button) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const product = products.find(function (p) { return p.id === id; });

    button.addEventListener("click", function () {
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;
        const message = document.getElementById("message");

        const result = addToCart(cartStore.load(), product, size, color);
        if (result.ok) {
            cartStore.save(result.cart);
        }
        message.style.color = result.ok ? "#080" : "#c00";
        message.textContent = result.message;
    });
}

function setupSaveButton() {
    const button = document.getElementById("save-btn");
    if (!button) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));

    function showState() {
        const saved = savedList.isSaved(id);
        button.textContent = saved ? "\u2665 Saved" : "\u2661 Save for later";
        button.classList.toggle("is-saved", saved);
    }

    button.addEventListener("click", function () {
        savedList.toggle(id);
        showState();
    });
    showState();
}

function showSaved() {
    const container = document.getElementById("saved");
    if (!container) return;

    const items = savedList.getProducts(products);

    if (items.length === 0) {
        container.innerHTML = "<h2>Saved Items</h2><p>You have no saved items yet.</p>";
        return;
    }

    let html = "<h2>Saved Items</h2>";
    items.forEach(function (product) {
        html +=
            '<div class="cart-item">' +
            '<a href="product.html?id=' + product.id + '"><img src="' + product.image + '" alt="' + product.name + '"></a>' +
            '<div class="cart-details">' +
            '<h3><a href="product.html?id=' + product.id + '">' + product.name + '</a></h3>' +
            '<p>$' + product.price + '</p>' +
            '<button class="remove-btn unsave-btn" data-id="' + product.id + '">Remove</button>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;

    document.querySelectorAll(".unsave-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            savedList.remove(Number(btn.dataset.id));
            showSaved();
        });
    });
}

function showCart() {
    const container = document.getElementById("cart");
    if (!container) return;

    const cart = cartStore.load();

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your Cart</h2><p>Your cart is empty.</p>";
        return;
    }

    let html = "<h2>Your Cart</h2>";

    cart.forEach(function (item, index) {
        const lineTotal = item.price * item.quantity;
        html +=
            '<div class="cart-item">' +
            '<img src="' + item.image + '" alt="' + item.name + '">' +
            '<div class="cart-details">' +
            '<h3>' + item.name + '</h3>' +
            '<p>Size: ' + item.size + ' | Color: ' + item.color + '</p>' +
            '<p>$' + item.price + ' x ' + item.quantity + ' = $' + lineTotal + '</p>' +
            '<button class="remove-btn" data-index="' + index + '">Remove</button>' +
            '</div>' +
            '</div>';
    });

    html += '<h3 class="cart-total">Total: $' + getCartTotal(cart) + '</h3>';
    container.innerHTML = html;

    document.querySelectorAll(".remove-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            cartStore.save(removeFromCart(cartStore.load(), Number(btn.dataset.index)));
            showCart();
        });
    });
}

showFeed();
showProduct();
setupAddToCart();
setupSaveButton();
showSaved();
showCart();