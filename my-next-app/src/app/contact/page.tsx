'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Get in<br />
            <span className="text-6xl md:text-7xl">touch</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Have questions about ACM KARE? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>

          {/* Contact Info Cards - Centered */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-center">Location</h3>
                <p className="text-sm text-gray-600 text-center">
                  Krishnankoil, Srivilliputhur<br />
                  Tamil Nadu 626126
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-center">Email</h3>
                <p className="text-sm text-gray-600 text-center">kareacm@klu.ac.in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                <span className="underline decoration-yellow-400 decoration-4">Contact Us</span>
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    KALASALINGAM ACADEMY<br />
                    OF RESEARCH AND<br />
                    EDUCATION
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                      <p className="text-gray-600">
                        Krishnankoil, Srivilliputhur, Tamil Nadu<br />
                        626126
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-yellow-500" />
                      <p className="text-gray-600">04563 289 042</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-yellow-500" />
                      <p className="text-gray-600">kareacm@klu.ac.in</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Association for<br />
                    Computing Machinery
                  </h4>
                  <p className="text-gray-600 mb-4">KARE ACM Student Chapter</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>SUBMIT</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">KARE ACM Student Chapter</h3>
              <p className="text-gray-300 mb-4">
                Designed and Developed by Web Dev Team, KARE ACM
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">CONTACT</h4>
              <div className="space-y-2 text-gray-300">
                <p>kareacm@klu.ac.in</p>
                <p>
                  Kalasalingam Academy of Research and Education,<br />
                  Krishnankoil, Srivilliputhur,<br />
                  Tamil Nadu 626126
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KARE ACM Student Chapter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;