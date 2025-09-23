"use client";
import React, { useState, useEffect } from 'react';
import { Award as Awardicon , Trophy, Star, Medal } from 'lucide-react';
import Image from 'next/image'

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface Award {
  _id: number;
  image: string;
  title: string;
  description: string;
  year: string;
  category: string;
}

const GalleryPage: React.FC = () => {
  // Photos for slideshow
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    fetch("https://kare-acm-website.onrender.com/api/photos")   // ✅ fetch photos from backend
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoadingPhotos(false);
      })
      .catch((err) => {
        console.error("Error fetching photos:", err);
        setLoadingPhotos(false);
      });
  }, []);

  // Awards and achievements data
  const [awards, setAwards] = useState<Award[]>([]);
  const [loadingAwards, setLoadingAwards] = useState(true);

  useEffect(() => {
    fetch("https://kare-acm-website.onrender.com/api/awards")
      .then((res) => res.json())
      .then((data) => {
        setAwards(data);
        setLoadingAwards(false);
      })
      .catch((err) => {
        console.error("Error fetching awards:", err);
        setLoadingAwards(false);
      });
  }, []);

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
      case 'excellence': return <Awardicon size={20} className="text-sky-500" />;
      case 'innovation': return <Star size={20} className="text-sky-500" />;
      case 'team': return <Trophy size={20} className="text-sky-500" />;
      case 'leadership': return <Medal size={20} className="text-sky-500" />;
      default: return <Awardicon size={20} className="text-sky-500" />;
    }
  };
  if (loadingPhotos || loadingAwards) {
    return <p className="text-center text-lg py-20">Loading photos...</p>;
  }

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
      <Image
        width={0} // or omit width but handle height similarly
        height={0}
        unoptimized
        src={photos[currentPhotoIndex].url}
        alt={photos[currentPhotoIndex].alt}
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
      
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30"></div>

      
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
                  key={award._id}
                  className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      width={0} // or omit width but handle height similarly
                      height={0}
                      unoptimized
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