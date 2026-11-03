# StyleFeed

StyleFeed is an Instagram-style clothing store web app. Customers browse clothing in an image feed, view product details, choose a size and color, and add items to a shopping cart that shows the total price.

**Author:** Aaysha Rahmath
**Course:** CS 319, Sprint 1

## Technologies
- HTML, CSS, and JavaScript (no frameworks)
- Browser localStorage for saving the cart

## Prerequisites
- A modern web browser (Chrome, Safari, Firefox, or Edge)
- No installation, build step, or server is required

## Installation
No dependencies to install. Download or clone the repository:

```
git clone https://github.com/Aaysha-Rah/stylefeed.git
cd stylefeed
```

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

To reset the cart, open your browser's developer console and run `localStorage.clear()`, then reload.

## Where data is stored
The cart is saved in the browser's localStorage. It stays after refreshing the page or closing and reopening the browser on the same computer. It is not shared between browsers or devices. Product data is not editable in the app. It is defined in `app.js`.

## Known limitations
- Search, filtering, and sorting are not implemented yet
- Saved Items and Add/Edit/Delete Product pages are not implemented yet
- There is no checkout, login, or payment
- The cart is only stored in one browser on one computer
- Stock is not reduced after items are added to the cart (it only limits how many can be added)
