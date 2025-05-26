import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  Calendar, 
  Users, 
  BookOpen, 
  Edit,
  ExternalLink,
  Search,
  FileText,
  Video,
  Camera,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const tabs = ['Posts', 'About', 'Activity', 'Experience', 'Education'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            {/* Profile Summary Card */}
            <Card className="mb-6 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                {/* Cover Photo */}
                <div className="h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-t-xl"></div>
                {/* Profile Picture */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage src="/pp.png" alt="Dr. Sarah Chen" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">SC</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="pt-12 pb-6 text-center">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Dr. Sarah Chen</h3>
                <p className="text-sm text-gray-600 mb-4">Cardiology Specialist</p>
                <Separator className="my-4" />
                <div className="space-y-3 text-left text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="text-blue-600 font-semibold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Post impressions</span>
                    <span className="text-blue-600 font-semibold">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics & Insights */}
            <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">54 post views</div>
                    <div className="text-xs text-gray-500">Past 7 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <Search className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">12 search appearances</div>
                    <div className="text-xs text-gray-500">Past 7 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <Link to="/saved" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all">
                    <BookOpen className="h-4 w-4" />
                    <span>Saved items</span>
                  </Link>
                  <Link to="/groups" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all">
                    <Users className="h-4 w-4" />
                    <span>Groups</span>
                  </Link>
                  <Link to="/events" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all">
                    <Calendar className="h-4 w-4" />
                    <span>Events</span>
                  </Link>
                  <Link to="/newsletters" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all">
                    <FileText className="h-4 w-4" />
                    <span>Newsletters</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="font-medium text-gray-900">Published an article</div>
                  <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                </div>
                <div className="text-sm p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="font-medium text-gray-900">Shared a post</div>
                  <div className="text-xs text-gray-500 mt-1">1 week ago</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Profile Banner */}
            <Card className="mb-8 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                {/* Banner Image */}
                <div className="h-60 relative overflow-hidden rounded-t-xl">
                  <img 
                    src="/banner.png" 
                    alt="Medical Banner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <Button variant="ghost" size="sm" className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Edit cover photo
                  </Button>
                </div>
                {/* Profile Picture */}
                <div className="absolute -bottom-20 left-8">
                  <div className="relative">
                    <Avatar className="h-40 w-40 border-4 border-white shadow-xl">
                      <AvatarImage src="/pp.png" alt="Dr. Sarah Chen" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">SC</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="absolute bottom-2 right-2 bg-white border border-gray-300 p-2 h-10 w-10 rounded-full shadow-lg hover:shadow-xl">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="pt-24 pb-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">Dr. Sarah Chen</h1>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 mb-4">Cardiology Specialist at Mayo Clinic</p>
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-base">Boston, Massachusetts • </span>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-base font-semibold hover:text-blue-700">
                      412 connections
                    </Button>
                    <span className="text-gray-400">•</span>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-base font-semibold hover:text-blue-700">
                      Contact info
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm px-4 py-2 font-medium border border-blue-200">Cardiology</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm px-4 py-2 font-medium border border-green-200">Interventional</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-sm px-4 py-2 font-medium border border-purple-200">Research</Badge>
                  </div>
                  {/* Mayo Clinic Section */}
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/mayo.png" alt="Mayo Clinic" className="h-8 w-8 rounded shadow-sm" />
                    <span className="text-base font-semibold text-gray-900">Mayo Clinic</span>
                  </div>
                  {/* Connect and Message Buttons */}
                  <div className="flex gap-3 mb-6">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-base px-6 py-2 shadow-lg">
                      Connect
                    </Button>
                    <Button variant="outline" className="text-base px-6 py-2 border-gray-300 hover:bg-gray-50 shadow-sm">
                      Message
                    </Button>
                  </div>
                  {/* Open to collaborations section */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white text-sm font-bold">💼</span>
                      </div>
                      <span className="font-semibold text-base text-gray-900">Open to collaborations</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Research partnerships and clinical trials</p>
                    <Button variant="link" className="p-0 text-green-600 text-sm mt-2 font-medium hover:text-green-700">
                      Show details →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-gray-200 mb-8 bg-white/50 backdrop-blur-sm rounded-t-xl px-6 py-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-base font-semibold border-b-2 transition-all duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'Posts' && (
              <div className="space-y-8">
                {/* Share a post */}
                <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-14 w-14 shadow-md">
                        <AvatarImage src="/pp.png" alt="Dr. Sarah Chen" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">SC</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="flex-1 justify-start text-gray-500 h-14 text-base hover:bg-gray-50 border-gray-300">
                        Start a post...
                      </Button>
                    </div>
                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                      <Button variant="ghost" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg">
                        <Video className="h-5 w-5 text-blue-600" />
                        <span>Media</span>
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-3 rounded-lg">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <span>Event</span>
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-3 text-gray-600 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                        <span>Write article</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Empty state for posts */}
                <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">No posts yet</h3>
                    <p className="text-base text-gray-600">Posts you share will appear here.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'About' && (
              <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                  <CardTitle className="text-2xl">About</CardTitle>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-700 leading-relaxed mb-8">
                    Board-certified cardiologist with over 10 years of clinical experience specializing in interventional cardiology and cardiac imaging. Research interests include novel approaches to heart failure management and preventive cardiology.
                  </p>
                  <div className="grid grid-cols-3 gap-8 text-center py-8 border-t border-gray-100">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">10+</div>
                      <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">300+</div>
                      <div className="text-sm text-gray-600 font-medium">Procedures</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">42</div>
                      <div className="text-sm text-gray-600 font-medium">Publications</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'Activity' && (
              <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                  <CardTitle className="text-2xl">Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <strong>Dr. Sarah Chen</strong> liked a post: <em>"Advances in Cardiac Imaging"</em>
                      <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <strong>Dr. Sarah Chen</strong> commented on <em>"Heart Health Awareness Webinar"</em>
                      <div className="text-xs text-gray-500 mt-1">Yesterday</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <strong>Dr. Sarah Chen</strong> started following <em>Dr. Maria Lopez</em>
                      <div className="text-xs text-gray-500 mt-1">3 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'Experience' && (
              <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                  <CardTitle className="text-2xl">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <img src="./mayo.png" alt="Mayo Clinic" className="h-10 w-10 rounded shadow" />
                      <div>
                        <div className="font-semibold text-lg">Mayo Clinic</div>
                        <div className="text-sm text-gray-600">Cardiology Fellow</div>
                        <div className="text-xs text-gray-500">2021 - Present · Rochester, MN</div>
                        <div className="text-xs text-gray-500 mt-1">Researching heart failure therapies and leading clinical trials.</div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <img src="./stan.png" alt="Stanford Medicine" className="h-10 w-10 rounded shadow" />
                      <div>
                        <div className="font-semibold text-lg">Stanford Medicine</div>
                        <div className="text-sm text-gray-600">Interventional Cardiologist</div>
                        <div className="text-xs text-gray-500">2016 - 2021 · Palo Alto, CA</div>
                        <div className="text-xs text-gray-500 mt-1">Performed complex cardiac procedures and mentored residents.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'Education' && (
              <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                  <CardTitle className="text-2xl">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <img 
                        src="./hms.png" 
                        alt="Harvard Medical School" 
                        className="h-10 w-10 rounded shadow"
                      />
                      <div>
                        <div className="font-semibold text-lg">Harvard Medical School</div>
                        <div className="text-sm text-gray-600">Doctor of Medicine (MD)</div>
                        <div className="text-xs text-gray-500">2008 - 2012</div>
                        <div className="text-xs text-gray-500 mt-1">Graduated with honors in cardiovascular research.</div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <img 
                        src="./jhu.png" 
                        alt="Johns Hopkins University" 
                        className="h-10 w-10 rounded shadow"
                      />
                      <div>
                        <div className="font-semibold text-lg">Johns Hopkins University</div>
                        <div className="text-sm text-gray-600">BS, Biomedical Engineering</div>
                        <div className="text-xs text-gray-500">2004 - 2008</div>
                        <div className="text-xs text-gray-500 mt-1">Undergraduate research in medical device design.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* People You May Know */}
            <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">People you may know</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">See all</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900">Dr. Robert Kim</h4>
                    <p className="text-xs text-gray-600">Cardiologist at BWH</p>
                    <p className="text-xs text-gray-500 mb-3">2 mutual connections</p>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-blue-200 text-blue-600 hover:bg-blue-50">
                      Connect
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 font-bold">ML</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900">Dr. Maria Lopez</h4>
                    <p className="text-xs text-gray-600">Research Scientist</p>
                    <p className="text-xs text-gray-500 mb-3">1 mutual connection</p>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-green-200 text-green-600 hover:bg-green-50">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Education Summary */}
            <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="./hms.png" 
                      alt="Harvard Medical School" 
                      className="h-14 w-14 rounded-lg object-contain bg-white border p-2 shadow-sm"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">Harvard Medical School</h4>
                    <p className="text-xs text-gray-600">Doctor of Medicine (MD)</p>
                    <p className="text-xs text-gray-500">2008 - 2012</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="./jhu.png" 
                      alt="Johns Hopkins University" 
                      className="h-14 w-14 rounded-lg object-contain bg-white border p-2 shadow-sm"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">Johns Hopkins University</h4>
                    <p className="text-xs text-gray-600">BS, Biomedical Engineering</p>
                    <p className="text-xs text-gray-500">2004 - 2008</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Endorsements */}
            <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Skills</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">See all</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-900">Interventional Cardiology</span>
                    <span className="text-xs text-blue-600 font-medium">15 endorsements</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-900">Echocardiography</span>
                    <span className="text-xs text-green-600 font-medium">12 endorsements</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-900">Clinical Research</span>
                    <span className="text-xs text-purple-600 font-medium">8 endorsements</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
