
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, UserPlus, Award, Calendar, FileText, Bell, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Mentions', 'Comments', 'Endorsements', 'Connection Requests'];

  const notifications = [
    // Today
    {
      id: 1,
      type: 'comment',
      user: 'Dr. Mehta',
      avatar: 'https://i.pravatar.cc/300?img=12',
      action: 'commented on your post',
      content: '"Great insights on cardiac interventions!"',
      time: '2 hours ago',
      category: 'today',
      icon: MessageSquare,
      link: '/home-feed'
    },
    {
      id: 2,
      type: 'endorsement',
      user: 'Dr. Sarah Wilson',
      avatar: 'https://i.pravatar.cc/300?img=5',
      action: 'endorsed you for',
      content: 'Pediatrics',
      time: '4 hours ago',
      category: 'today',
      icon: Award,
      link: '/profile'
    },
    {
      id: 3,
      type: 'connection',
      user: 'Dr. Arya',
      avatar: 'https://i.pravatar.cc/300?img=8',
      action: 'sent you a connection request',
      content: '',
      time: '6 hours ago',
      category: 'today',
      icon: UserPlus,
      link: '/profile'
    },
    // This Week
    {
      id: 4,
      type: 'mention',
      user: 'Dr. James Rodriguez',
      avatar: 'https://i.pravatar.cc/300?img=3',
      action: 'mentioned you in a post',
      content: '"Thanks @Dr. Sarah Chen for the collaboration"',
      time: '2 days ago',
      category: 'week',
      icon: MessageSquare,
      link: '/home-feed'
    },
    {
      id: 5,
      type: 'comment',
      user: 'Dr. Maria Lopez',
      avatar: 'https://i.pravatar.cc/300?img=9',
      action: 'liked your research paper',
      content: '"Advances in Interventional Cardiology"',
      time: '3 days ago',
      category: 'week',
      icon: Heart,
      link: '/profile'
    },
    {
      id: 6,
      type: 'event',
      user: 'Medical Conference',
      avatar: 'https://i.pravatar.cc/300?img=15',
      action: 'reminder: conference starts tomorrow',
      content: 'Global Health Summit 2024',
      time: '4 days ago',
      category: 'week',
      icon: Calendar,
      link: '/events'
    },
    // Earlier
    {
      id: 7,
      type: 'endorsement',
      user: 'Dr. Robert Kim',
      avatar: 'https://i.pravatar.cc/300?img=1',
      action: 'endorsed you for',
      content: 'Clinical Research',
      time: '1 week ago',
      category: 'earlier',
      icon: Award,
      link: '/profile'
    },
    {
      id: 8,
      type: 'comment',
      user: 'Dr. Elena Martinez',
      avatar: 'https://i.pravatar.cc/300?img=7',
      action: 'shared your case study',
      content: '"Excellent analysis of ECG patterns"',
      time: '2 weeks ago',
      category: 'earlier',
      icon: FileText,
      link: '/home-feed'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Comments' && notification.type === 'comment') return true;
    if (activeFilter === 'Mentions' && notification.type === 'mention') return true;
    if (activeFilter === 'Endorsements' && notification.type === 'endorsement') return true;
    if (activeFilter === 'Connection Requests' && notification.type === 'connection') return true;
    return false;
  });

  const groupedNotifications = {
    today: filteredNotifications.filter(n => n.category === 'today'),
    week: filteredNotifications.filter(n => n.category === 'week'),
    earlier: filteredNotifications.filter(n => n.category === 'earlier')
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'endorsement': return Award;
      case 'connection': return UserPlus;
      case 'mention': return MessageSquare;
      case 'event': return Calendar;
      default: return Heart;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'comment': return 'text-blue-600 bg-blue-100';
      case 'endorsement': return 'text-yellow-600 bg-yellow-100';
      case 'connection': return 'text-green-600 bg-green-100';
      case 'mention': return 'text-purple-600 bg-purple-100';
      case 'event': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <div className="pt-16 max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap font-medium transition-all duration-200 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md text-white' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Today */}
          {groupedNotifications.today.length > 0 && (
            <Card className="rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Today
                </h2>
              </div>
              <CardContent className="p-0">
                {groupedNotifications.today.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColorClass = getIconColor(notification.type);
                  return (
                    <Link key={notification.id} to={notification.link}>
                      <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-b last:border-b-0 cursor-pointer transition-all duration-200">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 shadow-md border-2 border-white">
                            <AvatarImage src={notification.avatar} alt={notification.user} />
                            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200">
                              {notification.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${iconColorClass} shadow-sm`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                  <span className="font-semibold text-gray-900">{notification.user}</span>
                                  <span className="text-gray-700"> {notification.action}</span>
                                  {notification.content && (
                                    <span className="text-gray-800 font-medium"> {notification.content}</span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* This Week */}
          {groupedNotifications.week.length > 0 && (
            <Card className="rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  This Week
                </h2>
              </div>
              <CardContent className="p-0">
                {groupedNotifications.week.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColorClass = getIconColor(notification.type);
                  return (
                    <Link key={notification.id} to={notification.link}>
                      <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-b last:border-b-0 cursor-pointer transition-all duration-200">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 shadow-md border-2 border-white">
                            <AvatarImage src={notification.avatar} alt={notification.user} />
                            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200">
                              {notification.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${iconColorClass} shadow-sm`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                  <span className="font-semibold text-gray-900">{notification.user}</span>
                                  <span className="text-gray-700"> {notification.action}</span>
                                  {notification.content && (
                                    <span className="text-gray-800 font-medium"> {notification.content}</span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Earlier */}
          {groupedNotifications.earlier.length > 0 && (
            <Card className="rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Earlier
                </h2>
              </div>
              <CardContent className="p-0">
                {groupedNotifications.earlier.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColorClass = getIconColor(notification.type);
                  return (
                    <Link key={notification.id} to={notification.link}>
                      <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-b last:border-b-0 cursor-pointer transition-all duration-200">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 shadow-md border-2 border-white">
                            <AvatarImage src={notification.avatar} alt={notification.user} />
                            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200">
                              {notification.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${iconColorClass} shadow-sm`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                  <span className="font-semibold text-gray-900">{notification.user}</span>
                                  <span className="text-gray-700"> {notification.action}</span>
                                  {notification.content && (
                                    <span className="text-gray-800 font-medium"> {notification.content}</span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {Object.values(groupedNotifications).every(group => group.length === 0) && (
            <Card className="rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No notifications</h3>
                <p className="text-gray-600 text-lg">You're all caught up! Check back later for new notifications.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
