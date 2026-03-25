import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Upload, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminGalleryManager() {
  const [selectedAlbum, setSelectedAlbum] = useState<string>("bootcamps");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: albums } = trpc.gallery.getAlbums.useQuery();
  const { data: images, refetch: refetchImages } = trpc.gallery.getImages.useQuery({ album: selectedAlbum });
  const uploadMutation = trpc.gallery.uploadImage.useMutation();
  const deleteMutation = trpc.gallery.deleteImage.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      toast.error("Please select a file and enter a title");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        
        await uploadMutation.mutateAsync({
          title,
          description,
          album: selectedAlbum,
          imageData: base64Data,
          fileName: selectedFile.name,
        });

        toast.success("Image uploaded successfully");
        setTitle("");
        setDescription("");
        setSelectedFile(null);
        refetchImages();
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteMutation.mutateAsync({ imageId });
      toast.success("Image deleted successfully");
      refetchImages();
    } catch (error) {
      toast.error("Failed to delete image");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">📸 Gallery Management</h2>
        <p className="text-gray-600">Manage your gallery images and albums</p>
      </div>

      {/* Album Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Album</CardTitle>
          <CardDescription>Choose which album to manage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {albums?.map((album) => (
              <Button
                key={album}
                variant={selectedAlbum === album ? "default" : "outline"}
                onClick={() => setSelectedAlbum(album)}
                className="capitalize"
              >
                {album}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Image
          </CardTitle>
          <CardDescription>Add new images to the {selectedAlbum} album</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              placeholder="Image description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-teal-50 file:text-teal-700
                hover:file:bg-teal-100"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Images in {selectedAlbum}</CardTitle>
          <CardDescription>{images?.length || 0} images</CardDescription>
        </CardHeader>
        <CardContent>
          {images && images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.imageId} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate">{image.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{image.description}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.imageId)}
                      className="w-full mt-2"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No images in this album yet</p>
              <p className="text-sm text-gray-500">Upload images above to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
