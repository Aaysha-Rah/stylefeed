// Catalog logic: pure functions that decide WHICH products to show.
// No DOM code here, so it can be tested in Node without a browser.

function searchProducts(list, query) {
    const text = (query || "").trim().toLowerCase();
    if (text === "") {
        return list.slice();
    }
    return list.filter(function (product) {
        return product.name.toLowerCase().includes(text);
    });
}

if (typeof module !== "undefined") {
    module.exports = {
        searchProducts: searchProducts
    };
}
