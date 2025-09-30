import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Twitter, Linkedin, Github, Mail, Phone, MapPin, ChevronRight, Sparkles } from 'lucide-react'
import emailjs from "@emailjs/browser";


const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const footerLinks = {
    Platform: ['Dashboard', 'My Accounts', 'Nominees', 'Documents', 'Settings'],
    Company: ['About Us', 'How It Works', 'Blog', 'FAQs', 'Contact'],
    Resources: ['Help Center', 'Getting Started', 'User Guide', 'Security Tips', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Data Protection']
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-blue-500/20' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600/20' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:bg-purple-500/20' }
  ]

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      emailjs
        .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,    // Service ID from EmailJS dashboard
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT,   // Template ID from EmailJS dashboard
      { subscriber_email: email },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY   // Public key from EmailJS dashboard
        )
        .then(() => {
          setIsSubscribed(true);
          setTimeout(() => setIsSubscribed(false), 3000);
          setEmail("");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Floating particles
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 20,
  }));

  return (
    <footer id='contact' className="relative py-16 px-6 border-t border-white/5 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400/10 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50"
                />
                {/* <Shield className="w-10 h-10 text-blue-400 relative" /> */}
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  VARISS
                </span>
                {/* <span className="text-purple-400">.IN</span> */}
              </div>
            </motion.div>
            
            <p className="text-gray-400 mb-6 max-w-xs">
              Secure your financial legacy with a platform designed to organize your accounts and ensure smooth access for your loved ones when it matters most.
            </p>

            {/* Contact Info with Hover Effects */}
            <div className="space-y-3">
              <motion.a 
                href="mailto:contact@variss.in" 
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 group-hover:text-blue-400" />
                <span>VarissCompany@gmail.com</span>
              </motion.a>
              <motion.a 
                href="tel:+911234567890" 
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 group-hover:text-blue-400" />
                <span>+91 7758803248</span>
              </motion.a>
              <motion.div 
                className="flex items-center space-x-2 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4" />
                <span>Pune, Maharashtra, IN</span>
              </motion.div>
            </div>

            {/* Social Links with Enhanced Animation */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center ${social.color} transition-all`}
                >
                  <social.icon className="w-5 h-5 text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links with Stagger Animation */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <span>{category}</span>
              </h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center space-x-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section with Success Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-10 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.div 
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h3>
              <p className="text-gray-400 text-sm">Get updates on new features and financial legacy tips</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all backdrop-blur-sm text-white"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold whitespace-nowrap overflow-hidden group"
              >
                {isSubscribed ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </motion.span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Subscribe</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="pt-2 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2024 VARISS.IN. All rights reserved.
              </p>
              <span className="hidden md:inline text-gray-600">•</span>
              <span className="text-sm text-gray-400 flex items-center space-x-1">
                <span>Built with</span>
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                >
                  ❤️
                </motion.span>
                <span>in India</span>
              </span>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer