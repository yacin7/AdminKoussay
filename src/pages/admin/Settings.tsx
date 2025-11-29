import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your store settings and preferences</p>
        </div>

        <div className="space-y-6 max-w-4xl">
          {/* Store Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="Cookie Admin" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input id="storeEmail" type="email" defaultValue="contact@cookies.com" className="bg-background border-border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone</Label>
                  <Input id="storePhone" defaultValue="+216 12 345 678" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="DT (Tunisian Dinar)" className="bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Rue de la République, Tunis, Tunisia" className="bg-background border-border" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Delivery Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Delivery Fee (DT)</Label>
                  <Input id="deliveryFee" type="number" defaultValue="7" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order (DT)</Label>
                  <Input id="minOrder" type="number" defaultValue="100" className="bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryZones">Delivery Zones</Label>
                <Input id="deliveryZones" defaultValue="Tunis, Ariana, La Marsa" className="bg-background border-border" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Update Delivery Settings
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New Order Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for new orders</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Customer Messages</p>
                  <p className="text-sm text-muted-foreground">Notifications for customer inquiries</p>
                </div>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
