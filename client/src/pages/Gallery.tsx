import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { data: albums } = trpc.gallery.getAlbums.useQuery();
  const { data: images } = trpc.gallery.getImages.useQuery(
    selectedAlbum ? { album: selectedAlbum } : undefined
  );

  const currentImage = selectedImageIndex !== null && images && images.length > selectedImageIndex ? images[selectedImageIndex] : null;

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && images && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleDownload = () => {
    if (currentImage) {
      const link = document.createElement("a");
      link.href = currentImage.imageUrl;
      link.download = currentImage.title;
      link.click();
    }
  };

  const handleShare = () => {
    if (currentImage && navigator.share) {
      navigator.share({
        title: currentImage.title,
        text: currentImage.description || currentImage.title,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gallery</h1>
          <p className="text-gray-600">Explore our events, bootcamps, and activities</p>
        </div>

        {/* Album Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              variant={selectedAlbum === "" ? "default" : "outline"}
            onClick={() => {
              setSelectedAlbum("");
              setSelectedImageIndex(null);
            }}
              className="h-24 capitalize"
            >
              All
            </Button>
            {albums?.map((album) => (
              <Button
                key={album}
                variant={selectedAlbum === album ? "default" : "outline"}
                onClick={() => {
                  setSelectedAlbum(album);
                  setSelectedImageIndex(null);
                }}
                className="h-24 capitalize"
              >
                {album}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={image.imageId}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end">
                  <div className="w-full p-4 text-white opacity-0 group-hover:opacity-100 transition">
                    <h3 className="font-semibold">{image.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-1">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No images found</p>
            <p className="text-gray-500">Select an album to view images</p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {currentImage && selectedImageIndex !== null && images && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="flex items-center justify-center max-w-4xl w-full">
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white hover:bg-white/20 p-3 rounded-full transition"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < images.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:bg-white/20 p-3 rounded-full transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Info and Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{currentImage.title}</h2>
            <p className="text-gray-300 mb-4">{currentImage.description}</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-white border-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="text-white border-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Image Counter */}
            <p className="text-sm text-gray-400 mt-4">
              {selectedImageIndex + 1} / {images.length}
            </p>
          </div>

          {/* Keyboard Navigation */}
          {typeof window !== "undefined" && (
            <div
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") handlePrevious();
                if (e.key === "ArrowRight") handleNext();
                if (e.key === "Escape") setSelectedImageIndex(null);
              }}
              tabIndex={0}
              className="focus:outline-none"
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
