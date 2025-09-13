import { useState } from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ProjectModal } from '@/components/ProjectModal';
import { aiProjects } from '@/data/aiProjects';


export default function AiPortfolio() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Coding Portfolio</h1>
          <p className="text-gray-600">
            Explore my projects at the intersection of artificial intelligence and product development.
            {/* REPLACE WITH YOUR OWN PORTFOLIO DESCRIPTION */}
          </p>
        </div>

        {/* Projects Grid - REPLACE grid-cols-1 md:grid-cols-2 WITH YOUR PREFERRED LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {aiProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrls}
              tags={project.tags}
              onClick={handleCardClick}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={aiProjects}
        currentProjectId={selectedProjectId || 0}
      />
    </div>
  );
}