import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home, BookOpen, MessageCircle, FileText, Bell, Network,
  Filter, Image, FileIcon, Link2, MoreVertical, Heart,
  MessageSquare, Share2, Search, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiLogOut } from 'react-icons/bi';
import { tokenStorage } from "@/utils/tokenStorage";

// Mock posts and rightSidebar data
const mockPosts = [
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
  const [likedCount, setLikedCount] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postAttachmentId, setPostAttachmentId] = useState("");
  const [posting, setPosting] = useState(false);
  const [userCache, setUserCache] = useState({});
  const navigate = useNavigate();

  // Fetch user profile data (current user)
  useEffect(() => {
    const userObj = tokenStorage.getUser();
    const userId = userObj?.userId || userObj?.id;
    if (!userId) return;

    setLoading(true);
    fetch(`https://user.api.pharminc.in/public/user/${userId}`, {
      headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Could not load user'))
      .then(data => {
        const userInfo = Array.isArray(data) ? data[0] : data;
        setUserData(userInfo);
      })
      .catch(err => {
        console.error(err);
        setUserData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch posts from backend, sorted by createdAt (newest first)
  useEffect(() => {
    fetch(`https://content.api.pharminc.in/public/post`, {
      headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Could not load posts'))
      .then(data => {
        const sortedPosts = (data || []).sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
        // Initialize likedCount for each post
        const initialLikedCount = {};
        sortedPosts.forEach(post => {
          initialLikedCount[post.id] = parseInt(post.reactions) || 0;
        });
        mockPosts.forEach(post => {
          if (!initialLikedCount[post.id]) {
            initialLikedCount[post.id] = post.likes;
          }
        });
        setLikedCount(initialLikedCount);
      })
      .catch(err => {
        console.error(err);
        setPosts([]);
      });
  }, []);

  // Fetch user info for a post's userId and cache it
  const fetchUserInfo = async (userId) => {
    if (userCache[userId]) return userCache[userId];
    try {
      const res = await fetch(`https://user.api.pharminc.in/public/user/${userId}`, {
        headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
      });
      if (!res.ok) throw new Error('Could not load user');
      const data = await res.json();
      const userInfo = Array.isArray(data) ? data[0] : data;
      setUserCache(prev => ({ ...prev, [userId]: userInfo }));
      return userInfo;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // Handle post creation
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postTitle || !postContent) return alert("Title and Content are required!");

    setPosting(true);
    fetch(`https://content.api.pharminc.in/private/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStorage.getToken()}`
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        attachmentId: postAttachmentId || undefined
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to create post'))
      .then(newPostId => {
        fetch(`https://content.api.pharminc.in/public/post`, {
          headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
        })
          .then(res => res.ok ? res.json() : Promise.reject('Could not refresh posts'))
          .then(data => {
            const sortedPosts = (data || []).sort((a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setPosts(sortedPosts);
            const newLikedCount = {};
            sortedPosts.forEach(post => {
              newLikedCount[post.id] = parseInt(post.reactions) || 0;
            });
            setLikedCount(newLikedCount);
          });
        setPostTitle("");
        setPostContent("");
        setPostAttachmentId("");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to create post: " + err);
      })
      .finally(() => {
        setPosting(false);
      });
  };

  // Handle like (client-side only, for demo)
  const handleLike = (postId) => {
    setLiked(prev => ({ ...prev, [postId]: !prev[postId] }));
    setLikedCount(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (liked[postId] ? -1 : 1)
    }));
  };

  // Map posts for display
  const user = userData?.user || userData;
  const displayPosts = posts.length > 0 ? posts : mockPosts;
  const [mappedDisplayPosts, setMappedDisplayPosts] = useState([]);

  useEffect(() => {
    const mapAllPosts = async () => {
      const mapped = await Promise.all(
        displayPosts.map(async post => {
          if (post.author) return post; // Mock post
          let userInfo = userCache[post.userId];
          if (!userInfo && post.userId) {
            userInfo = await fetchUserInfo(post.userId);
          }
          return {
            ...post,
            author: userInfo && userInfo.user ? `Dr ${userInfo.user.firstName} ${userInfo.user.lastName}` : `User ${post.userId}`,
            role: userInfo && userInfo.user ? userInfo.user.specialization : "User",
            avatar: userInfo && userInfo.user && userInfo.user.profilePicture ? userInfo.user.profilePicture : "/pp.png",
            time: post.createdAt ? new Date(post.createdAt).toLocaleString() : post.time,
            tags: post.tags || [],
            type: post.type || "Post",
            likes: likedCount[post.id] || parseInt(post.reactions) || 0,
            comments: post.comments || 0,
            shares: post.shares || 0,
            saves: post.saves || 0,
            image: post.imageId ? `https://content.api.pharminc.in/image/${post.imageId}` : post.image
          };
        })
      );
      setMappedDisplayPosts(mapped);
    };
    mapAllPosts();
  }, [displayPosts, userCache, likedCount]);

  if (loading && !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="fixed top-0 left-0 w-56 h-16 bg-white border-b border-r border-gray-200 flex items-center justify-center z-50">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Fixed Left Sidebar */}
      <aside
        className="fixed top-12 left-0 w-56 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 flex flex-col p-4 z-40 overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        {/* Updated Profile Card - LinkedIn Style */}
        <Link to="/profile">
          <div className="relative w-full bg-white rounded-xl shadow border border-gray-100 overflow-visible mb-6">
            {/* Banner/Header */}
            <div className="w-full h-20 bg-gray-200 rounded-t-xl overflow-hidden">
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
                top: "90px",
                zIndex: 10
              }}
            >
              <img
                src={user?.profilePicture || "/pp.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            {/* Profile Info */}
            <div className="pt-14 pb-4 flex flex-col items-center">
              {loading ? (
                <p className="text-sm text-gray-500">Loading profile...</p>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-900">Dr {user?.name}</h2>
                  <div className="text-blue-700 text-sm font-medium mt-1">{user?.role}</div>
                </>
              )}
            </div>
          </div>
        </Link>
        {/* Navigation */}
        <nav className="mt-2 space-y-0">
          {[
            { name: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
            { name: "Explore", icon: <Search className="h-4 w-4" />, path: "/profile" },
            { name: "Messages", icon: <MessageCircle className="h-4 w-4" />, path: "/messages" },
            { name: "Jobs", icon: <FileText className="h-4 w-4" />, path: "/jobs" },
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
        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 text-sm text-red-600 w-full"
          >
            <BiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {/* Main Content and Right Sidebar */}
      <div
        className="flex flex-row"
        style={{
          marginLeft: "14rem",
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
            <form onSubmit={handlePostSubmit}>
              <div className="flex gap-3">
                <img
                  src={user?.profilePicture || "/pp.png"}
                  alt={user?.firstName || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Post title (required)"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                    className="bg-gray-50 border-gray-200 h-10 text-sm"
                  />
                  <Input
                    type="text"
                    placeholder="Attachment ID (optional)"
                    value={postAttachmentId}
                    onChange={(e) => setPostAttachmentId(e.target.value)}
                    className="bg-gray-50 border-gray-200 h-10 text-sm"
                  />
                  <textarea
                    placeholder="Share your medical insights, research, or case studies…"
                    className="flex-1 bg-gray-50 border-gray-200 h-20 p-2 text-sm rounded"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                  />
                </div>
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
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-blue-600 hover:bg-blue-50"
                  disabled={posting}
                >
                  {posting ? "Posting..." : "Post"}
                </Button>
              </div>
            </form>
          </div>
          {/* Posts */}
          <div className="w-full max-w-2xl mt-4 flex flex-col gap-4">
            {mappedDisplayPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow border border-gray-100 px-6 py-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
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
                  {post.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">#{tag}</span>
                  ))}
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  {post.type === "Research Paper" ? "📄 Research Paper" : "🩺 Case Study"}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleLike(post.id)}>
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
          style={{ position: "sticky", top: "1.8rem", alignSelf: "flex-start", height: "fit-content" }}
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
                    <Button size="sm" variant="outline" className="h-6 text-xs font-medium border-blue-200 text-blue-600 hover:bg-blue-50 px-2 py-0">
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
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm">
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
