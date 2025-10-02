const BASE_URL = "http://localhost:8080/api";

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

//================================================================

// == AUTHENTICATION Helpers

// === POST /api/auth/login
export async function login(email, password) {
    return request("/auth/login", "POST", { email, password });
}

// === POST /api/auth/login-username
export async function loginWithUsername(usernameOrEmail, password) {
    return request("/auth/login-username", "POST", { usernameOrEmail, password });
}

//================================================================

//== STORE helpers

// === GET /api/stores
export async function getStores() {
    return request("/stores", "GET");
}
// === GET /api/stores/{id}
export async function getStoreById(id) {
    return request(`/stores/${id}`, "GET");
}

//================================================================
//== PRODUCT helpers

export const getAllProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getProductsByStoreId = async (storeId) => {
    try {
        const response = await api.get(`/stores/${storeId}/products`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

//================================================================

/*
1. Autenticación POST /api/auth/register  2. Carrito de Compras DELETE /api/cart/items/{itemId} DELETE /api/cart/Clear GET /api/cart POST /api/cart PUT /api/cart/items/{itemId} 3. Pedidos GET /api/orders GET /api/orders/{orderId} GET /api/orders/status/{status} POST /api/orders 4. Productos GET /api/products GET /api/products/{id} GET /api/products/store/{storeId} GET /api/products/store/{storeId}/search GET /api/products/search 5. Tiendas GET /api/stores GET /api/stores/{id} GET /api/stores/type/{type}
*/