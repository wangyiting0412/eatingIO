import { cn } from '@/lib/utils';

// Navigation component for site navigation
interface NavigationProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  // Navigation links - REPLACE WITH YOUR LINKS
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'ai-portfolio', label: 'Ai Coding' }, // Updated title
    { id: 'architecture-portfolio', label: 'Design' },
    { id: 'experience', label: 'Experience' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <img
              src={`${import.meta.env.BASE_URL}eating.png`}
              alt="Logo"
              className="h-5 w-auto mr-2 opacity-100"
            />
            Eating's Portfolio
          </button>
        </div>

        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors py-1",
                  activeSection === link.id
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            className="text-gray-900"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) {
                menu.classList.toggle('hidden');
              }
            }}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>

          <div id="mobile-menu" className="hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex flex-col space-y-3 py-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        scrollToSection(link.id);
                        // Close menu after clicking
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                          menu.classList.add('hidden');
                        }
                      }}
                      className={cn(
                        "text-sm font-medium tracking-wide transition-colors py-2 block",
                        activeSection === link.id
                          ? "text-gray-900 border-l-2 border-gray-900 pl-2"
                          : "text-gray-500 hover:text-gray-900 pl-3"
                      )}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}