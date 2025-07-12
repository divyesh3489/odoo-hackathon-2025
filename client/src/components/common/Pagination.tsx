import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { GlassCard } from './GlassCard';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '' 
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <GlassCard className="p-2">
        <div className="flex items-center space-x-2">
          <GlassButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </GlassButton>
          
          {getPageNumbers().map((page, index) => (
            <span key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-500">...</span>
              ) : (
                <GlassButton
                  onClick={() => onPageChange(page as number)}
                  variant={currentPage === page ? 'primary' : 'default'}
                  className="px-3 py-1 text-sm"
                >
                  {page}
                </GlassButton>
              )}
            </span>
          ))}
          
          <GlassButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
};
