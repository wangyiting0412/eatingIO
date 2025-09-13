import { useState } from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ProjectModal } from '@/components/ProjectModal';
import { architectureProjects } from '@/data/architectureProjects';

export default function ArchitecturePortfolio() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-grow">
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Design Portfolio</h1>
          <p className="text-gray-600">
            Explorations in industrial and UX design during my student period.
            {/* REPLACE WITH YOUR OWN PORTFOLIO DESCRIPTION */}
          </p>
        </div>

        {/* Projects Grid - REPLACE grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 WITH YOUR PREFERRED LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {architectureProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrls}
              onClick={handleCardClick}
              showImageIndicator={false}
            />
          ))}
        </div>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={architectureProjects}
        currentProjectId={selectedProjectId || 0}
      />
    </div>
  );
}