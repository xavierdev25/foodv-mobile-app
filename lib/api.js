const BASE_URL = "http://localhost:8080/api";

// Wrapper
export async function request(endpoint, method = "GET", body = null, auth = false, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (auth && token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
        throw new Error(data.message || "Error en la petición");
    }
    return data;
}

// AUTHENTICATION

export async function login(email, password) {
    return request("/auth/login", "POST", { email, password });
}

export async function loginWithUsername(usernameOrEmail, password) {
    return request("/auth/login-username", "POST", { usernameOrEmail, password });
}

// STORES

export async function getStores() {
    return request("/stores", "GET");
}

export async function getStoreById(id) {
    return request(`/stores/${id}`, "GET");
}

// PRODUCTS

export async function getAllProducts() {
    return request("/products", "GET");
}

export async function getProductById(id) {
    return request(`/products/${id}`, "GET");
}

export async function getProductsByStoreId(storeId) {
    return request(`/products/store/${storeId}`, "GET");
}

// CART helpers

export async function getCart(token) {
    return request("/cart", "GET", null, true, token);
}

export async function addToCart(productId, quantity, token) {
    return request("/cart/add", "POST", { productId, quantity }, true, token);
}

export async function updateCartItem(itemId, quantity, token) {
    return request(`/cart/items/${itemId}`, "PUT", { quantity }, true, token);
}

export async function removeFromCart(itemId, token) {
    return request(`/cart/items/${itemId}`, "DELETE", null, true, token);
}

export async function clearCart(token) {
    return request("/cart/clear", "DELETE", null, true, token);
}

// //================================================================
// //== ORDERS helpers

// //================================================================
// //== USERS helpers ?


/*
1. Autenticación POST /api/auth/register  2. Carrito de Compras DELETE /api/cart/items/{itemId} DELETE /api/cart/Clear GET /api/cart POST /api/cart PUT /api/cart/items/{itemId} 3. Pedidos GET /api/orders GET /api/orders/{orderId} GET /api/orders/status/{status} POST /api/orders 4. Productos GET /api/products GET /api/products/{id} GET /api/products/store/{storeId} GET /api/products/store/{storeId}/search GET /api/products/search 5. Tiendas GET /api/stores GET /api/stores/{id} GET /api/stores/type/{type}
*/