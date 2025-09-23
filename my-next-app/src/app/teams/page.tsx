'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

interface TeamMemberCardProps {
  name?: string;
  designation?: string;
  linkedin?: string;
  image?: string;
  profileLink?: string;
  showProfileButton?: boolean;
}

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  linkedin?: string;
  image?: string;
  profileLink?: string;
  showProfileButton?: boolean;
  category: string;  // Since you use member.category for grouping
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name = "Team Member",
  designation = "Position",
  linkedin = "https://linkedin.com/in/profile",
  image = "https://wallpapers.com/images/hd/professional-profile-pictures-1500-x-2100-bvjgzg0cwa8r051t.jpg",
  profileLink = "#",
  showProfileButton = false
}) => {
  return (
    <div className="w-64 h-80 overflow-visible" style={{ perspective: '1000px' }}>
      <style jsx>{`
        .card-container {
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }
        .card-container:hover {
          transform: rotateY(180deg);
        }
        .card-face {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .card-front {
          pointer-events: auto;
        }
        .card-container:hover .card-front {
          pointer-events: none; /* disable front when flipped */
        }
        .card-back {
          transform: rotateY(180deg);
          pointer-events: none;
        }
        .card-container:hover .card-back {
          pointer-events: auto; /* enable back when visible */
        }
        .rotating-border::before {
          content: '';
          position: absolute;
          display: block;
          inset: -2px;
          background: linear-gradient(90deg, transparent, #5ac8f0ff, #5ac8f0ff, #5ac8f0ff, #5ac8f0ff, transparent);
          border-radius: 12px;
          animation: rotation 5000ms infinite linear;
          z-index: -1;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="card-container w-full h-full relative">
        {/* Front Face - Member Image */}
        <div className="card-face card-front bg-white rounded-xl overflow-hidden shadow-2xl rotating-border">
          <Image
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent z-20">
            <h3 className="text-gray-800 text-lg font-bold mb-1">{name}</h3>
            <p className="text-gray-500 text-sm opacity-90">Hover to see details</p>
          </div>
        </div>

        {/* Back Face - Member Details */}
        <div className="card-face card-back bg-white rounded-xl overflow-hidden shadow-2xl rotating-border flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {/* Profile Icon */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-black" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Member Name */}
            <h2 className="text-2xl font-bold text-black mb-3">{name}</h2>
            
            {/* Designation */}
            <p className="text-black text-sm mb-6 leading-relaxed font-medium">{designation}</p>
            
            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              {/* LinkedIn Icon */}
              <a href={linkedin} target="_blank" rel="noopener noreferrer" 
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200">
                <svg 
                  className="w-5 h-5 text-black" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Personal Profile Button */}
              {showProfileButton && (
                <a href={profileLink} target="_blank" rel="noopener noreferrer" 
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200">
                  Personal Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Header
const SectionHeader: React.FC<{title: string, subtitle?: string}> = ({title, subtitle}) => (
  <div className="text-center mb-8 relative">
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <div className="text-9xl font-black text-sky-200">{title.split(' ')[0]}</div>
    </div>
    <div className="relative z-10">
      <h2 className="text-4xl font-black mb-4 relative text-gray-800">
        {title}
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-4"></div>
      {subtitle && (
        <p className="text-sky-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  </div>
);

// Team Directory
export default function TeamDirectory() {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://kare-acm-website.onrender.com/api/teams")
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching teams:", err);
        setLoading(false);
      });
  }, []);

  const groupedTeams = teams.reduce((acc: Record<string, TeamMember[]>, member: TeamMember) => {
  if (!acc[member.category]) acc[member.category] = [];
  acc[member.category].push(member);
  return acc;
  }, {} as Record<string, TeamMember[]>);

  if (loading) return <p className="text-center text-lg">Loading team members...</p>;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      <div className="relative p-8" style={{ zIndex: 10 }}>
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl font-black mb-4 text-gray-800">Meet Our Wonderful Dream Team ✨</h1>
          <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-800 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Discover the talented individuals who make our community exceptional. 
            <span className="text-gray-800 font-bold"> Hover over the cards</span> to connect with them.
          </p>
        </div>

        {Object.keys(groupedTeams).map((category) => (
          <section key={category} className="mb-20">
            <SectionHeader title={category} />
            <div className="flex flex-wrap gap-10 justify-center">
              {groupedTeams[category].map((member: TeamMember) => (
                <TeamMemberCard
                  key={member._id}
                  name={member.name}
                  designation={member.designation}
                  linkedin={member.linkedin}
                  image={member.image}
                  profileLink={member.profileLink}
                  showProfileButton={member.showProfileButton}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
