import React from 'react';
import { Play, Target, Award, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-300 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-gray-800 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-32 w-6 h-6 border-2 border-gray-800 rounded-full opacity-40"></div>
        <div className="absolute top-28 right-48 w-3 h-3 bg-gray-800 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 border border-gray-800 transform rotate-45 opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">About ACM</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            The Association for Computing Machinery (ACM) stands at the forefront of the computing world as worlds largest educational and scientific computing society
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-1 shadow-lg transform rotate-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 h-48 flex items-center justify-center">
                <Users className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-1 shadow-lg transform -rotate-1">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 h-48 flex items-center justify-center">
                <Target className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-1 shadow-lg transform rotate-1">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8 h-48 flex items-center justify-center">
                <Award className="w-16 h-16 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-1 shadow-lg transform -rotate-2">
              <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-8 h-48 flex items-center justify-center">
                <Play className="w-16 h-16 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              We make sure your innovation & research<br />
              <span className="underline decoration-yellow-400 decoration-4">delivered properly</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Through its commitment to research, education, and collaboration, ACM serves as a vital hub for connecting computing professionals, fostering innovation, and promoting ethical practices.
              </p>
              <div className="mt-8 text-2xl font-semibold text-yellow-500">
                Innovate...
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-6">
                Built on academic excellence and innovation, Kalasalingam Academy of Research and Education (KARE) offers a range of undergraduate, postgraduate, and doctoral programs. Our campus is a hub of learning, ideas, collaborations, and cultural exchange. We embrace sportsmanship and create unforgettable experiences.
              </p>
              <div className="mt-8 text-2xl font-semibold text-yellow-500">
                ...Achieve
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                <button className="bg-white rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow z-10">
                  <Play className="w-8 h-8 text-gray-700 ml-1" />
                </button>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto -mt-8 relative z-10">
                <p className="text-center font-semibold text-gray-800">Making an impact, together</p>
                <p className="text-center text-sm text-gray-600 mt-1">ACM KARE Chapter</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">We empower computing enthusiasts</h3>
              <p className="text-gray-600 mb-6">
                Our aim is to create a dynamic and collaborative space where technology enthusiasts can come together to explore, learn, and innovate. Through workshops, projects, and knowledge-sharing sessions, we strive to enhance our members technical skills and foster a culture of continuous learning.
              </p>
              <blockquote className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-gray-700 italic mb-2">
                  Bridging academia and industry, we unite theory and application, nurturing holistic professionals. Through teamwork, leadership, and ethics, we develop individuals who grasp works broader impact.
                </p>
              </blockquote>
              <div className="mt-8 text-2xl font-semibold text-yellow-500">
                Empower...!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-20 bg-gray-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-8 h-8 border border-gray-300 transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            We help students to grow<br />
            faster and achieve more
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Bridging academia and industry, we unite theory and application, nurturing holistic professionals. Through teamwork, leadership, and ethics, we develop individuals who grasp works broader impact, blending technical prowess with a wider perspective for a more comprehensive approach.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Professional Network</h4>
              <p className="text-gray-600">
                Connect with computing professionals and build lasting relationships in the tech industry through our vibrant community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Our Aim</h4>
              <p className="text-gray-600">
                Create a dynamic collaborative space where technology enthusiasts explore, learn, and innovate together.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h4>
              <p className="text-gray-600">
                Unite theory and application, developing individuals with technical prowess and broader perspective.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;