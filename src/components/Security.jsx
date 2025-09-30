import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  Server,
  CheckCircle,
  Database,
  ShieldCheck,
  UserCheck
} from 'lucide-react'

const Security = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [activeProtocol, setActiveProtocol] = useState(0)
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]))

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.security-3d-container')?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const securityFeatures = [
    {
      icon: Lock,
      title: '256-bit Encryption',
      description: 'Military-grade encryption protecting all your financial data',
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      stats: '100% Secure'
    },
    {
      icon: Key,
      title: 'Multi-Factor Authentication',
      description: 'Multiple verification layers with confirmation',
      gradient: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      stats: 'MFA Protected'
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Your data stays private and is never shared with anyone',
      gradient: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      stats: 'Private & Secure'
    },
    {
      icon: Server,
      title: 'Secure Cloud Storage',
      description: 'Reliable cloud infrastructure with automated backups',
      gradient: 'from-orange-400 to-red-400',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      stats: 'Auto Backup'
    },
    {
      icon: UserCheck,
      title: 'Access Control',
      description: 'Granular permissions for nominee management',
      gradient: 'from-indigo-400 to-purple-400',
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      stats: 'Controlled Access'
    },
    {
      icon: Database,
      title: 'Data Integrity',
      description: 'Regular security audits and data integrity checks',
      gradient: 'from-teal-400 to-cyan-400',
      bgGradient: 'from-teal-500/20 to-cyan-500/20',
      stats: 'Verified Safe'
    }
  ]

  // Security protocols for animation - updated to relevant ones
  const securityProtocols = [
    { name: 'SSL/TLS', status: 'active', icon: Lock },
    { name: 'OTP', status: 'active', icon: Shield },
    { name: 'OAuth 2.0', status: 'active', icon: Key }
  ]

  // Animated particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProtocol((prev) => (prev + 1) % securityProtocols.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-blue-400 via-blue-900 to-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
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
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-300/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-green-400/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10 security-3d-container">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4 text-green-300 animate-pulse" />
            <span className="text-sm font-semibold text-white">
              Bank-Level Security
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            <motion.span
              className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Security First
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/90 text-lg max-w-2xl mx-auto"
          >
            Your financial security is our top priority. We use cutting-edge technology 
            and multiple layers of protection to keep your data safe.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Enhanced 3D Security Shield Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, type: 'spring' }}
            className="relative perspective-1000"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              {/* Central Shield with glow effect */}
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="relative w-64 h-64 mx-auto"
              >
                {/* Multiple glow layers */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-blue-400/40 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-2xl"></div>
                
                {/* Main shield container */}
                <div className="relative bg-white/90 backdrop-blur-sm w-full h-full rounded-full flex items-center justify-center border-4 border-blue-300/50 shadow-2xl">
                  <Shield className="w-32 h-32 text-blue-600" />
                  
                  {/* Scanning effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.4), transparent)',
                      height: '20%',
                    }}
                    animate={{
                      y: ['0%', '400%', '0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                </div>
              </motion.div>

              {/* Orbiting Icons with enhanced effects */}
              {securityFeatures.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10 + index * 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${280 + index * 60}px`,
                    height: `${280 + index * 60}px`,
                  }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border-2 border-blue-300/60 group hover:border-blue-400 transition-all shadow-lg">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Security Protocol Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
              >
                {securityProtocols.map((protocol, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: activeProtocol === index ? 1.2 : 1,
                      opacity: activeProtocol === index ? 1 : 0.7,
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 mr-5
                      ${activeProtocol === index 
                        ? 'bg-green-400/80 text-white border-2 border-green-300 shadow-lg' 
                        : 'bg-white/80 text-blue-700 border border-blue-200'}`}
                  >
                    <protocol.icon className="w-3 h-3" />
                    {protocol.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Security Features Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative group"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-xl blur-xl`}
                  animate={{
                    opacity: hoveredFeature === index ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main card */}
                <div className="relative bg-white/85 backdrop-blur-sm p-6 rounded-xl border border-blue-200 group-hover:border-blue-400 group-hover:shadow-xl transition-all overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-transparent" />
                  </div>

                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="relative"
                      animate={{
                        rotateZ: hoveredFeature === index ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl`}
                        animate={{
                          opacity: hoveredFeature === index ? 0.7 : 0.4,
                          scale: hoveredFeature === index ? 1.5 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center border border-blue-200`}>
                        <feature.icon className="w-6 h-6 text-blue-700" />
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-blue-900 mb-1`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-2">
                        {feature.description}
                      </p>
                      {/* Stats badge */}
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full text-xs text-green-700 font-medium"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {feature.stats}
                      </motion.span>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${feature.gradient}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredFeature === index ? "100%" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Section - COMMENTED OUT */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">Compliance & Certifications</h3>
            <p className="text-gray-400">Meeting the highest standards of security and privacy</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative group"
              >
                <div className="bg-slate-900/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                      <cert.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{cert.name}</p>
                      <p className="text-xs text-gray-400">Certified</p>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Bottom CTA - COMMENTED OUT */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Want to learn more about our security measures?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold text-white text-lg shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all inline-flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            View Security Whitepaper
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  )
}

export default Security