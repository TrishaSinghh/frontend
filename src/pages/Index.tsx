
import LandingNavbar from "@/components/LandingNavbar";
import Hero from "@/components/Hero";
import ProfilePreview from "@/components/ProfilePreview";
import GlobalMap from "@/components/GlobalMap";
import Testimonials from "@/components/Testimonials";
import TimelineJourney from "@/components/TimelineJourney";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import AppFeedDemo from "@/components/AppFeedDemo";


const Index = () => {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <Hero />
      <ProfilePreview />
      <AppFeedDemo />
      <GlobalMap />
      <Testimonials />
      <TimelineJourney />
      <CtaSection />
      <Footer />

    </div>
  );
};

export default Index;
