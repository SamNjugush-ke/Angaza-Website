import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, Zap } from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsManager() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "launched",
    features: "",
  });

  // Mock data for demo
  const products = [
    {
      id: "1",
      name: "Angaza STEM Hub",
      description: "Comprehensive STEM education center with robotics, coding, and AI programs",
      status: "launched",
      features: "Robotics, AI/ML, Coding, Drone Training",
    },
    {
      id: "2",
      name: "Angaza MSME Lab",
      description: "Digital platform for small business management and growth",
      status: "launched",
      features: "Bookkeeping, POS, Business Intelligence, Networking",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Product saved successfully");
    setFormData({ name: "", description: "", status: "launched", features: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground">Manage Angaza products and services</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} />
          Create Product
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="planning">Planning</option>
                  <option value="development">Development</option>
                  <option value="launched">Launched</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Key Features</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg min-h-16"
                placeholder="Comma-separated list of features"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Create Product</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-3">{product.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {product.status}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <strong>Features:</strong> {product.features}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="sm">
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
