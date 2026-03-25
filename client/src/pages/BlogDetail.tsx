import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowLeft,
  Clock,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock blog post data
const mockBlogPosts: Record<string, any> = {
  "stem-hub-ai-bootcamp": {
    postId: "1",
    title: "STEM Hub Launches New AI Bootcamp for Young Innovators",
    slug: "stem-hub-ai-bootcamp",
    excerpt: "Discover how our new AI bootcamp is empowering the next generation of tech leaders in Kenya.",
    content: `
      <h2>Revolutionizing STEM Education in Africa</h2>
      <p>Angaza Future International is excited to announce the launch of our comprehensive AI Bootcamp at the STEM Hub in Thika. This groundbreaking program is designed to equip young innovators with cutting-edge artificial intelligence and machine learning skills.</p>
      
      <h3>What's Included</h3>
      <ul>
        <li>8-week intensive AI/ML curriculum</li>
        <li>Hands-on project-based learning</li>
        <li>Industry mentorship from tech professionals</li>
        <li>Career guidance and job placement support</li>
        <li>Certification upon completion</li>
      </ul>
      
      <h3>Target Audience</h3>
      <p>This bootcamp is specifically designed for:</p>
      <ul>
        <li>High school students (ages 15-18)</li>
        <li>University students and recent graduates</li>
        <li>Career changers interested in AI/ML</li>
        <li>Female students (we prioritize gender diversity)</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Through this initiative, we aim to create 100+ AI-ready professionals who can contribute to Kenya's digital economy and lead innovation in their communities.</p>
    `,
    category: "STEM",
    tags: ["AI", "Bootcamp", "Education", "Innovation"],
    featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    authorId: 1,
    author: "Samuel Njuguna",
    viewCount: 245,
    publishedAt: new Date("2024-02-20"),
    isPublished: true,
    readTime: "5 min read",
  },
  "msme-lab-nairobi": {
    postId: "2",
    title: "MSME Lab Transforms Small Business Operations in Nairobi",
    slug: "msme-lab-nairobi",
    excerpt: "Learn how our digital MSME Lab is helping small businesses streamline operations and boost sales.",
    content: `
      <h2>Digital Transformation for Small Businesses</h2>
      <p>The Angaza MSME Lab is revolutionizing how small and medium enterprises operate in Kenya. Our integrated digital platform provides all the tools needed for modern business management.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Digital bookkeeping and accounting</li>
        <li>POS system for sales management</li>
        <li>Business intelligence and analytics</li>
        <li>Customer relationship management</li>
        <li>Inventory tracking</li>
      </ul>
      
      <h3>Success Stories</h3>
      <p>Over 500 businesses in Nairobi have already benefited from our platform, with an average revenue increase of 35% within the first year of adoption.</p>
    `,
    category: "MSME",
    tags: ["Business", "Digital", "Success Story"],
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    authorId: 1,
    author: "Samuel Njuguna",
    viewCount: 189,
    publishedAt: new Date("2024-02-18"),
    isPublished: true,
    readTime: "7 min read",
  },
};

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:slug");
  const [shareOpen, setShareOpen] = useState(false);

  if (!match) return null;

  const slug = params?.slug as string;
  const post = mockBlogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button className="gap-2">
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container max-w-4xl mx-auto px-4 pb-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="bg-teal-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.publishedAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.viewCount} views</span>
            </div>
          </div>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mb-8 pb-8 border-b border-border">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-teal-50 rounded-lg p-6 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Share this article</h3>
                <p className="text-sm text-muted-foreground">Help spread the word about STEM, MSME, and digital economy initiatives</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="gap-2"
                >
                  <Facebook size={16} />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="gap-2"
                >
                  <Twitter size={16} />
                  <span className="hidden sm:inline">Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                  className="gap-2"
                >
                  <Linkedin size={16} />
                  <span className="hidden sm:inline">LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("email")}
                  className="gap-2"
                >
                  <Mail size={16} />
                  <span className="hidden sm:inline">Email</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("copy")}
                  className="gap-2"
                >
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <Card className="p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{post.author}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Founder & CEO at Angaza Future International. Passionate about STEM education and entrepreneurship.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(mockBlogPosts)
                .filter((p: any) => p.slug !== slug && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost: any) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-teal-600">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
