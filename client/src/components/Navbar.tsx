import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  BookOpen,
  Users,
  Zap,
  BarChart3,
  Calendar,
  Target,
  Package,
  FileText,
  Image,
  Lightbulb,
  Leaf,
  PiggyBank,
  Scroll,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    label: "Programs",
    submenu: [
      { href: "/programs", label: "All Programs", icon: BookOpen },
      { href: "/stem-hub", label: "STEM Promotion", icon: Zap },
      { href: "/msme-support", label: "MSME Support", icon: Lightbulb },
      { href: "/vslas", label: "VSLAs", icon: PiggyBank },
      { href: "/digital-circular-economy", label: "Digital & Circular Economy", icon: Leaf },
    ],
  },
  {
    label: "Impact",
    submenu: [
      { href: "/impact", label: "Overview", icon: BarChart3 },
      { href: "/events", label: "Events & Bootcamps", icon: Calendar },
      { href: "/projects", label: "Projects", icon: Target },
      { href: "/products", label: "Products", icon: Package },
    ],
  },
  {
    label: "Resources",
    submenu: [
      { href: "/blog", label: "Blog & Insights", icon: FileText },
      { href: "/gallery", label: "Gallery", icon: Image },
      { href: "/team", label: "Our Team", icon: Users },
      { href: "/resources/stem", label: "STEM Resources", icon: BookOpen },
      { href: "/resources/msme", label: "MSME Resources", icon: Lightbulb },
      { href: "/policies", label: "Policies", icon: Scroll },
    ],
  },
  { href: "/approach", label: "Our Approach" },
  { href: "/contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "/donate", label: "Donate", variant: "default", icon: Heart },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-sm font-label">AFI</span>
              </div>
              <div>
                <div
                  className={`font-display font-semibold text-base leading-tight transition-colors ${
                    isScrolled || !isHome ? "text-foreground" : "text-white"
                  }`}
                >
                  Angaza Future
                </div>
                <div
                  className={`font-label text-xs transition-colors ${
                    isScrolled || !isHome ? "text-muted-foreground" : "text-white/80"
                  }`}
                >
                  International
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                ("href" in link && location === link.href) ||
                ("submenu" in link && link.submenu?.some((sub) => location === sub.href));

              return (
                <li key={"href" in link ? link.href : link.label} className="relative group">
                  {"href" in link ? (
                    <Link
                      href={link.href as string}
                      className={`font-body text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 relative ${
                        isActive
                          ? isScrolled || !isHome
                            ? "text-primary"
                            : "text-amber-300"
                          : isScrolled || !isHome
                          ? "text-foreground/70 hover:text-primary"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`font-body text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-1 ${
                          isActive
                            ? isScrolled || !isHome
                              ? "text-primary"
                              : "text-amber-300"
                            : isScrolled || !isHome
                            ? "text-foreground/70 hover:text-primary"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                        {isActive ? (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                        ) : null}
                      </button>
                      {/* Submenu */}
                      <ul className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                        {link.submenu?.map((sublink) => {
                          const IconComponent = sublink.icon;
                          return (
                            <li key={sublink.href}>
                              <Link
                                href={sublink.href}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                                  location === sublink.href
                                    ? "text-primary bg-primary/10 border-l-2 border-primary"
                                    : "text-foreground hover:bg-foreground/5"
                                }`}
                              >
                                <IconComponent size={18} className="text-primary" />
                                {sublink.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Donate Button */}
            <Link href="/donate" className="hidden sm:block">
              <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-slate-900 flex items-center gap-2">
                <Heart size={16} />
                <span>Donate</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled || !isHome
                  ? "text-foreground hover:bg-foreground/10"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={"href" in link ? link.href : link.label}>
                  {"href" in link ? (
                    <Link
                      href={link.href as string}
                      className={`block px-4 py-2 font-body text-sm font-medium transition-colors ${
                        location === link.href
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}
                        className="w-full text-left px-4 py-2 font-body text-sm font-medium text-foreground hover:bg-foreground/5 flex items-center justify-between"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openSubmenu === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openSubmenu === link.label && (
                        <ul className="bg-foreground/5">
                          {link.submenu?.map((sublink) => {
                            const IconComponent = sublink.icon;
                            return (
                              <li key={sublink.href}>
                                <Link
                                  href={sublink.href}
                                  className={`flex items-center gap-3 px-8 py-2.5 text-sm font-medium transition-colors ${
                                    location === sublink.href
                                      ? "text-primary bg-primary/10"
                                      : "text-foreground hover:bg-foreground/5"
                                  }`}
                                >
                                  <IconComponent size={18} className="text-primary" />
                                  {sublink.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
              {/* Mobile Donate Button */}
              <li className="px-4 py-2">
                <Link href="/donate" className="w-full">
                  <Button size="sm" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 flex items-center justify-center gap-2">
                    <Heart size={16} />
                    <span>Donate</span>
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
