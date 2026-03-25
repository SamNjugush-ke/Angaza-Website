import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Leaf, Recycle, TrendingUp, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DigitalCircularEconomy = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "circular" | "green">("ai");

  const aiBootcamps = [
    {
      name: "AI Fundamentals & Machine Learning",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      description: "Learn core AI concepts, Python programming, and machine learning algorithms to build intelligent solutions for business problems.",
      topics: ["Python Basics", "Data Analysis", "ML Algorithms", "Neural Networks", "Project Development"],
      icon: Zap,
    },
    {
      name: "AI for Business & Entrepreneurship",
      duration: "6 weeks",
      level: "Intermediate",
      description: "Apply AI technologies to solve real business challenges and create AI-powered products and services.",
      topics: ["AI Business Models", "Product Development", "Customer Analytics", "Automation", "Scaling AI Solutions"],
      icon: TrendingUp,
    },
    {
      name: "Coding & Web Development",
      duration: "10 weeks",
      level: "Beginner",
      description: "Master web development fundamentals including HTML, CSS, JavaScript, and modern frameworks for building digital products.",
      topics: ["HTML/CSS", "JavaScript", "React/Vue", "Backend Development", "Full-Stack Projects"],
      icon: Zap,
    },
    {
      name: "Drone Technology & Robotics",
      duration: "8 weeks",
      level: "Intermediate",
      description: "Explore drone applications, robotics programming, and automation technologies for agriculture and business.",
      topics: ["Drone Operations", "Robotics Programming", "IoT Basics", "Agricultural Tech", "Autonomous Systems"],
      icon: Zap,
    },
  ];

  const circularInitiatives = [
    {
      title: "Waste-to-Value Programs",
      description: "Transform waste materials into valuable products and services. Support MSMEs in adopting circular business models that reduce waste and create new revenue streams.",
      impact: "Reduces landfill waste by 40%",
      examples: ["Plastic recycling businesses", "Organic waste composting", "E-waste recovery"],
    },
    {
      title: "Resource Efficiency Coaching",
      description: "Train entrepreneurs on sustainable resource management, energy efficiency, and water conservation to reduce operational costs while protecting the environment.",
      impact: "30% reduction in operational costs",
      examples: ["Energy audits", "Water management", "Supply chain optimization"],
    },
    {
      title: "Circular Supply Chain Development",
      description: "Help businesses design circular supply chains that minimize waste, maximize material recovery, and create closed-loop systems.",
      impact: "Extends product lifecycle by 50%",
      examples: ["Product design for circularity", "Reverse logistics", "Material recovery networks"],
    },
    {
      title: "Green Certification & Compliance",
      description: "Guide MSMEs through environmental certification processes and compliance with sustainability standards to access premium markets.",
      impact: "Access to 25% higher-value markets",
      examples: ["ISO 14001 certification", "Fair trade compliance", "Carbon footprint reduction"],
    },
  ];

  const greenEntrepreneurship = [
    {
      category: "Eco-Friendly Products",
      examples: ["Sustainable packaging solutions", "Organic agricultural products", "Renewable energy products", "Water purification systems"],
    },
    {
      category: "Green Services",
      examples: ["Environmental consulting", "Waste management services", "Energy efficiency audits", "Sustainable tourism"],
    },
    {
      category: "Technology Solutions",
      examples: ["IoT for environmental monitoring", "AI for resource optimization", "Blockchain for supply chain transparency", "Renewable energy tech"],
    },
    {
      category: "Capacity Building",
      examples: ["Green business training", "Sustainability certification", "Environmental impact assessment", "Circular economy workshops"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Digital & Circular Economy</h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Empowering entrepreneurs to thrive in the digital age while building sustainable, circular business models that create positive environmental and social impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "AI & Digital Skills",
                description: "Master cutting-edge technologies including AI, coding, and digital tools to transform your business and create innovative solutions.",
              },
              {
                icon: Recycle,
                title: "Circular Economy",
                description: "Design sustainable business models that minimize waste, maximize resource efficiency, and create long-term value.",
              },
              {
                icon: Leaf,
                title: "Green Entrepreneurship",
                description: "Build environmentally responsible businesses that generate profit while protecting our planet for future generations.",
              },
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{pillar.title}</h3>
                    <p className="text-gray-600">{pillar.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 border-b border-gray-200">
            {[
              { id: "ai" as const, label: "AI Bootcamps", icon: Zap },
              { id: "circular" as const, label: "Circular Economy", icon: Recycle },
              { id: "green" as const, label: "Green Entrepreneurship", icon: Leaf },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                    activeTab === tab.id
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* AI Bootcamps Tab */}
          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">AI & Digital Skills Bootcamps</h2>
              <p className="text-lg text-gray-600 mb-12">
                Our intensive bootcamps equip entrepreneurs and professionals with AI, coding, and digital skills needed to compete in the modern economy. From beginners to advanced learners, we have programs tailored to your level.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                {aiBootcamps.map((bootcamp, index) => {
                  const Icon = bootcamp.icon;
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="p-8 hover:shadow-lg transition-shadow h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <Icon className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{bootcamp.name}</h3>
                            <p className="text-sm text-gray-500">{bootcamp.duration} • {bootcamp.level}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6">{bootcamp.description}</p>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-900 text-sm">Topics Covered:</p>
                          <div className="flex flex-wrap gap-2">
                            {bootcamp.topics.map((topic, i) => (
                              <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mt-12 p-8 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Why AI Skills Matter</h3>
                <ul className="space-y-3">
                  {[
                    "230 million AI-powered jobs opportunity across Africa",
                    "AI can automate repetitive tasks, freeing time for strategic work",
                    "Businesses using AI see 30-40% productivity improvements",
                    "Early adopters gain competitive advantage in their markets",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Circular Economy Tab */}
          {activeTab === "circular" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Circular Economy Initiatives</h2>
              <p className="text-lg text-gray-600 mb-12">
                The circular economy is a transformative approach that keeps resources in use for as long as possible, extracting maximum value while minimizing waste. We help MSMEs transition to circular business models that are profitable and sustainable.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                {circularInitiatives.map((initiative, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-8 hover:shadow-lg transition-shadow h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                      <p className="text-gray-600 mb-4">{initiative.description}</p>
                      <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-emerald-700">Impact: {initiative.impact}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900 text-sm">Examples:</p>
                        <ul className="space-y-1">
                          {initiative.examples.map((example, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-emerald-600 font-bold">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-12 p-8 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Circular Economy Benefits</h3>
                <ul className="space-y-3">
                  {[
                    "Reduces operational costs by 20-30% through resource efficiency",
                    "Creates new revenue streams from waste and by-products",
                    "Improves brand reputation and customer loyalty",
                    "Ensures long-term business sustainability and resilience",
                    "Contributes to environmental protection and climate action",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Green Entrepreneurship Tab */}
          {activeTab === "green" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Green Entrepreneurship</h2>
              <p className="text-lg text-gray-600 mb-12">
                Green entrepreneurship combines business innovation with environmental responsibility. We support entrepreneurs in building profitable businesses that solve environmental challenges and create positive social impact.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                {greenEntrepreneurship.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">{item.category}</h3>
                      <ul className="space-y-3">
                        {item.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Leaf className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Support We Provide</h3>
                  <ul className="space-y-3">
                    {[
                      "Business plan development",
                      "Environmental impact assessment",
                      "Green certification guidance",
                      "Access to green financing",
                      "Market linkages and partnerships",
                      "Sustainability training",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Market Opportunities</h3>
                  <ul className="space-y-3">
                    {[
                      "Growing consumer demand for sustainable products",
                      "Government incentives for green businesses",
                      "Corporate partnerships with sustainability goals",
                      "Access to premium markets and higher prices",
                      "International funding for climate solutions",
                      "B2B opportunities in supply chains",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join our digital and circular economy programs to build a sustainable, profitable business that creates positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-bold">
              Enroll in a Bootcamp <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalCircularEconomy;
