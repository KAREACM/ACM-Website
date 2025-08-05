'use client';

import React, { useState, useEffect } from 'react';
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
  DollarSign
} from 'lucide-react';

// Types
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  venue: string;
  eventType: 'hackathon' | 'workshop' | 'competition' | 'talk' | 'bootcamp' | 'seminar';
  isFree: boolean;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  tags: string[];
  registrations: number;
  maxCapacity: number;
  organizers: string[];
  visibility: 'internal' | 'external';
}

// Mock data for demonstration
const eventsData: Event[] = [
  {
    id: "hackathon-2025",
    title: "CodeCraft Hackathon 2025",
    description: "Join us for a 48-hour coding marathon where teams compete to build innovative solutions for real-world problems. Prizes worth $5000 to be won!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    startDate: "2025-05-15T09:00",
    endDate: "2025-05-17T18:00",
    venue: "Tech Innovation Center, Block-B",
    eventType: "hackathon",
    isFree: false,
    price: 20,
    status: "upcoming",
    tags: ["coding", "prizes", "teams", "48hours", "innovation"],
    registrations: 103,
    maxCapacity: 150,
    organizers: ["Tech Club", "Innovation Hub"],
    visibility: "external"
  },
  {
    id: "ai-workshop",
    title: "AI & Machine Learning Workshop",
    description: "Learn the fundamentals of artificial intelligence and machine learning with hands-on projects and real-world applications.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    startDate: "2025-05-22T10:00",
    endDate: "2025-05-22T16:00",
    venue: "Virtual (Zoom)",
    eventType: "workshop",
    isFree: true,
    price: 0,
    status: "upcoming",
    tags: ["ai", "ml", "beginner-friendly", "python", "tensorflow"],
    registrations: 87,
    maxCapacity: 100,
    organizers: ["Tech Club", "AI Society"],
    visibility: "external"
  },
  {
    id: "code-jam",
    title: "Spring Code Jam 2025",
    description: "Test your algorithmic skills in this competitive programming contest. Solve challenging problems and compete for exciting prizes!",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=450&fit=crop",
    startDate: "2025-06-05T14:00",
    endDate: "2025-06-05T20:00",
    venue: "Computer Science Building, Lab 401",
    eventType: "competition",
    isFree: false,
    price: 5,
    status: "upcoming",
    tags: ["algorithms", "competitive", "problem-solving", "coding"],
    registrations: 42,
    maxCapacity: 60,
    organizers: ["Tech Club"],
    visibility: "internal"
  },
  {
    id: "web-dev-bootcamp", 
    title: "Full Stack Web Development Bootcamp",
    description: "Intensive 2-day bootcamp covering modern web development technologies including React, Node.js, and database management.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    startDate: "2025-06-15T09:00",
    endDate: "2025-06-16T17:00",
    venue: "Engineering Block A, Room 301",
    eventType: "bootcamp",
    isFree: false,
    price: 35,
    status: "upcoming",
    tags: ["web", "frontend", "backend", "react", "nodejs"],
    registrations: 26,
    maxCapacity: 40,
    organizers: ["Tech Club", "Web Dev Society"],
    visibility: "external"
  },
  {
    id: "blockchain-seminar",
    title: "Blockchain Technology Seminar",
    description: "Explore the fundamentals of blockchain technology, cryptocurrencies, and decentralized applications with industry experts.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop",
    startDate: "2025-07-10T15:00",
    endDate: "2025-07-10T18:00",
    venue: "Main Auditorium",
    eventType: "seminar",
    isFree: true,
    price: 0,
    status: "upcoming",
    tags: ["blockchain", "cryptocurrency", "defi", "web3"],
    registrations: 134,
    maxCapacity: 200,
    organizers: ["Tech Club", "Blockchain Society"],
    visibility: "external"
  },
  // Past Events
  {
    id: "devops-talk",
    title: "Modern DevOps Practices",
    description: "Learn about containerization, CI/CD pipelines, and cloud deployment strategies from industry professionals.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop",
    startDate: "2025-01-15T18:00",
    endDate: "2025-01-15T20:00",
    venue: "Main Auditorium",
    eventType: "talk",
    isFree: true,
    price: 0,
    status: "completed",
    tags: ["devops", "cloud", "ci-cd", "docker", "kubernetes"],
    registrations: 156,
    maxCapacity: 180,
    organizers: ["Tech Club"],
    visibility: "external"
  },
  {
    id: "game-jam",
    title: "Winter Game Jam 2025",
    description: "Create amazing games in 48 hours! Teams of up to 4 members compete to build the most innovative and fun games.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    startDate: "2025-02-08T10:00",
    endDate: "2025-02-10T18:00",
    venue: "Media Lab, Block C",
    eventType: "hackathon",
    isFree: false,
    price: 15,
    status: "completed",
    tags: ["game-dev", "design", "unity", "creativity", "48hours"],
    registrations: 78,
    maxCapacity: 80,
    organizers: ["Tech Club", "Game Dev Society"],
    visibility: "external"
  },
  {
    id: "datascience-workshop",
    title: "Data Science with Python",
    description: "Hands-on workshop covering data analysis, visualization, and machine learning using Python libraries like pandas and scikit-learn.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    startDate: "2025-03-20T14:00",
    endDate: "2025-03-20T17:00",
    venue: "Virtual (MS Teams)",
    eventType: "workshop",
    isFree: true,
    price: 0,
    status: "completed",
    tags: ["python", "data", "analytics", "pandas", "visualization"],
    registrations: 132,
    maxCapacity: 150,
    organizers: ["Tech Club", "Data Science Club"],
    visibility: "external"
  }
];

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
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string): string => {
    switch(type) {
      case 'hackathon': return 'bg-purple-500';
      case 'workshop': return 'bg-blue-500';
      case 'competition': return 'bg-red-500';
      case 'talk': return 'bg-green-500';
      case 'bootcamp': return 'bg-yellow-500';
      case 'seminar': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getVisibilityBadgeClasses = (visibility: string): string => {
    return visibility === 'internal' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const spotsRemaining = event.maxCapacity - event.registrations;
  
  return (
    <div 
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with overlay gradient and badges */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Colored strip based on event type */}
        <div className={`absolute top-0 left-0 w-full h-1.5 ${getEventTypeColor(event.eventType)}`}></div>
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}>
            {event.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVisibilityBadgeClasses(event.visibility)}`}>
            {event.visibility}
          </span>
        </div>
        
        {/* Date badge */}
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
        
        {/* Bottom badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <span className="bg-black/60 text-white px-2 py-1 rounded-md text-xs capitalize font-medium">
            {event.eventType}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
            event.isFree ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
        </div>
        
        {/* Registration info */}
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
      </div>
      
      {/* Content section */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 mb-3 leading-tight text-lg line-clamp-2">
          {event.title}
        </h3>
        
        {/* Description - show on all cards but limit lines */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        {/* Event details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-indigo-500 flex-shrink-0" />
            <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-indigo-500 flex-shrink-0" />
            <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-indigo-500 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-indigo-500 flex-shrink-0" />
            <span>{event.registrations} registered</span>
          </div>
        </div>

        {/* Organizers */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Organized by:</p>
          <div className="flex flex-wrap gap-1">
            {event.organizers.map(org => (
              <span key={org} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-xs">
                {org}
              </span>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
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
      </div>
      
      {/* Action buttons */}
      <div className={`px-5 pb-5 flex justify-between items-center transition-all duration-300`}>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300">
          Learn more
        </button>
        <button className={`text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
          event.status === 'completed' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : spotsRemaining === 0
            ? 'bg-red-500 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 shadow-md hover:shadow-lg'
        }`}
        disabled={event.status === 'completed' || spotsRemaining === 0}
        >
          {event.status === 'completed' 
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

// Main Events Page Component
const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const upcomingEvents = eventsData.filter(event => event.status === 'upcoming');
  const pastEvents = eventsData.filter(event => event.status === 'completed');
  
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
  
  const eventTypes = ['all', ...Array.from(new Set(eventsData.map(event => event.eventType)))];
  
  const clearFilters = () => {
    setSearchQuery('');
    setSearchDate('');
    setSelectedType('all');
  };
  
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
                key={event.id} 
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