import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail, Calendar, Users, Zap, Code, Cpu, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";

export default function STEMHub() {
  const [selectedBootcamp, setSelectedBootcamp] = useState<number | null>(null);

  const bootcamps = [
    {
      id: 1,
      title: "Holiday AI & Machine Learning Bootcamp",
      duration: "2 weeks",
      dates: "July 15-29, 2024",
      ageGroup: "14-18 years",
      capacity: 30,
      description: "Dive into artificial intelligence and machine learning with hands-on projects",
      topics: ["Python Basics", "ML Algorithms", "Neural Networks", "Real-world Applications"],
      image: IMAGES.stem,
    },
    {
      id: 2,
      title: "Robotics & Automation Bootcamp",
      duration: "2 weeks",
      dates: "August 5-19, 2024",
      ageGroup: "12-17 years",
      capacity: 25,
      description: "Build and program robots using industry-standard platforms",
      topics: ["Robot Design", "Programming", "Automation", "Competition Prep"],
      image: IMAGES.stem,
    },
    {
      id: 3,
      title: "Web & Mobile App Development",
      duration: "3 weeks",
      dates: "August 26 - September 13, 2024",
      ageGroup: "15-18 years",
      capacity: 35,
      description: "Create real-world web and mobile applications from scratch",
      topics: ["Frontend Development", "Backend APIs", "Mobile Apps", "Deployment"],
      image: IMAGES.stem,
    },
    {
      id: 4,
      title: "Drone Technology & Programming",
      duration: "2 weeks",
      dates: "September 9-23, 2024",
      ageGroup: "13-18 years",
      capacity: 20,
      description: "Master drone programming, flight control, and aerial photography",
      topics: ["Drone Mechanics", "Flight Programming", "Aerial Imaging", "Safety Protocols"],
      image: IMAGES.stem,
    },
  ];

  const prototypes = [
    {
      title: "Smart Agriculture IoT System",
      description: "IoT sensors for real-time crop monitoring and automated irrigation",
      category: "IoT",
      impact: "Helps farmers increase yields by 30%",
    },
    {
      title: "AI-Powered Educational Platform",
      description: "Personalized learning platform using machine learning algorithms",
      category: "AI/Education",
      impact: "Improves student engagement by 45%",
    },
    {
      title: "Renewable Energy Monitoring",
      description: "Real-time solar and wind energy monitoring and optimization system",
      category: "Green Tech",
      impact: "Reduces energy waste by 25%",
    },
    {
      title: "Healthcare Diagnostic Tool",
      description: "AI-powered diagnostic assistant for early disease detection",
      category: "Healthcare",
      impact: "Increases diagnostic accuracy by 40%",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${IMAGES.stem}')`,
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
            <div className="inline-block bg-amber-400/20 border border-amber-400 rounded-full px-4 py-2 mb-6">
              <span className="text-amber-300 text-sm font-semibold uppercase tracking-wider">STEM Excellence Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Angaza STEM Hub
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Located at Thika West Building, 3rd Floor, Room 302, Jomoko. Your gateway to transformative STEM education and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-slate-900">
                Enroll in Bootcamp <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hub Information */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4"
            >
              <MapPin className="text-amber-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">
                  Thika West Building, 3rd Floor, Room 302, Thika Road, Jomoko
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-4"
            >
              <Phone className="text-amber-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-foreground mb-2">Contact</h3>
                <p className="text-muted-foreground text-sm">+254729866328</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4"
            >
              <Mail className="text-amber-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-sm">info@angazafuture.org</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Holiday Bootcamps */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Holiday Bootcamps 2024</h2>
            <p className="text-lg text-muted-foreground">
              Intensive hands-on training programs designed for students aged 12-18. Featuring AI, Robotics, Coding, and Drone Technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bootcamps.map((bootcamp, index) => (
              <motion.div
                key={bootcamp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedBootcamp(selectedBootcamp === bootcamp.id ? null : bootcamp.id)}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                  <Zap className="text-white" size={48} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{bootcamp.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{bootcamp.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span>{bootcamp.dates}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span>{bootcamp.capacity} students</span>
                    </div>
                  </div>

                  {selectedBootcamp === bootcamp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <h4 className="font-semibold text-foreground mb-2">Topics Covered:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                        {bootcamp.topics.map((topic, i) => (
                          <li key={i}>• {topic}</li>
                        ))}
                      </ul>
                      <Button className="w-full">Enroll Now</Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STEM Prototypes */}
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">STEM Prototypes & Innovations</h2>
            <p className="text-lg text-muted-foreground">
              Student-led projects solving real-world problems across agriculture, healthcare, education, and renewable energy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prototypes.map((prototype, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Rocket className="text-primary" size={24} />
                  </div>
                  <div>
                    <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {prototype.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{prototype.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{prototype.description}</p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-primary">Impact: {prototype.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why STEM Hub */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Why Choose Angaza STEM Hub?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Industry-Standard Tools",
                description: "Learn with the same technologies used by leading tech companies worldwide",
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                description: "Guided by experienced engineers, developers, and industry professionals",
              },
              {
                icon: Cpu,
                title: "Hands-On Learning",
                description: "Build real projects, not just theory. Portfolio-ready work from day one",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Ready to Transform Your Future?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of young innovators at Angaza STEM Hub this holiday season.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
              Enroll in Bootcamp <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
