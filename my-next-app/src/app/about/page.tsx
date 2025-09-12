'use client';

import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-32 right-32 w-6 h-6 border-2 border-white rounded-full opacity-40"></div>
        <div className="absolute top-28 right-48 w-3 h-3 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 border border-white transform rotate-45 opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            About <span className="text-white">ACM KARE</span>
          </h1>
          <p className="text-lg text-white/90 max-w-4xl mx-auto mb-16">
            At ACM KARE, we're more than just a student chapter we're a community of innovators, problem solvers, and tech 
            enthusiasts united by a passion for learning and collaboration.
          </p>
        </div>
      </section>

      {/* Why We Are & Our Goals Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Why We Are */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Why We Are</h2>
              <p className="text-black mb-8 leading-relaxed">
                We are here to bridge the gap between classroom theory and real-world tech. We believe every student deserves a space to explore, build, 
                and lead. We are driven by the idea that collaboration sparks transformation—and we're building that spark every day.
              </p>
              
              {/* Image Container for VR/Tech Image */}
              <div className="bg-white rounded-2xl overflow-hidden border border-blue-200 shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNEV_K7dj2nwqpFSzmjD65xha8bqebOnCZA&s"
                  alt="VR/AR Technology Workshop"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            {/* Our Goals */}
            <div>
              <div className="mb-12">
                {/* Image Container for Presentation Image */}
                <div className="bg-white rounded-2xl overflow-hidden border border-blue-200 shadow-lg mb-8">
                  <img
                    src="https://media.istockphoto.com/id/658835548/photo/schoolboy-giving-presentation-in-classroom.jpg?s=612x612&w=0&k=20&c=gu6zl2RcUWcgaMqtFxOR-G1aj7DqLAa76OgAA_zD1Yo="
                    alt="Technical Presentation"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              <h2 className="text-4xl font-bold text-black mb-8">Our Goals</h2>
              <p className="text-black mb-6 leading-relaxed">
                At ACM KARE, our goals are rooted in a deep commitment to empowering students through technology, creativity, and 
                collaboration. We strive to build a thriving ecosystem where learners become leaders, and ideas evolve into impactful solutions.
              </p>
              <p className="text-black mb-8 leading-relaxed">
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

export default AboutPage;