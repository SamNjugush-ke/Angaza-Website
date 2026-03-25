import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Testimonial {
  testimonialId: string;
  name: string;
  businessName?: string | null;
  role?: string | null;
  content: string;
  imageUrl?: string | null;
  category: "msme" | "stem" | "digital";
  rating?: number | null;
  isPublished: boolean;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const visibleTestimonials = testimonials.filter((t) => t.isPublished);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, visibleTestimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + visibleTestimonials.length) % visibleTestimonials.length
    );
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
  };

  const currentTestimonial = visibleTestimonials[currentIndex];

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-slate-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our community members about their journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Testimonial Card */}
          <Card className="p-8 bg-white shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              {currentTestimonial.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={currentTestimonial.imageUrl}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg text-foreground mb-4 italic">
                  "{currentTestimonial.content}"
                </p>

                {/* Author Info */}
                <div>
                  <p className="font-semibold text-foreground">
                    {currentTestimonial.name}
                  </p>
                  {currentTestimonial.businessName && (
                    <p className="text-sm text-primary font-medium">
                      {currentTestimonial.businessName}
                    </p>
                  )}
                  {currentTestimonial.role && (
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {currentTestimonial.category === "msme"
                        ? "MSME"
                        : currentTestimonial.category === "stem"
                          ? "STEM"
                          : "Digital Economy"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {visibleTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Counter */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {currentIndex + 1} / {visibleTestimonials.length}
          </div>
        </div>
      </div>
    </div>
  );
}
