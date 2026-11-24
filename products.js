// Sample product data for StyleFeed.
// Kept in its own file so changing the catalog never requires touching page code.
const products = [
    { id: 1, name: "Denim Jacket", price: 45, image: "images/denim jacket.webp", description: "Classic denim jacket.", sizes: ["S", "M", "L"], colors: ["Blue", "Black"], stock: 5 },
    { id: 2, name: "White Sneakers", price: 60, image: "images/sneakers.jpeg", description: "Clean everyday sneakers.", sizes: ["7", "8", "9", "10"], colors: ["White"], stock: 8 },
    { id: 3, name: "Floral Dress", price: 38, image: "images/floral dress.jpeg", description: "Light summer dress.", sizes: ["XS", "S", "M"], colors: ["Pink", "Yellow"], stock: 3 },
    { id: 4, name: "Graphic Tee", price: 20, image: "images/tee.jpeg", description: "Soft cotton tee.", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Gray"], stock: 10 },
    { id: 5, name: "Cargo Pants", price: 42, image: "images/cargo.jpeg", description: "Relaxed fit cargo pants.", sizes: ["M", "L"], colors: ["Green", "Tan"], stock: 4 },
    { id: 6, name: "Knit Sweater", price: 35, image: "images/sweater.jpeg", description: "Warm knit sweater.", sizes: ["S", "M", "L"], colors: ["Cream", "Navy"], stock: 6 }
];

if (typeof module !== "undefined") {
    module.exports = { products: products };
}
