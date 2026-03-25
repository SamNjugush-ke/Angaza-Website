/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Programs: Detailed sections for STEM, MSME, Digital & Circular Economy
 * SEO-optimized with rich content for each focus area
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, Globe, Cpu, Recycle, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { IMAGES } from "@/lib/images";
import Footer from "@/components/Footer";






const programs = [
  {
    id: "stem",
    icon: BookOpen,
    label: "Education & Training",
    title: "STEM Promotion",
    subtitle: "Inspiring Africa's Next Generation of Innovators",
    image: IMAGES.stem,
    description: "Our STEM promotion programs are designed to spark interest in Science, Technology, Engineering, and Mathematics among high school students across Africa. Through engaging holiday bootcamps and hands-on workshops, we create transformative learning experiences that open doors to high-value careers and entrepreneurship.",
    highlights: [
      "Holiday STEM Bootcamps for high school students",
      "Special emphasis on empowering young women in STEM",
      "Hands-on robotics, coding, and engineering workshops",
      "Career guidance for STEM, blue jobs, and green jobs",
      "Work preparedness and life skills training",
      "Linkages to universities and industry mentors",
    ],
    impact: "Our STEM bootcamps have reached hundreds of students, with a deliberate focus on gender equality and inspiring girls to pursue STEM careers.",
    color: "teal",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: "msme",
    icon: Briefcase,
    label: "Entrepreneurship",
    title: "MSME Support",
    subtitle: "Empowering Entrepreneurs Through the SIYB Framework",
    image: IMAGES.msme,
    description: "We employ the internationally recognized Start and Improve Your Business (SIYB) model — developed by the International Labour Organization (ILO) — to empower Micro, Small, and Medium Enterprises with the skills, knowledge, and resources necessary for launching and expanding successful ventures.",
    highlights: [
      "GYBI: Generate Your Business Idea — business canvas and plan development",
      "SYB: Start Your Business — registration, licensing, and startup toolkits",
      "IYB: Improve Your Business — mentorship, budgeting, and stock control",
      "EYB: Expand Your Business — advanced marketing and external funding",
      "Access to initial capital and tools of trade",
      "Business linkages, market access, and partnership facilitation",
    ],
    impact: "Over 118 SMEs supported with 366+ jobs created, spanning sectors from e-commerce and fire safety to agriculture and services.",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "digital",
    icon: Globe,
    label: "Digital & Circular Economy",
    title: "Digital & Circular Economy Participation",
    subtitle: "Building Skills for the 21st-Century Economy",
    image: IMAGES.digital,
    description: "We advance Africa's participation in the digital and circular economy by building critical skills in artificial intelligence, coding, and online gig opportunities. Simultaneously, we promote circular economy principles that reduce waste, create new economic value, and contribute to environmental sustainability.",
    highlights: [
      "Artificial Intelligence (AI) literacy and application training",
      "Coding bootcamps and software development fundamentals",
      "Online gig economy skills — freelancing, remote work, digital marketing",
      "Circular economy principles and sustainable business practices",
      "E-commerce and digital marketplace training",
      "Green entrepreneurship and sustainable innovation",
    ],
    impact: "Equipping entrepreneurs and youth with the digital skills needed to compete in the global economy and contribute to a sustainable future.",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "vsla",
    icon: Users,
    label: "Community Finance",
    title: "Village Savings & Loan Associations (VSLAs)",
    subtitle: "Community-Powered Financial Inclusion",
    image: IMAGES.community,
    description: "Village Savings and Loan Associations (VSLAs) are self-managed, community-based microfinance groups that enable people living in poverty to save money collectively and access small loans from their peers. VSLAs provide the financial foundation for MSME growth and economic empowerment across Africa.",
    highlights: [
      "Self-managed savings groups (10-25 members per group)",
      "Access to emergency funds without debt",
      "Small loans for business startup and expansion",
      "Women's economic empowerment (78% female membership)",
      "Community trust-building and social cohesion",
      "Pathway to formal financial services",
    ],
    impact: "Over 30 million people globally have benefited from VSLAs, with 275% average income growth within 5 years and 89% sustainability rate.",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    tagColor: "bg-green-100 text-green-700",
  },
];

export default function Programs() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>What We Do</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Programs</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              Three interconnected focus areas that create comprehensive pathways to economic empowerment, 
              innovation, and sustainable growth across Africa.
            </p>
          </motion.div>
          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mt-8">
            {programs.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label text-sm px-4 py-2 rounded-full transition-colors"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <div className="bg-background">
        {programs.map((program, i) => (
          <section
            key={program.id}
            id={program.id}
            className={`py-20 ${i % 2 === 1 ? "bg-slate-50" : "bg-background"}`}
            aria-label={program.title}
          >
            <div className="container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={i % 2 === 1 ? "lg:order-2" : ""}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`font-label text-xs font-semibold px-3 py-1.5 rounded-full ${program.tagColor}`}>
                        {program.label}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={i % 2 === 1 ? "lg:order-1" : ""}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${program.bgColor} ${program.borderColor} border`}>
                      <program.icon size={20} className={`text-${program.color}-600`} />
                    </div>
                    <div className="section-label">{program.label}</div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{program.title}</h2>
                  <p className="font-label text-lg text-muted-foreground mb-5 italic">{program.subtitle}</p>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">{program.description}</p>

                  <div className="space-y-2 mb-6">
                    {program.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                        <span className="font-body text-sm text-foreground/80">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`${program.bgColor} ${program.borderColor} border rounded-xl p-4 mb-6`}>
                    <div className="flex items-start gap-3">
                      <Zap size={16} className={`text-${program.color}-600 mt-0.5 shrink-0`} />
                      <p className="font-body text-sm text-foreground/80 italic">{program.impact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-label rounded-full px-6">
                      <Link href="/contact">
                        Get Involved <ArrowRight size={14} className="ml-2" />
                      </Link>
                    </Button>
                    {program.id === "stem" && (
                      <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 font-label rounded-full px-6">
                        <Link href="/resources/stem">
                          View Resources <ArrowRight size={14} className="ml-2" />
                        </Link>
                      </Button>
                    )}
                    {program.id === "msme" && (
                      <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 font-label rounded-full px-6">
                        <Link href="/resources/msme">
                          View Resources <ArrowRight size={14} className="ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Additional Programs */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-label justify-center mb-3 text-amber-400" style={{ color: "#EAB308" }}>Also Covered</div>
            <h2 className="font-display text-3xl font-bold mb-4">Additional Program Areas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Blue Jobs", desc: "Ocean, water, and marine economy careers for coastal communities." },
              { icon: Recycle, title: "Green Jobs", desc: "Environmental sustainability and clean energy career pathways." },
              { icon: Cpu, title: "Work Preparedness", desc: "Professional skills, workplace readiness, and career planning." },
              { icon: Globe, title: "Life Skills", desc: "Financial literacy, communication, leadership, and personal development." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-amber-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="font-body text-sm text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
