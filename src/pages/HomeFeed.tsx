import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home, Network, FileText, BookOpen, Bell, MessageCircle,
  Search, Filter, Image, FileIcon, Link2, MoreVertical, Heart,
  MessageSquare, Share2, Bookmark, Plus, MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { tokenStorage } from "@/utils/tokenStorage";

const HomeFeed = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [userData, setUserData] = useState(null);
  const [expInstitution, setExpInstitution] = useState(null);
  const [eduInstitution, setEduInstitution] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const userObj = tokenStorage.getUser();
    const userId = userObj?.userId || userObj?.id;
    if (!userId) return;

    setLoading(true);
    fetch(`https://api.pharminc.in/user/${userId}`, {
      headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Could not load user'))
      .then(data => {
        const userInfo = Array.isArray(data) ? data[0] : data;
        setUserData(userInfo);
        // Fetch institutions for experience and education
        if (userInfo?.experiences?.institutionId) {
          fetch(`https://api.pharminc.in/institution/${userInfo.experiences.institutionId}`, {
            headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
          })
            .then(res => res.ok ? res.json() : null)
            .then(inst => setExpInstitution(inst));
        }
        if (userInfo?.educations?.institutionId) {
          fetch(`https://api.pharminc.in/institution/${userInfo.educations.institutionId}`, {
            headers: { Authorization: `Bearer ${tokenStorage.getToken()}` }
          })
            .then(res => res.ok ? res.json() : null)
            .then(inst => setEduInstitution(inst));
        }
      })
      .catch(err => {
        console.error(err);
        setUserData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch all posts from everyone
  useEffect(() => {
    setFeedLoading(true);
    fetch("https://api.pharminc.in/public/post")
      .then(res => res.ok ? res.json() : Promise.reject('Could not load posts'))
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Posts data is not an array");
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load posts");
      })
      .finally(() => setFeedLoading(false));
  }, []);

  // Add a tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    setTags(prev => [...prev, tagInput]);
    setTagInput("");
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // Post a new message
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const userObj = tokenStorage.getUser();
    const userId = userObj?.userId || userObj?.id;
    if (!userId) return;

    setPostLoading(true);
    try {
      const response = await fetch("https://api.pharminc.in/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage.getToken()}`
        },
        body: JSON.stringify({
          content: postContent,
          userId
        })
      });
      if (!response.ok) throw new Error("Failed to post");
      const postId = await response.json();
      // Optimistically add the new post to the state
      setPosts(prev => [
        {
          id: postId,
          content: postContent,
          userId,
          createdAt: new Date().toISOString(),
          reactions: 0,
          shares: 0,
          saves: 0,
          // For now, tags are only in the UI
          tags: [...tags]
        },
        ...prev
      ]);
      setPostContent("");
      setTags([]);
      setTagInput("");
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setPostLoading(false);
    }
  };

  // Toggle like
  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading && !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading profile...</div>
      </div>
    );
  }

  const user = userData?.user || userData;
  const experience = userData?.experiences;
  const education = userData?.educations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      <main className="pt-16 container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Left sidebar */}
        <aside className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
            <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="p-6 relative">
              <div className="absolute -top-8 left-6 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img
                  src={user?.profilePicture || "/pp.png"}
                  alt={user ? `${user.firstName} ${user.lastName}` : "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-10">
                <h3 className="font-semibold text-lg text-gray-900">
                  {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {user?.specialization || "Specialization not set"}
                </p>

                {user?.location && (
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                )}

                <div className="space-y-3 text-sm text-gray-600">
                  {experience && (
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>
                        {experience.title || "Experience"} at {expInstitution?.name || "Institution"}
                      </span>
                    </div>
                  )}
                  {education && (
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>
                        {education.title || "Education"} from {eduInstitution?.name || "Institution"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Network className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-600">412 connections</span>
                  </div>
                </div>

                <Link to="/profile" className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View your profile →
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-gray-900 mb-4">Your Groups</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">C</span>
                <span className="text-sm font-medium text-gray-700">Cardiology Research Network</span>
              </li>
              <li className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-semibold text-green-600">M</span>
                <span className="text-sm font-medium text-gray-700">Medical Ethics Forum</span>
              </li>
              <li className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-semibold text-purple-600">W</span>
                <span className="text-sm font-medium text-gray-700">Women in Medicine</span>
              </li>
            </ul>
            <Link to="/groups" className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              See all groups →
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-gray-900 mb-4">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['Cardiology', 'MedicalEthics', 'ResearchMethods', 'AIinhealthcare', 'PatientCare'].map((tag) => (
                <Badge
                  key={tag}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 cursor-pointer transition-colors font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        {/* Main feed */}
        <div className="col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-900">Your Feed</h2>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="p-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                      src={user?.profilePicture || "/pp.png"}
                      alt={user ? `${user.firstName} ${user.lastName}` : "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <Input
                      type="text"
                      placeholder="Share your medical insights, research, or case studies..."
                      className="bg-gray-50 border-gray-200 mb-4 h-32 text-base focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      as="textarea"
                    />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 cursor-pointer transition-colors"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add a tag..."
                        className="flex-grow bg-gray-50 border-gray-200"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag(e);
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddTag}
                      >
                        Add Tag
                      </Button>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        className="px-6"
                        disabled={postLoading}
                      >
                        {postLoading ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Feed posts */}
          <div className="space-y-8">
            {feedLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-gray-600">Loading posts...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center py-8">
                <div className="text-red-600">{error}</div>
              </div>
            ) : posts.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="text-gray-600">No posts yet. Be the first to post!</div>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                          <img
                            src={post.user?.profilePicture || "/pp.png"}
                            alt={post.user?.firstName ? `${post.user.firstName} ${post.user.lastName}` : "User"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">
                              {post.user?.firstName ? `${post.user.firstName} ${post.user.lastName}` : "Anonymous"}
                            </h4>
                            <span className="text-gray-500 text-sm">
                              {post.user?.specialization ? `• ${post.user.specialization}` : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 text-xs">
                              {new Date(post.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-800 leading-relaxed">
                        {post.content}
                      </p>
                      {/* Tags (if available) */}
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag, idx) => (
                            <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6 mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>{post.reactions || 0} likes</span>
                      </div>
                      <span>Comments</span>
                      <span>{post.shares || 0} shares</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 flex">
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none text-gray-600 hover:bg-red-50 hover:text-red-600 py-4"
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart className={`h-5 w-5 mr-2 ${likedPosts[post.id] ? 'text-red-500 fill-red-500' : ''}`} />
                      Like
                    </Button>
                    <Button variant="ghost" className="flex-1 rounded-none text-gray-600 hover:bg-blue-50 hover:text-blue-600 py-4">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Comment
                    </Button>
                    <Button variant="ghost" className="flex-1 rounded-none text-gray-600 hover:bg-green-50 hover:text-green-600 py-4">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" className="flex-1 rounded-none text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 py-4">
                      <Bookmark className="h-5 w-5 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Journal Club</h3>
              <Link to="/journals" className="text-xs font-medium text-blue-600 hover:text-blue-700">See all</Link>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">AI in Clinical Diagnosis</h4>
                    <p className="text-xs text-gray-500 mb-2">38 doctors discussing</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Latest paper from NEJM on machine learning applications
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-yellow-500">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium border-blue-200 text-blue-600 hover:bg-blue-50">
                    Join Discussion
                  </Button>
                  <span className="text-xs text-gray-500">Today at 2 PM</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">Ethics Lab Case 003</h4>
                    <p className="text-xs text-gray-500 mb-2">24 doctors discussing</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Ethical implications of genetic testing in pediatrics
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-yellow-500">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium border-green-200 text-green-600 hover:bg-green-50">
                    Join Discussion
                  </Button>
                  <span className="text-xs text-gray-500">Tomorrow at 3 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Featured Conferences</h3>
              <Link to="/conferences" className="text-xs font-medium text-blue-600 hover:text-blue-700">More</Link>
            </div>
            <div className="border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium text-sm text-gray-900">Global Health Summit 2024</h4>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-yellow-500">
                  <Bookmark className="h-4 w-4" fill="currentColor" />
                </Button>
              </div>
              <p className="text-xs text-gray-600 mb-3">March 15-17, 2024 • Boston, MA</p>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">In-Person</Badge>
                <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">CME: 32</Badge>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm">
                Register Now
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
              <Link to="/events" className="text-xs font-medium text-blue-600 hover:text-blue-700">See all</Link>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center min-w-16 shadow-sm border border-blue-200">
                  <span className="block text-xs text-blue-600 font-medium">OCT</span>
                  <span className="block text-lg font-bold text-blue-700">15</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Advanced Cardiac Imaging Workshop</h4>
                  <p className="text-xs text-gray-600 mb-1">10:00 AM - 4:00 PM</p>
                  <p className="text-xs text-gray-500 mb-2">Mayo Clinic, Rochester</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">CME: 6</Badge>
                    <Badge variant="outoutline" className="text-xs bg-green-50 border-green-200 text-green-700">8 spots</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center min-w-16 shadow-sm border border-purple-200">
                  <span className="block text-xs text-purple-600 font-medium">OCT</span>
                  <span className="block text-lg font-bold text-purple-700">18</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Research Methodology Seminar</h4>
                  <p className="text-xs text-gray-600 mb-1">Virtual Event</p>
                  <p className="text-xs text-gray-500 mb-2">2:00 PM - 5:00 PM EST</p>
                  <Button variant="link" size="sm" className="text-xs h-6 p-0 font-medium text-blue-600 hover:text-blue-700">
                    Free Registration →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default HomeFeed;
