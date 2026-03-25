import { useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Heart, Zap, Target, ArrowRight, PieChart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";

export default function VSLAs() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { icon: Users, label: "Group Members", value: "15-25", description: "per group" },
    { icon: TrendingUp, label: "Income Growth", value: "275%", description: "within 5 years" },
    { icon: Heart, label: "Female Members", value: "78%", description: "of participants" },
    { icon: Award, label: "Sustainability", value: "89%", description: "5+ year success rate" },
  ];

  const benefits = [
    {
      title: "Emergency Financial Security",
      description: "Access funds during crises without falling into debt. VSLA members are 85% more likely to have savings for emergencies.",
      icon: Heart,
    },
    {
      title: "Business Growth Capital",
      description: "Small loans to start or expand businesses. Members can borrow at fair interest rates set by the group.",
      icon: Zap,
    },
    {
      title: "Women's Empowerment",
      description: "78% of VSLA members are women, gaining financial control and community leadership roles.",
      icon: Users,
    },
    {
      title: "Household Cash-Flow Management",
      description: "Regular savings discipline improves financial stability. Members are 50-60% less likely to face food shortages.",
      icon: PieChart,
    },
    {
      title: "Community Trust & Networks",
      description: "Rebuild social cohesion and solidarity within communities. Strengthen local economic networks.",
      icon: Target,
    },
    {
      title: "Pathway to Formal Finance",
      description: "Build credit history and financial literacy to access formal banking services and larger loans.",
      icon: TrendingUp,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Form a Group",
      description: "10-25 community members voluntarily come together, typically from the same village or neighborhood.",
    },
    {
      step: 2,
      title: "Regular Meetings",
      description: "Meet weekly or bi-weekly to save money and discuss group business in a transparent manner.",
    },
    {
      step: 3,
      title: "Pool Savings",
      description: "Each member contributes a fixed amount to the common pool. Everyone's contribution is recorded transparently.",
    },
    {
      step: 4,
      title: "Provide Loans",
      description: "Members can borrow from the pool at interest rates set by the group. Loans are typically small and short-term.",
    },
    {
      step: 5,
      title: "Earn Dividends",
      description: "At the end of each annual cycle, profits from interest are distributed to members proportional to their savings.",
    },
    {
      step: 6,
      title: "Cycle Renewal",
      description: "After 12 months, members can dissolve the group and take their money, or continue for another cycle.",
    },
  ];

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-foreground mb-4">What are Village Savings and Loan Associations?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Village Savings and Loan Associations (VSLAs) are self-managed, community-based microfinance groups that enable people living in poverty to save money collectively and access small loans from their peers. These groups typically consist of 10-25 members from the same village or community who meet regularly to pool their savings and provide each other with affordable credit.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Since 1991, VSLAs have transformed the lives of over 30 million people across 77 countries, mobilizing more than $11.5 billion in savings. They represent one of the most cost-effective and sustainable approaches to financial inclusion for the world's poorest communities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What makes VSLAs unique is their simplicity, sustainability, and focus on savings rather than debt. Unlike traditional microfinance institutions that emphasize lending, VSLAs prioritize helping members build financial discipline and household cash-flow management—the foundation for long-term economic security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center"
                >
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "benefits",
      label: "Benefits",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg">
            VSLAs provide comprehensive benefits that extend far beyond financial services, transforming individuals, families, and entire communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "how-it-works",
      label: "How It Works",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg">
            VSLAs follow a simple, transparent process that any community can replicate and manage independently.
          </p>
          <div className="space-y-4">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 bg-card border border-border rounded-lg p-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "integration",
      label: "Angaza Integration",
      content: (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-foreground mb-4">How VSLAs Complement Angaza's Mission</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Village Savings and Loan Associations represent a natural and powerful extension of Angaza Future International's commitment to MSME support and digital economy participation. By integrating VSLAs into our ecosystem, we create a comprehensive pathway for economic empowerment.
            </p>

            <h4 className="text-xl font-bold text-foreground mt-6 mb-3">Foundation for MSME Growth</h4>
            <p className="text-muted-foreground leading-relaxed mb-4">
              VSLAs provide the initial capital and financial discipline that emerging entrepreneurs need. Members build savings habits and access small loans to start businesses—the perfect foundation for scaling through our Angaza MSME Lab.
            </p>

            <h4 className="text-xl font-bold text-foreground mt-6 mb-3">Bridge to Digital Economy</h4>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As VSLA members grow their businesses, they transition from informal savings to digital financial services. Our MSME Lab provides the tools for bookkeeping, sales tracking, and business intelligence—helping them formalize and scale.
            </p>

            <h4 className="text-xl font-bold text-foreground mt-6 mb-3">Women's Economic Empowerment</h4>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With 78% female membership, VSLAs align perfectly with our focus on inclusive growth. Women gain financial control, community leadership, and pathways to entrepreneurship.
            </p>

            <h4 className="text-xl font-bold text-foreground mt-6 mb-3">Community-First Approach</h4>
            <p className="text-muted-foreground leading-relaxed">
              VSLAs strengthen local economies and social cohesion before scaling to digital platforms. This community-first approach ensures sustainable, locally-rooted economic development.
            </p>
          </div>
        </div>
      ),
    },
  ];

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
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
              Village Savings & Loan Associations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Community-powered financial inclusion transforming lives through collective savings and peer lending
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Join a VSLA?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Angaza Future International is committed to expanding VSLA reach across Kiambu County and beyond. Whether you're interested in starting a group or joining an existing one, we're here to support your journey to financial security and economic empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started Today</Button>
            <Button size="lg" variant="outline">
              Learn More <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
