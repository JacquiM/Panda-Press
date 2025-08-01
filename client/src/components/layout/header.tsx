import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home", section: "home" },
    { href: "/#services", label: "Services", section: "services" },
    { href: "/#about", label: "About", section: "about" },
    { href: "/blog", label: "Blog", section: "blog" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-jpanda-primary cursor-pointer">
                  JPanda Solutions
                </span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-jpanda-primary transition-colors duration-200 font-medium cursor-pointer">
                Home
              </span>
            </Link>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-jpanda-primary transition-colors duration-200 font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-jpanda-primary transition-colors duration-200 font-medium"
            >
              About
            </button>
            <Link href="/blog">
              <span className="text-gray-700 hover:text-jpanda-primary transition-colors duration-200 font-medium cursor-pointer">
                Blog
              </span>
            </Link>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-jpanda-primary text-white hover:bg-jpanda-primary/90"
            >
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-jpanda-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <span 
                className="block px-3 py-2 text-gray-700 hover:text-jpanda-primary font-medium cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </span>
            </Link>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-jpanda-primary font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-jpanda-primary font-medium"
            >
              About
            </button>
            <Link href="/blog">
              <span 
                className="block px-3 py-2 text-gray-700 hover:text-jpanda-primary font-medium cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </span>
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-jpanda-primary font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
