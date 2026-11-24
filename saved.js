// Saved items: the list of product IDs a customer has saved for later.
// Like the cart store, it is given its storage instead of using localStorage directly.

function createSavedList(storage) {
    const KEY = "saved";

    function getIds() {
        try {
            const saved = storage.getItem(KEY);
            const ids = saved ? JSON.parse(saved) : [];
            return Array.isArray(ids) ? ids : [];
        } catch (e) {
            return [];
        }
    }

    function setIds(ids) {
        storage.setItem(KEY, JSON.stringify(ids));
    }

    function isSaved(id) {
        return getIds().includes(id);
    }

    function add(id) {
        const ids = getIds();
        if (!ids.includes(id)) {
            ids.push(id);
            setIds(ids);
        }
    }

    function remove(id) {
        setIds(getIds().filter(function (savedId) { return savedId !== id; }));
    }

    // Saves the item if it is not saved yet, otherwise unsaves it.
    // Returns true when the item ends up saved.
    function toggle(id) {
        if (isSaved(id)) {
            remove(id);
            return false;
        }
        add(id);
        return true;
    }

    // Turns saved IDs back into product objects, skipping IDs that no longer exist.
    function getProducts(allProducts) {
        return getIds()
            .map(function (id) {
                return allProducts.find(function (p) { return p.id === id; });
            })
            .filter(Boolean);
    }

    return {
        getIds: getIds,
        isSaved: isSaved,
        add: add,
        remove: remove,
        toggle: toggle,
        getProducts: getProducts
    };
}

if (typeof module !== "undefined") {
    module.exports = { createSavedList: createSavedList };
}
