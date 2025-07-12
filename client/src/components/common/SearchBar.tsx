import { useState } from 'react';
import { Search } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "What skill do you want to learn?", 
  className = '' 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.div
      className={`max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-2 shadow-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="flex-1 flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
          <GlassButton
            type="submit"
            variant="primary"
            className="px-6 py-3"
          >
            Search
          </GlassButton>
        </form>
      </div>
    </motion.div>
  );
};
