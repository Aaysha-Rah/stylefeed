// Cart logic: rules for what can go in the cart and how totals are worked out.
// No DOM code and no direct localStorage use, so every rule can be tested in Node.

function validateSelection(size, color) {
    if (!size || !color) {
        return "Please choose a size and a color before adding to cart.";
    }
    return "";
}

function countInCart(cart, productId) {
    let count = 0;
    cart.forEach(function (item) {
        if (item.id === productId) {
            count += item.quantity;
        }
    });
    return count;
}

// Returns { ok, message, cart }. The cart passed in is never changed;
// on success a new cart array is returned.
function addToCart(cart, product, size, color) {
    const error = validateSelection(size, color);
    if (error) {
        return { ok: false, message: error, cart: cart };
    }

    const inCart = countInCart(cart, product.id);
    if (inCart + 1 > product.stock) {
        return {
            ok: false,
            message: "Sorry, only " + product.stock + " in stock. You already have " + inCart + " in your cart.",
            cart: cart
        };
    }

    const updated = cart.map(function (item) { return Object.assign({}, item); });
    const existing = updated.find(function (item) {
        return item.id === product.id && item.size === size && item.color === color;
    });

    if (existing) {
        existing.quantity += 1;
    } else {
        updated.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            quantity: 1
        });
    }

    return { ok: true, message: "Added to cart!", cart: updated };
}

function removeFromCart(cart, index) {
    return cart.filter(function (item, i) { return i !== index; });
}

function getCartTotal(cart) {
    let total = 0;
    cart.forEach(function (item) {
        total += item.price * item.quantity;
    });
    return total;
}

// Dependency Inversion: the store is given a storage object (anything with
// getItem/setItem) instead of reaching for window.localStorage itself.
// The app passes localStorage; the tests pass a fake in-memory storage.
function createCartStore(storage) {
    const KEY = "cart";
    return {
        load: function () {
            try {
                const saved = storage.getItem(KEY);
                return saved ? JSON.parse(saved) : [];
            } catch (e) {
                return [];
            }
        },
        save: function (cart) {
            storage.setItem(KEY, JSON.stringify(cart));
        }
    };
}

if (typeof module !== "undefined") {
    module.exports = {
        validateSelection: validateSelection,
        countInCart: countInCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        getCartTotal: getCartTotal,
        createCartStore: createCartStore
    };
}
