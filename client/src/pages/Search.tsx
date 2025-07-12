import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Filter, MapPin, Star } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { UserCard } from '../components/User/UserCard';
import { Pagination } from '../components/common/Pagination';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { SwapRequestModal } from '../components/Swap/SwapRequestModal';
import { useAuth } from '../hooks/useAuth';

const Search = () => {
  const [location, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    skillType: 'all',
    minRating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location]);

  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      location: 'San Francisco, CA',
      rating: 4.9,
      completedSwaps: 23,
      profilePhoto: '',
      bio: 'Passionate developer with expertise in React and UI/UX design.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 2,
      firstName: 'Marcus',
      lastName: 'Chen',
      email: 'marcus@example.com',
      location: 'New York, NY',
      rating: 4.8,
      completedSwaps: 31,
      profilePhoto: '',
      bio: 'Data scientist with a passion for machine learning and Python.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily@example.com',
      location: 'Austin, TX',
      rating: 4.9,
      completedSwaps: 18,
      profilePhoto: '',
      bio: 'Creative designer specializing in graphic design and photography.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    // Add more mock users to demonstrate pagination
    {
      id: 4,
      firstName: 'David',
      lastName: 'Kim',
      email: 'david@example.com',
      location: 'Seattle, WA',
      rating: 4.7,
      completedSwaps: 15,
      profilePhoto: '',
      bio: 'Full-stack developer with expertise in Node.js and MongoDB.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 5,
      firstName: 'Lisa',
      lastName: 'Wang',
      email: 'lisa@example.com',
      location: 'Los Angeles, CA',
      rating: 4.8,
      completedSwaps: 27,
      profilePhoto: '',
      bio: 'Marketing professional specializing in social media and content strategy.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
  ];

  const categories = [
    'All Categories',
    'Web Development',
    'Data Science',
    'Design',
    'Marketing',
    'Photography',
    'Business',
    'Writing',
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleRequestSwap = (userId: number) => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    setSelectedUserId(userId);
  };

  const filteredUsers = mockUsers.filter(user => {
    if (searchQuery && !user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.location && !user.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.minRating && user.rating < filters.minRating) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredUsers.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + 6);

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Discover Skills & Professionals
          </h1>
          <p className="text-gray-600">
            Find the perfect skill swap partner for your learning journey
          </p>
        </motion.div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for skills or professionals..."
            className="mb-6"
          />
          
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <GlassButton
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </GlassButton>
              
              {searchQuery && (
                <p className="text-sm text-gray-600">
                  Showing results for "{searchQuery}"
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select className="px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg text-sm text-gray-700">
                <option value="rating">Highest Rating</option>
                <option value="swaps">Most Swaps</option>
                <option value="recent">Recently Active</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 glass-input text-gray-700"
                    >
                      {categories.map(category => (
                        <option key={category} value={category === 'All Categories' ? '' : category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 glass-input text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Rating
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                      className="w-full px-3 py-2 glass-input text-gray-700"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.8}>4.8+ Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skill Type
                    </label>
                    <select
                      value={filters.skillType}
                      onChange={(e) => setFilters(prev => ({ ...prev, skillType: e.target.value }))}
                      className="w-full px-3 py-2 glass-input text-gray-700"
                    >
                      <option value="all">All Skills</option>
                      <option value="offered">Skills Offered</option>
                      <option value="wanted">Skills Wanted</option>
                    </select>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'Professional' : 'Professionals'} Found
            </h2>
          </div>

          {paginatedUsers.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or explore different skills
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRequestSwap={handleRequestSwap}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Swap Request Modal */}
      {selectedUserId && (
        <SwapRequestModal
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
          targetUserId={selectedUserId}
        />
      )}
    </div>
  );
};

export default Search;
