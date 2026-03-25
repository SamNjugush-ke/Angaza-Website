/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * About: Mission, vision, values, cross-cutting themes, and SDG alignment
 */

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Globe, Cpu, BookOpen, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import { IMAGES } from "@/lib/images";
import Footer from "@/components/Footer";




const values = [
  { icon: Heart, title: "Inclusivity", desc: "We ensure our programs are accessible to all, with a special focus on gender equality and women empowerment." },
  { icon: Target, title: "Impact-Driven", desc: "Every initiative is designed to create measurable, lasting change in the lives of entrepreneurs and communities." },
  { icon: Leaf, title: "Sustainability", desc: "We embed environmental consciousness and circular economy principles into all our programs and operations." },
  { icon: Users, title: "Community", desc: "We believe in the power of community — building networks, fostering partnerships, and creating collective growth." },
  { icon: Cpu, title: "Innovation", desc: "We embrace technology and innovation as catalysts for economic transformation and competitive advantage." },
  { icon: Globe, title: "Global Standards", desc: "Our programs align with international frameworks including the ILO SIYB model and the UN Sustainable Development Goals." },
];

const crossCutting = [
  { title: "Gender Inclusivity", desc: "All programs actively promote gender equality, with targeted support for women-led enterprises and female STEM participation.", color: "bg-pink-50 border-pink-200 text-pink-700" },
  { title: "Technology Integration", desc: "Digital tools and platforms are embedded throughout our training and support programs to build 21st-century competencies.", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { title: "MEAL Framework", desc: "Monitoring, Evaluation, Accountability & Learning (MEAL) ensures continuous improvement and transparent impact reporting.", color: "bg-teal-50 border-teal-200 text-teal-700" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>Who We Are</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">About Angaza Future International</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              A development organization dedicated to empowering entrepreneurs, promoting STEM careers, 
              and advancing Africa's participation in the digital and circular economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Target size={24} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                To promote inclusive and sustainable economic growth, employment, and decent work for all. 
                We are dedicated to achieving this through four core strategies:
              </p>
              <ol className="space-y-3">
                {[
                  "Fostering entrepreneurship by empowering emerging entrepreneurs with the insights and resources necessary to innovate and lead in their fields.",
                  "Supporting MSMEs by providing them with the tools and assistance required for growth and improvement.",
                  "Advancing participation in the digital economy, focusing on AI, coding, and online gig opportunities.",
                  "Enhancing education and training in STEM, blue and green jobs, work preparedness, and life skills.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-label text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="font-body text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                  <Eye size={24} className="text-amber-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  A world where every aspiring entrepreneur has access to the knowledge, tools, and networks 
                  needed to build thriving businesses — and where Africa leads the global digital and circular 
                  economy transition, powered by a generation of STEM-educated innovators.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg">
                <img src={IMAGES.community} alt="AFI community training" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-body text-sm text-white/90 italic">
                    "We Change Your Life &amp; World" — Angaza Future International
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cross-cutting themes */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="section-label justify-center mb-3">Our Approach</div>
              <h2 className="font-display text-3xl font-bold text-foreground">Cross-Cutting Themes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {crossCutting.map((theme, i) => (
                <motion.div
                  key={theme.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border rounded-2xl p-6 ${theme.color}`}
                >
                  <h3 className="font-display text-lg font-bold mb-3">{theme.title}</h3>
                  <p className="font-body text-sm leading-relaxed opacity-80">{theme.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-10">
              <div className="section-label justify-center mb-3">What Guides Us</div>
              <h2 className="font-display text-3xl font-bold text-foreground">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container text-center">
          <div className="section-label justify-center mb-4 text-amber-400" style={{ color: "#EAB308" }}>Global Framework</div>
          <h2 className="font-display text-3xl font-bold mb-4">Aligned with the UN Sustainable Development Goals</h2>
          <p className="font-body text-slate-300 max-w-2xl mx-auto mb-8">
            Our work directly contributes to SDG 8 (Decent Work and Economic Growth), SDG 4 (Quality Education), 
            SDG 5 (Gender Equality), SDG 9 (Industry, Innovation and Infrastructure), and SDG 12 (Responsible Consumption and Production).
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["SDG 4: Quality Education", "SDG 5: Gender Equality", "SDG 8: Decent Work", "SDG 9: Innovation", "SDG 12: Responsible Consumption"].map((sdg) => (
              <span key={sdg} className="bg-white/10 border border-white/20 text-white font-label text-sm px-4 py-2 rounded-full">
                {sdg}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
