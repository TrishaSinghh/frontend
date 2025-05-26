
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Briefcase, Home, Users, MessageSquare, Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const recentMessages = [
    {
      id: 1,
      name: "Dr. Robert Kim",
      avatar: "https://i.pravatar.cc/300?img=1",
      message: "Thanks for the collaboration opportunity...",
      time: "2h ago"
    },
    {
      id: 2,
      name: "Dr. Maria Lopez",
      avatar: "https://i.pravatar.cc/300?img=5",
      message: "Could you review my latest research paper?",
      time: "5h ago"
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      avatar: "https://i.pravatar.cc/300?img=3",
      message: "The conference was amazing! Let's discuss...",
      time: "1d ago"
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      user: "Dr. Mehta",
      avatar: "https://i.pravatar.cc/300?img=12",
      action: "commented on your post",
      time: "2h ago",
      type: "comment"
    },
    {
      id: 2,
      user: "Dr. Sarah Wilson",
      avatar: "https://i.pravatar.cc/300?img=9",
      action: "endorsed you for Pediatrics",
      time: "4h ago",
      type: "endorsement"
    },
    {
      id: 3,
      user: "Dr. Arya",
      avatar: "https://i.pravatar.cc/300?img=8",
      action: "sent you a connection request",
      time: "6h ago",
      type: "connection"
    }
  ];

  return (
    <motion.header 
      className="fixed w-full top-0 z-50 bg-white/95 border-b border-gray-100 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="PharmInc Logo"
              className="h-8 w-auto rounded-md"
            />
          </Link>
        </div>
        
        {/* Center Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative rounded-full bg-gray-100 px-3 py-2 flex items-center w-full">
            <Search className="h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="ml-2 bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
            />
          </div>
        </div>
        
        {/* Navigation Icons */}
        <div className="flex items-center gap-2">
          <Link to="/home-feed">
            <Button variant="ghost" size="sm" className="p-2">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/research">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Users className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Briefcase className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Messages Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0 bg-white border shadow-lg" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Messages</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {recentMessages.map((message) => (
                  <DropdownMenuItem key={message.id} className="p-4 cursor-pointer hover:bg-gray-50">
                    <Link to={`/messages/${message.id}`} className="flex items-center gap-3 w-full">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={message.avatar} alt={message.name} />
                        <AvatarFallback>{message.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{message.name}</p>
                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                        <p className="text-xs text-gray-400">{message.time}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-3 border-t">
                <Link to="/messages">
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50">
                    See More Messages
                  </Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0 bg-white border shadow-lg" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {recentNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={notification.avatar} alt={notification.user} />
                        <AvatarFallback>{notification.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{notification.user}</span>
                          <span className="text-gray-600"> {notification.action}</span>
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-3 border-t">
                <Link to="/notifications">
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50">
                    See All Notifications
                  </Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/profile">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/pp.png" alt="Profile" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
