'use client';

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
  featured?: boolean;
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
      case 'upcoming': return 'bg-sky-100 text-sky-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string): string => {
    switch(type) {
      case 'hackathon': return 'bg-sky-500';
      case 'workshop': return 'bg-sky-400';
      case 'competition': return 'bg-sky-600';
      case 'talk': return 'bg-sky-500';
      case 'bootcamp': return 'bg-sky-400';
      case 'seminar': return 'bg-sky-500';
      default: return 'bg-gray-500';
    }
  };

  const getVisibilityBadgeClasses = (visibility: string): string => {
    return visibility === 'internal' 
      ? 'bg-sky-100 text-sky-800' 
      : 'bg-sky-100 text-sky-800';
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
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(event.status)}`}>
            {event.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getVisibilityBadgeClasses(event.visibility)}`}>
            {event.visibility}
          </span>
        </div>
        
        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="w-16 text-center">
            <div className={`${getEventTypeColor(event.eventType)} text-white text-xs py-1 font-bold`}>
              {new Date(event.startDate).toLocaleDateString('en-US', {month: 'short'}).toUpperCase()}
            </div>
            <div className="py-1 font-bold text-lg text-gray-800">
              {new Date(event.startDate).getDate()}
            </div>
          </div>
        </div>
        
        {/* Bottom badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <span className="bg-black/60 text-white px-2 py-1 rounded-md text-xs capitalize font-semibold">
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
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-xs font-semibold">
            {event.registrations}/{event.maxCapacity}
          </span>
          {spotsRemaining <= 10 && spotsRemaining > 0 && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-semibold">
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
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar size={16} className="text-sky-500 flex-shrink-0" />
            <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock size={16} className="text-sky-500 flex-shrink-0" />
            <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-sky-500 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users size={16} className="text-sky-500 flex-shrink-0" />
            <span>{event.registrations} registered</span>
          </div>
        </div>

        {/* Organizers */}
        <div className="mb-4">
          <p className="text-xs text-gray-700 font-semibold mb-1">Organized by:</p>
          <div className="flex flex-wrap gap-1">
            {event.organizers.map(org => (
              <span key={org} className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md text-xs font-medium">
                {org}
              </span>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className={`px-5 pb-5 flex justify-between items-center transition-all duration-300`}>
        <button className="text-sm text-sky-600 font-semibold hover:text-sky-800 transition-colors duration-300">
          Learn more
        </button>
        <button className={`text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
          event.status === 'completed' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : spotsRemaining === 0
            ? 'bg-red-500 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600 transform hover:scale-105 shadow-md hover:shadow-lg'
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

// Enhanced Section Header Component matching Team Directory
const SectionHeader: React.FC<{title: string, subtitle?: string}> = ({title, subtitle}) => (
  <div className="text-center mb-8 relative">
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <div className="text-9xl font-black text-sky-200">{title.split(' ')[0]}</div>
    </div>
    <div className="relative z-10">
      <h2 className="text-4xl font-black mb-4 relative text-gray-800">
        {title}
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-4"></div>
      {subtitle && (
        <p className="text-sky-500 text-lg font-semibold max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
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
  
  const upcomingEvents = useMemo(() => 
    eventsData.filter(event => event.status === 'upcoming'), 
    []
  );
  
  const pastEvents = useMemo(() => 
    eventsData.filter(event => event.status === 'completed'), 
    []
  );
  
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
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      
      {/* Background Glow Design matching Team Directory */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Large strong glow top-left */}
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.55) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        {/* Large strong glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        {/* Medium accent glow top-right */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(191,219,254,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>

        {/* Medium accent glow bottom-left */}
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>
      </div>

      <div className="relative p-8" style={{zIndex: 10}}>
        {/* Enhanced Main Header matching Team Directory style */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-9xl font-black text-sky-200">EVENTS</div>
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-4 leading-tight text-gray-800">
              Discover Our Amazing Tech Events
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
              Join workshops, hackathons, and tech talks designed to enhance your skills and connect with fellow tech enthusiasts.
              <span className="font-semibold"> Explore exciting opportunities</span> to learn and grow.
            </p>
          </div>
        </div>
        
        {/* Tab toggle and search */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          {/* Tab toggle */}
          <div className="flex border border-sky-200 bg-white rounded-lg p-1 shadow-lg">
            <button 
              className={`px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 ${
                activeTab === 'upcoming' 
                  ? 'text-white bg-sky-500 shadow-md' 
                  : 'text-gray-800 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button 
              className={`px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 ${
                activeTab === 'past' 
                  ? 'text-white bg-sky-500 shadow-md' 
                  : 'text-gray-800 hover:text-gray-700 hover:bg-gray-50'
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
                className="pl-10 pr-4 py-2 border border-sky-200 rounded-lg w-64 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-300 bg-white shadow-lg"
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
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-sky-200 hover:bg-sky-50 rounded-lg transition-colors duration-300 shadow-lg font-semibold text-gray-800"
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
          <div className="mb-8 p-6 bg-white rounded-xl border border-sky-200 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-sm text-gray-800 mb-3">Filter by Date</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-sky-200 rounded-lg w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-300"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-sm text-gray-800 mb-3">Event Type</h3>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors duration-300 ${
                        selectedType === type 
                          ? 'bg-sky-100 text-sky-800 border border-sky-300' 
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
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
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors duration-300 font-semibold"
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
          <p className="text-sm text-gray-700 font-semibold">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button 
              className="text-sky-600 hover:text-sky-800 font-semibold"
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