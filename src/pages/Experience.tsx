import { ExperienceCard } from '@/components/ExperienceCard';
import { experiences } from '@/data/experiences';

export default function Experience() {
  return (
    <div className="flex-grow">
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Intern Experience</h1>
          <p className="text-gray-600">
            My professional journey through product management and development roles.
            {/* REPLACE WITH YOUR OWN EXPERIENCE DESCRIPTION */}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              {...experience}
              isFirst={index === 0}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Product Manager. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}