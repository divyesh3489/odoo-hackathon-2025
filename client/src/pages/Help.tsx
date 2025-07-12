import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassInput } from '../components/common/GlassInput';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I create my first skill swap?',
      answer: 'Start by browsing our community to find someone with skills you want to learn. Click on their profile, then use the "Request Swap" button to send them a personalized message explaining what you can teach in exchange.'
    },
    {
      id: 2,
      question: 'What makes a good skill swap profile?',
      answer: 'A great profile includes a clear photo, detailed bio, specific skills you offer and want to learn, your experience level, and availability. Be honest about your skill level and what you can teach others.'
    },
    {
      id: 3,
      question: 'How do I handle scheduling conflicts?',
      answer: 'Use our built-in scheduling system to propose multiple time slots. Be flexible and communicate openly with your swap partner. You can always reschedule if needed - just give advance notice.'
    },
    {
      id: 4,
      question: 'What if my swap partner doesn\'t show up?',
      answer: 'First, try to contact them directly. If they don\'t respond, you can report the issue to our support team. We take no-shows seriously and will help you find a replacement partner.'
    },
    {
      id: 5,
      question: 'How do I leave a review after a swap?',
      answer: 'After completing a swap, you\'ll receive a notification to leave a review. You can also access the review system from your swap history in your dashboard. Honest feedback helps our community grow.'
    },
    {
      id: 6,
      question: 'Can I swap skills virtually?',
      answer: 'Absolutely! Many swaps happen online through video calls, screen sharing, or collaborative tools. Virtual swaps are great for coding, design, languages, and many other skills.'
    },
    {
      id: 7,
      question: 'What if I want to cancel a scheduled swap?',
      answer: 'You can cancel a swap up to 24 hours before the scheduled time without penalty. Go to your swap requests page and click "Cancel Swap." Always communicate with your partner about cancellations.'
    },
    {
      id: 8,
      question: 'How do I report inappropriate behavior?',
      answer: 'Use the report button on any user profile or message. You can also contact our support team directly. We have zero tolerance for harassment, discrimination, or inappropriate behavior.'
    },
    {
      id: 9,
      question: 'Can I offer multiple skills?',
      answer: 'Yes! You can add multiple skills to your profile. This increases your chances of finding swap partners and allows you to share different types of expertise with various people.'
    },
    {
      id: 10,
      question: 'How do I improve my success rate?',
      answer: 'Be responsive to messages, keep your profile updated, be flexible with scheduling, and always follow through on commitments. Building a good reputation leads to more successful swaps.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with SkillSwap',
      duration: '5 min',
      description: 'Learn how to create your profile and find your first swap partner'
    },
    {
      title: 'Creating the Perfect Profile',
      duration: '3 min',
      description: 'Tips for writing a compelling bio and showcasing your skills'
    },
    {
      title: 'Effective Communication',
      duration: '4 min',
      description: 'How to write great swap requests and maintain good relationships'
    },
    {
      title: 'Safety and Best Practices',
      duration: '6 min',
      description: 'Stay safe while learning and teaching in our community'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, watch helpful tutorials, and get in touch with our support team.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <GlassInput
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 text-lg"
              />
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <GlassCard key={faq.id} className="overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Video Tutorials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <GlassCard key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{tutorial.title}</h3>
                        <p className="text-sm text-gray-600">{tutorial.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{tutorial.description}</p>
                    <GlassButton variant="secondary" size="sm" className="w-full">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </GlassButton>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Support</h2>
              <GlassCard className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <GlassInput
                    label="Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                  <GlassInput
                    label="Email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                  <GlassInput
                    label="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 glass-input text-gray-800 placeholder-gray-500 resize-none"
                      placeholder="Describe your issue or question..."
                      required
                    />
                  </div>
                  <GlassButton type="submit" variant="primary" className="w-full">
                    Send Message
                  </GlassButton>
                </form>
              </GlassCard>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <GlassCard className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">Email Support</p>
                      <p className="text-sm text-gray-600">support@skillswap.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">Phone Support</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">Hours</p>
                      <p className="text-sm text-gray-600">Mon-Fri 9am-6pm PST</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">System Status</h2>
              <GlassCard className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-gray-800">All Systems Operational</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Website</span>
                    <span className="text-green-600">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API</span>
                    <span className="text-green-600">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database</span>
                    <span className="text-green-600">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messaging</span>
                    <span className="text-green-600">✓ Online</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;