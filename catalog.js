// Catalog logic: pure functions that decide WHICH products to show and in WHAT ORDER.
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

function filterByCategory(list, category) {
    if (!category || category === "all") {
        return list.slice();
    }
    return list.filter(function (product) {
        return product.category === category;
    });
}

// Lists each category once, in A-Z order, built from the product data itself,
// so a new category shows up in the dropdown without editing any code.
function getCategories(list) {
    const categories = [];
    list.forEach(function (product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    return categories.sort();
}

// Open/Closed: each sort option is one entry in this table.
// Adding a new sort means adding an entry here, not editing sortProducts.
const SORTERS = {
    "price-low-high": function (a, b) { return a.price - b.price; },
    "price-high-low": function (a, b) { return b.price - a.price; },
    "name-a-z": function (a, b) { return a.name.localeCompare(b.name); }
};

function sortProducts(list, sortKey) {
    const compare = SORTERS[sortKey];
    if (!compare) {
        return list.slice(); // "featured" or unknown key: keep the original order
    }
    return list.slice().sort(compare);
}

// Runs search, then category filter, then sort.
function applyFeedOptions(list, options) {
    const searched = searchProducts(list, options.query);
    const filtered = filterByCategory(searched, options.category);
    return sortProducts(filtered, options.sort);
}

if (typeof module !== "undefined") {
    module.exports = {
        searchProducts: searchProducts,
        filterByCategory: filterByCategory,
        getCategories: getCategories,
        SORTERS: SORTERS,
        sortProducts: sortProducts,
        applyFeedOptions: applyFeedOptions
    };
}
