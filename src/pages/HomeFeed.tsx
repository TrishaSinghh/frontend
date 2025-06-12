import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, BookOpen, MessageCircle, FileText, Bell, Network,
  Filter, Image, FileIcon, Link2, MoreVertical, Heart,
  MessageSquare, Share2, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock user and post data
const user = {
  firstName: "John",
  lastName: "Doe",
  profilePicture: "/pp.png", // Updated to use pp.png
  specialization: "Cardiology",
  location: "Boston, MA"
};

const posts = [
  {
    id: 1,
    author: "Dr. Robert Kim",
    avatar: "https://i.pravatar.cc/300?img=1",
    role: "Neurologist at Mass General Hospital",
    time: "2 hours ago",
    content: "Just published our latest research on neural pathways in Alzheimer's patients. The findings suggest a new potential approach to early intervention. Link to the paper in comments.",
    tags: ["Neurology", "Alzheimer", "Research"],
    type: "Research Paper",
    likes: 67,
    comments: 34,
    shares: 14,
  },
  {
    id: 2,
    author: "Dr. Elena Martinez",
    avatar: "https://i.pravatar.cc/300?img=5",
    role: "Cardiologist at Cleveland Clinic",
    time: "5 hours ago",
    content: "Fascinating case today: 42-year-old patient with unusual ECG patterns showing intermittent Wenckebach phenomenon without symptoms. Anyone encountered similar cases recently?",
    tags: ["Cardiology", "ECG", "CaseStudy"],
    type: "Case Study",
    likes: 56,
    comments: 23,
    shares: 7,
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=1000&auto=format&fit=crop"
  }
];

const rightSidebar = [
  {
    section: "Journal Club",
    items: [
      {
        title: "AI in Clinical Diagnosis",
        doctors: 28,
        desc: "Latest paper from NEJM on machine learning applications",
        time: "Today at 2 PM"
      },
      {
        title: "Ethics Lab Case 003",
        doctors: 24,
        desc: "Ethical implications of genetic testing in pediatrics",
        time: "Tomorrow at 3 PM"
      }
    ]
  },
  {
    section: "Featured Conferences",
    items: [
      {
        title: "Global Health Summit 2024",
        date: "March 15-17, 2024 • Boston, MA",
        cme: 32,
        mode: "In-Person"
      }
    ]
  },
  {
    section: "Upcoming Events",
    items: [
      {
        month: "OCT",
        day: "15",
        title: "Advanced Cardiac Imaging Workshop",
        time: "10:00 AM - 4:00 PM",
        location: "Mayo Clinic, Rochester",
        cme: 6,
        spots: 8
      },
      {
        month: "OCT",
        day: "18",
        title: "Research Methodology Seminar",
        time: "2:00 PM - 5:00 PM EST",
        location: "Virtual Event",
        cme: 0,
        spots: null
      }
    ]
  }
];

export default function HomeFeed() {
  const [liked, setLiked] = useState({});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="fixed top-0 left-0 w-56 h-16 bg-white border-b border-r border-gray-200 flex items-center justify-center z-50">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Fixed Left Sidebar */}
      <aside
        className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 flex flex-col p-4 z-40 overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        {/* Updated Profile Card - LinkedIn Style */}
        <div className="relative w-full bg-white rounded-xl shadow border border-gray-100 overflow-visible mb-6">
  {/* Banner/Header */}
  <div className="w-full h-28 bg-gray-200 rounded-t-xl overflow-hidden">
    <img
      src="/banner.png"
      alt="Profile Banner"
      className="w-full h-full object-cover"
      style={{ objectPosition: "center" }}
    />
  </div>
  {/* Profile Picture: Overlapping the banner, LinkedIn style */}
  <div
    className="absolute left-1/2"
    style={{
      transform: "translate(-50%, -50%)",
      top: "112px", // h-28 = 112px, so this puts center of image at bottom of banner
      zIndex: 10
    }}
  >
    <img
      src="/pp.png"
      alt="Profile"
      className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
    />
  </div>
  {/* Profile Info */}
  <div className="pt-14 pb-4 flex flex-col items-center">
    <h2 className="text-lg font-bold text-gray-900">
      John Doe
    </h2>
    <div className="text-blue-700 text-sm font-medium mt-1">
      Cardiology
    </div>
    <div className="text-gray-500 text-sm">
      Boston, MA
    </div>
  </div>
