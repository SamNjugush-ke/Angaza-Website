/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Approach: 6-step methodology, pre/during/post training phases, MEAL framework
 */

import { motion } from "framer-motion";
import { ClipboardList, BookOpen, Link2, BarChart3, Lightbulb, Users, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { IMAGES } from "@/lib/images";
import Footer from "@/components/Footer";



const phases = [
  {
    phase: "Pre-Training",
    color: "bg-teal-600",
    steps: [
      { icon: ClipboardList, title: "Training Needs Assessment", desc: "Comprehensive evaluation of beneficiaries' current skills, knowledge gaps, and business context to tailor training content effectively." },
      { icon: BookOpen, title: "Training Modules Development", desc: "Customization of SIYB and STEM curricula to address identified needs, incorporating local context, gender considerations, and technology integration." },
    ],
  },
  {
    phase: "During Training",
    color: "bg-amber-500",
    steps: [
      { icon: Lightbulb, title: "Lifeskills Training", desc: "Building foundational competencies including communication, financial literacy, leadership, problem-solving, and personal development." },
      { icon: Users, title: "Experiential Learning", desc: "Hands-on, practical activities including business simulations, field visits, peer learning, and real-world problem-solving exercises." },
    ],
  },
  {
    phase: "Post-Training",
    color: "bg-blue-600",
    steps: [
      { icon: Link2, title: "Linkage & Matching", desc: "Connecting graduates with markets, suppliers, financial institutions, mentors, and business networks to accelerate their growth journey." },
      { icon: BarChart3, title: "Evaluation & Assessment", desc: "Rigorous measurement of outcomes against baseline data to assess impact, identify lessons learned, and improve future programming." },
    ],
  },
];

const crossCutting = [
  {
    title: "Gender Inclusivity",
    desc: "Every step of our methodology actively promotes gender equality. We set targets for female participation, provide safe learning environments, and offer targeted support for women-led enterprises. Our STEM programs specifically focus on inspiring girls to pursue STEM careers.",
    icon: Users,
    color: "text-pink-600 bg-pink-50 border-pink-200",
  },
  {
    title: "Technology Integration",
    desc: "Digital tools are embedded throughout all training phases. From digital business registration to online marketing and AI-powered business analytics, we ensure participants develop 21st-century digital competencies alongside traditional business skills.",
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    title: "MEAL Framework",
    desc: "Monitoring, Evaluation, Accountability & Learning (MEAL) is not an afterthought — it is woven into every phase. We track inputs, outputs, outcomes, and impact systematically, ensuring transparency, learning, and continuous improvement across all programs.",
    icon: BarChart3,
    color: "text-teal-600 bg-teal-50 border-teal-200",
  },
];

export default function Approach() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.community})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>How We Work</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Approach</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              A structured, adaptable six-step methodology that guides every cohort from needs assessment 
              through training to post-program linkage and evaluation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl text-center">
          <div className="section-label justify-center mb-4">Our Methodology</div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-5">
            Adaptable, Inclusive, and Evidence-Based
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            With the overriding goal of developing new MSMEs and improving existing ones by auditing their business 
            processes to bridge operational gaps, our approach is designed to be adaptable and flexible. When developing 
            and delivering GYBI, SYB, IYB, and EYB modules for each cohort, a six-step method is followed spanning 
            pre-training, training, and post-training phases. At every stage, cross-cutting factors of gender inclusivity, 
            technology, and MEAL are incorporated.
          </p>
        </div>
      </section>

      {/* 6-Step Methodology */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">The Six Steps</div>
            <h2 className="font-display text-3xl font-bold text-foreground">From Assessment to Impact</h2>
          </div>

          <div className="space-y-12">
            {phases.map((phase, pi) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: pi * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${phase.color} text-white font-label text-sm font-semibold px-4 py-1.5 rounded-full`}>
                    {phase.phase}
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.steps.map((step, si) => (
                    <div
                      key={step.title}
                      className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <step.icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-label text-xs text-muted-foreground mb-1">
                            Step {pi * 2 + si + 1}
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-cutting Factors */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">Always Present</div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Cross-Cutting Factors</h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              These three dimensions are not separate components — they are woven into every step, 
              every interaction, and every decision across all our programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {crossCutting.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`border rounded-2xl p-6 ${item.color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed opacity-80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>Why It Works</div>
              <h2 className="font-display text-3xl font-bold text-white mb-5">
                Built on Proven International Frameworks
              </h2>
              <p className="font-body text-slate-300 leading-relaxed mb-6">
                Our approach is grounded in the ILO's internationally validated SIYB (Start and Improve Your Business) 
                methodology, which has been implemented in over 100 countries. We adapt this framework to the specific 
                context of African entrepreneurs, incorporating local market realities, cultural considerations, and 
                the unique opportunities presented by Africa's digital transformation.
              </p>
              <div className="space-y-3">
                {[
                  "ILO-validated SIYB methodology",
                  "Adapted for African market contexts",
                  "Integrated digital economy components",
                  "Gender-responsive design throughout",
                  "Continuous learning and adaptation",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <ArrowRight size={14} className="text-amber-400 shrink-0" />
                    <span className="font-body text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img src={IMAGES.community} alt="AFI training session" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
