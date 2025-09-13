import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import AiPortfolio from "./pages/AiPortfolio";
import ArchitecturePortfolio from "./pages/ArchitecturePortfolio";
import Experience from "./pages/Experience";
import Navigation from "./components/Navigation";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    home: null,
    "ai-portfolio": null,
    "architecture-portfolio": null,
    experience: null,
  });

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header
        behavior: "smooth"
      });
    }
  };

  // Handle scroll events for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Check each section to see if it's in view
      for (const sectionId in sectionRefs.current) {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <div className="scroll-container pt-16">
        {/* Home Section */}
        <section
          ref={el => sectionRefs.current["home"] = el}
          id="home"
          className="min-h-screen flex flex-col"
        >
          <Home />
        </section>

        {/* AI Portfolio Section */}
        <section
          ref={el => sectionRefs.current["ai-portfolio"] = el}
          id="ai-portfolio"
          className="min-h-screen flex flex-col py-16"
        >
          <AiPortfolio />
        </section>

        {/* Architecture Portfolio Section */}
        <section
          ref={el => sectionRefs.current["architecture-portfolio"] = el}
          id="architecture-portfolio"
          className="min-h-screen flex flex-col py-16"
        >
          <ArchitecturePortfolio />
        </section>

        {/* Experience Section */}
        <section
          ref={el => sectionRefs.current["experience"] = el}
          id="experience"
          className="min-h-screen flex flex-col py-16"
        >
          <Experience />
        </section>
      </div>
    </div>
  );
}