</div>

        {/* Navigation */}
        <nav className="mt-2 space-y-0">
          {[
            { name: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
            { name: "Profile", icon: <BookOpen className="h-4 w-4" />, path: "/profile" },
            { name: "Messages", icon: <MessageCircle className="h-4 w-4" />, path: "/messages" },
            { name: "Research", icon: <FileText className="h-4 w-4" />, path: "/research" },
            { name: "Notifications", icon: <Bell className="h-4 w-4" />, path: "/notifications" },
            { name: "Societies", icon: <Network className="h-4 w-4" />, path: "/societies" },
          ].map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-blue-50 text-sm text-gray-700"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content and Right Sidebar */}
      <div
        className="flex flex-row"
        style={{
          marginLeft: "14rem", // w-56 = 224px = 14rem
          minHeight: "100vh"
        }}
      >
        {/* Center Feed */}
        <main className="flex-1 flex flex-col items-center px-4">
          {/* Your Feed and Filter */}
          <div className="bg-white rounded-xl shadow border border-gray-100 w-full max-w-2xl mt-6 px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Feed</h2>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            {/* Composer */}
            <div className="flex gap-3">
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <Input
                type="text"
                placeholder="Share your medical insights, research, or case studies…"
                className="flex-1 bg-gray-50 border-gray-200 h-10 text-sm"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <Image className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                <FileIcon className="h-4 w-4 mr-2" />
                Document
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                <Link2 className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-50">
                <FileText className="h-4 w-4 mr-2" />
                Poll
              </Button>
            </div>
          </div>
          {/* Posts */}
          <div className="w-full max-w-2xl mt-4 flex flex-col gap-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow border border-gray-100 px-6 py-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-sm text-gray-900">{post.author}</span>
                    <span className="text-xs text-gray-500">{post.role} • {post.time}</span>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-700">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-800">{post.content}</div>
                {post.image && (
                  <div className="rounded-lg overflow-hidden border border-gray-100">
                    <img src={post.image} alt="post" className="w-full h-auto" />
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">#{tag}</span>
                  ))}
                </div>
                <div className="text-xs text-blue-700 font-medium">{post.type === "Research Paper" ? "📄 Research Paper" : "🩺 Case Study"}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setLiked(l => ({ ...l, [post.id]: !l[post.id] }))}>
                    <Heart className={`h-3.5 w-3.5 ${liked[post.id] ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{post.likes} likes</span>
                  </div>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
                <div className="flex border-t border-gray-100 mt-2 pt-2 gap-1">
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-red-600 hover:bg-red-50 py-1">
                    <Heart className="h-4 w-4 mr-1" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-1">
                    <MessageSquare className="h-4 w-4 mr-1" /> Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-green-600 hover:bg-green-50 py-1">
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 py-1">
                    <Bookmark className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside
          className="w-72 flex-shrink-0 bg-white border-l border-gray-200 p-4"
          style={{ position: "sticky", top: "4rem", alignSelf: "flex-start", height: "fit-content" }}
        >
          <div className="flex flex-col gap-4">
            {/* Journal Club */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-900">Journal Club</h3>
                <Link to="#" className="text-xs text-blue-600 hover:underline">See all</Link>
              </div>
              {rightSidebar[0].items.map((item, idx) => (
                <div key={idx} className="mb-3 pb-3 border-b border-gray-100">
                  <h4 className="font-medium text-xs text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{item.desc}</p>
                  <p className="text-xs text-gray-500 mb-2">{item.doctors} doctors discussing</p>
                  <div className="flex items-center gap-2">
                    <Button size="xs" variant="outline" className="h-6 text-xs font-medium border-blue-200 text-blue-600 hover:bg-blue-50 px-2 py-0">
                      Join Discussion
                    </Button>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Featured Conferences */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-900">Featured Conferences</h3>
                <Link to="#" className="text-xs text-blue-600 hover:underline">More</Link>
              </div>
              {rightSidebar[1].items.map((item, idx) => (
                <div key={idx} className="mb-3 pb-3 border-b border-gray-100">
                  <h4 className="font-medium text-xs text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{item.date}</p>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-green-50 border border-green-200 text-green-700 rounded px-2">{item.mode}</span>
                    <span className="text-xs bg-blue-50 border border-blue-200 text-blue-700 rounded px-2">CME: {item.cme}</span>
                  </div>
                  <Button size="xs" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm">
                    Register Now
                  </Button>
                </div>
              ))}
            </div>
            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-900">Upcoming Events</h3>
                <Link to="#" className="text-xs text-blue-600 hover:underline">See all</Link>
              </div>
              {rightSidebar[2].items.map((event, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center min-w-10 shadow-sm border border-blue-200">
                    <span className="block text-xs text-blue-600 font-medium">{event.month}</span>
                    <span className="block text-sm font-bold text-blue-700">{event.day}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{event.time}</p>
                    <p className="text-xs text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
