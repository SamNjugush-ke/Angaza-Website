import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Trash2, Edit2, Plus, Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

export default function AdminEventsManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "bootcamp" as const,
    type: "stem" as const,
    startDate: "",
    endDate: "",
    location: "",
    capacity: "",
    imageUrl: "",
  });

  const eventsQuery = trpc.admin.events.getAll.useQuery();
  const createMutation = trpc.admin.events.create.useMutation();
  const updateMutation = trpc.admin.events.update.useMutation();
  const deleteMutation = trpc.admin.events.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          eventId: editingId,
          title: formData.title,
          description: formData.description,
        });
        toast.success("Event updated successfully");
      } else {
        await createMutation.mutateAsync({
          ...formData,
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
          capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        });
        toast.success("Event created successfully");
      }

      setFormData({
        title: "",
        description: "",
        category: "bootcamp",
        type: "stem",
        startDate: "",
        endDate: "",
        location: "",
        capacity: "",
        imageUrl: "",
      });
      setEditingId(null);
      setShowForm(false);
      eventsQuery.refetch();
    } catch (error) {
      toast.error("Failed to save event");
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteMutation.mutateAsync({ eventId });
      toast.success("Event deleted successfully");
      eventsQuery.refetch();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Events & Bootcamps</h2>
          <p className="text-muted-foreground">Manage STEM bootcamps, workshops, and training events</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: "",
              description: "",
              category: "bootcamp",
              type: "stem",
              startDate: "",
              endDate: "",
              location: "",
              capacity: "",
              imageUrl: "",
            });
          }}
          className="gap-2"
        >
          <Plus size={16} />
          Create Event
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="bootcamp">Bootcamp</option>
                  <option value="workshop">Workshop</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
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
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? "Update Event" : "Create Event"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {eventsQuery.isLoading ? (
          <Card className="p-6 text-center text-muted-foreground">Loading events...</Card>
        ) : eventsQuery.data?.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No events created yet.</Card>
        ) : (
          eventsQuery.data?.map((event: any) => (
            <Card key={event.eventId} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {event.location}
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {event.capacity} participants
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingId(event.eventId);
                      setFormData({
                        title: event.title,
                        description: event.description || "",
                        category: event.category || "bootcamp",
                        type: event.type || "stem",
                        startDate: event.startDate,
                        endDate: event.endDate,
                        location: event.location || "",
                        capacity: event.capacity?.toString() || "",
                        imageUrl: event.imageUrl || "",
                      });
                      setShowForm(true);
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(event.eventId)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
