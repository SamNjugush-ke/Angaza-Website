import { useState } from "react";
import { Link } from "wouter";
import { Download, Plus, FileText, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUploadDialog from "@/components/FileUploadDialog";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function STEMResources() {
  const { user } = useAuth();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const { data: resourcesData, isLoading, refetch } = trpc.resources.getByCategory.useQuery({
    category: "stem",
    limit: 50,
  });

  const downloadMutation = trpc.resources.download.useMutation();

  const handleDownload = async (resourceId: string, title: string) => {
    try {
      const result = await downloadMutation.mutateAsync({ resourceId });
      // Open download link
      const a = document.createElement("a");
      a.href = result.url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Download started");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resource");
    }
  };

  const resources = resourcesData?.resources || [];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-teal-50 to-cyan-50 mt-20">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                STEM Resource Library
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl">
                Explore bootcamp materials, coding tutorials, robotics guides, and STEM career resources for students and educators.
              </p>
            </div>
            {user?.role === "admin" && (
              <Button
                onClick={() => setUploadDialogOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-label rounded-full px-6"
              >
                <Plus size={16} className="mr-2" />
                Add Resource
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">No resources available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.resourceId} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground line-clamp-2 mb-2">
                          {resource.title}
                        </h3>
                        <div className="inline-block bg-teal-100 text-teal-700 font-label text-xs font-semibold px-2 py-1 rounded-full mb-3">
                          {resource.fileType.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {resource.description && (
                      <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
                        {resource.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {resource.downloadCount} downloads
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <Button
                      onClick={() => handleDownload(resource.resourceId, resource.title)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-label rounded-full"
                      disabled={downloadMutation.isPending}
                    >
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Dialog */}
      <FileUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSuccess={() => refetch()}
      />

      <Footer />
    </div>
  );
}
