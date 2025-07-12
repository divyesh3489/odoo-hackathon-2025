import { motion } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';
import { FileText, Scale, Users, Shield, AlertCircle, Mail } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing or using SkillSwap, you agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our platform',
        'We may update these terms from time to time, and your continued use constitutes acceptance',
        'You must be at least 18 years old to use our service',
        'By using our service, you represent that you have the legal capacity to enter into these terms'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: Users,
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You agree to provide accurate and complete information when creating your account',
        'You are responsible for all activities that occur under your account',
        'You must notify us immediately of any unauthorized use of your account',
        'We reserve the right to suspend or terminate accounts that violate these terms'
      ]
    },
    {
      id: 'platform-use',
      title: 'Platform Use',
      icon: Scale,
      content: [
        'You may use our platform only for lawful purposes and in accordance with these terms',
        'You agree not to use the platform to transmit harmful, offensive, or illegal content',
        'You may not attempt to gain unauthorized access to our systems or other users\' accounts',
        'You agree not to interfere with or disrupt the operation of our platform',
        'Commercial use of the platform requires our prior written consent'
      ]
    },
    {
      id: 'skill-swapping',
      title: 'Skill Swapping',
      icon: Users,
      content: [
        'SkillSwap facilitates connections between users but is not a party to any agreements between users',
        'You are solely responsible for your interactions with other users',
        'We do not guarantee the quality, safety, or legality of any skill exchanges',
        'You participate in skill swaps at your own risk',
        'We encourage users to meet in safe, public locations for in-person exchanges'
      ]
    },
    {
      id: 'content-guidelines',
      title: 'Content Guidelines',
      icon: Shield,
      content: [
        'You retain ownership of content you post, but grant us a license to use it on our platform',
        'You are responsible for ensuring your content does not violate any laws or third-party rights',
        'We reserve the right to remove content that violates our community guidelines',
        'You agree not to post spam, misleading information, or promotional content without permission',
        'Harassment, discrimination, or abusive behavior is strictly prohibited'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertCircle,
      content: [
        'SkillSwap is provided "as is" without warranties of any kind',
        'We are not liable for any damages arising from your use of the platform',
        'Our liability is limited to the maximum extent permitted by law',
        'You agree to indemnify us against any claims arising from your use of our service',
        'These limitations apply even if we have been advised of the possibility of such damages'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: FileText,
      content: [
        'You may terminate your account at any time by contacting us',
        'We may terminate or suspend your account for violations of these terms',
        'Upon termination, your right to use the platform ceases immediately',
        'We may retain certain information as required by law or for legitimate business purposes',
        'Termination does not affect any rights or obligations that arose before termination'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: Mail,
      content: [
        'Legal questions: legal@skillswap.com',
        'Terms of service inquiries: terms@skillswap.com',
        'General support: support@skillswap.com',
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
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These terms govern your use of SkillSwap and outline the rights and responsibilities of all users.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Version 2.1 • Last updated: January 15, 2024
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <GlassCard className="p-6 bg-gradient-to-r from-amber-600/10 to-orange-600/10 border-amber-200/50">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">Important Notice</h3>
            </div>
            <p className="text-gray-600 mb-4">
              These terms of service are legally binding. By using SkillSwap, you acknowledge that you have read, 
              understood, and agree to be bound by these terms. If you have any questions, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:legal@skillswap.com"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-gray-700"
              >
                <Mail className="w-4 h-4" />
                <span>legal@skillswap.com</span>
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

export default Terms;