/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Home: Full-bleed hero with parallax, flowing sections, impact stats, program cards
 * Images: Custom generated hero, STEM, MSME, digital economy, community images
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Users, Briefcase, Lightbulb, Globe, TrendingUp, BookOpen, Cpu, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { trpc } from "@/lib/trpc";

// Animated counter hook
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

// Intersection observer hook
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

function StatCard({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-amber-400 mb-1">
        {count}{suffix}
      </div>
      <div className="font-label text-sm text-slate-300 uppercase tracking-wider">{label}</div>
    </div>
  );
}

const focusAreas = [
  {
    icon: BookOpen,
    title: "STEM Promotion",
    description: "Inspiring the next generation of scientists, engineers, and innovators through holiday bootcamps and hands-on learning experiences, with a special emphasis on empowering young women.",
    color: "from-teal-500 to-teal-700",
    href: "/programs#stem",
    image: IMAGES.stem,
  },
  {
    icon: Briefcase,
    title: "MSME Support",
    description: "Empowering micro, small, and medium enterprises through the proven SIYB (Start and Improve Your Business) framework — from idea generation to business expansion.",
    color: "from-amber-500 to-amber-700",
    href: "/programs#msme",
    image: IMAGES.msme,
  },
  {
    icon: Globe,
    title: "Digital & Circular Economy",
    description: "Building skills in AI, coding, and online gig opportunities while promoting sustainable circular economy practices that reduce waste and create new economic value.",
    color: "from-blue-500 to-blue-700",
    href: "/programs#digital",
    image: IMAGES.digital,
  },
];

const siyb = [
  {
    step: "01",
    title: "Generate Your Business Idea",
    abbr: "GYBI",
    desc: "Potential beneficiaries are assisted to choose a concrete and feasible business idea. Outputs include a successful pitching process, a completed business canvas model, and an approved business plan.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Start Your Business",
    abbr: "SYB",
    desc: "Entrepreneurs undergo training to enhance their readiness to launch. Practical activities include making necessary registrations and obtaining licenses, plus startup toolkits with initial capital and tools of trade.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Improve Your Business",
    abbr: "IYB",
    desc: "Operational businesses are guided and trained on planning, budgeting, and stock control. Theory from GYBI and SYB is converted into practice through mentorship and strategic linkages.",
    icon: Users,
  },
  {
    step: "04",
    title: "Expand Your Business",
    abbr: "EYB",
    desc: "Growth-minded MSMEs are supported to expand from local markets. Advanced marketing, people management, partnerships, external funding, and credit facilities are brought to perspective.",
    icon: Globe,
  },
];

export default function Home() {
  const { data: testimonials = [] } = trpc.admin.public.testimonials.useQuery();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 container pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-0.5 bg-amber-400 inline-block" />
              <span className="font-label text-xs font-semibold uppercase tracking-widest text-amber-400">
                Empowering Entrepreneurs, Building Futures
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Advancing{" "}
              <span className="text-amber-400">STEM, MSMEs</span>{" "}
              &amp; the{" "}
              <span className="text-teal-400">Digital Economy</span>{" "}
              in Africa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-lg text-white/80 leading-relaxed mb-8 max-w-2xl"
            >
              Angaza Future International promotes inclusive and sustainable economic growth 
              by fostering entrepreneurship, supporting MSMEs, advancing digital economy participation, 
              and enhancing STEM education across Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-label font-semibold rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/programs">
                  Explore Our Programs <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-label font-semibold rounded-full px-8 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-label text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* ─── IMPACT STATS STRIP ─── */}
      <section className="bg-slate-900 py-12" aria-label="Impact statistics">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={118} label="SMEs Supported" suffix="+" />
            <StatCard value={366} label="Jobs Created" suffix="+" />
            <StatCard value={6} label="Partners" />
            <StatCard value={1} label="STEM Bootcamps" />
          </div>
        </div>
      </section>

      {/* ─── MISSION SECTION ─── */}
      <section className="py-20 bg-background" aria-label="Our mission">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-label mb-4">Our Mission</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Promoting Inclusive &amp; Sustainable Economic Growth
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Our mission is to promote inclusive and sustainable economic growth, employment, 
                and decent work for all. We achieve this through four core strategies that address 
                the interconnected challenges of entrepreneurship, skills development, and economic participation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Lightbulb, text: "Fostering entrepreneurship and innovation" },
                  { icon: Briefcase, text: "Supporting MSMEs with tools for growth" },
                  { icon: Cpu, text: "Advancing digital economy participation" },
                  { icon: BookOpen, text: "Enhancing STEM education and training" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground/80">{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-label rounded-full px-6">
                  <Link href="/about">
                    About Angaza Future <ArrowRight size={14} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={IMAGES.community}
                  alt="Angaza Future International community training session"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Recycle size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="font-label text-xs text-muted-foreground">SDG Aligned</div>
                    <div className="font-display text-sm font-semibold text-foreground">SDG 8: Decent Work</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ─── */}
      <section className="py-20 bg-slate-50" aria-label="Our focus areas">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">What We Do</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Three Pillars of Impact
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Our work is organized around three interconnected focus areas that together create 
              pathways to sustainable economic empowerment for individuals and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg`}>
                    <area.icon size={18} className="text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{area.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{area.description}</p>
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-2 font-label text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SIYB PROCESS ─── */}
      <section className="py-20 bg-background" aria-label="Our SIYB process">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">Our Model</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The SIYB Framework
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              The Start and Improve Your Business (SIYB) model guides entrepreneurs through 
              a structured four-stage journey from idea to expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siyb.map((step, i) => (
              <motion.div
                key={step.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Step number */}
                <div className="font-label text-5xl font-bold text-primary/10 absolute top-4 right-4 leading-none">
                  {step.step}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-primary" />
                </div>
                {/* Badge */}
                <div className="inline-block bg-amber-100 text-amber-700 font-label text-xs font-semibold px-2 py-0.5 rounded-full mb-3">
                  {step.abbr}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {/* Connector arrow for non-last items */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-md">
                      <ArrowRight size={12} className="text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-label rounded-full px-8 transition-all">
              <Link href="/approach">See Our Full Approach</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        className="relative py-24 overflow-hidden"
        aria-label="Call to action"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.digital})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-900/80 to-slate-900/90" />
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-amber-400 inline-block" />
              <span className="font-label text-xs font-semibold uppercase tracking-widest text-amber-400">
                Join Our Mission
              </span>
              <span className="w-8 h-0.5 bg-amber-400 inline-block" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Together, We Can Build a Better Future for All
            </h2>
            <p className="font-body text-lg text-white/80 max-w-2xl mx-auto mb-8">
              By working with Angaza Future International, you can make a difference in the lives 
              of aspiring entrepreneurs and help create sustainable economic growth in communities across Africa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-label font-semibold rounded-full px-8 shadow-lg"
              >
                <Link href="/contact">Support Our Work</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-label font-semibold rounded-full px-8 bg-transparent"
              >
                <Link href="/impact">See Our Impact</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={testimonials} />
      )}

      <Footer />
    </div>
  );
}
