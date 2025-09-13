import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// Portfolio Card Component - REUSABLE FOR BOTH AI AND ARCHITECTURE PORTFOLIOS
interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string | string[];
  tags?: string[];
  onClick: (id: number) => void;
  githubUrl?: string;
  showImageIndicator?: boolean;
}

export function PortfolioCard({
  id,
  title,
  description,
  imageUrl,
  tags = [],
  onClick,
  githubUrl,
  showImageIndicator = true
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  // Ensure image paths are resolved correctly
  const images = Array.isArray(imageUrl)
    ? imageUrl.map((url) => `${import.meta.env.BASE_URL}${url}`)
    : imageUrl
      ? imageUrl.split(',').filter(url => url.trim() !== '').map((url) => `${import.meta.env.BASE_URL}${url}`)
      : [];

  // Go to next image
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Go to previous image
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer",
        isHovered ? "shadow-md transform translate-y-[-4px]" : "shadow-sm"
      )}
      onClick={() => onClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image with Navigation */}
      <div
        className="w-full aspect-[2/1] overflow-hidden bg-gray-50 relative flex items-center justify-center"
        ref={cardRef}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Image Counter */}
            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 text-white text-xs px-2 py-1 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Project Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Multi-image indicator */}
        {showImageIndicator && tags.length === 0 && images.length > 1 && (
          <div className="flex items-center text-gray-500 text-xs mb-4">
            <i className="fa-regular fa-images mr-1"></i>
            <span>Multiple images</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>


    </div>
  );
}