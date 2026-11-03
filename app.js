const products = [
    { id: 1, name: "Denim Jacket", price: 45, image: "https://picsum.photos/seed/jacket/470/470", description: "Classic denim jacket.", sizes: ["S", "M", "L"], colors: ["Blue", "Black"], stock: 5 },
    { id: 2, name: "White Sneakers", price: 60, image: "https://picsum.photos/seed/sneakers/470/470", description: "Clean everyday sneakers.", sizes: ["7", "8", "9", "10"], colors: ["White"], stock: 8 },
    { id: 3, name: "Floral Dress", price: 38, image: "https://picsum.photos/seed/dress/470/470", description: "Light summer dress.", sizes: ["XS", "S", "M"], colors: ["Pink", "Yellow"], stock: 3 },
    { id: 4, name: "Graphic Tee", price: 20, image: "https://picsum.photos/seed/tee/470/470", description: "Soft cotton tee.", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Gray"], stock: 10 },
    { id: 5, name: "Cargo Pants", price: 42, image: "https://picsum.photos/seed/pants/470/470", description: "Relaxed fit cargo pants.", sizes: ["M", "L"], colors: ["Green", "Tan"], stock: 4 },
    { id: 6, name: "Knit Sweater", price: 35, image: "https://picsum.photos/seed/sweater/470/470", description: "Warm knit sweater.", sizes: ["S", "M", "L"], colors: ["Cream", "Navy"], stock: 6 }
];

function showFeed() {
    const feed = document.getElementById("feed");
    if (!feed) return;

    products.forEach(function (product) {
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
        '</div>';
}
function setupAddToCart() {
    const button = document.getElementById("add-btn");
    if (!button) return;

    button.addEventListener("click", function () {
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;
        const message = document.getElementById("message");

        if (size === "" || color === "") {
            message.style.color = "#c00";
            message.textContent = "Please choose a size and a color before adding to cart.";
            return;
        }

        message.style.color = "#080";
        message.textContent = "Selected size " + size + " and color " + color + ".";
    });
}

function setupAddToCart() {
    function getCart() {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
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

            if (size === "" || color === "") {
                message.style.color = "#c00";
                message.textContent = "Please choose a size and a color before adding to cart.";
                return;
            }

            const cart = getCart();

            let inCart = 0;
            cart.forEach(function (item) {
                if (item.id === product.id) {
                    inCart += item.quantity;
                }
            });

            if (inCart + 1 > product.stock) {
                message.style.color = "#c00";
                message.textContent = "Sorry, only " + product.stock + " in stock. You already have " + inCart + " in your cart.";
                return;
            }

            const existing = cart.find(function (item) {
                return item.id === product.id && item.size === size && item.color === color;
            });

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: size,
                    color: color,
                    quantity: 1
                });
            }

            saveCart(cart);
            message.style.color = "#080";
            message.textContent = "Added to cart!";
        });
    }
}
showFeed();
showProduct();
setupAddToCart();

