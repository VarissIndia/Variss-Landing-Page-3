import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FileText,
  Bell,
  Users,
  Shield,
  Clock,
  Database,
  Zap,
  Check,
  Lock,
  HeartHandshake
} from 'lucide-react'

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [hoveredCard, setHoveredCard] = useState(null)

  const features = [
    {
      icon: FileText,
      title: 'Centralized Records',
      description: 'Store all your financial account details in one secure location',
      color: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      stats: 'All-in-One',
      benefits: ['Bank accounts', 'Investment portfolios', 'Insurance policies', 'Digital wallets']
    },
    {
      icon: Bell,
      title: 'Periodic Updates',
      description: 'Automated follow-ups to keep your information current',
      color: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      stats: 'Auto Reminders',
      benefits: ['Scheduled notifications', 'Update prompts', 'Status tracking', 'Email reminders']
    },
    {
      icon: Users,
      title: 'Nominee Access',
      description: 'Grant trusted individuals access to your financial data when needed',
      color: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      stats: 'Family First',
      benefits: ['Easy access transfer', 'Multiple nominees', 'Controlled permissions', 'Secure handover']
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: '256-bit encryption to protect your sensitive information',
      color: 'from-red-400 to-orange-400',
      bgGradient: 'from-red-500/20 to-orange-500/20',
      stats: '100% Secure',
      benefits: ['256-bit encryption', 'Data protection', 'Privacy controls', 'Secure storage']
    },
    {
      icon: Clock,
      title: 'Asset Recovery',
      description: 'Prevent unclaimed investments and ensure smooth asset transfer',
      color: 'from-indigo-400 to-purple-400',
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      stats: 'Zero Loss',
      benefits: ['Track all assets', 'Prevent unclaimed funds', 'Easy recovery', 'Complete visibility']
    },
    {
      icon: Database,
      title: 'Organized Dashboard',
      description: 'View and manage all accounts from a single, intuitive interface',
      color: 'from-teal-400 to-cyan-400',
      bgGradient: 'from-teal-500/20 to-cyan-500/20',
      stats: '24/7 Access',
      benefits: ['User-friendly UI', 'Quick search', 'Category filters', 'Export reports']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-blue-900 to-blue-400 overflow-hidden">
      {/* Subtle gradient orbs for depth */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16 relative"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700">
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Everything You Need
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Feature Cards Grid with 3D effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative h-full">
                {/* Card Background with animated gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl blur-xl`}
                  animate={{
                    opacity: hoveredCard === index ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-gray-200 h-full group-hover:border-blue-300 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-transparent to-transparent" />
                  </div>

                  {/* Status Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute top-4 right-4"
                  >
                    <span className={`px-3 py-1 text-xs font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stats}
                    </span>
                  </motion.div>

                  {/* Icon with 3D effect */}
                  <motion.div 
                    className="mb-6 relative"
                    animate={{
                      rotateZ: hoveredCard === index ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} blur-2xl`}
                      animate={{
                        opacity: hoveredCard === index ? 0.7 : 0.4,
                        scale: hoveredCard === index ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-blue-600" />
                      {hoveredCard === index && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(59, 130, 246, 0)",
                              "0 0 20px rgba(59, 130, 246, 0.3)",
                              "0 0 20px rgba(59, 130, 246, 0)",
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>

                  {/* Benefits List - appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      height: hoveredCard === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 mb-4 overflow-hidden"
                  >
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: hoveredCard === index ? 0 : -20,
                          opacity: hoveredCard === index ? 1 : 0,
                        }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Animated border gradient */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredCard === index ? "100%" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl`}
                    animate={{
                      scale: hoveredCard === index ? 1.5 : 1,
                      opacity: hoveredCard === index ? 0.2 : 0.1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features