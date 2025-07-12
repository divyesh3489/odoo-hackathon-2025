import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">SkillSwap</span>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <Link href="/privacy">
              <a className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms
              </a>
            </Link>
            <Link href="/help">
              <a className="text-gray-600 hover:text-blue-600 transition-colors">
                Help
              </a>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          © 2024 SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
