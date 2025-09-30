import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Lock,
  ChevronRight,
  Sparkles,
  FileCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import HeroImage from "../images/hero-image.png";
import LoginModal from "./LoginModal";

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFeature, setActiveFeature] = useState(0);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]));

  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.hero-3d-container')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animated stats
  const stats = [
    { icon: Shield, value: "100%", label: "Secure" },
    { icon: Lock, value: "256-bit", label: "Encryption" },
    { icon: CheckCircle2, value: "24/7", label: "Protected" },
  ];

  // Feature highlights for carousel
  const features = [
    { icon: FileCheck, title: "Organized Records", color: "from-blue-500 to-purple-500" },
    { icon: Clock, title: "Auto Updates", color: "from-green-500 to-teal-500" },
    { icon: HeartHandshake, title: "Nominee Access", color: "from-orange-500 to-red-500" },
    { icon: Shield, title: "Secure Vault", color: "from-yellow-500 to-orange-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 20,
  }));

  return (
    <section id='home' className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-900 to-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400/20 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
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
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="container mx-auto relative z-10 hero-3d-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Enhanced Text Content */}
          <div className="text-left space-y-6">
            {/* Main Heading with Split Animation */}
            <motion.div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mt-20"
              >
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  VARISS.IN
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              >
                Your <span className="text-cyan-400">Legacy,</span> Secured and Simplified
              </motion.p>
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl"
            >
             Variss is a secure platform to organize all your financial accounts in one place.
             Stay updated with ease and give your loved ones smooth access when it matters most.
            </motion.p>

            {/* Animated Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 sm:gap-6 py-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  className="flex items-center gap-2"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <stat.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                        setShowLoginModal(true);
                      }}
                className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white text-base sm:text-lg flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="https://forms.office.com/r/RHGkv2sd6f"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Give Feedback</span>
              </motion.a>
            </motion.div>

            {/* Feature Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: activeFeature === index ? 1.2 : 1,
                        zIndex: activeFeature === index ? 10 : 0,
                      }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center border-2 border-slate-900`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">
                    {features[activeFeature].title}
                  </span>
                  {" "}and more...
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Enhanced 3D Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="relative perspective-1000 hidden lg:block"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              {/* Floating Elements Around Image */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -360],
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl"
              />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <img
                  src={HeroImage}
                  alt="Variss Platform"
                  className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Floating Feature Cards */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-4 top-20 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <Lock className="w-6 h-6 text-blue-400 mb-1" />
                <p className="text-xs text-white font-semibold">Encrypted</p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -left-4 bottom-32 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
              >
                <HeartHandshake className="w-6 h-6 text-green-400 mb-1" />
                <p className="text-xs text-white font-semibold">Family First</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile/Tablet Image View */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative lg:hidden mt-8"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent z-10" />
              <img
                src={HeroImage}
                alt="Variss Platform"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default Hero;