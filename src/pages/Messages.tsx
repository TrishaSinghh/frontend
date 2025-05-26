
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreVertical, MessageCircle, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Dr. Robert Kim",
      avatar: "",
      lastMessage: "Thanks for the collaboration opportunity on the cardiac research project. I'm excited to work together!",
      time: "2h ago",
      unread: true,
      online: true
    },
    {
      id: 2,
      name: "Dr. Maria Lopez",
      avatar: "/pp.jpeg",
      lastMessage: "Could you review my latest research paper on neural pathways? I'd value your expert opinion.",
      time: "5h ago",
      unread: true,
      online: false
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      avatar: "/pp.jpeg",
      lastMessage: "The International Cardiology Conference was amazing! Let's discuss the key takeaways over coffee.",
      time: "1d ago",
      unread: false,
      online: true
    },
    {
      id: 4,
      name: "Dr. Anika Sharma",
      avatar: "/pp.jpeg",
      lastMessage: "I saw your publication on minimally invasive techniques. Brilliant work! Would love to connect.",
      time: "2d ago",
      unread: false,
      online: false
    },
    {
      id: 5,
      name: "Dr. Michael Chen",
      avatar: "/pp.jpeg",
      lastMessage: "Thank you for the referral. The patient is responding well to the treatment plan.",
      time: "3d ago",
      unread: false,
      online: true
    },
    {
      id: 6,
      name: "Dr. Emily Davis",
      avatar: "/",
      lastMessage: "The medical conference next month looks promising. Are you planning to attend?",
      time: "1w ago",
      unread: false,
      online: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <div className="pt-16 max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          </div>
          <p className="text-gray-600 text-lg">Connect and collaborate with medical professionals</p>
        </div>

        <Card className="rounded-xl shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {/* Search Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white shadow-sm text-base"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{conversations.filter(c => c.online).length} online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{conversations.filter(c => c.unread).length} unread</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{conversations.length} conversations</span>
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="divide-y divide-gray-100">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                >
                  <div className="p-6 flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 shadow-md border-2 border-white">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-semibold">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold text-gray-900 text-lg ${conversation.unread ? 'font-bold' : 'font-medium'}`}>
                          {conversation.name}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">{conversation.time}</span>
                      </div>
                      <p className={`text-gray-600 truncate leading-relaxed ${conversation.unread ? 'font-medium text-gray-800' : ''}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {conversation.unread && (
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                      )}
                      <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredConversations.length === 0 && (
              <div className="p-12 text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversations found</h3>
                <p className="text-gray-600">Try adjusting your search terms or start a new conversation.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
