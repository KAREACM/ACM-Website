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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-32 right-32 w-6 h-6 border-2 border-white rounded-full opacity-40"></div>
        <div className="absolute top-28 right-48 w-3 h-3 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 border border-white transform rotate-45 opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in<br />
            <span className="text-6xl md:text-7xl">touch</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12">
            Have questions about ACM KARE? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>   
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                <span className="underline decoration-sky-500 decoration-4">Contact Us</span>
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
                      <MapPin className="w-5 h-5 text-sky-600 mt-1" />
                      <p className="text-gray-700">
                        Krishnankoil, Srivilliputhur, Tamil Nadu<br />
                        626126
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-sky-600" />
                      <p className="text-gray-700">kareacm@klu.ac.in</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-sky-200 pt-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Association for<br />
                    Computing Machinery
                  </h4>
                  <p className="text-gray-600 mb-4">KARE ACM Student Chapter</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
              <form method='post' name='contact-form' onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                   type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  >
                  <span>SUBMIT</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;