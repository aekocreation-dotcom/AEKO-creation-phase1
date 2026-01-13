import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/ChatGPT Image Dec 25, 2025, 03_45_44 PM.png";
// import logoLight from "@/assets/ak-logo.png"; // Uncomment when you add the AK logo file
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const navLinks = [
    { name: "Models", href: "#models" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#developers" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'transparent' }}
    >
      <div className="container mx-auto px-4 lg:px-6" style={{ maxWidth: '1100px' }}>
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Perfect round white border */}
                <div className="absolute inset-0 rounded-full border-3 border-white shadow-lg shadow-white/20 group-hover:shadow-white/40 transition-all duration-200" style={{ borderWidth: '3px' }} />
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
                  <img 
                    src={logoDark} 
                    alt="AEKO" 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" 
                  />
                </div>
              </div>
              <div className="hidden lg:flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">AEKO</span>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">.Ai</span>
              </div>
            </a>
          </div>

          {/* Right Side - All Nav Links + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base md:text-lg font-semibold text-white/95 hover:text-white transition-all duration-200 hover:scale-105 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button
              variant="ghost"
              size="default"
              onClick={() => navigate("/auth/sign-in")}
              className="text-base md:text-lg font-semibold text-white/95 hover:text-white hover:bg-white/10 px-5 py-2 rounded-lg transition-all duration-200"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => navigate("/auth/sign-in")}
              className="text-base md:text-lg font-bold bg-white text-black hover:bg-white/90 px-8 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Launch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth/sign-in");
                }}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth/sign-in");
                }}
              >
                Launch
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
