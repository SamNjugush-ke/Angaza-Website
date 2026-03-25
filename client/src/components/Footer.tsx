/*
 * DESIGN PHILOSOPHY: "Sunrise Horizon"
 * Footer: Dark teal background with gold accents, clean grid layout
 */

import { Link } from "wouter";
import { Mail, MapPin, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AFI</span>
              </div>
              <div>
                <div className="font-display font-semibold text-lg text-white leading-tight">
                  Angaza Future International
                </div>
                <div className="font-label text-xs text-amber-400">
                  Empowering Entrepreneurs, Building Futures
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              We promote inclusive and sustainable economic growth through STEM education, 
              MSME support, and participation in the digital and circular economy across Africa.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <span>Thika West Center, 2nd Floor, Thika Road, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a href="mailto:info@angazafuture.org" className="hover:text-amber-400 transition-colors">
                  info@angazafuture.org
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-label font-semibold text-sm uppercase tracking-widest text-amber-400 mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Our Programs" },
                { href: "/approach", label: "Our Approach" },
                { href: "/impact", label: "Our Impact" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus Areas */}
          <div>
            <h3 className="font-label font-semibold text-sm uppercase tracking-widest text-amber-400 mb-4">
              Focus Areas
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                "STEM Promotion",
                "MSME Support",
                "Digital Economy",
                "Circular Economy",
                "Entrepreneurship",
                "Gender Equality",
                "Youth Empowerment",
                "Green & Blue Jobs",
              ].map((area) => (
                <li key={area} className="font-body text-sm text-slate-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-slate-400 text-center sm:text-left">
            © {currentYear} Angaza Future International. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-body text-xs text-slate-400">
            <span>Built with</span>
            <Heart size={12} className="text-amber-400 fill-amber-400" />
            <span>for Africa's future</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://angazafuture.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              angazafuture.org <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
