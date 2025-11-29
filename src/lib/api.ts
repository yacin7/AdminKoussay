// src/lib/api.ts
const API_URL = "http://localhost:5000";

export const api = {
  // === PRODUITS ===
  getProducts: async () => {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) throw new Error("Impossible de charger les produits");
    return res.json();
  },

  getProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    if (!res.ok) throw new Error("Produit non trouvé");
    return res.json();
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création produit");
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur mise à jour");
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression");
    return res.json();
  },

  // === COMMANDES ===
  getAllOrders: async () => {
    const res = await fetch(`${API_URL}/api/orders`);
    if (!res.ok) throw new Error("Impossible de charger les commandes");
    return res.json();
  },

  getOrdersByUser: async (userId: string) => {
    const res = await fetch(`${API_URL}/api/orders/${userId}`);
    if (!res.ok) throw new Error("Commandes introuvables");
    return res.json();
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Impossible de mettre à jour le statut");
    return res.json();
  },
};