import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, description, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-lg font-semibold text-gray-800 mb-2">{label}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);

const ACMKareSections: React.FC = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to right, #f2fcfe, #1c92d2)"
      }}
    >
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Logo Section */}
              <div className="flex items-center justify-center lg:justify-start mb-8 gap-4">
                <div className="w-24 h-24">
                  <img 
                    src="/acm-logo.svg" 
                    alt="KARE ACM Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-5xl font-bold text-gray-900 leading-tight">KAREACM</div>
                  <div className="text-3xl text-gray-600 font-medium mt-1">STUDENT CHAPTER</div>
                </div>
              </div>
              
              <div className="space-y-8">
                <h1 className="text-2xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Empowering <span className="text-blue-600">Innovators</span>.
                  <br />
                  Building the <span className="text-cyan-600">Future</span>.
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed mt-8">
                  Join a community of passionate students.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <a href="https://www.acm.org/membership">
                <button className="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-md text-black font-semibold rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg hover:shadow-xl border border-white border-opacity-30 backdrop-saturate-150">
                  Student Membership
                </button>
                </a>
                <a href="https://www.acm.org/membership">
                <button className="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-md text-black font-semibold rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg hover:shadow-xl border border-white border-opacity-30 backdrop-saturate-150">
                  Professional Membership
                </button>
                </a>
              </div>
            </div>
            
            {/* Right Images Grid */}
            <div className="space-y-4">
              {/* Top image (img3) */}
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl h-64 overflow-hidden shadow-lg">
                <img 
                  src="/HOME/img3.png" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Bottom row with img2 and img1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-2xl h-40 overflow-hidden shadow-lg">
                  <img 
                    src="/HOME/img2.png" 
                    alt="Workshop session" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl h-40 overflow-hidden shadow-lg">
                  <img 
                    src="/HOME/img1.png" 
                    alt="Presentation" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              number="2175+"
              label="Members"
              description="Recognised nationally for excellence in recruitment & outreach"
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.284-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.284.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatCard
              number="75+"
              label="Events"
              description="Workshops, hackathons, and talks held every year"
              icon={
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatCard
              number="10+"
              label="Mentor"
              description="Guidance from industry experts and senior professionals"
              icon={
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard
              number="900+"
              label="Awards"
              description="Awards presented annually to honour student excellence"
              icon={
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">ACM KARE</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At ACM KARE, we're more than just a student chapter—we're a community of innovators, problem solvers, and tech 
              enthusiasts united by a passion for learning and collaboration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Why We Are */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl h-60 overflow-hidden shadow-lg">
                <img 
                  src="HOME/img4.png" 
                  alt="VR Workshop" 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">Why We Are</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are here to bridge the gap between classroom theory and real-world tech. We believe every student deserves a space to explore, build, 
                and lead. We are driven by the idea that collaboration sparks transformation—and we're building that spark every day.
              </p>
            </div>

            {/* Our Goals */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/HOME/img5.png" 
                  alt="Tech presentation" 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">Our Goals</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                At ACM KARE, our goals are rooted in a deep commitment to empowering students through technology, creativity, and 
                collaboration. We strive to build a thriving ecosystem where learners become leaders, and ideas evolve into impactful solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our primary goal is to bridge the gap between academic learning and industry expectations. Through hands-on workshops, technical 
                events, and mentorship programs, we aim to equip students with practical skills that go beyond the classroom—preparing them for 
                real-world challenges in software development, hardware design, UI/UX, quantum computing, and more.
              </p>
              

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ACMKareSections;