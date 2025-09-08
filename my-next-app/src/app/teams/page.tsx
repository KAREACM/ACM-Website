'use client';
import React from 'react';

interface TeamMemberCardProps {
  name?: string;
  designation?: string;
  linkedin?: string;
  image?: string;
  profileLink?: string;
  showProfileButton?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name = "Team Member",
  designation = "Position",
  linkedin = "linkedin.com/in/profile",
  image = "https://wallpapers.com/images/hd/professional-profile-pictures-1500-x-2100-bvjgzg0cwa8r051t.jpg",
  profileLink = "#",
  showProfileButton = false
}) => {
  return (
    <div className="w-64 h-80 overflow-visible" style={{perspective: '1000px'}}>
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
        }
        .card-back {
          transform: rotateY(180deg);
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
        <div className="card-face absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl rotating-border">
          <img 
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
        <div className="card-face card-back absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl rotating-border">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
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
              <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200">
                <svg 
                  className="w-5 h-5 text-black" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Personal Profile Button (Only for Faculty) */}
              {showProfileButton && (
                <a href={profileLink} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200">
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

// Enhanced Section Header Component
const SectionHeader: React.FC<{title: string, subtitle?: string}> = ({title, subtitle}) => (
  <div className="text-center mb-16 relative">
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <div className="text-9xl font-black text-sky-200">{title.split(' ')[0]}</div>
    </div>
    <div className="relative z-10">
      <h2 className="text-5xl font-black mb-4 relative text-gray-800">
        {title}
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-4"></div>
      {subtitle && (
        <p className="text-sky-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  </div>
);

// Enhanced Demo Component
export default function TeamDirectory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-300/8 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100/10 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 p-12">
        {/* Enhanced Main Header */}
        <div className="text-center mb-24 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-9xl font-black text-sky-200">TEAM</div>
          </div>
          <div className="relative z-10">
            <h1 className="text-7xl font-black mb-6 leading-tight text-gray-800">
              Meet Our Wonderful
              <br />
              <span className="text-sky-500">Dream Team ✨</span>
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-8"></div>
            <p className="text-sky-500 text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
              Discover the talented individuals who make our community exceptional. 
              <span className="text-gray-800 font-bold"> Hover over the cards</span> to connect with them.
            </p>
          </div>
        </div>

        {/* Faculty Coordinators Section */}
        <section className="mb-24">
          <SectionHeader title="Faculty Coordinators" subtitle="Our guiding mentors and visionary leaders" />
          <div className="flex flex-wrap gap-10 justify-center">
            <TeamMemberCard 
              name="Dr. Sarah Wilson"
              designation="Faculty Coordinator & Research Lead"
              linkedin="linkedin.com/in/sarah-wilson"
              image="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face"
              profileLink="https://university.edu/faculty/sarah-wilson"
              showProfileButton={true}
            />
            <TeamMemberCard 
              name="Prof. Michael Chen"
              designation="Senior Faculty Coordinator"
              linkedin="linkedin.com/in/michael-chen"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
              profileLink="https://university.edu/faculty/michael-chen"
              showProfileButton={true}
            />
          </div>
        </section>

        {/* Office Bearers Section */}
        <section className="mb-24">
          <SectionHeader title="Office Bearers" subtitle="Our executive leadership powerhouse" />
          <div className="flex flex-wrap gap-10 justify-center">
            <TeamMemberCard 
              name="Alex Johnson"
              designation="President & Strategic Leader"
              linkedin="linkedin.com/in/alex-johnson"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
            />
            <TeamMemberCard 
              name="Emma Davis"
              designation="Vice President & Operations"
              linkedin="linkedin.com/in/emma-davis"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
            />
            <TeamMemberCard 
              name="James Wilson"
              designation="Secretary & Communications"
              linkedin="linkedin.com/in/james-wilson"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face"
            />
          </div>
        </section>

        {/* Core Team Section */}
        <section className="mb-24">
          <SectionHeader title="Core Team Divisions" />
          
          {/* Media Team */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-500 text-center mb-12">📱 Media Team</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Sophia Martinez"
                designation="Media Head & Content Strategist"
                linkedin="linkedin.com/in/sophia-martinez"
                image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face"
              />
              <TeamMemberCard 
                name="Ryan Thompson"
                designation="Media Coordinator & Analytics"
                linkedin="linkedin.com/in/ryan-thompson"
                image="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>

          {/* Volunteer Heads */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-500 text-center mb-12">🤝 Volunteer Heads</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Maya Patel"
                designation="Chief Volunteer Coordinator"
                linkedin="linkedin.com/in/maya-patel"
                image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face"
              />
              <TeamMemberCard 
                name="David Kim"
                designation="Assistant Volunteer Head"
                linkedin="linkedin.com/in/david-kim"
                image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>

          {/* Graphics Team */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-500 text-center mb-12">🎨 Graphics Team</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Zoe Anderson"
                designation="Lead Graphics Designer"
                linkedin="linkedin.com/in/zoe-anderson"
                image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face"
              />
              <TeamMemberCard 
                name="Carlos Rodriguez"
                designation="Visual Designer & Illustrator"
                linkedin="linkedin.com/in/carlos-rodriguez"
                image="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>

          {/* Web Developers */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-500 text-center mb-12">💻 Web Developers</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Kanna Pranavi"
                designation="Lead Full-Stack Developer"
                linkedin="linkedin.com/in/kanna-pranavi"
                image="https://wallpapers.com/images/hd/professional-profile-pictures-1500-x-2100-bvjgzg0cwa8r051t.jpg"
              />
              <TeamMemberCard 
                name="Oliver Brown"
                designation="Frontend Specialist & UI Expert"
                linkedin="linkedin.com/in/oliver-brown"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>

          {/* Lens and Edit Team */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-500 text-center mb-12">📸 Lens and Edit</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Isabella Garcia"
                designation="Photography Director"
                linkedin="linkedin.com/in/isabella-garcia"
                image="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop&crop=face"
              />
              <TeamMemberCard 
                name="Ethan Moore"
                designation="Video Editor & Cinematographer"
                linkedin="linkedin.com/in/ethan-moore"
                image="https://images.unsplash.com/photo-1507038772120-7fff76f79d79?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>

          {/* Content Writers */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-sky-400 text-center mb-12">✍ Content Writers</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              <TeamMemberCard 
                name="Ava Johnson"
                designation="Content Writer & Storyteller"
                linkedin="linkedin.com/in/ava-johnson"
                image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face"
              />
              <TeamMemberCard 
                name="Lucas Miller"
                designation="Technical Writer & Documentation"
                linkedin="linkedin.com/in/lucas-miller"
                image="https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=face"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}