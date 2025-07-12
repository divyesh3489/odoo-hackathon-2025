import { motion } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';
import { Shield, Eye, Lock, UserCheck, FileText, Mail } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Eye,
      content: [
        'Personal information you provide when creating an account (name, email, location)',
        'Profile information including bio, skills, and photos you choose to share',
        'Communication data from messages and swap requests',
        'Usage data to improve our services and user experience',
        'Device information and technical data for security purposes'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'To provide and maintain our skill-sharing platform',
        'To match you with relevant swap opportunities',
        'To facilitate communication between users',
        'To send important notifications about your account',
        'To improve our services and develop new features',
        'To ensure platform security and prevent fraud'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We never sell your personal information to third parties',
        'Profile information is visible to other users as per your privacy settings',
        'We may share anonymized data for research and analytics',
        'Legal compliance: We may disclose information when required by law',
        'Service providers: Trusted partners who help us operate our platform'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'Industry-standard encryption for all data transmission',
        'Secure servers with regular security audits',
        'Limited access to personal data on a need-to-know basis',
        'Regular security updates and monitoring',
        'Incident response procedures for any security breaches'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: FileText,
      content: [
        'Access: Request a copy of your personal data',
        'Correction: Update or correct inaccurate information',
        'Deletion: Request deletion of your account and data',
        'Portability: Export your data in a machine-readable format',
        'Objection: Opt out of certain data processing activities',
        'Control: Manage your privacy settings and preferences'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      content: [
        'Questions about this privacy policy: privacy@skillswap.com',
        'Data protection officer: dpo@skillswap.com',
        'General inquiries: support@skillswap.com',
        'Phone: +1 (555) 123-4567',
        'Address: 123 Tech Street, San Francisco, CA 94105'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: January 15, 2024
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-colors text-gray-700 hover:text-blue-600"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
            >
              <GlassCard className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <GlassCard className="p-6 bg-gradient-to-r from-blue-600/10 to-teal-600/10 border-blue-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-600 mb-4">
              We're here to help. Contact our privacy team if you have any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:privacy@skillswap.com"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-gray-700"
              >
                <Mail className="w-4 h-4" />
                <span>privacy@skillswap.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-gray-700"
              >
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;