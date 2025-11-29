// src/app/admin/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Package, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { Toaster, toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const categories = [
    { id: "christmas", name: "CHRISTMAS MENU" },
    { id: "mini-cookies", name: "Mini Cookies" },
    { id: "same-day", name: "SAME DAY DELIVERY!" },
    { id: "gift-sets", name: "Gift Sets" },
    { id: "brownies", name: "Brownies" },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch {
      toast.error("Erreur de chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  // Convertir fichier → Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject("Erreur lecture image");
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setPreviewImage(base64);
      } catch {
        toast.error("Image trop lourde ou corrompue");
      }
    }
  };

  // AJOUTER
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("image") as File;

    let imageUrl = "https://via.placeholder.com/400";

    if (file && file.size > 0) {
      try {
        toast.loading("Préparation de l'image...");
        imageUrl = await convertToBase64(file);
        toast.dismiss();
      } catch {
        return toast.error("Erreur avec l'image");
      }
    }

    const newProduct = {
      name: form.get("name") as string,
      price: Number(form.get("price")),
      stock: Number(form.get("stock")),
      description: (form.get("description") as string) || "",
      imageUrl,
      category: form.get("category") as string,
    };

    try {
      await api.createProduct(newProduct);
      toast.success("Produit ajouté !");
      setIsAddOpen(false);
      setPreviewImage(null);
      loadProducts();
    } catch {
      toast.error("Erreur ajout");
    }
  };

  // MODIFIER
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const form = new FormData(e.currentTarget);
    const file = form.get("image") as File;

    let imageUrl = editingProduct.imageUrl;

    if (file && file.size > 0) {
      try {
        toast.loading("Mise à jour image...");
        imageUrl = await convertToBase64(file);
        toast.dismiss();
      } catch {
        return toast.error("Erreur image");
      }
    }

    const updated = {
      name: form.get("name") as string,
      price: Number(form.get("price")),
      stock: Number(form.get("stock")),
      description: (form.get("description") as string) || "",
      imageUrl,
      category: form.get("category") as string,
    };

    try {
      await api.updateProduct(editingProduct._id, updated);
      toast.success("Modifié !");
      setIsEditOpen(false);
      setPreviewImage(null);
      loadProducts();
    } catch {
      toast.error("Erreur modification");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await api.deleteProduct(id);
      toast.success("Supprimé");
      loadProducts();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatus = (stock: number) => {
    if (stock === 0) return { text: "Rupture", color: "bg-destructive/10 text-destructive" };
    if (stock < 10) return { text: "Stock faible", color: "bg-warning/10 text-warning" };
    return { text: "En stock", color: "bg-success/10 text-success" };
  };

  const getCategoryName = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
  };

  if (loading) return <AdminLayout><div className="p-8 text-center">Chargement...</div></AdminLayout>;

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Produits</h1>
            <p className="text-muted-foreground">Gérez votre catalogue</p>
          </div>
          <Button onClick={() => { setIsAddOpen(true); setPreviewImage(null); }}>
            <Plus className="w-4 h-4 mr-2" /> Ajouter un produit
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const status = getStatus(product.stock);
            return (
              <Card key={product._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-start">
                    <Badge variant="outline" className={status.color}>
                      {status.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{product.price} DT</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <Package className="w-4 h-4" /> Stock : {product.stock}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Catégorie: {getCategoryName(product.category)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditingProduct(product);
                        setPreviewImage(product.imageUrl);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Éditer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* === Dialog Ajouter === */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un produit</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom du produit *</Label>
                <Input name="name" required />
              </div>
              <div className="space-y-2">
                <Label>Catégorie *</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prix (DT) *</Label>
                <Input name="price" type="number" min="0" required />
              </div>
              <div className="space-y-2">
                <Label>Stock *</Label>
                <Input name="stock" type="number" min="0" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Image *</Label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center">
                {previewImage ? (
                  <div className="relative inline-block">
                    <img src={previewImage} alt="Preview" className="max-w-full max-h-64 rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        const input = document.getElementById("add-img") as HTMLInputElement;
                        if (input) input.value = "";
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-3" />
                    <p>Choisir une image</p>
                  </div>
                )}
                <Input id="add-img" name="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-4" required />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setPreviewImage(null); }}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* === Dialog Modifier === */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input name="name" defaultValue={editingProduct.name} required />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select name="category" defaultValue={editingProduct.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prix (DT)</Label>
                  <Input name="price" type="number" defaultValue={editingProduct.price} required />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input name="stock" type="number" defaultValue={editingProduct.stock} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" rows={3} defaultValue={editingProduct.description} />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center">
                  <img
                    src={previewImage || editingProduct.imageUrl || "https://via.placeholder.com/400"}
                    alt="Produit"
                    className="max-w-full max-h-64 rounded-lg mx-auto"
                  />
                  <p className="mt-4 text-sm text-muted-foreground">Changer l'image :</p>
                  <Input name="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); setPreviewImage(null); }}>
                  Annuler
                </Button>
                <Button type="submit">Sauvegarder</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}