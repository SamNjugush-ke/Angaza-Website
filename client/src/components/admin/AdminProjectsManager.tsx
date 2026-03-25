import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";

export default function AdminProjectsManager() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ongoing",
    funding: "",
    partners: "",
  });

  // Mock data for demo
  const projects = [
    {
      id: "1",
      title: "STEM Hub Expansion",
      description: "Expanding the STEM Hub to reach more students",
      status: "ongoing",
      funding: "$50,000",
      partners: "Tech Partners Kenya",
    },
    {
      id: "2",
      title: "MSME Lab Launch",
      description: "Launching the digital MSME Lab platform",
      status: "ongoing",
      funding: "$75,000",
      partners: "Digital Kenya",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project saved successfully");
    setFormData({ title: "", description: "", status: "ongoing", funding: "", partners: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground">Manage organizational projects and initiatives</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} />
          Create Project
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Funding Amount</label>
                <input
                  type="text"
                  value={formData.funding}
                  onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="e.g., $50,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Partners</label>
              <input
                type="text"
                value={formData.partners}
                onChange={(e) => setFormData({ ...formData, partners: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
                placeholder="Comma-separated list of partners"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Create Project</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    {project.funding}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {project.partners}
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
