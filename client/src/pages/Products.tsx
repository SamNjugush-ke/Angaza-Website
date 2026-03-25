import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, TrendingUp, Award, Lightbulb, BarChart3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";

interface Product {
  id: number;
  name: string;
  tagline: string;
  status: string;
  shortDescription: string;
  image: string;
  features: string[];
  impact: string;
  stats: { label: string; value: string }[];
  fullDescription: string;
  specializedSpaces?: string[];
  coreCapabilities?: string[];
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Angaza STEM Hub",
      tagline: "Igniting the Next Generation of Innovators, Creators, and Problem-Solvers",
      status: "Ongoing",
      shortDescription: "A premier innovation center bridging theoretical science and hands-on technological mastery",
      image: IMAGES.stem,
      features: [
        "Robotics & AI Makerspace",
        "3D Design & Fabrication Lab",
        "VR/AR Studio",
        "IoT & Computer Lab",
        "Multipurpose Collaboration Space",
      ],
      impact: "Transforming STEM education access for 2,000+ students across Kiambu County",
      stats: [
        { label: "Students Trained", value: "2,000+" },
        { label: "Female Participation", value: "56%" },
        { label: "STEM Career Uptake", value: "72%" },
        { label: "Retention Rate", value: "39%" },
      ],
      fullDescription: `The Angaza STEM Hub is a premier innovation center and the "anchor" of our hub-and-spoke model for STEM promotion in Kenya. We bridge the gap between theoretical science and hands-on technological mastery, ensuring that every child—regardless of gender or background—is prepared for the digital economy.

Our Specialized Spaces:
The Hub is a solar-powered, high-tech sanctuary designed for experiential learning across five cutting-edge domains:

**Robotics & AI Makerspace:** Where learners move from "Early Explorers" to "Young Techies," building and programming autonomous systems using LEGO, Arduino, Raspberry Pi, and VEX.

**3D Design & Fabrication Lab:** A space to turn ideas into reality. Students learn 3D modeling and digital manufacturing to prototype physical solutions.

**VR/AR Studio:** Providing immersive educational simulations that bring complex scientific concepts to life through Virtual and Augmented Reality.

**The IoT & Computer Lab:** Equipped with high-spec PCs for Deep Learning, Machine Learning, and building smart, connected devices.

**Multipurpose Collaboration Space:** A vibrant area for school-based STEM Social Clubs, exhibitions, and parental sensitization forums.

The Impact: Changing the Face of STEM
We don't just teach coding; we build the future workforce of Kenya. Our data-backed approach has delivered proven results:

**Leading in Gender Parity:** Through deliberate activation, we have shifted the gender balance from 31% to 56% in favor of girls, proving that our "Safe Space" model works.

**Proven Career Influence:** 72% of our advanced participants choose STEM pathways in senior secondary school as a direct result of our intervention.

**Structured Pathways:** From ScratchJr for children to Python, C++, and IoT for teenagers, our modules ensure a continuous learning journey with a 39% retention rate.

**Inclusivity First:** Through our community outreach, we extend these high-end STEM packages for free to children's homes and vulnerable groups, ensuring no mind is left behind.

Our Hub-and-Spoke Model:
While our Thika West facility serves as the "Hub," our influence extends through "Spokes" to schools across Kiambu County and beyond. We empower teachers through Competence-Based STEM Pedagogy training and support school-based STEM Social Clubs, multiplying our impact across classrooms.

Join the Movement:
Whether it's a Holiday Bootcamp, a Weekend STEM Class, or a Skilling Program in Drones and AI, the Angaza STEM Hub is where Kenya's Vision 2030 comes to life.`,
      specializedSpaces: [
        "Robotics & AI Makerspace",
        "3D Design & Fabrication Lab",
        "VR/AR Studio",
        "IoT & Computer Lab",
        "Multipurpose Collaboration Space",
      ],
    },
    {
      id: 2,
      name: "Angaza MSME Lab",
      tagline: "The Operating System for the Modern African Enterprise",
      status: "Ongoing",
      shortDescription: "An AI-powered ecosystem transitioning MSMEs from informal to data-driven, scalable growth",
      image: IMAGES.msme,
      features: [
        "Integrated ERP & POS System",
        "Agentic AI Business Intelligence",
        "B2B Marketplace & Networking",
        "Angaza Trust System",
        "B2B Peer-Lending",
      ],
      impact: "Helping 500+ MSMEs formalize and access financing with average 120% revenue increase",
      stats: [
        { label: "MSMEs Supported", value: "500+" },
        { label: "Avg Revenue Increase", value: "120%" },
        { label: "Business Success Rate", value: "85%" },
        { label: "Jobs Created", value: "300+" },
      ],
      fullDescription: `Angaza MSME Lab is an all-in-one, AI-powered ecosystem designed to transition Micro, Small, and Medium Enterprises (MSMEs) from informal operations to data-driven, scalable growth. Built by Angaza Future International, the Lab is more than a management tool—it is a trust-building engine that bridges the gap between local businesses, global markets, and formal financing.

Core Capabilities:

**Integrated Business Operations (ERP & POS):** A seamless suite for bookkeeping, inventory management, and multi-channel sales (In-person & E-commerce). Generate professional invoices, pro-forma statements, and automated financial reports with a single click.

**Agentic AI Business Intelligence:** Leverage specialized AI agents that act as virtual CFOs and Growth Strategists. From auto-reconciling accounts and predicting stock-outs to drafting winning tender bids and providing personalized upskilling courses, the Lab puts enterprise-level intelligence in the hands of every shop owner.

**The B2B Marketplace & Networking:** A dynamic hub where businesses float RFPs, source suppliers, and form strategic partnerships. It turns local networking into a structured digital marketplace.

**The Angaza Trust System:** At the heart of the Lab is our proprietary Verification & Rating System. By integrating government registration data, course completion badges, and real-time transaction history, we generate a Trust Score that validates your business to customers and partners.

**B2B Peer-Lending:** Use your "Trust Score" and transparent financial data to access capital. Our lending module allows businesses to provide and receive credit within a controlled, data-backed environment at sustainable rates.

Why It Matters:
For too long, MSMEs have been "invisible" to the formal economy due to a lack of data and verified trust. Angaza MSME Lab makes the invisible visible. We provide the tools to manage your today, the data to prove your worth, and the AI to build your tomorrow.

Positioning Statement:
"Angaza MSME Lab isn't just helping businesses run; it's helping them belong to the future of global trade."`,
      coreCapabilities: [
        "Integrated Business Operations (ERP & POS)",
        "Agentic AI Business Intelligence",
        "B2B Marketplace & Networking",
        "Angaza Trust System",
        "B2B Peer-Lending",
      ],
    },
  ];

  const selectedProductData = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background pt-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">Our Products</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions transforming STEM education and MSME growth across Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors group"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('${product.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{product.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{product.shortDescription}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Key Features</p>
                    <div className="space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <Zap size={14} className="text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 3 && (
                        <p className="text-xs text-primary font-semibold">+{product.features.length - 3} more features</p>
                      )}
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                    {product.stats.slice(0, 2).map((stat, i) => (
                      <div key={i} className="bg-primary/5 rounded-lg p-2">
                        <p className="text-lg font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setSelectedProduct(product.id)}
                    className="w-full"
                  >
                    View Details <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProductData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{selectedProductData.name}</h2>
                <p className="text-primary font-semibold mb-2">{selectedProductData.tagline}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  {selectedProductData.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Full Description */}
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {selectedProductData.fullDescription}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedProductData.stats.map((stat, i) => (
                  <div key={i} className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Specialized Spaces or Core Capabilities */}
              {selectedProductData.specializedSpaces && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Specialized Spaces</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProductData.specializedSpaces.map((space, i) => (
                      <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                        <Lightbulb className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground font-medium">{space}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProductData.coreCapabilities && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Core Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProductData.coreCapabilities.map((capability, i) => (
                      <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                        <BarChart3 className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground font-medium">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-background rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-4">
                  Contact us to learn more about {selectedProductData.name} and how it can transform your organization.
                </p>
                <Button size="lg">Get in Touch</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
