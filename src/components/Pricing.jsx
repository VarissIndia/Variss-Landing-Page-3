import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield,
  Check,
  Sparkles,
  Zap,
  Crown,
  Star,
  Mail,
  Phone,
  Users,
  FileText,
  Calendar,
  ChevronRight
} from 'lucide-react'

import LoginModal from "./LoginModal";



const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [hoveredPlan, setHoveredPlan] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false);


  // Pricing plans data
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      subtitle: 'Perfect for Getting Started',
      price: 'FREE',
      originalPrice: '₹399',
      duration: '1 Month',
      popular: false,
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      icon: Shield,
      description: 'Ideal for individuals who want to start organizing their financial legacy',
      features: [
        { text: '1 Month Free Subscription', highlight: true },
        { text: 'Monthly Email Check-ins', icon: Mail },
        { text: 'Add up to 5 Financial Data Entries', icon: FileText },
        { text: '2 Nominee Support', icon: Users },
        { text: 'Basic Security Features', icon: Shield },
        { text: 'Email Support', icon: Mail }
      ],
      cta: 'Start Free'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      subtitle: 'Most Popular Choice',
      price: '₹399',
      originalPrice: '₹999',
      duration: '1 Year',
      popular: true,
      gradient: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      icon: Crown,
      description: 'Best for individuals who need comprehensive financial management',
      features: [
        { text: '1 Year Subscription', highlight: true },
        { text: 'Monthly Email/Phone Check-ins', icon: Phone },
        { text: 'Enhanced Data Addition Features', icon: FileText },
        { text: 'Multiple Nominee Support', icon: Users },
        { text: 'Priority Email & Phone Support', icon: Phone },
        { text: 'Advanced Security Features', icon: Shield },
        { text: 'Document Upload Support', icon: FileText }
      ],
      cta: 'Get Started',
      badge: 'SAVE 60%'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      subtitle: 'Complete Peace of Mind',
      price: '₹999',
      originalPrice: '₹2999',
      duration: '3 Years',
      popular: false,
      gradient: 'from-orange-400 to-red-400',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      icon: Star,
      description: 'Ultimate solution for comprehensive long-term financial legacy planning',
      features: [
        { text: '3 Years Subscription', highlight: true },
        { text: 'Monthly Email/Phone Check-ins', icon: Phone },
        { text: 'Unlimited Data Entries', icon: FileText },
        { text: 'Unlimited Nominee Support', icon: Users },
        { text: 'Priority 24/7 Support', icon: Phone },
        { text: 'Premium Security Features', icon: Shield },
        { text: 'Document Upload & Storage', icon: FileText },
        { text: 'Annual Review Calls', icon: Calendar }
      ],
      cta: 'Get Premium',
      badge: 'SAVE 67%'
    }
  ]

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
  }))

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-blue-900 to-blue-400 overflow-hidden">
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
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
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
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-blue-300">
              Simple & Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Choose Your Plan
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Secure your financial legacy with our affordable plans. Start free and upgrade anytime.
          </motion.p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
               onClick={() => {
                        setShowLoginModal(true);
                      }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                z: 50,
              }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative h-full">
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-4 -right-4 z-20"
                  >
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-lg">
                      <Crown className="w-4 h-4 fill-current" />
                      {plan.badge}
                    </div>
                  </motion.div>
                )}

                {/* Card Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} rounded-2xl blur-xl`}
                  animate={{
                    opacity: hoveredPlan === plan.id ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main Card */}
                <div className={`relative bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border ${
                  plan.popular ? 'border-yellow-400/30' : 'border-white/10'
                } h-full group-hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent" />
                  </div>

                  {/* Plan Icon */}
                  <motion.div 
                    className="mb-6 relative"
                    animate={{
                      rotateZ: hoveredPlan === plan.id ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} blur-2xl`}
                      animate={{
                        opacity: hoveredPlan === plan.id ? 0.7 : 0.4,
                        scale: hoveredPlan === plan.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${plan.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Plan Name & Subtitle */}
                  <div className="mb-4">
                    <h3 className={`text-2xl font-bold mb-1 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-400">{plan.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">{plan.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{plan.duration}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: inView ? 0 : -20,
                          opacity: inView ? 1 : 0,
                        }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className={`flex items-start gap-3 ${feature.highlight ? 'bg-white/5 p-2 rounded-lg' : ''}`}
                      >
                        {feature.icon ? (
                          <feature.icon className={`w-5 h-5 flex-shrink-0 ${
                            feature.highlight ? 'text-yellow-400' : 'text-green-400'
                          }`} />
                        ) : (
                          <Check className={`w-5 h-5 flex-shrink-0 ${
                            feature.highlight ? 'text-yellow-400' : 'text-green-400'
                          }`} />
                        )}
                        <span className={`text-sm ${
                          feature.highlight ? 'text-white font-semibold' : 'text-gray-300'
                        }`}>
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={() => {
                    //     setShowLoginModal(true);
                    //   }}
                    className={`w-full px-6 py-4 bg-gradient-to-r ${plan.gradient} rounded-full font-semibold text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all group cursor-pointer`}
                  >
                    {plan.cta}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Hover Gradient Line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${plan.gradient}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredPlan === plan.id ? "100%" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${plan.gradient} opacity-10 blur-3xl`}
                    animate={{
                      scale: hoveredPlan === plan.id ? 1.5 : 1,
                      opacity: hoveredPlan === plan.id ? 0.2 : 0.05,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.1, type: "spring" }}
              className="flex items-center gap-2"
            >
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">100% Secure</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.2, type: "spring" }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">No Hidden Fees</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.3, type: "spring" }}
              className="flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Cancel Anytime</span>
            </motion.div>
          </div>

          <p className="text-white-400 text-sm max-w-2xl mx-auto">
            All prices are in INR and exclude GST. Your subscription will automatically renew unless cancelled. 
            We offer a 30-day money-back guarantee on all paid plans.
          </p>
        </motion.div>

        {/* Plan comparison dots */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center gap-2 mt-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className="w-2 h-2 rounded-full bg-white/20"
              animate={{
                backgroundColor: hoveredPlan === plan.id ? "rgba(56, 189, 248, 0.8)" : "rgba(255, 255, 255, 0.2)",
                scale: hoveredPlan === plan.id ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div> */}
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      </div>
    </section>
  )
}

export default Pricing;