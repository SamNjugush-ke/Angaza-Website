/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Impact: Statistics, beneficiary stories, partners, and SDG contributions
 */

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Users, Briefcase, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { IMAGES } from "@/lib/images";
import Footer from "@/components/Footer";




function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BigStat({ value, label, suffix = "", icon: Icon }: { value: number; label: string; suffix?: string; icon: React.ElementType }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="text-center p-8 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="font-display text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="font-label text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

const beneficiaries = [
  {
    name: "Claratel Gift Shop",
    stage: "Expand Your Business (EYB)",
    type: "E-Commerce Gift Shop",
    cohort: "2021/22",
    entrepreneur: "Cerine Njeri",
    email: "info@claratel.co.ke",
    website: "claratel.co.ke",
    stageColor: "bg-teal-100 text-teal-700",
    description: "Claratel Gift Shop has grown from a local gift shop to a thriving e-commerce platform, now in the expansion stage with digital marketing and online sales capabilities.",
  },
  {
    name: "Safepass Fire Agency",
    stage: "Improve Your Business (IYB)",
    type: "Fire Safety Consultant",
    cohort: "2021/22",
    entrepreneur: "Victor Gacathi",
    email: "victorjuniork8@gmail.com",
    website: "www.safepass.co.ke",
    stageColor: "bg-amber-100 text-amber-700",
    description: "Safepass Fire Agency provides critical fire safety consulting services, currently in the improvement phase with enhanced business processes and client management systems.",
  },
];

export default function Impact() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.msme})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>Results & Stories</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Impact</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              Real numbers, real stories, real change. Here is what Angaza Future International 
              has achieved for entrepreneurs and communities across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">By the Numbers</div>
            <h2 className="font-display text-3xl font-bold text-foreground">Measurable Change</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BigStat value={118} label="SMEs Supported" suffix="+" icon={Briefcase} />
            <BigStat value={366} label="Jobs Created" suffix="+" icon={Users} />
            <BigStat value={6} label="Partners" icon={TrendingUp} />
            <BigStat value={1} label="STEM Bootcamps" icon={BookOpen} />
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">Success Stories</div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Some of Our Beneficiaries</h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Behind every statistic is a person with a dream. Here are some of the entrepreneurs 
              whose lives and businesses have been transformed through our programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beneficiaries.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{b.name}</h3>
                    <p className="font-body text-sm text-muted-foreground">{b.type}</p>
                  </div>
                  <span className={`font-label text-xs font-semibold px-3 py-1.5 rounded-full ${b.stageColor}`}>
                    {b.stage}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{b.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-label text-xs text-muted-foreground uppercase tracking-wider">Entrepreneur</span>
                    <p className="font-body text-foreground font-medium">{b.entrepreneur}</p>
                  </div>
                  <div>
                    <span className="font-label text-xs text-muted-foreground uppercase tracking-wider">Cohort</span>
                    <p className="font-body text-foreground font-medium">{b.cohort}</p>
                  </div>
                  <div>
                    <span className="font-label text-xs text-muted-foreground uppercase tracking-wider">Email</span>
                    <a href={`mailto:${b.email}`} className="font-body text-primary hover:underline text-sm">{b.email}</a>
                  </div>
                  <div>
                    <span className="font-label text-xs text-muted-foreground uppercase tracking-wider">Website</span>
                    <a
                      href={`https://${b.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      {b.website} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Impact */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">Global Goals</div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Contributing to the SDGs</h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Our programs directly contribute to multiple United Nations Sustainable Development Goals, 
              creating impact that extends beyond individual businesses to entire communities and ecosystems.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { sdg: "SDG 4", title: "Quality Education", desc: "STEM bootcamps and skills training provide quality educational opportunities for youth, particularly girls.", color: "bg-red-50 border-red-200 text-red-700" },
              { sdg: "SDG 5", title: "Gender Equality", desc: "All programs actively promote women's economic empowerment and female participation in STEM and entrepreneurship.", color: "bg-orange-50 border-orange-200 text-orange-700" },
              { sdg: "SDG 8", title: "Decent Work & Economic Growth", desc: "Our core mission — creating jobs, supporting MSMEs, and promoting inclusive economic growth across Africa.", color: "bg-amber-50 border-amber-200 text-amber-700" },
              { sdg: "SDG 9", title: "Industry, Innovation & Infrastructure", desc: "Digital economy training and STEM promotion build the innovation capacity needed for industrial development.", color: "bg-teal-50 border-teal-200 text-teal-700" },
              { sdg: "SDG 10", title: "Reduced Inequalities", desc: "By targeting marginalized communities and underserved entrepreneurs, we actively work to reduce economic inequality.", color: "bg-pink-50 border-pink-200 text-pink-700" },
              { sdg: "SDG 12", title: "Responsible Consumption", desc: "Circular economy training promotes sustainable business practices that reduce waste and environmental impact.", color: "bg-green-50 border-green-200 text-green-700" },
            ].map((item, i) => (
              <motion.div
                key={item.sdg}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`border rounded-2xl p-6 ${item.color}`}
              >
                <div className="font-label text-xs font-bold mb-1 opacity-60">{item.sdg}</div>
                <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed opacity-80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container text-center">
          <div className="section-label justify-center mb-4 text-amber-400" style={{ color: "#EAB308" }}>Collaboration</div>
          <h2 className="font-display text-3xl font-bold mb-4">Our Partners</h2>
          <p className="font-body text-slate-300 max-w-2xl mx-auto mb-8">
            We work with a growing network of 6 partners including development organizations, 
            government agencies, private sector companies, and academic institutions to amplify our impact.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-6 py-3">
            <span className="font-display text-2xl font-bold text-amber-400">6</span>
            <span className="font-body text-slate-300">Active Partners &amp; Growing</span>
          </div>
          <p className="font-body text-sm text-slate-400 mt-6">
            Interested in partnering with us?{" "}
            <a href="/contact" className="text-amber-400 hover:text-amber-300 underline">Get in touch</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
