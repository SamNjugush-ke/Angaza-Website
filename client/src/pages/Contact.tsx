/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Contact: Clean contact form, address, email, and partnership CTA
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { IMAGES } from "@/lib/images";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

type FormData = {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
};

const subjects = [
  "General Inquiry",
  "Partnership Opportunity",
  "MSME Support Program",
  "STEM Bootcamp",
  "Digital Economy Training",
  "Donation / Support",
  "Media / Press",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitContactForm = trpc.contact.submitForm.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContactForm.mutateAsync({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        phone: form.organization,
      });
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          organization: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        <div className="relative z-10 container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label text-amber-400 mb-4" style={{ color: "#EAB308" }}>Get In Touch</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="font-body text-lg text-white/80 max-w-2xl">
              Whether you're an aspiring entrepreneur, a potential partner, or a supporter of our mission — 
              we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="section-label mb-4">Reach Us</div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Let's Start a Conversation
                </h2>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-label font-semibold text-foreground mb-1">Address</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Thika West Center, 2nd Floor<br />
                    Thika Road, Kenya
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-label font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:info@angazafuture.org" className="font-body text-sm text-primary hover:underline">
                    info@angazafuture.org
                  </a>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-label font-semibold rounded-xl py-3">
                  <a href="#form" className="flex items-center gap-2">
                    <Send size={16} />
                    Send Us a Message
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex justify-center mb-6"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Received!</h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-label font-semibold rounded-xl py-2 px-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6" id="form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-label text-sm font-medium text-foreground mb-1.5 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full font-body text-sm px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-label text-sm font-medium text-foreground mb-1.5 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="w-full font-body text-sm px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-label text-sm font-medium text-foreground mb-1.5 block">
                          Organization
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={form.organization}
                          onChange={handleChange}
                          placeholder="Your organization (optional)"
                          className="w-full font-body text-sm px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-label text-sm font-medium text-foreground mb-1.5 block">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full font-body text-sm px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-label text-sm font-medium text-foreground mb-1.5 block">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you, or how you'd like to collaborate..."
                        required
                        rows={5}
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-label font-semibold rounded-xl py-3 transition-all"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
