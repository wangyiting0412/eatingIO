import { cn } from '@/lib/utils';

// Experience Card Component for displaying internship and work experiences
interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  logoUrl: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export function ExperienceCard({
  company,
  position,
  period,
  description,
  achievements,
  logoUrl,
  isFirst = false,
  isLast = false
}: ExperienceCardProps) {
  return (
    <div className={cn(
      "relative pl-8 md:pl-8 md:grid md:grid-cols-12 md:gap-8",
      isFirst ? "pt-0" : "pt-12",
      isLast ? "pb-0" : "pb-12"
    )}>
      {/* Timeline connector - visible on mobile only */}
      {!isFirst && (
        <div className="absolute top-0 left-3 md:hidden h-full w-0.5 bg-gray-100"></div>
      )}

      {/* Timeline dot - visible on mobile only */}
      <div className="absolute top-4 left-3 md:hidden h-4 w-4 rounded-full bg-black/80"></div>

      {/* Company Logo */}
      <div className="md:col-span-3 mb-4 md:mb-0 flex justify-center md:justify-start">
        <div className="h-24 w-24 rounded-lg bg-white overflow-hidden flex items-center justify-center border border-gray-100">
          <img
            src={logoUrl}
            alt={company}
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>

      {/* Experience Content */}
      <div className={cn(
        "relative",
        "md:col-span-9"
      )}>
        {/* Period - visible on desktop only */}
        <div className="hidden md:block text-sm font-medium text-gray-500 mb-1 flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-black/80"></div>
          {period}
        </div>

        {/* Company and Position */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{company}</h3>
        <p className="text-lg text-gray-600 mb-3">{position}</p>

        {/* Period - visible on mobile only */}
        <div className="md:hidden text-sm font-medium text-gray-500 mb-4">
          {period}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Achievements */}
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex">
              <i className="fa-solid fa-check text-gray-500 mt-1 mr-2"></i>
              <span className="text-gray-700 text-sm">{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Timeline connector - visible on desktop only */}
        {!isLast && (
          <div className="hidden md:block absolute top-full left-0 h-12 w-0.5 bg-gray-100"></div>
        )}
      </div>
    </div>
  );
}