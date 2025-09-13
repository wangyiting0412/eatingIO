import { useState, useEffect } from 'react';

// Project Modal Component for displaying project details
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  tags?: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentProjectId: number;
}

export function ProjectModal({
  isOpen,
  onClose,
  projects,
  currentProjectId
}: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find current project index
  useEffect(() => {
    const index = projects.findIndex(project => project.id === currentProjectId);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentImageIndex(0); // Reset to first image when project changes
    }
  }, [currentProjectId, projects]);

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Get current project
  const currentProject = projects[currentIndex];
  // Ensure image paths are resolved correctly
  const images = currentProject?.imageUrls.map((url) => `${import.meta.env.BASE_URL}${url}`) || [];

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // If project has no images, show empty state
  if (!images || images.length === 0) {
    return null;
  }



  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !currentProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Image Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          aria-label="Previous image"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          aria-label="Next image"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Project Image */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Project Details */}
        <div className="mt-4 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{currentProject.title}</h2>
          <p className="text-gray-200">{currentProject.description}</p>

          {/* Tags */}
          {currentProject.tags && currentProject.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {currentProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}