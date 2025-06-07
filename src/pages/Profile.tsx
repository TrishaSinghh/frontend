import React, { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { apiClient } from "@/services/apiClient";
import { tokenStorage } from "@/utils/tokenStorage";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, BookOpen, Calendar, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const [education, setEducation] = useState<any[]>([]);
  const [educationError, setEducationError] = useState<string | null>(null);
  const [educationLoading, setEducationLoading] = useState(true);

  const [experience, setExperience] = useState<any[]>([]);
  const [experienceError, setExperienceError] = useState<string | null>(null);
  const [experienceLoading, setExperienceLoading] = useState(true);

  const [institution, setInstitution] = useState<any>(null);
  const [institutionError, setInstitutionError] = useState<string | null>(null);
  const [institutionLoading, setInstitutionLoading] = useState(false);

  const userObj = tokenStorage.getUser && tokenStorage.getUser();
  const userId = userObj?.userId || userObj?.id;

  // Fetch user profile
  useEffect(() => {
    if (!userId) {
      setUserError("No user ID found.");
      setUserLoading(false);
      return;
    }
    setUserLoading(true);
    userService.getUserById(userId)
      .then(setUser)
      .catch(() => setUserError("Could not load user profile."))
      .finally(() => setUserLoading(false));
  }, [userId]);

  // Fetch education and experience
  useEffect(() => {
    if (!userId) return;
    setEducationLoading(true);
    setExperienceLoading(true);

    apiClient.get(`/user/education?userId=${userId}`)
      .then(setEducation)
      .catch(() => setEducationError("Could not load education."))
      .finally(() => setEducationLoading(false));

    apiClient.get(`/user/experience?userId=${userId}`)
      .then(setExperience)
      .catch(() => setExperienceError("Could not load experience."))
      .finally(() => setExperienceLoading(false));
  }, [userId]);

  // Fetch institution if education exists
  useEffect(() => {
    if (education.length > 0 && education[0].institutionId) {
      setInstitutionLoading(true);
      apiClient.get(`/institution/${education[0].institutionId}`)
        .then(setInstitution)
        .catch(() => setInstitutionError("Could not load institution."))
        .finally(() => setInstitutionLoading(false));
    }
  }, [education]);

  if (userLoading) return <div className="text-center py-16">Loading profile...</div>;
  if (userError) return <div className="text-center text-red-500 py-16">{userError}</div>;
  if (!user) return <div className="text-center py-16">No user profile found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Profile Summary Card */}
      <Card className="mb-6 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <div className="h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-t-xl"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src={user.profilePicture || "/default-avatar.png"} alt={user.firstName + " " + user.lastName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-12 pb-6 text-center">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{user.firstName} {user.lastName}</h3>
          <p className="text-sm text-gray-600 mb-4">{user.specialization}</p>
          <p className="text-sm text-gray-600 mb-4">{user.about}</p>
          <div className="flex items-center gap-2 justify-center text-gray-600">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span>{user.location || "Location not set"}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {user.interests && user.interests.split(",").map((i: string) => (
              <span key={i} className="mr-2 px-2 py-1 bg-blue-100 rounded">{i.trim()}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Institution */}
      <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Institution</CardTitle>
        </CardHeader>
        <CardContent>
          {institutionLoading && <div>Loading institution...</div>}
          {institutionError && <div className="text-red-500">{institutionError}</div>}
          {!institutionLoading && !institutionError && !institution && <div>No institution found.</div>}
          {institution && (
            <>
              <div className="font-semibold">{institution.name}</div>
              <div className="text-sm text-gray-600">{institution.about}</div>
              <div className="text-sm text-gray-500">{institution.location}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {educationLoading && <div>Loading education...</div>}
          {educationError && <div className="text-red-500">{educationError}</div>}
          {!educationLoading && !educationError && education.length === 0 && <div>No education added.</div>}
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="font-semibold">{edu.title}</div>
              <div className="text-sm text-gray-600">{edu.description}</div>
              <div className="text-xs text-gray-500">
                {edu.startDate?.slice(0, 10)} – {edu.endDate?.slice(0, 10)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent>
          {experienceLoading && <div>Loading experience...</div>}
          {experienceError && <div className="text-red-500">{experienceError}</div>}
          {!experienceLoading && !experienceError && experience.length === 0 && <div>No experience added.</div>}
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="font-semibold">{exp.title}</div>
              <div className="text-sm text-gray-600">{exp.description}</div>
              <div className="text-xs text-gray-500">
                {exp.startDate?.slice(0, 10)} – {exp.endDate?.slice(0, 10)}
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Profile;
