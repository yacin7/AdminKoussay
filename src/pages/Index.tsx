import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-foreground">🍪 Cookie Shop</h1>
        <p className="text-xl text-muted-foreground">Welcome to the Cookie Admin System</p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/admin">Access Backoffice</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
