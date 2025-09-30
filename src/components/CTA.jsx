import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Sparkles, Shield, Clock, HeartHandshake, FileCheck } from 'lucide-react'
import LoginModal from "./LoginModal";


const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]));

   const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.cta-3d-container')?.getBoundingClientRect();
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

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 15,
  }));

  const features = [
    { icon: Shield, text: "Bank-Level Security" },
    { icon: FileCheck, text: "Organized Records" },
    { icon: HeartHandshake, text: "Nominee Access" },
    { icon: Clock, text: "Periodic Updates" }
  ];

  return (
    <section id='trynow' className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-400 via-blue-950 to-slate-900">
      {/* Animated Background Particles */}
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
              y: [0, -50, 0],
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
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10 cta-3d-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Main Card */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 overflow-hidden shadow-2xl shadow-blue-500/20">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              <motion.div 
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Floating Feature Cards - Now visible above the CTA box */}
            {/* <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-8 right-10 md:right-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 shadow-xl z-20"
            >
              <Shield className="w-7 h-7 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-8 left-10 md:left-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 shadow-xl z-20"
            >
              <HeartHandshake className="w-7 h-7 text-white" />
            </motion.div> */}

            <div className="relative text-center max-w-4xl mx-auto">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  LIMITED TIME - 1 MONTH FREE
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Secure Your Financial Legacy Today
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Organize all your financial accounts in one secure place and ensure your loved ones have smooth access when it matters most.
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <feature.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex justify-center"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                   onClick={() => {
                        setShowLoginModal(true);
                      }}
                  className="relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white text-lg flex items-center justify-center space-x-2 group shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all cursor-pointer"
                >
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 text-sm text-gray-400"
              >
                No credit card required • Cancel anytime • Setup in minutes
              </motion.p>
            </div>

            {/* Corner Glow Effects */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      </div>
      {/* Login Modal */}
            <LoginModal
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
            />
    </section>
  )
}

export default CTA