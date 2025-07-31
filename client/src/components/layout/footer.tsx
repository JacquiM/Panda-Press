import { Mail, Phone, Globe, Linkedin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-jpanda-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">JPanda Solutions</h3>
            <p className="text-gray-300 mb-6">
              Powering the future, one solution at a time. Technology consulting that makes a difference and helps businesses thrive in a digital world.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/jpanda-solutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Connect with JPanda Solutions on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61573689921203" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow JPanda Solutions on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/jpanda.solutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow JPanda Solutions on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://wa.me/27628450489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="WhatsApp JPanda Solutions"
              >
                <FaWhatsapp size={20} />
              </a>
              <a 
                href="mailto:info@thejpanda.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Email JPanda Solutions"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a 
                  href="mailto:info@thejpanda.com" 
                  className="hover:text-white transition-colors duration-200"
                >
                  info@thejpanda.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a 
                  href="tel:+27628450489" 
                  className="hover:text-white transition-colors duration-200"
                >
                  +27 62 845 0489
                </a>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-2" />
                <a 
                  href="https://thejpanda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  thejpanda.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 JPanda Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
