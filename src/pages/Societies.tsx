import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, Globe, Calendar, MapPin, Star, Crown,
  MessageSquare, TrendingUp, Award, BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";

const Societies = () => {
  const featuredSocieties = [
    {
      id: 1,
      name: "American Heart Association",
      description: "Leading organization dedicated to fighting heart disease and stroke through research, education, and advocacy.",
      members: 45672,
      category: "Cardiology",
      location: "Global",
      founded: "1924",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=300&auto=format&fit=crop",
      features: ["CME Credits", "Research Grants", "Global Network", "Annual Conference"],
      rating: 4.9,
      isVerified: true
    },
    {
      id: 2,
      name: "International Society of Pediatrics",
      description: "Global community of pediatric healthcare professionals dedicated to improving child health worldwide.",
      members: 32589,
      category: "Pediatrics", 
      location: "International",
      founded: "1912",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=300&auto=format&fit=crop",
      features: ["Specialized Training", "Research Collaboration", "Global Health Initiatives", "Mentorship Programs"],
      rating: 4.8,
      isVerified: true
    },
    {
      id: 3,
      name: "Society for Emergency Medicine",
      description: "Professional organization advancing emergency medicine through education, research, and clinical excellence.",
      members: 28943,
      category: "Emergency Medicine",
      location: "North America",
      founded: "1970",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=300&auto=format&fit=crop",
      features: ["24/7 Resources", "Rapid Response Training", "Crisis Management", "Peer Support"],
      rating: 4.7,
      isVerified: true
    },
    {
      id: 4,
      name: "Global Neurology Research Alliance",
      description: "Collaborative network of neurologists and researchers working to advance understanding of neurological disorders.",
      members: 19876,
      category: "Neurology",
      location: "Worldwide",
      founded: "1995",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=300&auto=format&fit=crop",
      features: ["Research Database", "Clinical Trials", "Innovation Hub", "Patient Advocacy"],
      rating: 4.6,
      isVerified: true
    }
  ];

  const categories = [
    { name: "Cardiology", count: 23, color: "bg-red-100 text-red-700" },
    { name: "Neurology", count: 18, color: "bg-blue-100 text-blue-700" },
    { name: "Pediatrics", count: 15, color: "bg-green-100 text-green-700" },
    { name: "Emergency Medicine", count: 12, color: "bg-orange-100 text-orange-700" },
    { name: "Oncology", count: 11, color: "bg-purple-100 text-purple-700" },
    { name: "General Practice", count: 9, color: "bg-gray-100 text-gray-700" }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Global Cardiology Summit 2024",
      society: "American Heart Association",
      date: "March 15-17, 2024",
      location: "Boston, MA",
      attendees: 2400,
      type: "Conference"
    },
    {
      id: 2,
      title: "Pediatric Innovation Workshop",
      society: "International Society of Pediatrics",
      date: "April 8-9, 2024",
      location: "Virtual Event",
      attendees: 850,
      type: "Workshop"
    },
    {
      id: 3,
      title: "Emergency Medicine Symposium",
      society: "Society for Emergency Medicine", 
      date: "May 3-5, 2024",
      location: "Chicago, IL",
      attendees: 1200,
      type: "Symposium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Medical Societies & Organizations
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with leading medical societies, access exclusive resources, and advance your professional development
          </p>
          
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Browse Societies
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Create Society
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Sidebar */}
          <aside className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Society Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <Badge className={`${category.color} text-xs`}>
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{event.society}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{event.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {event.attendees} attending
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Medical Societies</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Most Popular
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </Button>
              </div>
            </div>

            {/* Societies Grid */}
            <div className="grid grid-cols-2 gap-6">
              {featuredSocieties.map((society) => (
                <div key={society.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={society.image} 
                          alt={society.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            {society.name}
                            {society.isVerified && (
                              <Crown className="h-4 w-4 text-yellow-500" />
                            )}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {society.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{society.rating}</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700">
                          {society.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {society.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {society.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {society.members.toLocaleString()} members
                        </span>
                        <span>Founded {society.founded}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Join Society
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                View All Societies
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Societies;
