
"use client";
import React, { useState, useEffect } from 'react';

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
    }
  ];

  // Awards and achievements data
  const awards: Award[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
      title: "Excellence Award 2024",
      description: "Recognized for outstanding performance and dedication to quality work."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      title: "Innovation Trophy",
      description: "Awarded for breakthrough solutions and creative problem-solving."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
      title: "Team Achievement",
      description: "Celebrating collaborative excellence and teamwork success."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      title: "Leadership Recognition",
      description: "Honored for exceptional leadership and mentorship qualities."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      title: "Annual Certificate",
      description: "Consistent high performance throughout the entire year."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      title: "Customer Choice",
      description: "Selected as preferred service provider by our valued clients."
    }
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex: number) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .animate-fadeOut {
          animation: fadeOut 3s ease-in-out forwards;
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      {/* Unified Header and Photo Slideshow Section */}
      <div className="relative h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src={photos[currentPhotoIndex].url}
          alt={photos[currentPhotoIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60"></div>
        
        {/* Header Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Our Memories
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-light text-white/90 tracking-wide uppercase letter-spacing-wide drop-shadow-lg">
            in Frames
          </h2>
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPhotoIndex 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>

        {/* Photo Counter */}
        <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white font-medium">
            {currentPhotoIndex + 1} / {photos.length}
          </span>
        </div>
      </div>

      {/* Awards and Achievements Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-black mb-4">
              Awards & Achievements
            </h3>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-300 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {award.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;