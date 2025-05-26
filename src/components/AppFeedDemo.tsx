import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Image, FileText, Heart, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const feedStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.5 },
  },
};

const postAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.7 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
};

const postsList = [
  {
    id: 1,
    initials: "RK",
    name: "Dr. Robert Kim",
    title: "Neurologist at Mass General Hospital",
    time: "2 hours ago",
    content:
      "Just published our latest research on neural pathways in Alzheimer's patients. The findings suggest a new potential approach to early intervention. Link to the paper in comments.",
    tags: ["#Neurology", "#Alzheimer", "#Research"],
    likes: 67,
    comments: 34,
    shares: 14,
  },
  {
    id: 2,
    initials: "EM",
    name: "Dr. Elena Martinez",
    title: "Cardiologist at Cleveland Clinic",
    time: "5 hours ago",
    content:
      "Fascinating case today: 42-year-old patient with unusual ECG patterns showing intermittent Wenckebach phenomenon without symptoms. Anyone encountered similar cases recently?",
    tags: ["#Cardiology", "#ECG", "#CaseStudy"],
    likes: 56,
    comments: 23,
    shares: 7,
  },
];

const AppFeedDemo = () => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const [justNow, setJustNow] = useState({});

  // Reveal posts one by one, simulating a live feed
  useEffect(() => {
    if (postIndex < postsList.length) {
      const timer = setTimeout(() => {
        setVisiblePosts((prev) => [...prev, postsList[postIndex]]);
        setJustNow((prev) => ({
          ...prev,
          [postsList[postIndex].id]: true,
        }));
        setPostIndex((idx) => idx + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [postIndex]);

  useEffect(() => {
    Object.keys(justNow).forEach((id) => {
      if (justNow[id]) {
        setTimeout(() => {
          setJustNow((prev) => ({
            ...prev,
            [id]: false,
          }));
        }, 2500);
      }
    });
  }, [justNow]);

  const [likedPosts, setLikedPosts] = useState({});
  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Your Professional Medical Feed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest research, case studies, and discussions from your medical network
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="bg-[#3B82F6] px-6 py-3 text-white flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-2 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 mr-auto animate-pulse"></div>
              <span className="text-sm font-medium">Your Medical Feed</span>
            </div>
            <div className="p-6">
              {/* Input box */}
              <motion.div
                className="bg-gray-50 rounded-lg p-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="flex gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <span className="text-[#3B82F6] font-bold text-sm">Me</span>
                  </motion.div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Share your medical insights, research, or case studies..."
                      className="w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 text-sm"
                    />
                    <div className="flex gap-2 mt-2">
                      <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-gray-600 transition-colors">
                        <Image className="w-4 h-4 text-[#3B82F6]" />
                        <span>Image</span>
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-gray-600 transition-colors">
                        <FileText className="w-4 h-4 text-[#3B82F6]" />
                        <span>Document</span>
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-sm text-gray-600 transition-colors">
                        <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                        <span>Poll</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Animated feed posts */}
              <motion.div
                variants={feedStagger}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {visiblePosts.map((post) => (
                    <motion.div
                      key={post.id}
                      className="bg-white rounded-lg border border-gray-200 mb-4"
                      variants={postAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div className="p-4">
                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            <motion.div
                              className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0"
                              whileHover={{ scale: 1.15, boxShadow: "0 0 8px #3B82F6" }}
                            >
                              <span className="text-[#3B82F6] font-bold text-sm">{post.initials}</span>
                            </motion.div>
                            <div>
                              <p className="font-medium">{post.name}</p>
                              <p className="text-sm text-gray-500">{post.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <AnimatePresence>
                                  {justNow[post.id] ? (
                                    <>
                                      <motion.span
                                        className="text-xs text-green-600 font-semibold"
                                        key="justnow"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        Posted just now
                                      </motion.span>
                                      <motion.span
                                        className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold ml-1"
                                        key="newbadge"
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.6, opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                      >
                                        New!
                                      </motion.span>
                                    </>
                                  ) : (
                                    <motion.span
                                      className="text-xs text-gray-400"
                                      key="time"
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      {post.time}
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <motion.p
                            className="text-gray-700"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                          >
                            {post.content}
                          </motion.p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-[#EFF6FF] text-[#1D4ED8] border-transparent hover:bg-[#EFF6FF]/80"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                          <motion.button
                            className="flex items-center gap-1"
                            whileTap={{ scale: 1.2 }}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart
                              className={`w-4 h-4 ${likedPosts[post.id] ? "text-red-500" : ""}`}
                              style={{ transition: "color 0.2s" }}
                            />
                            <span>{post.likes + (likedPosts[post.id] ? 1 : 0)} likes</span>
                          </motion.button>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments} comments</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares} shares</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 flex text-sm">
                        <motion.button
                          className="flex-1 p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                          whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF" }}
                        >
                          Like
                        </motion.button>
                        <motion.button
                          className="flex-1 p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                          whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF" }}
                        >
                          Comment
                        </motion.button>
                        <motion.button
                          className="flex-1 p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                          whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF" }}
                        >
                          Repost
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeedDemo;