import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, Building, MessageSquare, Calendar, Heart } from "lucide-react";

const ProfilePreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Discover Peers, Build Connections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your professional medical profile and connect with colleagues across institutions and specialties
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="cardiologist" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
              <TabsTrigger value="neurologist">Neurologist</TabsTrigger>
              <TabsTrigger value="oncologist">Oncologist</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 -left-10 w-32 h-32 bg-medical-teal/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4 }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-0 -right-10 w-32 h-32 bg-medical-blue/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              ></motion.div>
              
              <TabsContent value="cardiologist">
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-32 bg-gradient-to-r from-medical-blue to-medical-teal"></div>
                  <div className="p-6 pt-0 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-medical-lightBlue absolute -mt-12 flex items-center justify-center">
                      <span className="text-medical-blue font-bold text-xl">EC</span>
                    </div>
                    
                    <div className="ml-28">
                      <h3 className="font-bold text-xl">Dr. Elena Cardoza</h3>
                      <p className="text-gray-600">Interventional Cardiologist</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="px-2 py-0.5 text-xs bg-medical-lightBlue text-medical-blue rounded-full">Stanford Medicine</div>
                        <div className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">15+ years experience</div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#HeartFailure</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#Echocardiography</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#CardiacCT</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4 text-medical-blue" />
                          <span>Work Experience</span>
                        </h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>Stanford Medicine - Interventional Cardiologist</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>Mayo Clinic - Cardiology Fellow</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <User className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">512 Connections</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <MessageSquare className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">32 Publications</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <Calendar className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">12 Events</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Heart className="w-4 h-4" /> Follow
                      </Button>
                      <Button size="sm">View Full Profile</Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="neurologist">
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-32 bg-gradient-to-r from-medical-blue to-medical-teal"></div>
                  <div className="p-6 pt-0 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-medical-lightBlue absolute -mt-12 flex items-center justify-center">
                      <span className="text-medical-blue font-bold text-xl">RK</span>
                    </div>
                    
                    <div className="ml-28">
                      <h3 className="font-bold text-xl">Dr. Robert Kim</h3>
                      <p className="text-gray-600">Neurologist, Stroke Specialist</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="px-2 py-0.5 text-xs bg-medical-lightBlue text-medical-blue rounded-full">Mass General Hospital</div>
                        <div className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">10+ years experience</div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#Alzheimer</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#NeuralPathways</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#StrokeIntervention</div>
                      </div>
                    </div>
                    
                    {/* Rest of the content similar to cardiologist tab */}
                    <div className="mt-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4 text-medical-blue" />
                          <span>Work Experience</span>
                        </h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>Mass General Hospital - Neurologist</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>Johns Hopkins - Neurology Resident</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <User className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">425 Connections</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <MessageSquare className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">28 Publications</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <Calendar className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">8 Events</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Heart className="w-4 h-4" /> Follow
                      </Button>
                      <Button size="sm">View Full Profile</Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="oncologist">
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-32 bg-gradient-to-r from-medical-blue to-medical-teal"></div>
                  <div className="p-6 pt-0 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-medical-lightBlue absolute -mt-12 flex items-center justify-center">
                      <span className="text-medical-blue font-bold text-xl">JW</span>
                    </div>
                    
                    <div className="ml-28">
                      <h3 className="font-bold text-xl">Dr. James Wilson</h3>
                      <p className="text-gray-600">Oncologist, Cancer Researcher</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="px-2 py-0.5 text-xs bg-medical-lightBlue text-medical-blue rounded-full">MD Anderson Cancer Center</div>
                        <div className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">20+ years experience</div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#Immunotherapy</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#OncologyResearch</div>
                        <div className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">#CancerTreatment</div>
                      </div>
                    </div>
                    
                    {/* Rest of the content similar to cardiologist tab */}
                    <div className="mt-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4 text-medical-blue" />
                          <span>Work Experience</span>
                        </h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>MD Anderson - Oncology Research Director</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-medical-blue shrink-0"></div>
                            <span>Memorial Sloan Kettering - Oncology Fellow</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <User className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">680 Connections</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <MessageSquare className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">45 Publications</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <Calendar className="w-5 h-5 mx-auto mb-1 text-medical-blue" />
                          <p className="text-sm font-medium">15 Events</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Heart className="w-4 h-4" /> Follow
                      </Button>
                      <Button size="sm">View Full Profile</Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-medical-teal text-medical-teal hover:bg-medical-teal/5">
              Browse Public Profiles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePreview;
