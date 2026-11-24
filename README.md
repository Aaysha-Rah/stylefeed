# StyleFeed

StyleFeed is an Instagram-style clothing store web app. Customers browse clothing in an image feed, view product details, choose a size and color, and add items to a shopping cart that shows the total price.

**Author:** Aaysha Rahmath Shamsus Zackey
**Course:** CS 319, Sprint 2

## Technologies
- HTML, CSS, and JavaScript (no frameworks)
- Browser localStorage for saving the cart

## Prerequisites
- A modern web browser (Chrome, Safari, Firefox, or Edge)
- No installation, build step, or server is required to use the app
- To run the automated tests: [Node.js](https://nodejs.org) version 20 or newer (check with `node --version`). The tests use Node's built-in test runner, so there are no packages to install.

## Installation
No dependencies to install. Download or clone the repository:

```
git clone https://github.com/Aaysha-Rah/stylefeed.git
cd stylefeed
```

## Running the automated tests
From the `stylefeed` folder (the one that contains `package.json`), run:

```
npm test
```

(`node --test` does the same thing.) Node finds every `*.test.js` file in the `tests/` folder and prints a summary ending in `# fail 0` when everything passes.

## Configuration
None. There are no environment variables, API keys, or settings. Product data is sample data (fictional products) stored in `app.js`, and product photos are in the `images/` folder.

## Running the application
1. Open the `stylefeed` folder.
2. Double-click `index.html` to open it in your browser.

You should see the StyleFeed header and a feed of 6 clothing products.

## Trying the Sprint 1 functionality
1. **Browse the feed:** On the home page, scroll through the 6 products. Each shows an image, name, and price.
2. **View details:** Click a product. The details page shows its image, name, price, description, and its available sizes and colors.
3. **Validation:** Click **Add to Cart** without choosing a size and color. A red error message appears and nothing is added.
4. **Add to cart:** Choose a size and color, then click **Add to Cart**. A green "Added to cart!" message appears.
5. **Stock limit:** Open the Floral Dress (3 in stock) and add it 4 times. The 4th attempt shows a red message that only 3 are in stock.
6. **View the cart:** Click **Cart** in the top right. Items show with quantity and price, with the total at the bottom. Click **Remove** to remove an item.
7. **Persistence:** Refresh the Cart page. Your items and total are still there.

## Trying the Sprint 2 functionality
1. **Search:** On the home page, type `dress` in the search box. Only the Floral Dress stays in the feed. Search ignores upper/lower case.
2. **No results:** Type `tuxedo`. The feed empties and shows "No products match your search." Clear the box to see all 6 products again.
3. **Filter:** Choose **Tops** in the category dropdown. Only the Graphic Tee and Knit Sweater show. Choose **All categories** to undo.
4. **Sort:** Choose **Price: low to high**. The Graphic Tee ($20) is first and the White Sneakers ($60) are last. Search, filter, and sort work together.
5. **Save for later:** Open any product and click **Save for later**. The button changes to **Saved**. Click it again to unsave.
6. **Saved Items page:** Click **Saved** in the top right. Saved products show with image, name, and price. Click a product to open it, or **Remove** to take it off the list. With nothing saved, the page says "You have no saved items yet."
7. **Persistence:** Refresh the Saved page. Your saved items are still there.

To reset the cart and saved items, open your browser's developer console and run `localStorage.clear()`, then reload.

## Project structure
| File | What it does |
|---|---|
| `index.html`, `product.html`, `cart.html`, `saved.html` | The four pages |
| `products.js` | Sample product data |
| `catalog.js` | Search, category filter, and sort logic |
| `cart.js` | Cart rules (validation, stock limit, totals) and cart storage |
| `saved.js` | Saved-items list and its storage |
| `app.js` | Page code only: reads inputs, shows results, wires buttons |
| `tests/` | Automated tests (`*.test.js`) and a fake storage used by them |

## Where data is stored
The cart and saved items are saved in the browser's localStorage. It stays after refreshing the page or closing and reopening the browser on the same computer. It is not shared between browsers or devices. Product data is not editable in the app. It is defined in `app.js`.

## Known limitations
- Search matches product names only (not descriptions or colors)
- Search, filter, and sort choices reset when you leave the home page
- Add/Edit/Delete Product pages are not implemented yet
- Saved items and the cart are only stored in one browser on one computer
- There is no checkout, login, or payment
- Stock is not reduced after items are added to the cart (it only limits how many can be added)