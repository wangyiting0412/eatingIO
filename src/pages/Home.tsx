import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { personalInfo } from '@/data/personal';
import { profileImages } from '@/data/profileImages';
import { aiProjects } from '../data/aiProjects';
import { architectureProjects } from '../data/architectureProjects';
import { ProjectModal } from '../components/ProjectModal';


export default function Home() {
  const [showContactCard, setShowContactCard] = useState(false);
  const [contactType, setContactType] = useState<'email' | 'tel' | 'wechat' | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselInterval, setCarouselInterval] = useState<number | null>(null);
  // 新增：项目弹窗相关状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectId] = useState<number | null>(null); // 当前项目ID状态

  // Ensure profileImages paths are correctly resolved
  const resolvedProfileImages = profileImages.map((image) => `${import.meta.env.BASE_URL}${image}`);

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === resolvedProfileImages.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? resolvedProfileImages.length - 1 : prev - 1
    );
  };

  // Auto-advance carousel every seconds
  const startCarousel = () => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        prev === resolvedProfileImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    setCarouselInterval(interval);
  };

  // Pause carousel
  const pauseCarousel = () => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      setCarouselInterval(null);
    }
  };

  // Resume carousel
  const resumeCarousel = () => {
    if (!carouselInterval) {
      startCarousel();
    }
  };

  // Start carousel on mount
  useEffect(() => {
    startCarousel();

    // Cleanup on unmount
    return () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    };
  }, []);

  // Reset interval when image is changed manually
  useEffect(() => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      startCarousel();
    }
  }, [currentImageIndex]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success(`${label} copied!`))
      .catch(() => toast.error('Failed to copy'));
  };

  const personalInfoWithContact = {
    ...personalInfo,
    email: "eatingwang012@163.com", // Updated email
    tel: "+86 132 6721 9745", // Updated telephone number
    WeChat: "YITING_WONG" // Updated WeChat ID
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-24 flex-grow">
      <div className="grid grid-cols-1 gap-16">
        {/* Profile Image Carousel */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md"
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}>
            {/* Current Image */}
            <img
              src={resolvedProfileImages[currentImageIndex]}
              alt={`${personalInfo.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-auto object-cover transition-opacity duration-500 aspect-video"
            />

            {/* Previous Image Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm opacity-0 hover:opacity-100"
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Next Image Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm opacity-0 hover:opacity-100"
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="max-w-2xl mx-auto">
          <div className="max-w-xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              {personalInfo.name}
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 mb-6 font-light">
              {personalInfo.position}
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {personalInfo.introduction}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 justify-center">
              {/* Email按钮 */}
              <button
                onClick={() => { setShowContactCard(true); setContactType('email'); }}
                className="inline-flex items-center px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 transition-all shadow-sm hover:shadow w-full sm:w-auto"
              >
                <i className="fa-regular fa-envelope mr-2"></i>
                Email
              </button>
              {/* Tel按钮 */}
              <button
                onClick={() => { setShowContactCard(true); setContactType('tel'); }}
                className="inline-flex items-center px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-700 transition-all shadow-sm hover:shadow w-full sm:w-auto"
              >
                <i className="fa-solid fa-phone mr-2"></i>
                Tel
              </button>
              {/* WeChat按钮 */}
              <button
                onClick={() => { setShowContactCard(true); setContactType('wechat'); }}
                className="inline-flex items-center px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 transition-all shadow-sm hover:shadow w-full sm:w-auto"
              >
                <i className="fa-brands fa-weixin mr-2"></i>
                WeChat
              </button>
            </div>

            {/* Contact Information Card */}

            {showContactCard && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowContactCard(false); setContactType(null); }}>
                <div
                  className="bg-white rounded-xl p-8 max-w-sm w-full shadow-xl transform transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                    <button
                      onClick={() => { setShowContactCard(false); setContactType(null); }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {contactType === 'email' && (
                      <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-base font-medium">{personalInfo.email}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </div>
                    )}
                    {contactType === 'tel' && (
                      <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm text-gray-500">Tel</p>
                          <p className="text-base font-medium">{personalInfoWithContact.tel}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(personalInfoWithContact.tel, 'Tel')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </div>
                    )}
                    {contactType === 'wechat' && (
                      <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm text-gray-500">WeChat</p>
                          <p className="text-base font-medium">{personalInfoWithContact.WeChat}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(personalInfoWithContact.WeChat, 'WeChat')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      {/* 项目详情弹窗（如需保留可放在其他区块） */}
      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projects={[...aiProjects, ...architectureProjects]}
          currentProjectId={currentProjectId || 0} // Added default value to fix type error
        />
      )}
      {/* About Section */}
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">About me</h2>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 leading-relaxed tracking-wide mb-4">
            {personalInfo.bio}
          </p>
        </div>
      </section>
    </main>
  );
}