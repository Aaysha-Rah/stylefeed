const test = require("node:test");
const assert = require("node:assert");
const { products } = require("../products.js");
const {
    searchProducts,
    filterByCategory,
    getCategories,
    SORTERS,
    sortProducts,
    applyFeedOptions
} = require("../catalog.js");

function names(list) {
    return list.map(function (p) { return p.name; });
}

// US-04: search the feed
test("search returns products whose name contains the text", function () {
    assert.deepStrictEqual(names(searchProducts(products, "dress")), ["Floral Dress"]);
});

test("search ignores upper/lower case", function () {
    assert.deepStrictEqual(names(searchProducts(products, "DENIM")), ["Denim Jacket"]);
});

test("search ignores extra spaces around the text", function () {
    assert.deepStrictEqual(names(searchProducts(products, "   tee  ")), ["Graphic Tee"]);
});

test("empty search shows every product", function () {
    assert.strictEqual(searchProducts(products, "").length, 6);
    assert.strictEqual(searchProducts(products, "   ").length, 6);
    assert.strictEqual(searchProducts(products, undefined).length, 6);
});

test("search with no match returns an empty list", function () {
    assert.deepStrictEqual(searchProducts(products, "tuxedo"), []);
});

test("search does not change the original product list", function () {
    searchProducts(products, "dress");
    assert.strictEqual(products.length, 6);
});

// US-05: filter by category
test("filter shows only products in the chosen category", function () {
    assert.deepStrictEqual(names(filterByCategory(products, "Tops")), ["Graphic Tee", "Knit Sweater"]);
});

test("filter 'all' shows every product", function () {
    assert.strictEqual(filterByCategory(products, "all").length, 6);
});

test("filter with a category that has no products returns an empty list", function () {
    assert.deepStrictEqual(filterByCategory(products, "Hats"), []);
});

test("category list comes from the data, once each, A-Z", function () {
    assert.deepStrictEqual(getCategories(products), ["Bottoms", "Dresses", "Outerwear", "Shoes", "Tops"]);
});

// US-05: sort
test("sort by price low to high", function () {
    const prices = sortProducts(products, "price-low-high").map(function (p) { return p.price; });
    assert.deepStrictEqual(prices, [20, 35, 38, 42, 45, 60]);
});

test("sort by price high to low", function () {
    const prices = sortProducts(products, "price-high-low").map(function (p) { return p.price; });
    assert.deepStrictEqual(prices, [60, 45, 42, 38, 35, 20]);
});

test("sort by name A-Z", function () {
    assert.strictEqual(sortProducts(products, "name-a-z")[0].name, "Cargo Pants");
});

test("featured or unknown sort keeps the original order", function () {
    assert.deepStrictEqual(names(sortProducts(products, "featured")), names(products));
    assert.deepStrictEqual(names(sortProducts(products, "not-a-real-sort")), names(products));
});

test("sorting does not reorder the original product list", function () {
    sortProducts(products, "price-high-low");
    assert.strictEqual(products[0].name, "Denim Jacket");
});

test("Open/Closed: a new sort works by adding a table entry only", function () {
    SORTERS["stock-high-low"] = function (a, b) { return b.stock - a.stock; };
    assert.strictEqual(sortProducts(products, "stock-high-low")[0].name, "Graphic Tee");
    delete SORTERS["stock-high-low"];
});

// US-05: search + filter + sort together
test("search, filter, and sort combine", function () {
    const result = applyFeedOptions(products, { query: "", category: "Tops", sort: "price-high-low" });
    assert.deepStrictEqual(names(result), ["Knit Sweater", "Graphic Tee"]);
});

test("combined options with no match return an empty list", function () {
    const result = applyFeedOptions(products, { query: "dress", category: "Shoes", sort: "featured" });
    assert.deepStrictEqual(result, []);
});
