import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "156",
      icon: ShoppingCart,
      trend: "+12%",
      color: "text-primary",
    },
    {
      title: "Products",
      value: "28",
      icon: Package,
      trend: "+3",
      color: "text-success",
    },
    {
      title: "Revenue",
      value: "45,230 DT",
      icon: TrendingUp,
      trend: "+18%",
      color: "text-warning",
    },
    {
      title: "Customers",
      value: "89",
      icon: Users,
      trend: "+7",
      color: "text-info",
    },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Ahmed Ben Ali", total: "285 DT", status: "Completed", date: "26 Nov 2025" },
    { id: "#ORD-002", customer: "Fatima Karim", total: "450 DT", status: "Pending", date: "26 Nov 2025" },
    { id: "#ORD-003", customer: "Mohamed Said", total: "320 DT", status: "Processing", date: "25 Nov 2025" },
    { id: "#ORD-004", customer: "Leila Mansour", total: "750 DT", status: "Completed", date: "25 Nov 2025" },
    { id: "#ORD-005", customer: "Karim Bouaziz", total: "200 DT", status: "Completed", date: "24 Nov 2025" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Processing":
        return "bg-info/10 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-success mt-1">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{order.date}</td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{order.total}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
