import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Calendar, FileText, Image, Users, Settings, Menu, X, LogOut, Plus, Trash2, Eye, EyeOff, Loader2, Edit2, Star, Link as LinkIcon, Zap, Briefcase } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";
import { useNotifications } from "@/hooks/useNotifications";
import { useState } from "react";

type Tab = "events" | "blog" | "gallery" | "team" | "testimonials" | "resources" | "settings" | "social" | "stem" | "msme";

type EditingBlogPost = {
  postId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: string;
} | null;

type EditingEvent = {
  eventId: string;
  title: string;
  description: string;
  category: "bootcamp" | "workshop" | "training" | "other";
  type: "stem" | "msme" | "digital" | "other";
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  imageUrl: string;
} | null;

type EditingTeamMember = {
  memberId: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
  linkedinUrl: string;
} | null;

type EditingTestimonial = {
  testimonialId: string;
  name: string;
  businessName: string;
  role: string;
  content: string;
  imageUrl: string;
  category: "msme" | "stem" | "digital";
  rating: number;
} | null;

export default function AdminDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const notifications = useNotifications();
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Blog state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<EditingBlogPost>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
  });

  // Event state
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EditingEvent>(null);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    category: "bootcamp" as const,
    type: "stem" as const,
    startDate: "",
    endDate: "",
    location: "",
    capacity: 0,
    imageUrl: "",
  });

  // Team state
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<EditingTeamMember>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: "",
    position: "",
    bio: "",
    photoUrl: "",
    linkedinUrl: "",
  });

  // Testimonials state
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<EditingTestimonial>(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    businessName: "",
    role: "",
    content: "",
    imageUrl: "",
    category: "msme" as "msme" | "stem" | "digital",
    rating: 5,
  });

  // Social Media state
  const [socialMediaFormData, setSocialMediaFormData] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  // STEM Hub state
  const [stemHubFormData, setStemHubFormData] = useState({
    title: "",
    description: "",
    features: "",
  });

  // MSME Lab state
  const [msmeLabFormData, setMsmeLabFormData] = useState({
    title: "",
    description: "",
    features: "",
  });

  // Queries
  const { data: events = [], isLoading: eventsLoading, refetch: refetchEvents } = trpc.admin.public.events.useQuery();
  const { data: blogPosts = [], isLoading: blogLoading, refetch: refetchBlog } = trpc.admin.public.blogPosts.useQuery();
  const { data: galleryImages = [], isLoading: galleryLoading, refetch: refetchGallery } = trpc.admin.public.gallery.useQuery();
  const { data: teamMembers = [], isLoading: teamLoading, refetch: refetchTeam } = trpc.admin.public.team.useQuery();
  const { data: testimonials = [], isLoading: testimonialsLoading, refetch: refetchTestimonials } = trpc.admin.public.testimonials.useQuery();
  const { data: socialMedia, refetch: refetchSocialMedia } = trpc.admin.public.socialMedia.useQuery();
  const { data: stemHub, refetch: refetchStemHub } = trpc.admin.public.stemHub.useQuery();
  const { data: msmeLabFeatures, refetch: refetchMsmeLab } = trpc.admin.public.msmeLabFeatures.useQuery();

  // Mutations
  const createEventMutation = trpc.admin.events.create.useMutation();
  const updateEventMutation = trpc.admin.events.update.useMutation();
  const deleteEventMutation = trpc.admin.events.delete.useMutation();

  const createBlogMutation = trpc.admin.blog.create.useMutation();
  const updateBlogMutation = trpc.admin.blog.update.useMutation();
  const deleteBlogMutation = trpc.admin.blog.delete.useMutation();
  const deleteGalleryMutation = trpc.admin.gallery.delete.useMutation();
  const createGalleryMutation = trpc.admin.gallery.create.useMutation();

  const createTeamMutation = trpc.admin.team.create.useMutation();
  const updateTeamMutation = trpc.admin.team.update.useMutation();
  const deleteTeamMutation = trpc.admin.team.delete.useMutation();

  const createTestimonialMutation = trpc.admin.testimonials.create.useMutation();
  const updateTestimonialMutation = trpc.admin.testimonials.update.useMutation();
  const deleteTestimonialMutation = trpc.admin.testimonials.delete.useMutation();

  const updateSocialMediaMutation = trpc.admin.updateSocialMedia.useMutation();
  const updateStemHubMutation = trpc.admin.updateStemHub.useMutation();
  const updateMsmeLabMutation = trpc.admin.updateMsmeLab.useMutation();

  // Event handlers
  const handleCreateEvent = async () => {
    if (!eventFormData.title || !eventFormData.description) {
      notifications.error("Please fill in all required fields");
      return;
    }
    try {
      await createEventMutation.mutateAsync({
        title: eventFormData.title,
        description: eventFormData.description,
        category: eventFormData.category,
        type: eventFormData.type,
        startDate: new Date(eventFormData.startDate),
        endDate: new Date(eventFormData.endDate),
        location: eventFormData.location,
        capacity: eventFormData.capacity,
        imageUrl: eventFormData.imageUrl,
      });
      notifications.success("Event created successfully");
      setEventFormData({
        title: "",
        description: "",
        category: "bootcamp",
        type: "stem",
        startDate: "",
        endDate: "",
        location: "",
        capacity: 0,
        imageUrl: "",
      });
      setShowEventForm(false);
      refetchEvents();
    } catch (error) {
      notifications.error("Failed to create event");
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;
    try {
      await updateEventMutation.mutateAsync({
        eventId: editingEvent.eventId,
        title: eventFormData.title,
        description: eventFormData.description,
      });
      notifications.success("Event updated successfully");
      setEditingEvent(null);
      setShowEventForm(false);
      refetchEvents();
    } catch (error) {
      notifications.error("Failed to update event");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEventMutation.mutateAsync({ eventId });
      notifications.success("Event deleted successfully");
      refetchEvents();
    } catch (error) {
      notifications.error("Failed to delete event");
    }
  };

  // Blog handlers
  const handleCreateBlog = async () => {
    if (!blogFormData.title || !blogFormData.content) {
      notifications.error("Please fill in title and content");
      return;
    }
    try {
      await createBlogMutation.mutateAsync({
        title: blogFormData.title,
        slug: blogFormData.slug || blogFormData.title.toLowerCase().replace(/\s+/g, "-"),
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        category: blogFormData.category,
        tags: blogFormData.tags,
        featuredImage: blogFormData.featuredImage,
      });
      notifications.success("Blog post created successfully");
      setBlogFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        featuredImage: "",
      });
      setShowBlogForm(false);
      refetchBlog();
    } catch (error) {
      notifications.error("Failed to create blog post");
    }
  };

  const handleUpdateBlog = async () => {
    if (!editingBlog) return;
    try {
      await updateBlogMutation.mutateAsync({
        postId: editingBlog.postId,
        title: blogFormData.title,
        content: blogFormData.content,
      });
      notifications.success("Blog post updated successfully");
      setEditingBlog(null);
      setShowBlogForm(false);
      refetchBlog();
    } catch (error) {
      notifications.error("Failed to update blog post");
    }
  };

  const handleDeleteBlog = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlogMutation.mutateAsync({ postId });
      notifications.success("Blog post deleted successfully");
      refetchBlog();
    } catch (error) {
      notifications.error("Failed to delete blog post");
    }
  };

  // Gallery handlers
  const handleDeleteGallery = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteGalleryMutation.mutateAsync({ imageId });
      notifications.success("Image deleted successfully");
      refetchGallery();
    } catch (error) {
      notifications.error("Failed to delete image");
    }
  };

  const handleUploadGallery = async (imageUrl: string) => {
    try {
      await createGalleryMutation.mutateAsync({
        imageUrl,
        title: "Gallery Image",
        description: "",
        album: "General",
      });
      notifications.success("Image uploaded successfully");
      refetchGallery();
    } catch (error) {
      notifications.error("Failed to upload image");
    }
  };

  // Team handlers
  const handleCreateTeam = async () => {
    if (!teamFormData.name || !teamFormData.position) {
      notifications.error("Please fill in name and position");
      return;
    }
    try {
      await createTeamMutation.mutateAsync({
        name: teamFormData.name,
        position: teamFormData.position,
        bio: teamFormData.bio,
        photoUrl: teamFormData.photoUrl,
        linkedinUrl: teamFormData.linkedinUrl,
      });
      notifications.success("Team member added successfully");
      setTeamFormData({
        name: "",
        position: "",
        bio: "",
        photoUrl: "",
        linkedinUrl: "",
      });
      setShowTeamForm(false);
      refetchTeam();
    } catch (error) {
      notifications.error("Failed to add team member");
    }
  };

  const handleUpdateTeam = async () => {
    if (!editingTeam) return;
    try {
      await updateTeamMutation.mutateAsync({
        memberId: editingTeam.memberId,
        name: teamFormData.name,
        position: teamFormData.position,
        bio: teamFormData.bio,
        linkedinUrl: teamFormData.linkedinUrl,
      });
      notifications.success("Team member updated successfully");
      setEditingTeam(null);
      setShowTeamForm(false);
      refetchTeam();
    } catch (error) {
      notifications.error("Failed to update team member");
    }
  };

  const handleDeleteTeam = async (memberId: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamMutation.mutateAsync({ memberId });
      notifications.success("Team member deleted successfully");
      refetchTeam();
    } catch (error) {
      notifications.error("Failed to delete team member");
    }
  };

  // Testimonial handlers
  const handleCreateTestimonial = async () => {
    if (!testimonialFormData.name || !testimonialFormData.content) {
      notifications.error("Please fill in name and content");
      return;
    }
    try {
      await createTestimonialMutation.mutateAsync({
        name: testimonialFormData.name,
        businessName: testimonialFormData.businessName,
        role: testimonialFormData.role,
        content: testimonialFormData.content,
        imageUrl: testimonialFormData.imageUrl,
        category: testimonialFormData.category,
        rating: testimonialFormData.rating,
      });
      notifications.success("Testimonial created successfully");
      setTestimonialFormData({
        name: "",
        businessName: "",
        role: "",
        content: "",
        imageUrl: "",
        category: "msme",
        rating: 5,
      });
      setShowTestimonialForm(false);
      refetchTestimonials();
    } catch (error) {
      notifications.error("Failed to create testimonial");
    }
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial) return;
    try {
      await updateTestimonialMutation.mutateAsync({
        testimonialId: editingTestimonial.testimonialId,
        name: testimonialFormData.name,
        businessName: testimonialFormData.businessName,
        role: testimonialFormData.role,
        content: testimonialFormData.content,
        imageUrl: testimonialFormData.imageUrl,
        category: testimonialFormData.category,
        rating: testimonialFormData.rating,
      });
      notifications.success("Testimonial updated successfully");
      setEditingTestimonial(null);
      setShowTestimonialForm(false);
      refetchTestimonials();
    } catch (error) {
      notifications.error("Failed to update testimonial");
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonialMutation.mutateAsync({ testimonialId });
      notifications.success("Testimonial deleted successfully");
      refetchTestimonials();
    } catch (error) {
      notifications.error("Failed to delete testimonial");
    }
  };

  // Social Media handlers
  const handleUpdateSocialMedia = async () => {
    try {
      await updateSocialMediaMutation.mutateAsync({
        facebook: socialMediaFormData.facebook,
        twitter: socialMediaFormData.twitter,
        linkedin: socialMediaFormData.linkedin,
        instagram: socialMediaFormData.instagram,
      });
      notifications.success("Social media links updated successfully");
      refetchSocialMedia();
    } catch (error) {
      notifications.error("Failed to update social media links");
    }
  };

  // STEM Hub handlers
  const handleUpdateStemHub = async () => {
    try {
      await updateStemHubMutation.mutateAsync({
        title: stemHubFormData.title,
        description: stemHubFormData.description,
        features: stemHubFormData.features,
      });
      notifications.success("STEM Hub settings updated successfully");
      refetchStemHub();
    } catch (error) {
      notifications.error("Failed to update STEM Hub settings");
    }
  };

  // MSME Lab handlers
  const handleUpdateMsmeLab = async () => {
    try {
      await updateMsmeLabMutation.mutateAsync({
        title: msmeLabFormData.title,
        description: msmeLabFormData.description,
        features: msmeLabFormData.features,
      });
      notifications.success("MSME Lab settings updated successfully");
      refetchMsmeLab();
    } catch (error) {
      notifications.error("Failed to update MSME Lab settings");
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You do not have permission to access the admin dashboard.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-0"} bg-slate-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {[
              { id: "events", icon: Calendar, label: "Events" },
              { id: "blog", icon: FileText, label: "Blog Posts" },
              { id: "gallery", icon: Image, label: "Gallery" },
              { id: "team", icon: Users, label: "Team" },
              { id: "testimonials", icon: Star, label: "Testimonials" },
              { id: "resources", icon: Briefcase, label: "Resources" },
              { id: "social", icon: LinkIcon, label: "Social Media" },
              { id: "stem", icon: Zap, label: "STEM Hub" },
              { id: "msme", icon: Briefcase, label: "MSME Lab" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded transition ${
                  activeTab === item.id
                    ? "bg-teal-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-700 p-6">
          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-200 rounded"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>

          {/* Events Tab */}
          {activeTab === "events" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Events</h1>
                <Button onClick={() => setShowEventForm(!showEventForm)}>
                  <Plus className="w-4 h-4 mr-2" /> New Event
                </Button>
              </div>

              {showEventForm && (
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Event Title"
                      value={eventFormData.title}
                      onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Event Description"
                      value={eventFormData.description}
                      onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={eventFormData.category}
                        onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value as any })}
                        className="border rounded px-3 py-2"
                      >
                        <option value="bootcamp">Bootcamp</option>
                        <option value="workshop">Workshop</option>
                        <option value="training">Training</option>
                        <option value="other">Other</option>
                      </select>
                      <select
                        value={eventFormData.type}
                        onChange={(e) => setEventFormData({ ...eventFormData, type: e.target.value as any })}
                        className="border rounded px-3 py-2"
                      >
                        <option value="stem">STEM</option>
                        <option value="msme">MSME</option>
                        <option value="digital">Digital</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        value={eventFormData.startDate}
                        onChange={(e) => setEventFormData({ ...eventFormData, startDate: e.target.value })}
                      />
                      <Input
                        type="date"
                        value={eventFormData.endDate}
                        onChange={(e) => setEventFormData({ ...eventFormData, endDate: e.target.value })}
                      />
                    </div>
                    <Input
                      placeholder="Location"
                      value={eventFormData.location}
                      onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Capacity"
                      value={eventFormData.capacity}
                      onChange={(e) => setEventFormData({ ...eventFormData, capacity: parseInt(e.target.value) })}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Event Image</label>
                      <ImageUpload
                        onUpload={(url: string) => setEventFormData({ ...eventFormData, imageUrl: url })}
                      />
                      {eventFormData.imageUrl && (
                        <img src={eventFormData.imageUrl} alt="Event" className="mt-2 w-32 h-32 object-cover rounded" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {editingEvent ? "Update Event" : "Create Event"}
                      </Button>
                      {editingEvent && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingEvent(null);
                            setShowEventForm(false);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Events List */}
              <div className="space-y-4">
                {eventsLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : events.length === 0 ? (
                  <p className="text-muted-foreground">No events yet</p>
                ) : (
                  events.map((event: any) => (
                    <Card key={event.eventId} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()} | {event.location}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingEvent({
                                eventId: event.eventId,
                                title: event.title,
                                description: event.description,
                                category: event.category,
                                type: event.type,
                                startDate: new Date(event.startDate).toISOString().split("T")[0],
                                endDate: new Date(event.endDate).toISOString().split("T")[0],
                                location: event.location || "",
                                capacity: event.capacity || 0,
                                imageUrl: event.imageUrl || "",
                              });
                              setEventFormData({
                                title: event.title,
                                description: event.description,
                                category: event.category,
                                type: event.type,
                                startDate: new Date(event.startDate).toISOString().split("T")[0],
                                endDate: new Date(event.endDate).toISOString().split("T")[0],
                                location: event.location || "",
                                capacity: event.capacity || 0,
                                imageUrl: event.imageUrl || "",
                              });
                              setShowEventForm(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.eventId)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === "blog" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Button onClick={() => setShowBlogForm(!showBlogForm)}>
                  <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
              </div>

              {showBlogForm && (
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Post Title"
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                    />
                    <Input
                      placeholder="Slug"
                      value={blogFormData.slug}
                      onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                    />
                    <Textarea
                      placeholder="Excerpt"
                      value={blogFormData.excerpt}
                      onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content</label>
                      <RichTextEditor
                        value={blogFormData.content}
                        onChange={(content) => setBlogFormData({ ...blogFormData, content })}
                      />
                    </div>
                    <Input
                      placeholder="Category"
                      value={blogFormData.category}
                      onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    />
                    <Input
                      placeholder="Tags (comma separated)"
                      value={blogFormData.tags}
                      onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Featured Image</label>
                      <ImageUpload
                        onUpload={(url: string) => setBlogFormData({ ...blogFormData, featuredImage: url })}
                      />
                      {blogFormData.featuredImage && (
                        <img src={blogFormData.featuredImage} alt="Featured" className="mt-2 w-32 h-32 object-cover rounded" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={editingBlog ? handleUpdateBlog : handleCreateBlog}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {editingBlog ? "Update Post" : "Create Post"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowBlogForm(false);
                          setEditingBlog(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Blog List */}
              <div className="space-y-4">
                {blogLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : blogPosts.length === 0 ? (
                  <p className="text-muted-foreground">No blog posts yet</p>
                ) : (
                  blogPosts.map((post: any) => (
                    <Card key={post.postId} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Category: {post.category} | Tags: {post.tags}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingBlog({
                                postId: post.postId,
                                title: post.title,
                                slug: post.slug,
                                excerpt: post.excerpt,
                                content: post.content,
                                category: post.category,
                                tags: post.tags,
                                featuredImage: post.featuredImage,
                              });
                              setBlogFormData({
                                title: post.title,
                                slug: post.slug,
                                excerpt: post.excerpt,
                                content: post.content,
                                category: post.category,
                                tags: post.tags,
                                featuredImage: post.featuredImage,
                              });
                              setShowBlogForm(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBlog(post.postId)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gallery</h1>
                <div>
                  <label className="text-sm font-medium">Upload Image</label>
                  <ImageUpload
                    onUpload={handleUploadGallery}
                  />
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-4">
                {galleryLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : galleryImages.length === 0 ? (
                  <p className="text-muted-foreground">No gallery images yet</p>
                ) : (
                  galleryImages.map((image: any) => (
                    <Card key={image.imageId} className="overflow-hidden">
                      <img src={image.imageUrl} alt={image.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold">{image.title}</h3>
                        <p className="text-xs text-muted-foreground">{image.category}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGallery(image.imageId)}
                          className="mt-2 w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2 text-red-600" /> Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Team Members</h1>
                <Button onClick={() => setShowTeamForm(!showTeamForm)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
              </div>

              {showTeamForm && (
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{editingTeam ? "Edit Team Member" : "Add Team Member"}</h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={teamFormData.name}
                      onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                    />
                    <Input
                      placeholder="Position"
                      value={teamFormData.position}
                      onChange={(e) => setTeamFormData({ ...teamFormData, position: e.target.value })}
                    />
                    <Textarea
                      placeholder="Bio"
                      value={teamFormData.bio}
                      onChange={(e) => setTeamFormData({ ...teamFormData, bio: e.target.value })}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Photo</label>
                      <ImageUpload
                        onUpload={(url: string) => setTeamFormData({ ...teamFormData, photoUrl: url })}
                      />
                      {teamFormData.photoUrl && (
                        <img src={teamFormData.photoUrl} alt="Photo" className="mt-2 w-32 h-32 object-cover rounded" />
                      )}
                    </div>
                    <Input
                      placeholder="LinkedIn URL"
                      value={teamFormData.linkedinUrl}
                      onChange={(e) => setTeamFormData({ ...teamFormData, linkedinUrl: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={editingTeam ? handleUpdateTeam : handleCreateTeam}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {editingTeam ? "Update Member" : "Add Member"}
                      </Button>
                      {editingTeam && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingTeam(null);
                            setShowTeamForm(false);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Team List */}
              <div className="grid grid-cols-2 gap-4">
                {teamLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : teamMembers.length === 0 ? (
                  <p className="text-muted-foreground">No team members yet</p>
                ) : (
                  teamMembers.map((member: any) => (
                    <Card key={member.memberId} className="p-4">
                      <div className="flex gap-4">
                        {member.photoUrl && (
                          <img src={member.photoUrl} alt={member.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                          <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingTeam({
                                  memberId: member.memberId,
                                  name: member.name,
                                  position: member.position,
                                  bio: member.bio,
                                  photoUrl: member.photoUrl,
                                  linkedinUrl: member.linkedinUrl,
                                });
                                setTeamFormData({
                                  name: member.name,
                                  position: member.position,
                                  bio: member.bio,
                                  photoUrl: member.photoUrl,
                                  linkedinUrl: member.linkedinUrl,
                                });
                                setShowTeamForm(true);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTeam(member.memberId)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Testimonials</h1>
                <Button onClick={() => setShowTestimonialForm(!showTestimonialForm)}>
                  <Plus className="w-4 h-4 mr-2" /> New Testimonial
                </Button>
              </div>

              {showTestimonialForm && (
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={testimonialFormData.name}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                    />
                    <Input
                      placeholder="Business Name"
                      value={testimonialFormData.businessName}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, businessName: e.target.value })}
                    />
                    <Input
                      placeholder="Role"
                      value={testimonialFormData.role}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, role: e.target.value })}
                    />
                    <Textarea
                      placeholder="Testimonial Content"
                      value={testimonialFormData.content}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, content: e.target.value })}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Photo</label>
                      <ImageUpload
                        onUpload={(url: string) => setTestimonialFormData({ ...testimonialFormData, imageUrl: url })}
                      />
                      {testimonialFormData.imageUrl && (
                        <img src={testimonialFormData.imageUrl} alt="Photo" className="mt-2 w-32 h-32 object-cover rounded" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={testimonialFormData.category}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, category: e.target.value as any })}
                        className="border rounded px-3 py-2"
                      >
                        <option value="msme">MSME</option>
                        <option value="stem">STEM</option>
                        <option value="digital">Digital</option>
                      </select>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonialFormData.rating}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value) })}
                        placeholder="Rating (1-5)"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={editingTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                      </Button>
                      {editingTestimonial && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingTestimonial(null);
                            setShowTestimonialForm(false);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Testimonials List */}
              <div className="space-y-4">
                {testimonialsLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : testimonials.length === 0 ? (
                  <p className="text-muted-foreground">No testimonials yet</p>
                ) : (
                  testimonials.map((testimonial: any) => (
                    <Card key={testimonial.testimonialId} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {testimonial.imageUrl && (
                              <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 object-cover rounded-full" />
                            )}
                            <div>
                              <h3 className="font-semibold">{testimonial.name}</h3>
                              <p className="text-sm text-muted-foreground">{testimonial.businessName} - {testimonial.role}</p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">{testimonial.content}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingTestimonial({
                                testimonialId: testimonial.testimonialId,
                                name: testimonial.name,
                                businessName: testimonial.businessName,
                                role: testimonial.role,
                                content: testimonial.content,
                                imageUrl: testimonial.imageUrl,
                                category: testimonial.category,
                                rating: testimonial.rating,
                              });
                              setTestimonialFormData({
                                name: testimonial.name,
                                businessName: testimonial.businessName,
                                role: testimonial.role,
                                content: testimonial.content,
                                imageUrl: testimonial.imageUrl,
                                category: testimonial.category,
                                rating: testimonial.rating,
                              });
                              setShowTestimonialForm(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTestimonial(testimonial.testimonialId)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === "social" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Social Media Links</h1>
              <Card className="p-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Facebook URL"
                    value={socialMediaFormData.facebook}
                    onChange={(e) => setSocialMediaFormData({ ...socialMediaFormData, facebook: e.target.value })}
                  />
                  <Input
                    placeholder="Twitter URL"
                    value={socialMediaFormData.twitter}
                    onChange={(e) => setSocialMediaFormData({ ...socialMediaFormData, twitter: e.target.value })}
                  />
                  <Input
                    placeholder="LinkedIn URL"
                    value={socialMediaFormData.linkedin}
                    onChange={(e) => setSocialMediaFormData({ ...socialMediaFormData, linkedin: e.target.value })}
                  />
                  <Input
                    placeholder="Instagram URL"
                    value={socialMediaFormData.instagram}
                    onChange={(e) => setSocialMediaFormData({ ...socialMediaFormData, instagram: e.target.value })}
                  />
                  <Button
                    onClick={handleUpdateSocialMedia}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Update Social Media Links
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* STEM Hub Tab */}
          {activeTab === "stem" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">STEM Hub Settings</h1>
              <Card className="p-6">
                <div className="space-y-4">
                  <Input
                    placeholder="STEM Hub Title"
                    value={stemHubFormData.title}
                    onChange={(e) => setStemHubFormData({ ...stemHubFormData, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="STEM Hub Description"
                    value={stemHubFormData.description}
                    onChange={(e) => setStemHubFormData({ ...stemHubFormData, description: e.target.value })}
                  />
                  <Textarea
                    placeholder="Features (comma separated)"
                    value={stemHubFormData.features}
                    onChange={(e) => setStemHubFormData({ ...stemHubFormData, features: e.target.value })}
                  />
                  <Button
                    onClick={handleUpdateStemHub}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Update STEM Hub Settings
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* MSME Lab Tab */}
          {activeTab === "msme" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">MSME Lab Settings</h1>
              <Card className="p-6">
                <div className="space-y-4">
                  <Input
                    placeholder="MSME Lab Title"
                    value={msmeLabFormData.title}
                    onChange={(e) => setMsmeLabFormData({ ...msmeLabFormData, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="MSME Lab Description"
                    value={msmeLabFormData.description}
                    onChange={(e) => setMsmeLabFormData({ ...msmeLabFormData, description: e.target.value })}
                  />
                  <Textarea
                    placeholder="Features (comma separated)"
                    value={msmeLabFormData.features}
                    onChange={(e) => setMsmeLabFormData({ ...msmeLabFormData, features: e.target.value })}
                  />
                  <Button
                    onClick={handleUpdateMsmeLab}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Update MSME Lab Settings
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <Card className="p-6">
                <p className="text-muted-foreground">Settings coming soon...</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
