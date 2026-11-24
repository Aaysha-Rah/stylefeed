const test = require("node:test");
const assert = require("node:assert");
const { products } = require("../products.js");
const {
    validateSelection,
    addToCart,
    removeFromCart,
    getCartTotal,
    createCartStore
} = require("../cart.js");
const { createFakeStorage } = require("./fakeStorage.js");

const dress = products.find(function (p) { return p.name === "Floral Dress"; }); // stock 3
const tee = products.find(function (p) { return p.name === "Graphic Tee"; });

test("adding with a size and color puts one item in the cart", function () {
    const result = addToCart([], tee, "M", "Black");
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.message, "Added to cart!");
    assert.strictEqual(result.cart.length, 1);
    assert.strictEqual(result.cart[0].quantity, 1);
});

test("adding the same size and color again raises the quantity", function () {
    let cart = addToCart([], tee, "M", "Black").cart;
    cart = addToCart(cart, tee, "M", "Black").cart;
    assert.strictEqual(cart.length, 1);
    assert.strictEqual(cart[0].quantity, 2);
});

test("a different size is a separate cart line", function () {
    let cart = addToCart([], tee, "M", "Black").cart;
    cart = addToCart(cart, tee, "L", "Black").cart;
    assert.strictEqual(cart.length, 2);
});

test("adding without a size or color is rejected and nothing is added", function () {
    assert.notStrictEqual(validateSelection("", "Black"), "");
    assert.notStrictEqual(validateSelection("M", ""), "");
    const result = addToCart([], tee, "", "");
    assert.strictEqual(result.ok, false);
    assert.match(result.message, /choose a size and a color/);
    assert.strictEqual(result.cart.length, 0);
});

test("cannot add more than the stock, across different sizes", function () {
    let cart = [];
    cart = addToCart(cart, dress, "S", "Pink").cart;
    cart = addToCart(cart, dress, "S", "Pink").cart;
    cart = addToCart(cart, dress, "M", "Yellow").cart; // 3 in cart = stock
    const result = addToCart(cart, dress, "XS", "Pink");
    assert.strictEqual(result.ok, false);
    assert.strictEqual(result.message, "Sorry, only 3 in stock. You already have 3 in your cart.");
    assert.strictEqual(getCartTotal(result.cart), 38 * 3);
});

test("addToCart does not change the cart it was given", function () {
    const cart = addToCart([], tee, "M", "Black").cart;
    addToCart(cart, tee, "M", "Black");
    assert.strictEqual(cart[0].quantity, 1);
});

test("total adds price times quantity for every line", function () {
    let cart = addToCart([], tee, "M", "Black").cart;   // 20
    cart = addToCart(cart, tee, "M", "Black").cart;     // 20
    cart = addToCart(cart, dress, "S", "Pink").cart;    // 38
    assert.strictEqual(getCartTotal(cart), 78);
    assert.strictEqual(getCartTotal([]), 0);
});

test("remove takes out only the chosen line", function () {
    let cart = addToCart([], tee, "M", "Black").cart;
    cart = addToCart(cart, dress, "S", "Pink").cart;
    const after = removeFromCart(cart, 0);
    assert.strictEqual(after.length, 1);
    assert.strictEqual(after[0].name, "Floral Dress");
});

test("cart store saves and loads through the storage it is given", function () {
    const storage = createFakeStorage();
    const store = createCartStore(storage);
    assert.deepStrictEqual(store.load(), []);
    store.save(addToCart([], tee, "M", "Black").cart);
    assert.strictEqual(createCartStore(storage).load()[0].name, "Graphic Tee");
});

test("cart store treats damaged saved data as an empty cart", function () {
    const store = createCartStore(createFakeStorage({ cart: "{not json" }));
    assert.deepStrictEqual(store.load(), []);
});
