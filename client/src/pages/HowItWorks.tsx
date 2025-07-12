import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { 
  Search, 
  MessageCircle, 
  Calendar, 
  CheckCircle, 
  Star,
  Users,
  Shield,
  Zap,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Browse & Search',
      description: 'Explore our community of skilled individuals. Use our advanced search to find people with the skills you want to learn.',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Search by skill, location, or availability',
        'Filter by experience level and rating',
        'View detailed profiles and portfolios',
        'Read reviews from other learners'
      ]
    },
    {
      id: 2,
      title: 'Connect & Request',
      description: 'Found someone interesting? Send them a personalized swap request explaining what you can teach in exchange.',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      details: [
        'Send personalized swap requests',
        'Explain your skills and experience',
        'Propose schedule and time commitment',
        'Start conversations with potential partners'
      ]
    },
    {
      id: 3,
      title: 'Schedule & Meet',
      description: 'Once accepted, coordinate schedules and meet virtually or in person to begin your skill exchange journey.',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      details: [
        'Coordinate schedules that work for both',
        'Choose virtual or in-person meetings',
        'Set clear learning objectives',
        'Plan session structure and materials'
      ]
    },
    {
      id: 4,
      title: 'Learn & Teach',
      description: 'Share your knowledge and learn something new. Both parties benefit from this mutually beneficial exchange.',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      details: [
        'Structured learning sessions',
        'Hands-on practice and feedback',
        'Progress tracking and milestones',
        'Ongoing support and mentorship'
      ]
    },
    {
      id: 5,
      title: 'Review & Grow',
      description: 'Complete your swap and leave reviews. Build your reputation and continue expanding your skill set.',
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
      details: [
        'Rate your experience and partner',
        'Leave detailed feedback',
        'Build your reputation score',
        'Unlock new opportunities'
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All members are verified and we maintain a safe learning environment with reporting tools.'
    },
    {
      icon: Zap,
      title: 'Fast Matching',
      description: 'Our smart algorithm helps you find the perfect skill swap partner in minutes, not days.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'Rating system ensures high-quality exchanges with accountability and trust.'
    }
  ];

  const faqs = [
    {
      question: 'How do I know if someone is qualified to teach?',
      answer: 'All members have verified profiles with experience levels, portfolios, and reviews from previous swaps. You can also chat with them before committing to a swap.'
    },
    {
      question: 'What if I don\'t have time to teach someone else?',
      answer: 'Skill swaps are based on mutual benefit. You can offer micro-skills, quick consultations, or even help with small projects. Every skill has value!'
    },
    {
      question: 'How long does a typical skill swap last?',
      answer: 'It varies! Some swaps are single 2-hour sessions, while others are ongoing weekly meetings. You decide what works best for your schedule and learning goals.'
    },
    {
      question: 'What happens if a swap doesn\'t work out?',
      answer: 'We have a satisfaction guarantee. If you\'re not happy with your swap experience, we\'ll help you find a better match or provide support to resolve any issues.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How SkillSwap Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learning new skills has never been easier. Connect with others, share your expertise, 
            and grow together in our community-driven platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <GlassButton variant="primary" size="lg" className="hover-lift">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </GlassButton>
            </Link>
            <GlassButton variant="secondary" size="lg" className="hover-lift">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Demo
            </GlassButton>
          </div>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Journey in 5 Simple Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From discovering new skills to building lasting connections, here's how SkillSwap makes learning collaborative and rewarding.
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                <div className="flex-1">
                  <GlassCard className="p-8 h-full">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mr-4`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-500 mb-1">
                          Step {step.id}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose SkillSwap?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've built the best platform for skill sharing with features that ensure quality, safety, and success for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers. Here are some common questions about how SkillSwap works.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <GlassCard className="p-12 bg-gradient-to-r from-blue-600/10 to-teal-600/10 border-blue-200/50">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Skill Journey?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of learners and teachers in our community. Start swapping skills today and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <GlassButton variant="primary" size="lg" className="hover-lift">
                  Browse Skills
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlassButton>
              </Link>
              <Link href="/community">
                <GlassButton variant="secondary" size="lg">
                  Join Community
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;