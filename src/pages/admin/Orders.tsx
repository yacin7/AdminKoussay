// src/app/admin/orders/page.tsx

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Package, Clock, Mail, Phone } from "lucide-react";
import { api } from "@/lib/api";
import { Toaster, toast } from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.getAllOrders();
      setOrders(data);
    } catch (err) {
      toast.error("Erreur chargement commandes");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.updateOrderStatus(id, status);
      toast.success("Statut mis à jour");
      loadOrders();
    } catch (err) {
      toast.error("Erreur mise à jour statut");
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <AdminLayout><div className="p-8">Chargement...</div></AdminLayout>;

  return (
    <AdminLayout>
      <Toaster />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Commandes</h1>

        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">ID</th>
                    <th className="text-left py-3">Client</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Total</th>
                    <th className="text-left py-3">Statut</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order._id} className="border-b hover:bg-muted/50">
                      <td className="py-4">#ORD-{order._id.slice(-6).toUpperCase()}</td>
                      <td className="py-4">{order.userId || "Anonyme"}</td>
                      <td className="py-4">{new Date(order.createdAt).toLocaleDateString("fr")}</td>
                      <td className="py-4 font-bold text-primary">{order.total} DT</td>
                      <td className="py-4">
                        <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                      </td>
                      <td className="py-4">
                        <Button size="sm" variant="ghost" onClick={() => { setSelected(order); setOpen(true); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Détails de la commande</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-6">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">#ORD-{selected._id.slice(-6).toUpperCase()}</h3>
                  <Badge className={getStatusBadge(selected.status)}>{selected.status}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Articles</h4>
                  {selected.items.map((item: any) => (
                    <div key={item._id} className="flex justify-between py-2">
                      <span>{item.quantity} × {item.productId?.name || "Produit supprimé"}</span>
                      <span>{item.price * item.quantity} DT</span>
                    </div>
                  ))}
                  <div className="font-bold text-xl mt-4 text-primary">
                    Total : {selected.total} DT
                  </div>
                </div>

                <div className="flex gap-4">
                  {selected.status === "Pending" && (
                    <>
                      <Button onClick={() => updateStatus(selected._id, "Processing")}>
                        Marquer en préparation
                      </Button>
                      <Button variant="destructive" onClick={() => updateStatus(selected._id, "Cancelled")}>
                        Annuler
                      </Button>
                    </>
                  )}
                  {selected.status === "Processing" && (
                    <Button onClick={() => updateStatus(selected._id, "Completed")}>
                      Marquer comme terminée
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}