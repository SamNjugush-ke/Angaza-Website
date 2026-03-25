import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, Users, Target, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  funding: string;
  budget: string;
  partners: string[];
  achievements: string[];
  gallery: string[];
  impact: string;
  team: number;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "STEM Hub Expansion Initiative",
      description: "Establishing the Angaza STEM Hub as a premier innovation center with five specialized learning spaces",
      status: "Ongoing",
      startDate: "January 2023",
      endDate: "December 2025",
      funding: "KES 15,000,000",
      budget: "Infrastructure, Equipment, Staff Training",
      partners: ["Ministry of Education", "Google for Africa", "Microsoft Philanthropies", "Konrad Adenauer Foundation"],
      achievements: [
        "Completed Robotics & AI Makerspace",
        "Launched 3D Design & Fabrication Lab",
        "Trained 500+ students in STEM",
        "Achieved 56% female participation",
        "72% of advanced participants pursuing STEM careers",
      ],
      gallery: [IMAGES.stem, IMAGES.community, IMAGES.stem],
      impact: "Transformed STEM education access for 2,000+ students across Kiambu County",
      team: 12,
    },
    {
      id: 2,
      title: "MSME Lab Development & Deployment",
      description: "Building an AI-powered ecosystem for small and medium enterprises to transition to data-driven growth",
      status: "Ongoing",
      startDate: "March 2023",
      endDate: "June 2025",
      funding: "KES 8,500,000",
      budget: "Software Development, AI Integration, Pilot Testing",
      partners: ["Kenya Innovation Hub", "Safaricom Foundation", "Central Bank of Kenya", "ICTA"],
      achievements: [
        "Developed ERP & POS system",
        "Integrated AI Business Intelligence",
        "Built B2B Marketplace",
        "Launched Trust Score System",
        "Piloted with 150+ businesses",
      ],
      gallery: [IMAGES.msme, IMAGES.digital, IMAGES.msme],
      impact: "Helping 500+ MSMEs formalize and access financing",
      team: 8,
    },
    {
      id: 3,
      title: "Holiday Bootcamp Series 2024-2025",
      description: "Intensive training programs during school holidays targeting youth aged 12-18",
      status: "Active",
      startDate: "July 2024",
      endDate: "September 2025",
      funding: "KES 3,200,000",
      budget: "Instructor Fees, Materials, Certification",
      partners: ["Kenya Vision 2030", "Tech Community Kenya", "School Partners"],
      achievements: [
        "Conducted 4 bootcamps",
        "Trained 110+ students",
        "100% completion rate",
        "85% pursuing STEM careers",
        "Strong gender balance maintained",
      ],
      gallery: [IMAGES.stem, IMAGES.stem, IMAGES.community],
      impact: "Created pathways for 110 young innovators",
      team: 6,
    },
    {
      id: 4,
      title: "SIYB Training Expansion Across Kenya",
      description: "Scaling ILO-certified Start and Improve Your Business training nationwide",
      status: "Ongoing",
      startDate: "June 2023",
      endDate: "December 2025",
      funding: "KES 5,800,000",
      budget: "Trainer Certification, Materials, Logistics",
      partners: ["ILO Kenya", "Kenya National Bureau of Statistics", "County Governments"],
      achievements: [
        "Trained 800+ entrepreneurs",
        "85% business success rate",
        "Average revenue increase: 120%",
        "Expanded to 8 counties",
        "Created 300+ jobs",
      ],
      gallery: [IMAGES.msme, IMAGES.community, IMAGES.msme],
      impact: "Empowered 800 entrepreneurs to formalize and grow their businesses",
      team: 10,
    },
    {
      id: 5,
      title: "Women in STEM Acceleration Program",
      description: "Dedicated program to increase female participation and leadership in STEM",
      status: "Active",
      startDate: "January 2024",
      endDate: "December 2025",
      funding: "KES 2,500,000",
      budget: "Mentorship, Scholarships, Events",
      partners: ["UN Women", "Equity Bank Foundation", "Tech Sisters Kenya"],
      achievements: [
        "Increased female participation from 31% to 56%",
        "Mentored 200+ girls",
        "Hosted 3 Women in Tech events",
        "Scholarship support for 50 girls",
        "5 girls selected for international programs",
      ],
      gallery: [IMAGES.stem, IMAGES.community, IMAGES.stem],
      impact: "Breaking gender barriers in STEM education and careers",
      team: 5,
    },
  ];

  const selectedProjectData = selectedProject ? projects.find(p => p.id === selectedProject) : null;

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
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">Our Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformative initiatives creating impact across STEM, MSME support, and digital economy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project.id)}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors cursor-pointer group"
              >
                {/* Project Header */}
                <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('${project.gallery[0]}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign size={16} />
                      <span>{project.funding}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span>{project.team} team members</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award size={16} />
                      <span>{project.achievements.length} achievements</span>
                    </div>
                  </div>

                  {/* Partners Preview */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Partners</p>
                    <div className="flex flex-wrap gap-2">
                      {project.partners.slice(0, 2).map((partner, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {partner}
                        </span>
                      ))}
                      {project.partners.length > 2 && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          +{project.partners.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full">
                    View Details <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProjectData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{selectedProjectData.title}</h2>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                  {selectedProjectData.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Overview</h3>
                <p className="text-muted-foreground">{selectedProjectData.description}</p>
              </div>

              {/* Timeline & Funding */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Timeline</p>
                  <p className="font-bold text-foreground">{selectedProjectData.startDate}</p>
                  <p className="text-sm text-muted-foreground">to {selectedProjectData.endDate}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Funding</p>
                  <p className="font-bold text-foreground">{selectedProjectData.funding}</p>
                  <p className="text-sm text-muted-foreground">{selectedProjectData.budget}</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {selectedProjectData.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Award className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partners */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Partners</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.partners.map((partner, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary mb-1">Impact</p>
                <p className="text-foreground">{selectedProjectData.impact}</p>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedProjectData.gallery.map((image, i) => (
                    <div
                      key={i}
                      className="h-32 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url('${image}')` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
