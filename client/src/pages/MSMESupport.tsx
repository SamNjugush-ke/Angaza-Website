import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, TrendingUp, Users, Zap, BarChart3, CreditCard,
  Globe, Smartphone, PieChart, CheckCircle, Star, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";

export default function MSMESupport() {
  const [activeFeature, setActiveFeature] = useState(0);

  const siybPrograms = [
    {
      title: "Start and Improve Your Business (SIYB)",
      subtitle: "ILO-Certified Training Program",
      duration: "5 days",
      description: "The internationally recognized SIYB methodology helps entrepreneurs start and grow successful businesses",
      modules: [
        "Business Idea Development",
        "Market Research & Analysis",
        "Financial Planning",
        "Business Registration",
        "Marketing Strategy"
      ],
      graduates: "500+",
      successRate: "85%"
    },
    {
      title: "Improve Your Business (IYB)",
      subtitle: "For Existing Entrepreneurs",
      duration: "5 days",
      description: "Enhance your existing business with proven management and growth strategies",
      modules: [
        "Financial Management",
        "Customer Relations",
        "Record Keeping",
        "Quality Improvement",
        "Business Growth"
      ],
      graduates: "300+",
      successRate: "88%"
    },
    {
      title: "Expand Your Business (EYB)",
      subtitle: "Advanced Growth Strategies",
      duration: "5 days",
      description: "Scale your business to new markets and increase profitability",
      modules: [
        "Market Expansion",
        "Product Diversification",
        "Team Building",
        "Technology Integration",
        "Export Opportunities"
      ],
      graduates: "200+",
      successRate: "82%"
    }
  ];

  const msmeLabFeatures = [
    {
      icon: CreditCard,
      title: "Bookkeeping & Accounting",
      description: "Automated bookkeeping system that tracks all transactions, generates financial reports, and ensures compliance"
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Real-time analytics and insights from your business data to make informed decisions"
    },
    {
      icon: Smartphone,
      title: "POS System",
      description: "Complete point-of-sale solution for retail operations with receipt and invoice generation"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Accept multiple payment methods including M-Pesa, cards, and digital wallets"
    },
    {
      icon: Globe,
      title: "Business Network",
      description: "Connect with other businesses for partnerships, collaborations, and growth opportunities"
    },
    {
      icon: TrendingUp,
      title: "Growth Tools",
      description: "Marketing automation, inventory management, and customer relationship tools"
    }
  ];

  const testimonials = [
    {
      name: "Grace Mwangi",
      business: "Grace's Fashion Boutique",
      image: IMAGES.msme,
      quote: "The SIYB program transformed my small tailoring business into a thriving fashion boutique. I went from KES 5,000 monthly to KES 50,000 in just 8 months!",
      rating: 5
    },
    {
      name: "David Kipchoge",
      business: "Kipchoge Electronics",
      image: IMAGES.msme,
      quote: "Angaza MSME Lab's POS system and bookkeeping tools saved me hours of manual work. My business is now more organized and profitable.",
      rating: 5
    },
    {
      name: "Amina Hassan",
      business: "Amina's Bakery",
      image: IMAGES.msme,
      quote: "Through the IYB program, I learned how to properly manage my finances and expand my product line. Revenue increased by 60% in 6 months.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${IMAGES.msme}')`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-green-400/20 border border-green-400 rounded-full px-4 py-2 mb-6">
              <span className="text-green-300 text-sm font-semibold uppercase tracking-wider">MSME Empowerment</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              MSME Support & Growth
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Comprehensive support for small and medium enterprises through training, tools, and technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-400 hover:bg-green-500 text-slate-900">
                Start SIYB Training <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore MSME Lab
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIYB Programs */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">SIYB Training Programs</h2>
            <p className="text-lg text-muted-foreground">
              ILO-certified training that has helped thousands of entrepreneurs start, improve, and expand their businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siybPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors"
              >
                <div className="h-32 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                  <Users className="text-white" size={48} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{program.title}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{program.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-4">{program.description}</p>

                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Duration</p>
                    <p className="text-foreground font-bold">{program.duration}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Modules Covered</p>
                    <ul className="space-y-1">
                      {program.modules.map((module, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Graduates</p>
                      <p className="text-lg font-bold text-primary">{program.graduates}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-lg font-bold text-primary">{program.successRate}</p>
                    </div>
                  </div>

                  <Button className="w-full">Enroll Now</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Angaza MSME Lab */}
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Angaza MSME Lab</h2>
            <p className="text-lg text-muted-foreground">
              An all-in-one digital platform designed specifically for small businesses to manage operations, track finances, and grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {msmeLabFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-900 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Angaza MSME Lab?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Affordable Pricing</h4>
                  <p className="text-muted-foreground">Flexible payment plans starting from KES 500/month</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Easy to Use</h4>
                  <p className="text-muted-foreground">Intuitive interface requiring no technical skills</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground mb-1">24/7 Support</h4>
                  <p className="text-muted-foreground">Dedicated support team ready to help anytime</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Secure & Reliable</h4>
                  <p className="text-muted-foreground">Bank-level security for your business data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Beneficiary Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Real entrepreneurs, real results. See how SIYB training and MSME Lab transformed their businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600" />
                  <div>
                    <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex gap-2 mb-4">
                  <Quote size={20} className="text-primary flex-shrink-0" />
                  <p className="text-muted-foreground italic">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful entrepreneurs who have transformed their businesses with Angaza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-white/90">
              Start SIYB Training <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try MSME Lab Free
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
