// Navbar.jsx - Updated to use LoginModal
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Home,
  ShieldCheck,
  DollarSign,
  PlayCircle,
  Mail,
} from "lucide-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Logo from "../images/LOGO.png";
import LoginModal from "./LoginModal";

// Main Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for existing user on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("trialUser");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  // Listen for login success (from LoginModal via sessionStorage event)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = sessionStorage.getItem("trialUser");
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const storedUser = sessionStorage.getItem("trialUser");
      if (storedUser && !userData) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [userData]);

  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: Home,
      description: "Back to the main page",
    },
    {
      name: "Features",
      href: "#features",
      icon: Sparkles,
      description: "Discover powerful tools",
    },
    {
      name: "Security",
      href: "#security",
      icon: ShieldCheck,
      description: "Your data, always protected",
    },
    {
      name: "Pricing",
      href: "#pricing",
      icon: DollarSign,
      description: "Flexible plans for everyone",
    },
    {
      name: "Try Now",
      href: "#trynow",
      icon: PlayCircle,
      description: "Experience it free today",
    },
    {
      name: "Contact",
      href: "#contact",
      icon: Mail,
      description: "We're here to help",
    },
  ];

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("trialUser");
    setUserData(null);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-blue-500/5"
            : "bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"
                />
                <img
                  src={Logo}
                  alt="Variss"
                  className="h-50 w-auto object-cover relative z-10 filter brightness-0 invert"
                />
              </div>
            </motion.div>

            <div className="md:flex md:items-center md:gap-8">
              {/* Desktop Navigation */}
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setActiveItem(item.name)}
                      onHoverEnd={() => setActiveItem(null)}
                      className="relative"
                    >
                      <a
                        href={item.href}
                        className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm flex items-center gap-1 group"
                      >
                        {/* Hover background */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: activeItem === item.name ? 1 : 0,
                            scale: activeItem === item.name ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm"
                        />

                        <span className="relative z-10">{item.name}</span>

                        {/* Animated underline */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: activeItem === item.name ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </a>

                      {/* Dropdown tooltip on hover */}
                      <AnimatePresence>
                        {activeItem === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48"
                          >
                            <div className="bg-slate-800/90 backdrop-blur-xl rounded-lg p-3 border border-white/10 shadow-xl">
                              <div className="flex items-center gap-2 mb-1">
                                <item.icon className="w-4 h-4 text-blue-400" />
                                <p className="text-white font-semibold text-sm">
                                  {item.name}
                                </p>
                              </div>
                              <p className="text-gray-400 text-xs">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                {userData ? (
                  // User is logged in - show greeting with dropdown
                  <div className="hidden sm:flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full"
                    >
                      <img
                        src={userData.picture}
                        alt={userData.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-white text-sm font-medium">
                        Hi, {userData.name.split(" ")[0]}
                      </span>
                    </motion.div>
                    
                    {/* Optional logout button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  // User not logged in - show Get Started button
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLoginModal(true)}
                    className="hidden sm:flex relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white text-sm items-center justify-center gap-2 group shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 duration-200"
                  >
                    <span>Get Started Free</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1, opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )}

                {/* Mobile Menu Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="block md:hidden relative p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={20} className="text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={20} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl"
            >
              <nav className="px-4 py-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center gap-3 py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                          <item.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile CTA Button */}
                <div className="mt-4 space-y-3 px-4">
                  {userData ? (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <img
                          src={userData.picture}
                          alt={userData.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-white text-sm">
                          Hi, {userData.name.split(" ")[0]}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                    >
                      <span>Get Started Free</span>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </motion.button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navbar;