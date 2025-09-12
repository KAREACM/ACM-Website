"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Trophy, Star, Medal } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface Award {
  id: number;
  image: string;
  title: string;
  description: string;
  year: string;
  category: string;
}

const GalleryPage: React.FC = () => {
  // Photos for slideshow
  const photos: Photo[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      alt: "Mountain landscape memory"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
      alt: "Lake view memory"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
      alt: "Forest path memory"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
      alt: "Sunset hills memory"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      alt: "Additional memory"
    }
  ];

  // Awards and achievements data
  const awards: Award[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
      title: "Excellence Award 2024",
      description: "Recognized for outstanding performance and dedication to quality work in technology innovation.",
      year: "2024",
      category: "Excellence"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      title: "Innovation Trophy",
      description: "Awarded for breakthrough solutions and creative problem-solving in software development.",
      year: "2024",
      category: "Innovation"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
      title: "Team Achievement",
      description: "Celebrating collaborative excellence and teamwork success in multiple projects.",
      year: "2023",
      category: "Team"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      title: "Leadership Recognition",
      description: "Honored for exceptional leadership and mentorship qualities in guiding junior developers.",
      year: "2023",
      category: "Leadership"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      title: "Annual Certificate",
      description: "Consistent high performance throughout the entire year with outstanding contributions.",
      year: "2023",
      category: "Performance"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      title: "Customer Choice Award",
      description: "Selected as preferred service provider by our valued clients for exceptional service quality.",
      year: "2022",
      category: "Service"
    }
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex: number) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length, isAutoPlaying]);

  const nextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'excellence': return <Award size={20} className="text-sky-500" />;
      case 'innovation': return <Star size={20} className="text-sky-500" />;
      case 'team': return <Trophy size={20} className="text-sky-500" />;
      case 'leadership': return <Medal size={20} className="text-sky-500" />;
      default: return <Award size={20} className="text-sky-500" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      
      {/* Background Glow Design matching Events Page */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.55) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(191,219,254,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>

        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>
      </div>
      

      <div className="relative" style={{zIndex: 10}}>
        
     {/* Photo Slideshow Section - Moved Up */}
<div className="px-8 pt-8 pb-16">
  <div className="max-w-8xl mx-auto">
    <div className="relative h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
      {/* Background Image */}
      <img
        src={photos[currentPhotoIndex].url}
        alt={photos[currentPhotoIndex].alt}
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
      
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60"></div>
      
      {/* Header Content Overlay - Centered */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
          Our Memories
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
        <h2 className="text-2xl md:text-3xl font-light text-white/90 tracking-wide uppercase drop-shadow-lg">
          in Frames
        </h2>
      </div>

              {/* Photo Counter */}
              <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white font-medium">
                  {currentPhotoIndex + 1} / {photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Awards and Achievements Section */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-9xl font-black text-sky-200">AWARDS</div>
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-4 relative text-gray-800">
                  Awards & Achievements
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-4"></div>
                <p className="text-sky-500 text-lg font-semibold max-w-2xl mx-auto leading-relaxed">
                  Recognition for excellence, innovation, and outstanding contributions to our field
                </p>
              </div>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {award.year}
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                      {getCategoryIcon(award.category)}
                      <span className="text-gray-800 font-semibold text-sm">{award.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors duration-300 leading-tight">
                      {award.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-sky-500/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border border-sky-200 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-3xl font-black text-sky-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {awards.length}
                  </div>
                  <div className="text-gray-700 font-semibold">Total Awards</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-black text-sky-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {photos.length}
                  </div>
                  <div className="text-gray-700 font-semibold">Memories Captured</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-black text-sky-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="text-gray-700 font-semibold">Years of Excellence</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-black text-sky-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-gray-700 font-semibold">Dedication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;