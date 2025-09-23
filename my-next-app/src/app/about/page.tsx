import React from 'react';
import Image from 'next/image'

const AboutUsPage: React.FC = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)',
      }}
    >
      {/* Background Glow Design matching Gallery Page */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(147,197,253,0.55) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        ></div>

        <div
          className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        ></div>

        <div
          className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(191,219,254,0.45) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        ></div>

        <div
          className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(96,165,250,0.45) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        ></div>
      </div>

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <div className="px-8 pt-12 pb-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-xl font-black text-sky-200">ABOUT</div>
              </div>
              <div className="relative z-10">
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-gray-800">
                  About us
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-6"></div>
                <p className="text-sky-500 text-lg font-semibold max-w-2xl mx-auto leading-relaxed">
                  The Association for Computing Machinery (ACM) stands at the
                  forefront of the computing world as world&apos;s largest educational
                  and scientific computing society
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="w-80 h-70 rounded-2xl overflow-hidden shadow-lg transform rotate-3 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  width={0} // or omit width but handle height similarly
                  height={0}
                  unoptimized
                  src="/HOME/img7.JPG"
                  alt="Woman working at desk"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="w-80 h-70 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  width={0} // or omit width but handle height similarly
                  height={0}
                  unoptimized
                  src="/HOME/img6.png"
                  alt="Woman reading"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="w-80 h-70 rounded-2xl overflow-hidden shadow-lg transform rotate-1 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  width={0} // or omit width but handle height similarly
                  height={0}
                  unoptimized
                  src="HOME/img8.png"
                  alt="Team meeting"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-9xl font-black text-sky-200">VISION</div>
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-4 relative text-gray-800">
                  We make sure your idea & creation
                  <br />
                  delivered properly
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-4"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Through its commitment to research, education, and collaboration,
                  ACM serves as a vital hub for connecting computing professionals,
                  fostering innovation, and promoting ethical practices.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Our aim is to create a dynamic and collaborative space where
                  technology enthusiasts can come together to explore, learn, and
                  innovate. Through workshops, projects, and knowledge-sharing
                  sessions, we strive to enhance our members technical skills and
                  foster a culture of continuous learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image/Quote + Mission Section */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image with Quote */}
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                  <Image
                    width={0} // or omit width but handle height similarly
                    height={0}
                    unoptimized
                    src="HOME/img7.JPG"
                    alt="Socialy Founder"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xl font-black text-gray-800 mb-2">
                    &quot;Making an impact, together&quot;
                  </p>
                </div>
              </div>

              {/* Mission Text */}
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-start opacity-5">
                    <div className="text-6xl font-black text-sky-200">EMPOWER</div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black text-gray-800 mb-6 leading-tight">
                      <br />
                      Our Mission
                    </h3>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm border border-sky-200 rounded-xl p-6 shadow-lg">
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Bridging academia and industry, we unite theory and
                    application, nurturing holistic professionals. Through
                    teamwork, leadership, and ethics, we develop individuals who
                    grasp work&apos;s broader impact, blending technical prowess with a
                    wider perspective for a more comprehensive approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
