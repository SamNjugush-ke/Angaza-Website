import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Download, ChevronRight, Filter, Grid3x3, List, X, FileText, Shield, Users, Briefcase, Leaf, Lock, TrendingUp, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/lib/images";

interface Policy {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  sections: string[];
  lastUpdated: string;
}

const policies: Policy[] = [
  {
    id: "financial-management",
    title: "Financial Management Policy",
    category: "Finance & Operations",
    description: "Ensure transparent, accountable, and efficient management of organizational finances in compliance with Kenyan legal requirements.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    sections: ["Purpose", "Key Principles", "Scope", "Implementation", "Responsibilities"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "procurement",
    title: "Procurement Policy",
    category: "Finance & Operations",
    description: "Establish transparent, competitive, and value-for-money procurement processes that comply with Kenyan regulations.",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-amber-500 to-amber-600",
    sections: ["Purpose", "Key Principles", "Procurement Categories", "Compliance", "Implementation"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "human-resource",
    title: "Human Resource Policy",
    category: "People & Culture",
    description: "Establish fair, transparent, and inclusive HR practices that attract and retain talented staff.",
    icon: <Users className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
    sections: ["Recruitment", "Compensation", "Benefits", "Professional Development", "Performance Management"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "anti-fraud",
    title: "Anti-Fraud and Corruption Policy",
    category: "Compliance & Ethics",
    description: "Prevent, detect, and respond to fraud and corruption to protect organizational assets.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    sections: ["Definitions", "Prevention Measures", "Detection", "Response", "Enforcement"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "safeguarding",
    title: "Safeguarding and Child Protection Policy",
    category: "Compliance & Ethics",
    description: "Ensure all children and vulnerable persons are protected from harm, abuse, and exploitation.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    sections: ["Scope", "Key Principles", "Child Protection Standards", "Reporting Procedures", "Prevention"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "gender-equality",
    title: "Gender Equality and Inclusion Policy",
    category: "Compliance & Ethics",
    description: "Promote gender equality, social inclusion, and non-discrimination across all organizational activities.",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    sections: ["Commitments", "Implementation", "Accountability", "Monitoring", "Reporting"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "monitoring-evaluation",
    title: "Monitoring & Evaluation (M&E) Policy",
    category: "Learning & Impact",
    description: "Establish systematic monitoring and evaluation to track progress and demonstrate impact.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-teal-500 to-teal-600",
    sections: ["Framework", "Key Components", "Data Management", "Reporting", "Learning"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "data-protection",
    title: "Data Protection & Privacy Policy",
    category: "Compliance & Ethics",
    description: "Protect personal data and privacy of beneficiaries, staff, and stakeholders.",
    icon: <Lock className="w-6 h-6" />,
    color: "from-indigo-500 to-indigo-600",
    sections: ["Principles", "Data Collection", "Data Security", "Rights", "Data Breach Response"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "conflict-interest",
    title: "Conflict of Interest Policy",
    category: "Compliance & Ethics",
    description: "Identify, disclose, and manage conflicts of interest to maintain organizational integrity.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-500 to-orange-600",
    sections: ["Definition", "Scope", "Disclosure Requirements", "Management Procedures", "Enforcement"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "whistleblower",
    title: "Whistleblower Protection Policy",
    category: "Compliance & Ethics",
    description: "Encourage reporting of suspected wrongdoing while protecting whistleblowers from retaliation.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-cyan-500 to-cyan-600",
    sections: ["Protected Disclosures", "Reporting Channels", "Protections", "Investigation Process", "False Reports"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "risk-management",
    title: "Risk Management Policy",
    category: "Learning & Impact",
    description: "Identify, assess, and manage organizational risks to ensure sustainable operations.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-rose-500 to-rose-600",
    sections: ["Risk Categories", "Risk Management Process", "Risk Mitigation", "Business Continuity", "Monitoring"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "asset-management",
    title: "Asset Management Policy",
    category: "Finance & Operations",
    description: "Ensure efficient use, maintenance, and accountability of organizational assets.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-lime-500 to-lime-600",
    sections: ["Asset Categories", "Asset Control", "Acquisition", "Use and Maintenance", "Disposal"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "travel-perdiem",
    title: "Travel and Per Diem Policy",
    category: "Finance & Operations",
    description: "Establish transparent and cost-effective procedures for staff travel.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-sky-500 to-sky-600",
    sections: ["Travel Authorization", "Travel Arrangements", "Per Diem Rates", "Documentation", "Safety"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "partnership",
    title: "Partnership and Sub-Grant Management Policy",
    category: "Finance & Operations",
    description: "Establish transparent procedures for managing partnerships and sub-grants.",
    icon: <Users className="w-6 h-6" />,
    color: "from-fuchsia-500 to-fuchsia-600",
    sections: ["Partnership Types", "Partner Selection", "Partnership Agreement", "Sub-Grant Management", "Monitoring"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "communications",
    title: "Communications and Branding Policy",
    category: "Learning & Impact",
    description: "Ensure consistent, professional, and impactful organizational communications.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-violet-500 to-violet-600",
    sections: ["Brand Identity", "Communication Channels", "Content Guidelines", "Social Media", "Media Relations"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "it-policy",
    title: "Information Technology (IT) Policy",
    category: "Compliance & Ethics",
    description: "Ensure secure, reliable, and efficient use of IT systems and data.",
    icon: <Lock className="w-6 h-6" />,
    color: "from-slate-500 to-slate-600",
    sections: ["IT Infrastructure", "User Access", "Data Security", "Device Management", "Incident Response"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "environmental",
    title: "Environmental and Social Safeguards Policy",
    category: "Compliance & Ethics",
    description: "Integrate environmental sustainability and social responsibility into all activities.",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-emerald-500 to-emerald-600",
    sections: ["Environmental Commitments", "Social Safeguards", "Impact Assessment", "Climate Change", "Supply Chain"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "volunteer",
    title: "Volunteer Management Policy",
    category: "People & Culture",
    description: "Effectively recruit, manage, and support volunteers.",
    icon: <Users className="w-6 h-6" />,
    sections: ["Volunteer Types", "Recruitment", "Vetting", "Support and Management", "Recognition"],
    lastUpdated: "2024-01-15",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "board-governance",
    title: "Board Governance Policy",
    category: "Governance",
    description: "Establish effective Board governance to provide strategic leadership and accountability.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-gray-500 to-gray-600",
    sections: ["Board Composition", "Board Roles", "Board Meetings", "Board Committees", "Board Development"],
    lastUpdated: "2024-01-15",
  },
  {
    id: "fundraising",
    title: "Fundraising and Donor Compliance Policy",
    category: "Governance",
    description: "Establish ethical fundraising practices and ensure compliance with donor requirements.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    sections: ["Fundraising Strategy", "Donor Due Diligence", "Donor Agreements", "Fund Management", "Compliance"],
    lastUpdated: "2024-01-15",
  },
];

const categories = ["All", "Finance & Operations", "People & Culture", "Compliance & Ethics", "Learning & Impact", "Governance"];

interface ShoppingCartIcon {
  className: string;
}

function ShoppingCart(props: ShoppingCartIcon) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export default function Policies() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesCategory = activeCategory === "All" || policy.category === activeCategory;
      const matchesSearch =
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4">Organizational Governance</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Organizational Policies</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              Comprehensive policies guiding Angaza Future International's operations, ensuring transparency, accountability, and alignment with our mission to empower entrepreneurs and advance Africa's digital economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-background flex-1">
        <div className="container">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="gap-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  List
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Policies Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPolicy(policy)}
                  className="group cursor-pointer"
                >
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${policy.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {policy.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">{policy.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{policy.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{policy.category}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPolicy(policy)}
                  className="group cursor-pointer"
                >
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/50 transition-all flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${policy.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {policy.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground mb-1">{policy.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{policy.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{policy.category}</span>
                        <span className="text-xs text-muted-foreground">Updated {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No policies found matching your search.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPolicy(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedPolicy.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {selectedPolicy.icon}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">{selectedPolicy.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPolicy.category}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPolicy(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-foreground">{selectedPolicy.description}</p>

              <div>
                <h3 className="font-display font-bold text-foreground mb-3">Policy Sections</h3>
                <ul className="space-y-2">
                  {selectedPolicy.sections.map((section, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{section}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Last Updated:</strong> {new Date(selectedPolicy.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Status:</strong> <span className="text-green-600">Active & Approved</span>
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download Policy
                </Button>
                <Button variant="outline" className="flex-1">
                  Print
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
