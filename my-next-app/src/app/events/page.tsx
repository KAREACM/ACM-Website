'use client';
import { ChevronLeft, ChevronRight } from "lucide-react";


import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  X, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Users,
  Tag,
  DollarSign,
  Loader2,
  AlertCircle
} from 'lucide-react';

// Types matching your backend
interface Event {
  _id: string;
  id: string;
  title: string;
  description: string;
  images: string[];
  startDate: string;
  endDate: string;
  venue: string;
  eventType: 'hackathon' | 'workshop' | 'talk' | 'seminar' | 'other';
  isFree: boolean;
  price?: number;
  status: 'upcoming' | 'ongoing' | 'past';
  tags: string[];
  registrations: number;
  maxCapacity: number;
  organizers: string[];
  visibility: 'internal' | 'external';
  createdAt: string;
  updatedAt: string;
}

// API Response type based on your backend
interface ApiResponse {
  upcoming: Event[];
  ongoing: Event[];
  past: Event[];
}

// Event Card Component
interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getStatusBadgeClasses = (status: string): string => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string): string => {
    switch(type) {
      case 'hackathon': return 'bg-purple-500';
      case 'workshop': return 'bg-blue-500';
      case 'talk': return 'bg-green-500';
      case 'seminar': return 'bg-indigo-500';
      case 'other': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getVisibilityBadgeClasses = (visibility: string): string => {
    return visibility === 'internal' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const spotsRemaining = event.maxCapacity - event.registrations;
  const [currentImage, setCurrentImage] = useState(0);
  
  return (
    <div 
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with overlay gradient and badges */}
      {event.images && event.images.length > 0 && (
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.images[currentImage]} 
          alt={event.title || 'Event image'} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/800x450/e2e8f0/4a5568?text=Event';
          }}
        />

        {/* Show controls only if more than one image */}
        {event.images.length > 1 && (
          <>
            {/* Left arrow */}
            <button 
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => 
                  prev === 0 ? event.images.length - 1 : prev - 1
                );
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right arrow */}
            <button 
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => 
                  prev === event.images.length - 1 ? 0 : prev + 1
                );
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
          
          // {/* ===== UPDATE START: Conditional Elements on Image ===== */}
          // {/* Each element on the image is now conditional */}
          
          {event.eventType && (
            <div className={`absolute top-0 left-0 w-full h-1.5 ${getEventTypeColor(event.eventType)}`}></div>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {event.status && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}>
                {event.status}
              </span>
            )}
            {event.visibility && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVisibilityBadgeClasses(event.visibility)}`}>
                {event.visibility}
              </span>
            )}
          </div>
          
          {event.startDate && (
            <div className="absolute top-3 right-3 bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="w-16 text-center">
                <div className={`${getEventTypeColor(event.eventType)} text-white text-xs py-1 font-medium`}>
                  {new Date(event.startDate).toLocaleDateString('en-US', {month: 'short'}).toUpperCase()}
                </div>
                <div className="py-1 font-bold text-lg text-gray-800">
                  {new Date(event.startDate).getDate()}
                </div>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {event.eventType && (
              <span className="bg-black/60 text-white px-2 py-1 rounded-md text-xs capitalize font-medium">
                {event.eventType}
              </span>
            )}
            {event.isFree !== undefined && ( // Check for boolean presence
              <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                event.isFree ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.isFree ? 'FREE' : `Rs ${event.price || 'N/A'}`}
              </span>
            )}
          </div>
          
          {/* Registration info checks if spotsRemaining was calculable */}
          {spotsRemaining !== null && (
            <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
              <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
                {event.registrations}/{event.maxCapacity}
              </span>
              {spotsRemaining <= 10 && spotsRemaining > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">
                  Only {spotsRemaining} spots left!
                </span>
              )}
            </div>
          )}
          {/* ===== UPDATE END: Conditional Elements on Image ===== */}
        </div>
      )}
      {/* ===== UPDATE END: Conditional Image Rendering ===== */}
      
      {/* Content section */}
      <div className="p-5">
        {/* ===== UPDATE START: Conditional Content Rendering ===== */}
        {event.title && (
          <h3 className="font-bold text-gray-800 mb-3 leading-tight text-lg line-clamp-2">
            {event.title}
          </h3>
        )}
        
        {event.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}
        
        <div className="space-y-2 mb-4">
          {event.startDate && event.endDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-indigo-500 flex-shrink-0" />
              <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
            </div>
          )}
          
          {event.startDate && event.endDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-indigo-500 flex-shrink-0" />
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
            </div>
          )}
          
          {event.venue && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-indigo-500 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          )}
          
          {event.registrations != null && ( // Check for number existence
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-indigo-500 flex-shrink-0" />
              <span>{event.registrations} registered</span>
            </div>
          )}
        </div>

        {/* Check that organizers is an array with items before mapping */}
        {event.organizers && event.organizers.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Organized by:</p>
            <div className="flex flex-wrap gap-1">
              {event.organizers.map((org, index) => (
                <span key={index} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-xs">
                  {org}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Check that tags is an array with items before mapping */}
        {event.tags && event.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
              {event.tags.length > 3 && (
                <span className="text-gray-400 text-xs">
                  +{event.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        {/* ===== UPDATE END: Conditional Content Rendering ===== */}
      </div>
      
      {/* Action buttons */}
      <div className="px-5 pb-5 flex justify-between items-center transition-all duration-300">
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300">
          Learn more
        </button>
        <button 
          className={`text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
            event.status === 'past' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : spotsRemaining === 0
              ? 'bg-red-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 shadow-md hover:shadow-lg'
          }`}
          disabled={event.status === 'past' || spotsRemaining === 0}
        >
          {event.status === 'past' 
            ? 'Event Ended' 
            : spotsRemaining === 0 
            ? 'Sold Out' 
            : 'Register Now'
          }
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-16">
    <div className="text-center">
      <Loader2 size={48} className="mx-auto animate-spin text-indigo-600 mb-4" />
      <p className="text-gray-600">Loading events...</p>
    </div>
  </div>
);

// Error Component
interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="text-center py-16">
    <div className="text-red-400 mb-4">
      <AlertCircle size={64} className="mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-gray-800 mb-2">Error Loading Events</h3>
    <p className="text-gray-600 mb-4">{message}</p>
    <button 
      onClick={onRetry}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
    >
      Try Again
    </button>
  </div>
);

// Main Events Page Component
const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // API state
  const [eventsData, setEventsData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API configuration - adjust this to match your backend URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api';

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/events`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      setEventsData(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Memoize the events arrays to prevent infinite re-renders
  const upcomingEvents = useMemo(() => 
    eventsData?.upcoming || [], 
    [eventsData]
  );
  
  const pastEvents = useMemo(() => 
    eventsData?.past || [], 
    [eventsData]
  );
  
  // Filter events based on search criteria
  useEffect(() => {
    const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
    
    const filtered = currentEvents.filter(event => {
      const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDate = searchDate === '' || event.startDate.includes(searchDate);
      const matchesType = selectedType === 'all' || event.eventType === selectedType;
      
      return matchesQuery && matchesDate && matchesType;
    });
    
    setFilteredEvents(filtered);
  }, [activeTab, searchQuery, searchDate, selectedType, upcomingEvents, pastEvents]);
  
  // Get unique event types for filter options
  const eventTypes = useMemo(() => {
    if (!eventsData) return ['all'];
    const allEvents = [...eventsData.upcoming, ...eventsData.ongoing, ...eventsData.past];
    const types = Array.from(new Set(allEvents.map(event => event.eventType)));
    return ['all', ...types];
  }, [eventsData]);
  
  const clearFilters = () => {
    setSearchQuery('');
    setSearchDate('');
    setSelectedType('all');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Club Events</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover workshops, hackathons, and tech talks designed to enhance your skills and connect with fellow tech enthusiasts
            </p>
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Club Events</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover workshops, hackathons, and tech talks designed to enhance your skills and connect with fellow tech enthusiasts
            </p>
          </div>
          <ErrorMessage message={error} onRetry={fetchEvents} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Club Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover workshops, hackathons, and tech talks designed to enhance your skills and connect with fellow tech enthusiasts
          </p>
        </div>
        
        {/* Tab toggle and search */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          {/* Tab toggle */}
          <div className="flex border-b border-gray-200 bg-white rounded-lg p-1 shadow-sm">
            <button 
              className={`px-6 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === 'upcoming' 
                  ? 'text-white bg-indigo-600 shadow-md' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === 'past' 
                  ? 'text-white bg-indigo-600 shadow-md' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
          
          {/* Search bar - compact version */}
          <div className="flex gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-300 bg-white shadow-sm"
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <button 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-300 shadow-sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              Filters
              {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        
        {/* Extended filter options */}
        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-gray-700 mb-3">Filter by Date</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-300"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-700 mb-3">Event Type</h3>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors duration-300 ${
                        selectedType === type 
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' 
                          : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Clear filters button */}
            {(searchQuery !== '' || searchDate !== '' || selectedType !== 'all') && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
                  onClick={clearFilters}
                >
                  <X size={18} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-600">
            Showing {filteredEvents.length} {activeTab === 'upcoming' ? 'upcoming' : 'past'} event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Grid of events */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event._id} 
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;