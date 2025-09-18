'use client';

import React, { useState, useEffect, useRef} from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyDc_I8NlPtTBVuXeBvfpfTzlQFYri0gzGyum34uP6qJhq3RcEpHGQgiK0O7UnU_V0C/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(e.currentTarget)
      });

      alert('✅ Thank you! Form submitted successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // clear form
    } catch (error) {
      console.error('Error!', error);
      alert('❌ There was an error submitting the form.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      
      {/* Background Glow Design matching Blog Page */}
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
        {/* Header */}
        <div className="px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-9xl font-black text-sky-200">CONTACT</div>
              </div>
              <div className="relative z-10">
                <h1 className="text-5xl font-black mb-4 leading-tight text-gray-800">
                  Get In Touch
                </h1>
                <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-6"></div>
                <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
                  Have questions about ACM KARE? We would love to hear from you.
                  <span className="font-semibold"> Send us a message</span> and we will respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sky-200 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <h2 className="text-4xl font-black text-gray-800 mb-8 leading-tight">
                  Contact Information
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
                      KALASALINGAM ACADEMY<br />
                      OF RESEARCH AND<br />
                      EDUCATION
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <MapPin className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">
                          Krishnankoil, Srivilliputhur, Tamil Nadu<br />
                          626126
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <Mail className="w-6 h-6 text-sky-500 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">kareacm@klu.ac.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-sky-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
                      Association for<br />
                      Computing Machinery
                    </h4>
                    <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold border border-sky-300">
                      KARE ACM Student Chapter
                    </span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 hover:from-sky-500/5 hover:to-sky-500/10 transition-all duration-500 pointer-events-none rounded-xl"></div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sky-200 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative group">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">Send us a message</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 placeholder-gray-500 transition-all duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 placeholder-gray-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 placeholder-gray-500 transition-all duration-300"
                      placeholder="What is this about?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 placeholder-gray-500 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <button
                     onClick={async () => {
                       const formElement = document.createElement('form');
                       formElement.method = 'post';
                       formElement.name = 'contact-form';
                       
                       Object.entries(formData).forEach(([key, value]) => {
                         const input = document.createElement('input');
                         input.type = 'hidden';
                         input.name = key;
                         input.value = value;
                         formElement.appendChild(input);
                       });
                       
                       const event = { preventDefault: () => {}, currentTarget: formElement };
                       await handleSubmit(event as any);
                     }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-blue-400 hover:border-blue-300 flex items-center justify-center space-x-2"
                      style={{
                        boxShadow: '0px 0px 20px 1px #3b82f6aa',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                    <span>SUBMIT</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-sky-500/10 transition-all duration-500 pointer-events-none rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;