import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, Eye, EyeOff, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AdminBlogManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "STEM",
    tags: "",
    featuredImage: "",
    isPublished: false,
  });

  // Mock blog posts
  const blogPosts = [
    {
      postId: "1",
      title: "STEM Hub Launches New AI Bootcamp for Young Innovators",
      slug: "stem-hub-ai-bootcamp",
      category: "STEM",
      tags: "AI, Bootcamp, Education",
      isPublished: true,
      publishedAt: new Date("2024-02-20"),
      viewCount: 245,
    },
    {
      postId: "2",
      title: "MSME Lab Transforms Small Business Operations in Nairobi",
      slug: "msme-lab-nairobi",
      category: "MSME",
      tags: "Business, Digital, Success Story",
      isPublished: true,
      publishedAt: new Date("2024-02-18"),
      viewCount: 189,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      toast.success("Blog post updated successfully");
    } else {
      toast.success("Blog post created successfully");
    }

    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "STEM",
      tags: "",
      featuredImage: "",
      isPublished: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    toast.success("Blog post deleted successfully");
  };

  const handleTogglePublish = (postId: string, currentStatus: boolean) => {
    toast.success(`Blog post ${currentStatus ? "unpublished" : "published"} successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Blog Posts</h2>
          <p className="text-muted-foreground">Create and manage blog content with categories and tags</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              category: "STEM",
              tags: "",
              featuredImage: "",
              isPublished: false,
            });
          }}
          className="gap-2"
        >
          <Plus size={16} />
          Write Post
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: title.toLowerCase().replace(/\s+/g, "-"),
                    });
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg min-h-16"
                placeholder="Brief summary of the post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg min-h-48 font-mono text-sm"
                placeholder="Write your blog post content here (supports HTML)"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="STEM">STEM</option>
                  <option value="MSME">MSME</option>
                  <option value="VSLAs">VSLAs</option>
                  <option value="Digital Economy">Digital Economy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="Comma-separated tags"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Image URL</label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update Post" : "Publish Post"}</Button>
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
        {blogPosts.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No blog posts yet. Start writing!</Card>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.postId} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        post.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Category:</strong> {post.category} | <strong>Tags:</strong> {post.tags}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.publishedAt.toLocaleDateString()}
                    </div>
                    <div>
                      <strong>{post.viewCount}</strong> views
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTogglePublish(post.postId, post.isPublished)}
                    title={post.isPublished ? "Unpublish" : "Publish"}
                  >
                    {post.isPublished ? (
                      <Eye size={16} className="text-green-600" />
                    ) : (
                      <EyeOff size={16} className="text-gray-400" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingId(post.postId);
                      setShowForm(true);
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post.postId)}
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
